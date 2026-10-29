# Laiape.github.io

## Breakdown clips

The Autorig section plays three demos from `assets/video/`. On wide screens they sit two per row, so the Maya UI stays readable; below 640px they stack. Each clip is a `<video muted loop playsinline preload="none">` with a WebM source and an MP4 fallback. The still is a `<picture>` (WebP, then JPG). The guides and Character Manager clips are 1280×634; the Thaiz build stays 1280×664. Edward's rig breakdown, under his card, is four 1280×720 clips in a 2×2 grid (one column below 640px).

`assets/breakdown.js` uses `IntersectionObserver`: a clip plays only while it is on screen, so the media files are not requested on first paint. If the visitor prefers reduced motion, the poster stays up and a Play control is shown instead of autoplay.

The same styles support a later with-controls / without-controls pair. Add `data-view="both"` on `.breakdown`, `data-variant="controls"` and `data-variant="plain"` on the figures, and the toggle buttons from `.breakdown-toggle` (`data-breakdown="both|controls|plain"`). Below 640px the pair stacks.

Do not commit placeholder videos.
