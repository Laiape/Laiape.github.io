// Activates .breakdown clips only. With no clips on the page, this does nothing.
(function () {
  var videos = document.querySelectorAll('.breakdown video');
  if (!videos.length) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          if (video.preload === 'none') video.preload = 'metadata';
          if (!reduce) {
            var pending = video.play();
            if (pending && pending.catch) pending.catch(function () {});
          }
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.35 });
    videos.forEach(function (video) { io.observe(video); });
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
