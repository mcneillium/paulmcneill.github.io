---
layout: post
title: "AI-Powered AAC App"
subtitle: "Assistive communication with predictive AI & caregiver insights"
modal-id: project-aac-ai
thumbnail: aac-ai-dashboard.png
img: aac-ai-dashboard.png
gallery_dir: aac-ai
alt: "AAC AI dashboard screenshot"
project-date: 2024-09-01
category: projects
permalink: /projects/ai-aac-app/
redirect_from:
  - /projects/2024/09/01/ai-powered-aac-app/
description: "Assistive communication for non-verbal users with predictive AI and a real-time caregiver dashboard."
impact: "Predictive assistive communication for non-verbal users" # Confirmed by Paul, 2026-11-04
github-url: https://github.com/mcneillium/ai-powered-aac-app
demo-url: /demos/aac-app/
youtube-url:
---

<!-- Styles: tile gallery + viewer -->
<style>
/* Keep the entire modal usable on one screen */
.modal .modal-body { max-height: calc(100vh - 160px); overflow-y: auto; }

/* TILES */
.tile-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 8px;
}
.tile {
  background:#fafafa; border-radius:10px; overflow:hidden; position:relative;
  box-shadow: 0 2px 6px rgba(0,0,0,.08); transition: transform .18s ease, box-shadow .18s ease;
}
.tile:focus-within, .tile:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.18); }
.tile a { display:block; text-decoration:none; outline:0; }
.tile img {
  width:100%; height:180px; object-fit:cover; display:block;
  transition: transform .18s ease;
}
.tile:hover img { transform: scale(1.04); }
.tile .cap {
  position:absolute; left:8px; bottom:8px; right:8px;
  background: rgba(0,0,0,.55); color:#fff; font-size:13px; padding:6px 8px; border-radius:6px;
}

/* Viewer (single modal, custom controls) */
.viewer-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.8);
  display: none; align-items: center; justify-content: center; z-index: 9999;
}
.viewer-backdrop.open { display: flex; }
.viewer {
  position: relative; max-width: min(92vw, 1200px); max-height: 86vh;
  background: #111; border-radius: 10px; overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,.6);
  display:flex; flex-direction:column;
}
.viewer-header {
  display:flex; align-items:center; justify-content:space-between;
  padding:10px 12px; color:#eee; font-size:14px; background:#1b1b1b;
}
.viewer-body { position:relative; flex:1; display:flex; align-items:center; justify-content:center; background:#0f0f0f; }
.viewer-body img { max-width: 100%; max-height: 100%; object-fit: contain; display:block; }
.viewer-caption { color:#eaeaea; background:#151515; font-size:14px; padding:10px 12px; }

/* Controls */
.viewer-btn {
  position:absolute; top:50%; transform: translateY(-50%);
  width:44px; height:44px; border:none; border-radius:50%;
  background: rgba(255,255,255,.1); color:#fff; cursor:pointer;
}
.viewer-btn:hover { background: rgba(255,255,255,.2); }
.viewer-prev { left:10px; }
.viewer-next { right:10px; }
.viewer-close {
  background: transparent; border:none; color:#eee; font-size:20px; line-height:1;
  cursor:pointer; padding:4px 8px;
}

/* Keyboard focus */
.viewer-btn:focus, .viewer-close:focus, .tile a:focus { outline: 2px solid #2c7be5; outline-offset:2px; }

/* Tabs */
.nav-tabs > li > a { padding: 10px 15px; }

/* Small screens: auto height tiles */
@media (max-width: 767px) { .tile img { height: 160px; } }

/* Hide any old carousel-specific blocks if still present */
.portfolio-carousel { display:none !important; }
</style>

### Overview
A modern AAC (Augmentative & Alternative Communication) app that helps non-verbal users express themselves faster.  
It combines **on-device word prediction**, **accessible UI**, and a **caregiver analytics dashboard** for insight-led support.

{% include listen.html key="voice_app" %}

---

### Problem
- AAC tools are often slow and cognitively heavy.
- Caregivers lack visibility on what’s working (or not) during sessions.
- Accessibility (WCAG) and privacy (GDPR) are frequently bolt-ons, not fundamentals.

### Solution
- **Predictive AI** suggests next words/phrases in context; improves with usage.
- **Accessible UI** (high-contrast themes, large touch targets, offline first).
- **Caregiver dashboard**: session logs, vocab usage, time-to-utter metrics.

---

### Key Features
- **Next-word prediction** on the device: an n-gram model plus an opt-in personal layer, with a reason shown for every suggestion.
- **Personal vocab folders** with pictograms; grid size & theme preferences.
- **Caregiver dashboard** (Firebase + charts): top phrases, session durations.
- **WCAG 2.1 AA**: keyboard/switch navigation, ARIA roles, focus states.
- **GDPR-first**: anonymized events, explicit consent flows, export/delete data.

### Architecture
- **Client**: React / React Native (Kiosk mode on tablets)
- **Prediction**: pure JavaScript on the device (trigram model, personal counts, linear reranker); no network calls
- **Storage**: Firebase (Auth, Realtime Database, Cloud Functions)
- **Telemetry**: Minimal, aggregated events; per-user opt-in

---

### Outcomes
{% comment %} TODO: REPLACE (Paul): the pilot figures below (n=7, 35 to 50% faster, +40% satisfaction)
   have no source in the repositories. Confirm them with the pilot records or remove them. {% endcomment %}
- **35–50% faster** average time-to-utter for common phrases (pilot, n=7).
- **+40% caregiver satisfaction** with session clarity (survey).
- Reduced input errors with large targets & latency-friendly cache.

### My Role
- End-to-end build, model integration, WCAG compliance, privacy workflows.
- UX research with caregivers; rapid iteration via weekly pilots.

### Tech Stack
React Native (Expo), React, Material UI, Chart.js, Firebase (Auth, Realtime Database, Cloud Functions, Hosting)

---

{% include voice-playground.html %}

### Try the app

<section class="demo-phone" aria-labelledby="try-voice">
  <div class="demo-phone__text">
    <h4 id="try-voice">Voice, running in your browser</h4>
    <p>This is the current version of the app, built for the web from the
    same code as the Android app. It runs in guest mode: there is no account,
    nothing you type leaves this page, and the cloud features (sync and AI
    explanations) are switched off. Tap words to build a message, then
    <strong>Speak</strong>; speech uses your browser's own voices.</p>
    <p>Try the <strong>Child</strong> and <strong>Adult</strong> modes from the
    menu at the top of the board: every word stays in the same place in both.</p>
    <p class="demo-phone__actions">
      <a class="btn btn-primary" href="mailto:{{ site.email }}?subject=Voice%20AAC%20app%3A%20trial%20request&body=Hello%20Paul%2C%0A%0AI%27d%20like%20to%20request%20a%20trial%20of%20Voice.%0A%0AWho%20it%27s%20for%20(you%2C%20a%20family%20member%2C%20a%20school%20or%20a%20service)%3A%0ANumber%20of%20users%3A%0ADevices%20(Android%2C%20tablet%20or%20browser)%3A%0A">Request a trial</a>
      <a href="{{ '/demos/aac-app/' | relative_url }}" target="_blank" rel="noopener">Open the demo in a new tab</a>
    </p>
  </div>
  <div class="demo-phone__frame" data-demo-frame data-src="{{ '/demos/aac-app/' | relative_url }}">
    <div class="demo-phone__screen" data-demo-screen>
      {% include picture.html src="/img/portfolio/aac-ai/voice-board-adult.png" alt="The Voice board in Adult mode, with the message I want more" class="demo-phone__poster" %}
    </div>
    <button type="button" class="btn btn-primary demo-phone__load" data-demo-load>
      Start the live demo
    </button>
  </div>
</section>

<div class="demo-shots">
  {% include picture.html src="/img/portfolio/aac-ai/voice-board-child.png" alt="Child mode: the same words on larger, colour-coded tiles" %}
  {% include picture.html src="/img/portfolio/aac-ai/voice-phrases.png" alt="Phrases grouped by place, such as Home, Meals and Clinic" %}
  {% include picture.html src="/img/portfolio/aac-ai/voice-personalise.png" alt="Personalise: picture size, colours, speech and suggestions" %}
</div>

### Try the caregiver dashboard

<section class="demo-browser" aria-labelledby="try-dashboard">
  <p id="try-dashboard">The dashboard lets carers and therapists see how each
  person is communicating: activity today, the words and phrases they use most,
  alerts, custom boards and a full activity log. This copy runs on
  <strong>made-up people and data</strong> held in the page, signed in as an
  administrator. You can click through every screen and make changes; nothing
  is saved or sent anywhere, and a reload resets it.</p>
  <div class="demo-browser__frame" data-demo-frame data-title="Caregiver dashboard, live demo with made-up data" data-src="{{ '/demos/aac-dashboard/#/admin' | relative_url }}">
    <div class="demo-browser__bar" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="demo-browser__screen" data-demo-screen>
      {% include picture.html src="/img/portfolio/aac-ai/dashboard-admin-demo.png" alt="The admin dashboard with made-up users, activity and alerts" class="demo-browser__poster" %}
    </div>
    <button type="button" class="btn btn-primary demo-phone__load" data-demo-load>
      Start the dashboard demo
    </button>
  </div>
  <p class="demo-browser__note"><a href="{{ '/demos/aac-dashboard/#/admin' | relative_url }}" target="_blank" rel="noopener">Open the dashboard in a new tab</a> (best on a laptop or desktop).</p>
  <p class="demo-browser__note">Two things are still open between the app and the
  dashboard. The dashboard reads activity logs in an older layout than the app
  now writes, and alerts and favourites are dashboard features the app does not
  yet send data to. The demo shows the dashboard as designed; aligning the two
  is the next piece of work.</p>
  <p><a class="btn btn-outline" href="mailto:{{ site.email }}?subject=Voice%20AAC%20app%3A%20trial%20request&body=Hello%20Paul%2C%0A%0AI%27d%20like%20to%20request%20a%20trial%20of%20Voice.%0A%0AWho%20it%27s%20for%20(you%2C%20a%20family%20member%2C%20a%20school%20or%20a%20service)%3A%0ANumber%20of%20users%3A%0ADevices%20(Android%2C%20tablet%20or%20browser)%3A%0A">Request a trial</a></p>
</section>

### Screens / Media


<div class="tab-content" style="margin-top:15px;">

  <!-- WEB APP (Tile Gallery) -->
  <div role="tabpanel" class="tab-pane fade in active" id="{{ page.modal-id }}-aac-web">
    <h4 class="text-center">Web App Dashboard &amp; Admin</h4>
    <div class="tile-gallery" data-album="{{ page.modal-id }}-aac-web">
      <div class="tile">
        <a href="/img/portfolio/aac-ai/admin_dashboard.png" data-caption="Admin Dashboard" data-index="0">
          <img src="/img/portfolio/aac-ai/admin_dashboard.png" alt="Admin Dashboard" loading="lazy"><div class="cap">Admin Dashboard</div>
        </a>
      </div>
      <div class="tile">
        <a href="/img/portfolio/aac-ai/CaregiverDashboard.png" data-caption="Caregiver Dashboard" data-index="1">
          <img src="/img/portfolio/aac-ai/CaregiverDashboard.png" alt="Caregiver Dashboard" loading="lazy"><div class="cap">Caregiver Dashboard</div>
        </a>
      </div>
      <div class="tile">
        <a href="/img/portfolio/aac-ai/manage_caregivers.png" data-caption="Manage Caregivers" data-index="2">
          <img src="/img/portfolio/aac-ai/manage_caregivers.png" alt="Manage Caregivers" loading="lazy"><div class="cap">Manage Caregivers</div>
        </a>
      </div>
      <div class="tile">
        <a href="/img/portfolio/aac-ai/user_management.png" data-caption="User Management" data-index="3">
          <img src="/img/portfolio/aac-ai/user_management.png" alt="User Management" loading="lazy"><div class="cap">User Management</div>
        </a>
      </div>
      <div class="tile">
        <a href="/img/portfolio/aac-ai/voice_dashboard_login.png" data-caption="Dashboard Login" data-index="4">
          <img src="/img/portfolio/aac-ai/voice_dashboard_login.png" alt="Dashboard Login" loading="lazy"><div class="cap">Dashboard Login</div>
        </a>
      </div>
      <div class="tile">
        <a href="/img/portfolio/aac-ai/Webapp_Signup.png" data-caption="Web App Signup" data-index="5">
          <img src="/img/portfolio/aac-ai/Webapp_Signup.png" alt="Web App Signup" loading="lazy"><div class="cap">Web App Signup</div>
        </a>
      </div>
      <div class="tile">
        <a href="/img/portfolio/aac-ai/CLI_webapp.png" data-caption="CLI Build Output" data-index="6">
          <img src="/img/portfolio/aac-ai/CLI_webapp.png" alt="CLI Build Output" loading="lazy"><div class="cap">CLI Build Output</div>
        </a>
      </div>
      <div class="tile">
        <a href="/img/portfolio/aac-ai/ExpoGo_CLI.png" data-caption="Expo CLI" data-index="7">
          <img src="/img/portfolio/aac-ai/ExpoGo_CLI.png" alt="Expo CLI" loading="lazy"><div class="cap">Expo CLI</div>
        </a>
      </div>
    </div>
  </div>

  <!-- MOBILE APP (Tile Gallery) -->
  <div role="tabpanel" class="tab-pane fade" id="{{ page.modal-id }}-aac-mobile">
    <h4 class="text-center">Mobile App Screens</h4>
    <div class="tile-gallery" data-album="{{ page.modal-id }}-aac-mobile">
      <div class="tile"><a href="/img/portfolio/aac-ai/login_mobile.jpg" data-caption="Login" data-index="0">
        <img src="/img/portfolio/aac-ai/login_mobile.jpg" alt="Login (Mobile)" loading="lazy"><div class="cap">Login</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/signup_mobile.jpg" data-caption="Signup" data-index="1">
        <img src="/img/portfolio/aac-ai/signup_mobile.jpg" alt="Signup (Mobile)" loading="lazy"><div class="cap">Signup</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/sentencebuilderscreen_mobile.jpg" data-caption="Sentence Builder" data-index="2">
        <img src="/img/portfolio/aac-ai/sentencebuilderscreen_mobile.jpg" alt="Sentence Builder (Mobile)" loading="lazy"><div class="cap">Sentence Builder</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/EmotionScreen_mobile.jpg" data-caption="Emotion Screen" data-index="3">
        <img src="/img/portfolio/aac-ai/EmotionScreen_mobile.jpg" alt="Emotion Screen" loading="lazy"><div class="cap">Emotion Screen</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/pictograms_moblie.jpg" data-caption="Pictogram Grid" data-index="4">
        <img src="/img/portfolio/aac-ai/pictograms_moblie.jpg" alt="Pictogram Grid" loading="lazy"><div class="cap">Pictogram Grid</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/CameraScreen_mobile.jpg" data-caption="Camera Captioning" data-index="5">
        <img src="/img/portfolio/aac-ai/CameraScreen_mobile.jpg" alt="Camera Captioning" loading="lazy"><div class="cap">Camera Captioning</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/LiveSceneModeScreen_mobile.jpg" data-caption="Live Scene Mode" data-index="6">
        <img src="/img/portfolio/aac-ai/LiveSceneModeScreen_mobile.jpg" alt="Live Scene Mode" loading="lazy"><div class="cap">Live Scene Mode</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/profilescreen.jpg" data-caption="Profile &amp; Settings" data-index="7">
        <img src="/img/portfolio/aac-ai/profilescreen.jpg" alt="Profile & Settings" loading="lazy"><div class="cap">Profile &amp; Settings</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/loading_screen_mobile.jpg" data-caption="Loading Screen" data-index="8">
        <img src="/img/portfolio/aac-ai/loading_screen_mobile.jpg" alt="Loading Screen" loading="lazy"><div class="cap">Loading Screen</div>
      </a></div>
    </div>
  </div>

  <!-- FIREBASE (Tile Gallery) -->
  <div role="tabpanel" class="tab-pane fade" id="{{ page.modal-id }}-aac-firebase">
    <h4 class="text-center">Firebase Backend &amp; Data</h4>
    <div class="tile-gallery" data-album="{{ page.modal-id }}-aac-firebase">
      <div class="tile"><a href="/img/portfolio/aac-ai/firebase_auth.png" data-caption="Firebase Authentication" data-index="0">
        <img src="/img/portfolio/aac-ai/firebase_auth.png" alt="Firebase Authentication" loading="lazy"><div class="cap">Firebase Authentication</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/firebase_database.png" data-caption="Realtime Database" data-index="1">
        <img src="/img/portfolio/aac-ai/firebase_database.png" alt="Firebase Realtime Database" loading="lazy"><div class="cap">Realtime Database</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/realtimedatabase_rules.png" data-caption="Realtime DB Rules" data-index="2">
        <img src="/img/portfolio/aac-ai/realtimedatabase_rules.png" alt="Realtime Database Rules" loading="lazy"><div class="cap">Realtime DB Rules</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/userlogs_firebase.png" data-caption="User Logs" data-index="3">
        <img src="/img/portfolio/aac-ai/userlogs_firebase.png" alt="User Logs Node" loading="lazy"><div class="cap">User Logs</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/users_firebase.png" data-caption="Users" data-index="4">
        <img src="/img/portfolio/aac-ai/users_firebase.png" alt="Users Node" loading="lazy"><div class="cap">Users</div>
      </a></div>
      <div class="tile"><a href="/img/portfolio/aac-ai/caregivers_firebase.png" data-caption="Caregivers" data-index="5">
        <img src="/img/portfolio/aac-ai/caregivers_firebase.png" alt="Caregivers Node" loading="lazy"><div class="cap">Caregivers</div>
      </a></div>
    </div>
  </div>

</div>

<!-- Single shared lightbox viewer -->
<div class="viewer-backdrop" id="{{ page.modal-id }}-viewer" aria-hidden="true" role="dialog" aria-label="Image viewer">
  <div class="viewer" role="document">
    <div class="viewer-header">
      <div><span id="{{ page.modal-id }}-viewer-pos">1/1</span></div>
      <button class="viewer-close" type="button" aria-label="Close viewer" id="{{ page.modal-id }}-viewer-close">✕</button>
    </div>
    <div class="viewer-body" id="{{ page.modal-id }}-viewer-body">
      <button class="viewer-btn viewer-prev" type="button" aria-label="Previous image" id="{{ page.modal-id }}-viewer-prev">‹</button>
      <img id="{{ page.modal-id }}-viewer-img" alt="">
      <button class="viewer-btn viewer-next" type="button" aria-label="Next image" id="{{ page.modal-id }}-viewer-next">›</button>
    </div>
    <div class="viewer-caption" id="{{ page.modal-id }}-viewer-cap">Caption</div>
  </div>
</div>

<!-- Minimal JS: album-aware viewer with keyboard + touch (no jQuery) -->
<script src="/assets/js/aac-viewer.js" defer></script>

---

### Notes on Privacy & Safety
- Anonymization by default, per-user data export, short retention windows.
- Clear consent and session visibility for caregivers and admins.
