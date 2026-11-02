/* Load the embedded reel only after the visitor chooses Play. */
document.querySelectorAll("[data-reel-player]").forEach((button) => {
  button.hidden = false;
  button.addEventListener("click", () => {
    const player = document.createElement("iframe");
    player.className = "reel-embed";
    player.title = "Laia Peris — Demo reel 2026";
    player.src = "https://www.youtube.com/embed/B7hctd5SA2A?autoplay=1&rel=0";
    player.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    player.allowFullscreen = true;
    player.referrerPolicy = "strict-origin-when-cross-origin";
    button.replaceWith(player);
    player.focus();
  }, { once: true });
});
