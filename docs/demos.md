# Live demos

## /demos/aac-app/ (Voice AAC app)

A static web build of the Voice app, shown in a phone frame on
`/projects/ai-aac-app/` and loaded only when the reader presses "Start the
live demo".

Built on 14 November 2026 from `mcneillium/ai-powered-aac-app`, branch
`claude/voice-team-run`, commit `f2c94df`, Expo SDK 54.

How it was built:

1. Fresh clone, `npm ci`, with **no `.env` file**. The app then runs in its
   local guest mode: Firebase is not initialised, nothing is sent to the
   database or the AI cloud function, and no API key is bundled (the build
   was searched for keys before publishing).
2. `npx expo install react-native-web react-dom @expo/metro-runtime` in the
   clone only (not committed to the app repository).
3. `experiments.baseUrl` set to `/demos/aac-app` in `app.json` in the clone
   only, then `npx expo export --platform web`.
4. Two folders renamed so Jekyll copies them, with the paths in
   `index.html` and the bundle rewritten to match:
   `_expo` to `expo` (Jekyll skips names starting with `_`) and
   `assets/node_modules` to `assets/pkgs` (excluded in `_config.yml`).

Checked in a browser at phone size: the board, categories, Phrases,
Personalise and Child mode work, and the only outside request is the
`jsQR` script from cdn.jsdelivr.net, which the app loads itself. Picture
symbols from ARASAAC are only fetched if a user chooses to download them.

`_includes/head.html` allows `frame-src 'self'` so the case study can frame
the demo.

To rebuild after the app changes, repeat the steps and replace the folder.
