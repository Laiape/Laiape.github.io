// Behavioral checks for synchronized video switching, without browser dependencies.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../assets/site.js'), 'utf8');

function fixture() {
  const video = new EventTarget();
  Object.assign(video, {currentTime: 2.4, duration: 5.5, paused: true, ended: false});
  video.pause = () => { video.paused = true; };
  video.play = () => { video.paused = false; return Promise.resolve(); };
  video.load = () => { video.currentTime = 0; };
  video.setAttribute = () => {};
  const button = (label, pressed) => ({
    textContent:label, dataset:{src:`${label}.mp4`,poster:`${label}.jpg`}, pressed,
    getAttribute() { return String(this.pressed); },
    setAttribute(_, value) { this.pressed = value === 'true'; },
    closest() { return this; },
  });
  const clean = button('Clean', false);
  const controls = button('Controls', true);
  let onClick;
  const switcher = {hidden:true, addEventListener:(_, fn) => {onClick=fn;}, querySelectorAll:() => [clean,controls]};
  const status = {textContent:'',className:'sr-only'};
  const root = {dataset:{title:'IK/FK'},querySelector:q => q==='video'?video:q==='.view-switch'?switcher:status};
  vm.runInNewContext(source, {document:{querySelectorAll:()=>[root]}});
  const ready = () => video.dispatchEvent(new Event('loadedmetadata'));
  return {video, clean, controls, status, switcher, ready, click:b=>onClick({target:b})};
}

{
  const f=fixture();
  assert.equal(f.switcher.hidden,false);
  f.click(f.clean); f.ready();
  assert.equal(f.video.currentTime,2.4,'paused position is preserved');
  assert.equal(f.video.paused,true,'a paused comparison must not autoplay');
  assert.equal(f.clean.pressed,true);
}
{
  const f=fixture(); f.video.paused=false;
  f.click(f.clean); f.ready();
  assert.equal(f.video.currentTime,2.4);
  assert.equal(f.video.paused,false,'playing video resumes after switching');
}
{
  const f=fixture(); f.video.currentTime=5.5; f.video.ended=true;
  f.click(f.clean); f.ready();
  assert.ok(f.video.currentTime<5.5,'end of clip is clamped to a valid position');
  assert.equal(f.video.paused,true);
}
{
  const f=fixture(); f.video.paused=false;
  f.click(f.clean); f.click(f.controls); f.ready();
  assert.equal(f.video.src,'Controls.mp4');
  assert.equal(f.video.currentTime,2.4,'rapid switches retain original time');
  assert.equal(f.video.paused,false);
}
{
  const f=fixture(); f.click(f.clean); f.video.dispatchEvent(new Event('error'));
  assert.equal(f.status.className,'video-error');
  f.click(f.controls); f.ready();
  assert.equal(f.status.className,'sr-only','recovering clears the visible error');
  assert.equal(f.video.paused,true);
}
console.log('PASS: paused, playing, end-of-clip, rapid switching and error recovery.');
