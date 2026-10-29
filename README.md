# Laiape.github.io

## Breakdown clips

The live homepage does not include breakdown videos. The markup, CSS and loader are ready for a later clip per character.

To add one, paste the comment marked `breakdown-template` in `index.html` inside that character's card. Point each `<video>` at real files:

- `poster` — a still image
- a WebM `<source>`, then an MP4 `<source>`
- `muted loop playsinline preload="none"` stay as written

`assets/breakdown.js` uses `IntersectionObserver`: a clip loads and plays only while it is on screen. If the visitor prefers reduced motion, it stays on the poster and does not autoplay. The toggle (`Both` / `With controls` / `Without controls`) shows the pair side by side, or one clip at a time. Below 640px the pair stacks.

Do not commit placeholder videos. Leave the template commented until the real files exist.