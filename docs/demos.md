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

## /demos/aac-dashboard/ (caregiver dashboard)

A static build of the caregiver dashboard running on made-up data, shown in
a browser frame on `/projects/ai-aac-app/`, loaded on request, opening on
`#/admin`.

Rebuilt on 14 November 2026 from branch `fix/b2-userlogs-per-user`, commit
`5c8dc22`: v0.2.0 plus the overnight review, plus the fix that reads logs per
person (backlog item B-2). That branch is pushed but not yet merged. Taken with `git archive HEAD`, so the working-tree changes on his
PC (line endings only) are not included.

How it was built, in a copy outside the repository (nothing was committed to
the dashboard repository):

1. `src/demo-mock/` holds stand-ins for `firebase/app`, `firebase/auth`,
   `firebase/database` and `firebase/functions`, swapped in by webpack
   aliases in `craco.config.js`. The database is an in-memory tree seeded by
   `seed.js` with invented people (example.org addresses), activity, alerts,
   favourites, custom boards and feedback, timed relative to page load. A
   demo admin is always signed in. Writes change the tree until reload.
2. `BrowserRouter` swapped for `HashRouter` in `App.js`, so every page works
   from a static folder.
3. A fixed note added to `public/index.html`: "Demo: made-up people and
   data. Nothing you do here is saved or sent anywhere." Also `noindex`.
4. `PUBLIC_URL=/demos/aac-dashboard npx craco build`, no `.env`.

Checked: all 19 routes render with no errors; the build contains no Firebase
address and makes no outside requests. The seed writes logs as
`userLogs/{uid}/{pushId}`, the layout the app uses. Built from the code
before B-2, the same data shows 0 activities and 0 active users, which is
the production fault (contract break CB-1 in the dashboard's
`docs/DATA-CONTRACT.md`). No fine-tune metrics
are seeded, because no model training writes them.

A copy of the demo-mock folder and the build changes is kept with Paul's
research archive (`Documents\research\archive\aac-dashboard-demo-mock.tar.gz`).
