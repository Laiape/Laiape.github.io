// Plays .breakdown clips only while they are on screen.
// prefers-reduced-motion: leave the poster up and offer a play control.
(function () {
  var videos = document.querySelectorAll('.breakdown video');
  if (!videos.length) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function markPlaying(video) {
    var frame = video.closest('.breakdown-frame');
    if (frame) frame.classList.add('is-playing');
  }

  function showPlay(video) {
    var frame = video.closest('.breakdown-frame');
    if (!frame || frame.querySelector('.breakdown-play')) return;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'breakdown-play';
    button.textContent = 'Play';
    var label = video.getAttribute('aria-label');
    if (label) button.setAttribute('aria-label', 'Play: ' + label);
    button.addEventListener('click', function () {
      var pending = video.play();
      if (pending && pending.catch) pending.catch(function () {});
      button.hidden = true;
    });
    frame.appendChild(button);
  }

  videos.forEach(function (video) {
    video.addEventListener('playing', function () { markPlaying(video); });
    if (reduce) showPlay(video);
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        if (reduce) return;
        var pending = video.play();
        if (pending && pending.catch) {
          pending.catch(function () { showPlay(video); });
        }
      });
    }, { threshold: 0.35 });
    videos.forEach(function (video) { io.observe(video); });
  } else if (reduce) {
    videos.forEach(showPlay);
  }

  document.querySelectorAll('.breakdown').forEach(function (root) {
    var buttons = root.querySelectorAll('[data-breakdown]');
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var mode = button.getAttribute('data-breakdown');
        root.setAttribute('data-view', mode);
        buttons.forEach(function (other) {
          other.setAttribute('aria-pressed', other === button ? 'true' : 'false');
        });
      });
    });
  });
})();
