---
layout: post
title: "AI-Powered AAC App"
subtitle: "Assistive communication with predictive AI & caregiver insights"
modal-id: project-aac-ai
thumbnail: aac-ai-dashboard.png
img: aac-ai-dashboard.png
alt: "AAC AI dashboard screenshot"
project-date: 2024-09-01
category: projects
description: "Assistive communication for non-verbal users with predictive AI and a real-time caregiver dashboard."
github-url:
youtube-url:
---

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
    <a href="#aac-web" aria-controls="aac-web" role="tab" data-toggle="tab">Web App</a>
  </li>
  <li role="presentation">
    <a href="#aac-mobile" aria-controls="aac-mobile" role="tab" data-toggle="tab">Mobile App</a>
  </li>
  <li role="presentation">
    <a href="#aac-firebase" aria-controls="aac-firebase" role="tab" data-toggle="tab">Firebase</a>
  </li>
</ul>

<div class="tab-content" style="margin-top:15px;">

  <!-- WEB APP -->
  <div role="tabpanel" class="tab-pane fade in active" id="aac-web">
    <h4 class="text-center">Web App Dashboard &amp; Admin</h4>
    <div id="carousel-aac-web" class="carousel slide portfolio-carousel" data-ride="carousel" data-interval="6000" aria-label="Web App screenshots">
      <ol class="carousel-indicators">
        <li data-target="#carousel-aac-web" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-aac-web" data-slide-to="1"></li>
        <li data-target="#carousel-aac-web" data-slide-to="2"></li>
        <li data-target="#carousel-aac-web" data-slide-to="3"></li>
        <li data-target="#carousel-aac-web" data-slide-to="4"></li>
        <li data-target="#carousel-aac-web" data-slide-to="5"></li>
        <li data-target="#carousel-aac-web" data-slide-to="6"></li>
        <li data-target="#carousel-aac-web" data-slide-to="7"></li>
      </ol>

      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="img/portfolio/aac-ai/admin_dashboard.png" alt="Admin Dashboard" class="img-responsive">
          <div class="carousel-caption"><h4>Admin Dashboard</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/CaregiverDashboard.png" alt="Caregiver Dashboard" class="img-responsive">
          <div class="carousel-caption"><h4>Caregiver Dashboard</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/manage_caregivers.png" alt="Manage Caregivers" class="img-responsive">
          <div class="carousel-caption"><h4>Manage Caregivers</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/user_management.png" alt="User Management" class="img-responsive">
          <div class="carousel-caption"><h4>User Management</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/voice_dashboard_login.png" alt="Dashboard Login" class="img-responsive">
          <div class="carousel-caption"><h4>Dashboard Login</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/Webapp_Signup.png" alt="Web App Signup" class="img-responsive">
          <div class="carousel-caption"><h4>Web App Signup</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/CLI_webapp.png" alt="CLI Build Output" class="img-responsive">
          <div class="carousel-caption"><h4>CLI Build Output</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/ExpoGo_CLI.png" alt="Expo CLI" class="img-responsive">
          <div class="carousel-caption"><h4>Expo CLI</h4></div>
        </div>
      </div>

      <a class="left carousel-control" href="#carousel-aac-web" role="button" data-slide="prev" aria-label="Previous slide">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#carousel-aac-web" role="button" data-slide="next" aria-label="Next slide">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
  </div>

  <!-- MOBILE APP -->
  <div role="tabpanel" class="tab-pane fade" id="aac-mobile">
    <h4 class="text-center">Mobile App Screens</h4>
    <div id="carousel-aac-mobile" class="carousel slide portfolio-carousel" data-ride="carousel" data-interval="6000" aria-label="Mobile App screenshots">
      <ol class="carousel-indicators">
        <li data-target="#carousel-aac-mobile" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-aac-mobile" data-slide-to="1"></li>
        <li data-target="#carousel-aac-mobile" data-slide-to="2"></li>
        <li data-target="#carousel-aac-mobile" data-slide-to="3"></li>
        <li data-target="#carousel-aac-mobile" data-slide-to="4"></li>
        <li data-target="#carousel-aac-mobile" data-slide-to="5"></li>
        <li data-target="#carousel-aac-mobile" data-slide-to="6"></li>
        <li data-target="#carousel-aac-mobile" data-slide-to="7"></li>
        <li data-target="#carousel-aac-mobile" data-slide-to="8"></li>
      </ol>

      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="img/portfolio/aac-ai/login_mobile.jpg" alt="Login (Mobile)" class="img-responsive">
          <div class="carousel-caption"><h4>Login</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/signup_mobile.jpg" alt="Signup (Mobile)" class="img-responsive">
          <div class="carousel-caption"><h4>Signup</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/sentencebuilderscreen_mobile.jpg" alt="Sentence Builder (Mobile)" class="img-responsive">
          <div class="carousel-caption"><h4>Sentence Builder</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/EmotionScreen_mobile.jpg" alt="Emotion Screen" class="img-responsive">
          <div class="carousel-caption"><h4>Emotion Screen</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/pictograms_mobile.jpg" alt="Pictogram Grid" class="img-responsive">
          <div class="carousel-caption"><h4>Pictogram Grid</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/CameraScreen_mobile.jpg" alt="Camera Captioning" class="img-responsive">
          <div class="carousel-caption"><h4>Camera Captioning</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/LiveSceneModeScreen_mobile.jpg" alt="Live Scene Mode" class="img-responsive">
          <div class="carousel-caption"><h4>Live Scene Mode</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/profilescreen.jpg" alt="Profile &amp; Settings" class="img-responsive">
          <div class="carousel-caption"><h4>Profile &amp; Settings</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/loading_screen_mobile.jpg" alt="Loading Screen" class="img-responsive">
          <div class="carousel-caption"><h4>Loading Screen</h4></div>
        </div>
      </div>

      <a class="left carousel-control" href="#carousel-aac-mobile" role="button" data-slide="prev" aria-label="Previous slide">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#carousel-aac-mobile" role="button" data-slide="next" aria-label="Next slide">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
  </div>

  <!-- FIREBASE -->
  <div role="tabpanel" class="tab-pane fade" id="aac-firebase">
    <h4 class="text-center">Firebase Backend &amp; Data</h4>
    <div id="carousel-aac-firebase" class="carousel slide portfolio-carousel" data-ride="carousel" data-interval="6000" aria-label="Firebase screenshots">
      <ol class="carousel-indicators">
        <li data-target="#carousel-aac-firebase" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-aac-firebase" data-slide-to="1"></li>
        <li data-target="#carousel-aac-firebase" data-slide-to="2"></li>
        <li data-target="#carousel-aac-firebase" data-slide-to="3"></li>
        <li data-target="#carousel-aac-firebase" data-slide-to="4"></li>
        <li data-target="#carousel-aac-firebase" data-slide-to="5"></li>
      </ol>

      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="img/portfolio/aac-ai/firebase_auth.png" alt="Firebase Authentication" class="img-responsive">
          <div class="carousel-caption"><h4>Firebase Authentication</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/firebase_database.png" alt="Firebase Realtime Database" class="img-responsive">
          <div class="carousel-caption"><h4>Realtime Database</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/realtimedatabase_rules.png" alt="Realtime Database Rules" class="img-responsive">
          <div class="carousel-caption"><h4>Realtime DB Rules</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/userlogs_firebase.png" alt="User Logs Node" class="img-responsive">
          <div class="carousel-caption"><h4>User Logs</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/users_firebase.png" alt="Users Node" class="img-responsive">
          <div class="carousel-caption"><h4>Users</h4></div>
        </div>
        <div class="item">
          <img src="img/portfolio/aac-ai/caregivers_firebase.png" alt="Caregivers Node" class="img-responsive">
          <div class="carousel-caption"><h4>Caregivers</h4></div>
        </div>
      </div>

      <a class="left carousel-control" href="#carousel-aac-firebase" role="button" data-slide="prev" aria-label="Previous slide">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#carousel-aac-firebase" role="button" data-slide="next" aria-label="Next slide">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
  </div>

</div>

<!-- Uniform slide sizing + caption legibility -->
<style>
/* Fixed viewport so slides don't jump */
.portfolio-carousel { position: relative; padding-bottom: 28px; overflow: hidden; }
.portfolio-carousel .carousel-inner { height: 520px; }
.portfolio-carousel .carousel-inner > .item {
  height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: #fafafa;
}
/* No crop/zoom, keep aspect */
.portfolio-carousel .carousel-inner > .item > img {
  max-height: 100%; width: auto; height: auto; object-fit: contain;
  display: block; margin: 0 auto; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,.08);
}
/* Indicators & captions */
.portfolio-carousel .carousel-indicators { bottom: 6px; }
.portfolio-carousel .carousel-caption {
  background: rgba(0,0,0,0.45); border-radius: 6px; padding: 8px 12px; bottom: 16px; z-index: 3;
}
/* Controls focus ring */
.portfolio-carousel .left.carousel-control:focus,
.portfolio-carousel .right.carousel-control:focus { outline: 2px solid #2c3e50; }
/* Tabs */
.nav-tabs > li > a { padding: 10px 15px; }
</style>

<!-- Pause hidden carousels; cycle the active one -->
<script>
  (function ($) {
    // Start Web carousel when the modal opens
    $('#{{ page.modal-id | default: "project-aac-ai" }}').on('shown.bs.modal', function () {
      $('#carousel-aac-web').carousel('cycle');
    });

    // Pause all when the modal closes
    $('#{{ page.modal-id | default: "project-aac-ai" }}').on('hide.bs.modal', function () {
      $('#carousel-aac-web, #carousel-aac-mobile, #carousel-aac-firebase').carousel('pause');
    });

    // On tab change: pause others, cycle current
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      $('#carousel-aac-web, #carousel-aac-mobile, #carousel-aac-firebase').carousel('pause');
      var target = $(e.target).attr('href'); // '#aac-web' | '#aac-mobile' | '#aac-firebase'
      $(target).find('.carousel').carousel('cycle');
    });
  })(jQuery);
</script>

---

### Notes on Privacy & Safety
- Anonymization by default, per-user data export, short retention windows.
- Clear consent and session visibility for caregivers and admins.
