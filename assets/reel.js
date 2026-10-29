// Click-to-load YouTube embed: no third-party request until the visitor asks for the video.
document.querySelectorAll('[data-yt]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var id = btn.getAttribute('data-yt');
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    f.title = btn.getAttribute('data-title') || 'Video';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    f.className = 'reel-frame';
    btn.replaceWith(f);
    f.focus();
  });
});
