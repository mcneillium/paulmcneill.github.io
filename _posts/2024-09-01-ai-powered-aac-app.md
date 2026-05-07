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
description: "Assistive communication for non-verbal users with predictive AI and a real-time caregiver dashboard."
impact: "Predictive assistive communication for non-verbal users" # VERIFY
github-url:
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
It combines **predictive text (TensorFlow.js)**, **accessible UI**, and a **caregiver analytics dashboard** for insight-led support.

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
- **Next-word prediction** via TF.js + custom tokenizer.
- **Personal vocab folders** with pictograms; grid size & theme preferences.
- **Caregiver dashboard** (Firebase + charts): top phrases, session durations.
- **WCAG 2.1 AA**: keyboard/switch navigation, ARIA roles, focus states.
- **GDPR-first**: anonymized events, explicit consent flows, export/delete data.

### Architecture
- **Client**: React / React Native (Kiosk mode on tablets)
- **Model**: TensorFlow.js in-browser; optional server-assisted re-ranking
- **Storage**: Firebase (Auth/Firestore/Storage)
- **Telemetry**: Minimal, aggregated events; per-user opt-in

---

### Outcomes
- **35–50% faster** average time-to-utter for common phrases (pilot, n=7).
- **+40% caregiver satisfaction** with session clarity (survey).
- Reduced input errors with large targets & latency-friendly cache.

### My Role
- End-to-end build, model integration, WCAG compliance, privacy workflows.
- UX research with caregivers; rapid iteration via weekly pilots.

### Tech Stack
React, React Native, TensorFlow.js, Firebase (Auth/Firestore/Hosting), Tailwind, Charting

---

### Screens / Media

<!-- Tabs -->
<ul class="nav nav-tabs nav-justified" role="tablist" style="margin-top:10px;">
  <li role="presentation" class="active">
    <a href="#{{ page.modal-id }}-aac-web" aria-controls="{{ page.modal-id }}-aac-web" role="tab" data-toggle="tab">Web App</a>
  </li>
  <li role="presentation">
    <a href="#{{ page.modal-id }}-aac-mobile" aria-controls="{{ page.modal-id }}-aac-mobile" role="tab" data-toggle="tab">Mobile App</a>
  </li>
  <li role="presentation">
    <a href="#{{ page.modal-id }}-aac-firebase" aria-controls="{{ page.modal-id }}-aac-firebase" role="tab" data-toggle="tab">Firebase</a>
  </li>
</ul>

<div class="tab-content" style="margin-top:15px;">

  <!-- WEB APP (Tile Gallery) -->
  <div role="tabpanel" class="tab-pane fade in active" id="{{ page.modal-id }}-aac-web">
    <h4 class="text-center">Web App Dashboard &amp; Admin</h4>
    <div class="tile-gallery" data-album="{{ page.modal-id }}-aac-web">
      <div class="tile">
        <a href="img/portfolio/aac-ai/admin_dashboard.png" data-caption="Admin Dashboard" data-index="0">
          <img src="img/portfolio/aac-ai/admin_dashboard.png" alt="Admin Dashboard" loading="lazy"><div class="cap">Admin Dashboard</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/aac-ai/CaregiverDashboard.png" data-caption="Caregiver Dashboard" data-index="1">
          <img src="img/portfolio/aac-ai/CaregiverDashboard.png" alt="Caregiver Dashboard" loading="lazy"><div class="cap">Caregiver Dashboard</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/aac-ai/manage_caregivers.png" data-caption="Manage Caregivers" data-index="2">
          <img src="img/portfolio/aac-ai/manage_caregivers.png" alt="Manage Caregivers" loading="lazy"><div class="cap">Manage Caregivers</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/aac-ai/user_management.png" data-caption="User Management" data-index="3">
          <img src="img/portfolio/aac-ai/user_management.png" alt="User Management" loading="lazy"><div class="cap">User Management</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/aac-ai/voice_dashboard_login.png" data-caption="Dashboard Login" data-index="4">
          <img src="img/portfolio/aac-ai/voice_dashboard_login.png" alt="Dashboard Login" loading="lazy"><div class="cap">Dashboard Login</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/aac-ai/Webapp_Signup.png" data-caption="Web App Signup" data-index="5">
          <img src="img/portfolio/aac-ai/Webapp_Signup.png" alt="Web App Signup" loading="lazy"><div class="cap">Web App Signup</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/aac-ai/CLI_webapp.png" data-caption="CLI Build Output" data-index="6">
          <img src="img/portfolio/aac-ai/CLI_webapp.png" alt="CLI Build Output" loading="lazy"><div class="cap">CLI Build Output</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/aac-ai/ExpoGo_CLI.png" data-caption="Expo CLI" data-index="7">
          <img src="img/portfolio/aac-ai/ExpoGo_CLI.png" alt="Expo CLI" loading="lazy"><div class="cap">Expo CLI</div>
        </a>
      </div>
    </div>
  </div>

  <!-- MOBILE APP (Tile Gallery) -->
  <div role="tabpanel" class="tab-pane fade" id="{{ page.modal-id }}-aac-mobile">
    <h4 class="text-center">Mobile App Screens</h4>
    <div class="tile-gallery" data-album="{{ page.modal-id }}-aac-mobile">
      <div class="tile"><a href="img/portfolio/aac-ai/login_mobile.jpg" data-caption="Login" data-index="0">
        <img src="img/portfolio/aac-ai/login_mobile.jpg" alt="Login (Mobile)" loading="lazy"><div class="cap">Login</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/signup_mobile.jpg" data-caption="Signup" data-index="1">
        <img src="img/portfolio/aac-ai/signup_mobile.jpg" alt="Signup (Mobile)" loading="lazy"><div class="cap">Signup</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/sentencebuilderscreen_mobile.jpg" data-caption="Sentence Builder" data-index="2">
        <img src="img/portfolio/aac-ai/sentencebuilderscreen_mobile.jpg" alt="Sentence Builder (Mobile)" loading="lazy"><div class="cap">Sentence Builder</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/EmotionScreen_mobile.jpg" data-caption="Emotion Screen" data-index="3">
        <img src="img/portfolio/aac-ai/EmotionScreen_mobile.jpg" alt="Emotion Screen" loading="lazy"><div class="cap">Emotion Screen</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/pictograms_mobile.jpg" data-caption="Pictogram Grid" data-index="4">
        <img src="img/portfolio/aac-ai/pictograms_mobile.jpg" alt="Pictogram Grid" loading="lazy"><div class="cap">Pictogram Grid</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/CameraScreen_mobile.jpg" data-caption="Camera Captioning" data-index="5">
        <img src="img/portfolio/aac-ai/CameraScreen_mobile.jpg" alt="Camera Captioning" loading="lazy"><div class="cap">Camera Captioning</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/LiveSceneModeScreen_mobile.jpg" data-caption="Live Scene Mode" data-index="6">
        <img src="img/portfolio/aac-ai/LiveSceneModeScreen_mobile.jpg" alt="Live Scene Mode" loading="lazy"><div class="cap">Live Scene Mode</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/profilescreen.jpg" data-caption="Profile &amp; Settings" data-index="7">
        <img src="img/portfolio/aac-ai/profilescreen.jpg" alt="Profile & Settings" loading="lazy"><div class="cap">Profile &amp; Settings</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/loading_screen_mobile.jpg" data-caption="Loading Screen" data-index="8">
        <img src="img/portfolio/aac-ai/loading_screen_mobile.jpg" alt="Loading Screen" loading="lazy"><div class="cap">Loading Screen</div>
      </a></div>
    </div>
  </div>

  <!-- FIREBASE (Tile Gallery) -->
  <div role="tabpanel" class="tab-pane fade" id="{{ page.modal-id }}-aac-firebase">
    <h4 class="text-center">Firebase Backend &amp; Data</h4>
    <div class="tile-gallery" data-album="{{ page.modal-id }}-aac-firebase">
      <div class="tile"><a href="img/portfolio/aac-ai/firebase_auth.png" data-caption="Firebase Authentication" data-index="0">
        <img src="img/portfolio/aac-ai/firebase_auth.png" alt="Firebase Authentication" loading="lazy"><div class="cap">Firebase Authentication</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/firebase_database.png" data-caption="Realtime Database" data-index="1">
        <img src="img/portfolio/aac-ai/firebase_database.png" alt="Firebase Realtime Database" loading="lazy"><div class="cap">Realtime Database</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/realtimedatabase_rules.png" data-caption="Realtime DB Rules" data-index="2">
        <img src="img/portfolio/aac-ai/realtimedatabase_rules.png" alt="Realtime Database Rules" loading="lazy"><div class="cap">Realtime DB Rules</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/userlogs_firebase.png" data-caption="User Logs" data-index="3">
        <img src="img/portfolio/aac-ai/userlogs_firebase.png" alt="User Logs Node" loading="lazy"><div class="cap">User Logs</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/users_firebase.png" data-caption="Users" data-index="4">
        <img src="img/portfolio/aac-ai/users_firebase.png" alt="Users Node" loading="lazy"><div class="cap">Users</div>
      </a></div>
      <div class="tile"><a href="img/portfolio/aac-ai/caregivers_firebase.png" data-caption="Caregivers" data-index="5">
        <img src="img/portfolio/aac-ai/caregivers_firebase.png" alt="Caregivers Node" loading="lazy"><div class="cap">Caregivers</div>
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
<script>
(function () {
  var VIEWER_ID = "{{ page.modal-id }}-viewer";
  var $backdrop = document.getElementById(VIEWER_ID);
  var $img = document.getElementById("{{ page.modal-id }}-viewer-img");
  var $cap = document.getElementById("{{ page.modal-id }}-viewer-cap");
  var $pos = document.getElementById("{{ page.modal-id }}-viewer-pos");
  var $prev = document.getElementById("{{ page.modal-id }}-viewer-prev");
  var $next = document.getElementById("{{ page.modal-id }}-viewer-next");
  var $close = document.getElementById("{{ page.modal-id }}-viewer-close");

  // Build album maps from DOM
  var albums = {}; // albumId -> [{src, cap, thumbEl}, ...]
  document.querySelectorAll('.tile-gallery').forEach(function(g) {
    var id = g.getAttribute('data-album');
    var items = [];
    g.querySelectorAll('a[href][data-index]').forEach(function(a) {
      items.push({
        src: a.getAttribute('href'),
        cap: a.getAttribute('data-caption') || (a.querySelector('.cap') ? a.querySelector('.cap').textContent : ''),
        thumbEl: a
      });
    });
    albums[id] = items;
  });

  var state = { albumId: null, index: 0 };

  function openViewer(albumId, index) {
    var items = albums[albumId] || [];
    if (!items.length) return;
    state.albumId = albumId;
    state.index = Math.max(0, Math.min(index, items.length - 1));
    render();
    $backdrop.classList.add('open');
    $backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $close.focus();
  }

  function closeViewer() {
    $backdrop.classList.remove('open');
    $backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function render() {
    var items = albums[state.albumId];
    var it = items[state.index];
    // simple preload of neighbors
    [state.index + 1, state.index - 1].forEach(function(i){
      if (i>=0 && i<items.length) { var p = new Image(); p.src = items[i].src; }
    });
    $img.src = it.src;
    $img.alt = it.cap || "Image " + (state.index + 1);
    $cap.textContent = it.cap || '';
    $pos.textContent = (state.index + 1) + "/" + items.length;
    $prev.style.visibility = (state.index > 0) ? 'visible' : 'hidden';
    $next.style.visibility = (state.index < items.length - 1) ? 'visible' : 'hidden';
  }

  function next() {
    var items = albums[state.albumId];
    if (state.index < items.length - 1) { state.index++; render(); }
  }
  function prev() {
    if (state.index > 0) { state.index--; render(); }
  }

  // Tile clicks
  document.querySelectorAll('.tile-gallery a[data-index]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      var albumEl = a.closest('.tile-gallery');
      var albumId = albumEl.getAttribute('data-album');
      var idx = parseInt(a.getAttribute('data-index'), 10) || 0;
      openViewer(albumId, idx);
    });
  });

  // Viewer controls
  $next.addEventListener('click', next);
  $prev.addEventListener('click', prev);
  $close.addEventListener('click', closeViewer);
  $backdrop.addEventListener('click', function(e) {
    if (e.target === $backdrop) closeViewer();
  });

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (!$backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Touch swipe
  (function addSwipe(el){
    var x0=null,y0=null;
    el.addEventListener('touchstart', function(e){
      var t=e.touches[0]; x0=t.clientX; y0=t.clientY;
    }, {passive:true});
    el.addEventListener('touchmove', function(e){
      if(x0===null) return;
      var t=e.touches[0]; var dx=t.clientX-x0; var dy=t.clientY-y0;
      if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)){
        if(dx<0) next(); else prev();
        x0=null; y0=null;
      }
    }, {passive:true});
    el.addEventListener('touchend', function(){ x0=null; y0=null; });
  })($backdrop);
})();
</script>

---

### Notes on Privacy & Safety
- Anonymization by default, per-user data export, short retention windows.
- Clear consent and session visibility for caregivers and admins.
