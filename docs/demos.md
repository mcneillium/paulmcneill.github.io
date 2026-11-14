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

Built on 14 November 2026 from branch `overnight/2026-08-08/improvements`,
commit `84239ef` (v0.2.0 plus the overnight review), pushed to GitHub the
same day. Taken with `git archive HEAD`, so the working-tree changes on his
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
address and makes no outside requests. The seed supplies logs in the flat
`userLogs/{pushId}` layout the dashboard reads; the app writes
`userLogs/{uid}/{pushId}` (contract break CB-1 in the dashboard's
`docs/DATA-CONTRACT.md`), and the case study says so. No fine-tune metrics
are seeded, because no model training writes them.

A copy of the demo-mock folder and the build changes is kept with Paul's
research archive (`Documents\research\archive\aac-dashboard-demo-mock.tar.gz`).

## Voice word-prediction playground

`_includes/voice-playground.html` (on the AAC case study and `/lab/`) runs
the app's own core board and prediction engine in the page. Two files:

- `assets/js/voice-engine.js` is generated. Rebuild it after the app's
  prediction code or vocabulary changes, with the app checked out beside
  this repository on the branch to show:

  ```sh
  npm install
  node scripts/build-voice-engine.mjs ../ai-powered-aac-app
  ```

  It bundles `src/services/prediction/` (predictor, base model, reranker
  weights) and the board pages and pictures from `src/data/`. The header
  comment records the source branch and commit.
- `assets/js/voice-playground.js` is the hand-written page UI. Its suggestion
  order mirrors the app's `src/services/suggestionEngine.js`.

Built on 14 November 2026 from `claude/voice-team-run`, last prediction or
vocabulary change `cdf9cd9`. Nothing is stored or sent; speech prefers a
voice installed on the visitor's device.

## Recorded narration (ElevenLabs)

Made on 14 November 2026 in ElevenLabs (flow `4LicdJZBohuPOOMuO1Xi`),
library voice "Chris - Warm and Calm" (`op1SmctrthoXFtxUlVpA`), model
`eleven_v4` for the narrations and `eleven_multilingual_v2` for the board
phrases (four phrases re-made singly with `eleven_v4`). About 3,600 credits.

- Scripts and transcripts: `_data/narration.yml`, shown under each player by
  `_includes/listen.html`. Narration is in the third person because the voice
  is not Paul's, and each player says so.
- Files: `assets/audio/*.mp3` (mono, 64 kbps) and `assets/audio/phrases/`.
  `_data/voice_phrase_audio.json` maps each phrase (lower case, no
  punctuation) to its file for the Voice board's "Natural voice" option.
- Every clip was transcribed locally (faster-whisper `small.en`) and checked
  against its script before publishing. Re-check after any re-recording.
- No API key is on the site. Credits are spent only when a clip is made.

## Live voice assistant (ElevenLabs agent, Lab page)

Agent `agent_1301m7drw7yfeacsx6dbchsr2wt0` ("Paul McNeill portfolio voice
assistant"), set up on 14 November 2026, voice "Chris - Warm and Calm".

- Answers only from the knowledge-base document "Paul McNeill portfolio
  facts", whose source is `workers/voice-agent/knowledge.md`. Edit that file
  and re-upload it in ElevenLabs when the site changes. It deliberately leaves
  out current client work, credentials and unverified metrics.
- Limits: conversations from paulmartinmcneill.com only (origin allowlist),
  2 at once, 25 a day, 4 minutes each, ends after 30 seconds of silence.
  Audio is not stored; transcripts are kept 30 days. Prompt-injection and
  focus guardrails are on. A simulation test ("Recruiter probes for facts not
  on the site") passed on 14 November 2026.
- Loading: nothing from ElevenLabs loads until the visitor presses "Load the
  voice assistant" (`assets/js/voice-agent.js`). The widget script is
  self-hosted and pinned (`assets/vendor/elevenlabs/`, MIT, v0.26.0). The Lab
  page's CSP allows `*.elevenlabs.io`; no other page does.
- Every conversation spends ElevenLabs credits. Check usage in the ElevenLabs
  dashboard; lower the daily limit there if needed.
