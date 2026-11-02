# Laia Peris — Portfolio

Static portfolio for a Character Rigger / Rigging TD. HTML, CSS and optional JavaScript; no framework or runtime dependencies.

## Preview

From this folder, run `python -m http.server 8765 --bind 127.0.0.1` and open <http://127.0.0.1:8765/>. The site uses root-relative URLs and needs an HTTP server.

## Check and publish

Run `python .github/check_site.py` to check page links, image metadata, media controls and obsolete content. Add `--package` to collect the public site in `_site/`.

GitHub Pages deploys from `main`. The workflow validates the site and uploads only the referenced public files. Changes are reviewed before merging; no deployment is triggered by the working branch.

## Content

- Home: current demo reel embedded in the page on Play, four selected projects, autorig, about and contact. The YouTube player is requested only after a click; without JavaScript, a standard embedded player remains available.
- Work: Edward, Here Be Dragons, O’Paraiso, Sprouts and DAVI.
- Edward: synchronized clean/control views with native playback controls.
- Here Be Dragons: three final Aychedral shots, the Varyndor cave-flight sequence, and three viewport excerpts from the current reel. Aychedral credits include rigging, skinning, AdonisFX muscle/fat simulation and Houdini wing simulation, following Laia’s explicit correction. Varyndor credits cover Houdini Vellum wings. Production turnarounds remain in disclosures.
- The old About and CV URLs redirect to the corresponding home sections. A revised CV is not available yet, so no outdated PDF is offered.

Images and videos retain their respective project and creator credits. Fonts are self-hosted under their included SIL Open Font License. Do not reuse portfolio artwork as stock content.

Originals, source records and review notes belong in ignored `.local-notes/`. Never commit working scenes, private documents or replacement reels without reviewing them first.
