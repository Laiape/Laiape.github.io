/* Optional enhancement: compare synchronized views; all other content is static. */
document.querySelectorAll("[data-paired-video]").forEach((root) => {
  const video = root.querySelector("video");
  const switcher = root.querySelector(".view-switch");
  const status = root.querySelector('[role="status"]');
  if (!video || !switcher) return;
  switcher.hidden = false;
  let desiredTime = 0;
  let resume = false;
  let changing = false;
  let request = 0;
  switcher.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-src]");
    if (!button || button.getAttribute("aria-pressed") === "true") return;
    if (!changing) {
      desiredTime = video.currentTime || 0;
      resume = !video.paused && !video.ended;
    }
    changing = true;
    const current = ++request;
    video.pause();
    switcher.querySelectorAll("button").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    video.poster = button.dataset.poster;
    video.setAttribute(
      "aria-label",
      root.dataset.title + " — " + button.textContent.trim(),
    );
    video.src = button.dataset.src;
    const ready = () => {
      if (current !== request) return;
      video.currentTime = Math.min(
        desiredTime,
        Math.max(0, video.duration - 0.05),
      );
      changing = false;
      status.className = "sr-only";
      status.textContent = button.textContent.trim() + " view selected.";
      if (resume)
        video.play().catch(() => {
          status.textContent = "Press Play to continue.";
        });
    };
    video.addEventListener("loadedmetadata", ready, { once: true });
    video.load();
  });
  video.addEventListener("error", () => {
    changing = false;
    resume = false;
    status.className = "video-error";
    status.textContent =
      "This video could not load. Try the other view or open the video file below.";
  });
});
