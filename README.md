# Laia Peris — Portfolio

Static portfolio for a Character Rigger / Rigging TD. HTML, CSS and optional JavaScript; no framework or runtime dependencies.

## Preview

From this folder, run `python -m http.server 8765 --bind 127.0.0.1` and open <http://127.0.0.1:8765/>. The site uses root-relative URLs and needs an HTTP server.

## Check and publish

Run `python .github/check_site.py` to check page links, image metadata, media controls and obsolete content. Add `--package` to collect the public site in `_site/`.

GitHub Pages deploys from `main`. The workflow validates the site and uploads only the referenced public files. Changes are reviewed before merging; no deployment is triggered by the working branch.

## Content

- Home: current demo reel embedded in the page on Play, four selected projects, autorig, about and contact. The YouTube player is requested only after a click; without JavaScript, a standard embedded player remains available.
- Work: Edward, Nini, Here Be Dragons, O’Paraiso, Sprouts and DAVI.
- Edward: Backflip, Throw ball, Robot victory, Heavy landing, Capoeira, Boxing, Walking and Jump from the current character Animation Library. Every animation transitions from controls to clean in a single looping video at 24 FPS. Idle/calibration tails are trimmed from the new BONES-SEED actions. Model: Jordi Soriano; source motion: Adobe Mixamo / BONES-SEED, credited per clip.
- Nini: personal rigging project with a looping skirt breakdown. Walking, Run & fall, Blinding Lights, Light landing, Mambo kicks, Samba, Rumba and Jumping jacks each transition through the actual skirt module/collision display, animation controls and smoothed clean geometry. Every stage uses the same camera, timing and Smooth Mesh Preview level 2.
- Here Be Dragons: three final Aychedral shots, the Varyndor cave-flight sequence, and three viewport excerpts from the current reel. Aychedral credits include rigging, skinning, AdonisFX muscle/fat simulation and Houdini wing simulation, following Laia’s explicit correction. Varyndor credits cover Houdini Vellum wings. Production turnarounds remain in disclosures.
- The old About and CV URLs redirect to the corresponding home sections. A revised CV is not available yet, so no outdated PDF is offered.

Images and videos retain their respective project and creator credits. Fonts are self-hosted under their included SIL Open Font License. Do not reuse portfolio artwork as stock content.

Originals, source records and review notes belong in ignored `.local-notes/`. Never commit working scenes, private documents or replacement reels without reviewing them first.

Viewport animation requirements are recorded in `AGENTS.md` and `.cursor/rules/viewport-breakdowns.mdc`. Sprouts includes selected Freya/Mechanic final shots, starting with Freya’s early close-up, and the recorded Freya guide-to-rig build demonstration. The complete Sprouts film must not be embedded; Laia has explicitly limited publication to the selected material.
