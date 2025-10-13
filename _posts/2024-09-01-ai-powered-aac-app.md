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

<!-- Scoped styles -->
<style>
/* Keep the entire modal usable on one screen */
.modal .modal-body {
  max-height: calc(100vh - 160px);
  overflow-y: auto;
}

/* Unified carousel viewport: fixed to the screen, not content */
.portfolio-carousel {
  position: relative;
  height: 60vh;              /* one window */
  max-height: 620px;         /* cap on large screens */
  min-height: 360px;         /* floor on small screens */
  overflow: hidden;          /* children can't increase height */
  padding-bottom: 28px;      /* space for indicators */
}

/* Indicators stay inside */
.portfolio-carousel .carousel-indicators { bottom: 6px; }

/* Slides fill the viewport without changing it */
.portfolio-carousel .carousel-inner,
.portfolio-carousel .carousel-inner > .item { height: 100%; }
.portfolio-carousel .carousel-inner > .item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}

/* Images are contained (no crop, no stretch) */
.portfolio-carousel .carousel-inner > .item img {
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,.08);
  transition: transform .2s ease, box-shadow .2s ease;
  transform-origin: center center;
}

/* Gentle zoom that does not overflow layout */
.zoom-wrap {
  display: inline-block;
  position: relative;
  overflow: hidden; /* prevent zoom from spilling and growing the page */
}
.zoom-wrap:hover img,
.zoom-wrap:focus img {
  transform: scale(1.15);
  box-shadow: 0 8px 24px rgba(0,0,0,.25);
  z-index: 1;
}

/* Caption overlays; never pushes height */
.portfolio-carousel .carousel-caption {
  background: rgba(0,0,0,0.45);
  border-radius: 6px;
  padding: 8px 12px;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  max-width: 85%;
  z-index: 2;
}

/* Controls accessibility focus ring */
.portfolio-carousel .left.carousel-control:focus,
.portfolio-carousel .right.carousel-control:focus { outline: 2px solid #2c3e50; }

/* Tabs */
.nav-tabs > li > a { padding: 10px 15px; }

/* Small screens: slightly shorter viewport */
@media (max-width: 767px) {
  .portfolio-carousel {
    height: 54vh;
    min-height: 300px;
  }
}
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

  <!-- WEB APP -->
  <div role="tabpanel" class="tab-pane fade in active" id="{{ page.modal-id }}-aac-web">
    <h4 class="text-center">Web App Dashboard &amp; Admin</h4>
    <div id="{{ page.modal-id }}-carousel-aac-web" class="carousel slide portfolio-carousel" aria-label="Web App screenshots">
      <ol class="carousel-indicators">
        <li data-target="#{{ page.modal-id }}-carousel-aac-web" data-slide-to="0" class="active"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-web" data-slide-to="1"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-web" data-slide-to="2"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-web" data-slide-to="3"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-web" data-slide-to="4"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-web" data-slide-to="5"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-web" data-slide-to="6"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-web" data-slide-to="7"></li>
      </ol>

      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/admin_dashboard.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/admin_dashboard.png" alt="Admin Dashboard" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Admin Dashboard</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/CaregiverDashboard.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/CaregiverDashboard.png" alt="Caregiver Dashboard" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Caregiver Dashboard</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/manage_caregivers.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/manage_caregivers.png" alt="Manage Caregivers" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Manage Caregivers</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/user_management.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/user_management.png" alt="User Management" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>User Management</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/voice_dashboard_login.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/voice_dashboard_login.png" alt="Dashboard Login" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Dashboard Login</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/Webapp_Signup.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/Webapp_Signup.png" alt="Web App Signup" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Web App Signup</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/CLI_webapp.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/CLI_webapp.png" alt="CLI Build Output" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>CLI Build Output</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/ExpoGo_CLI.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/ExpoGo_CLI.png" alt="Expo CLI" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Expo CLI</h4></div>
        </div>
      </div>

      <a class="left carousel-control" href="#{{ page.modal-id }}-carousel-aac-web" role="button" data-slide="prev" aria-label="Previous slide">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#{{ page.modal-id }}-carousel-aac-web" role="button" data-slide="next" aria-label="Next slide">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
  </div>

  <!-- MOBILE APP -->
  <div role="tabpanel" class="tab-pane fade" id="{{ page.modal-id }}-aac-mobile">
    <h4 class="text-center">Mobile App Screens</h4>
    <div id="{{ page.modal-id }}-carousel-aac-mobile" class="carousel slide portfolio-carousel" aria-label="Mobile App screenshots">
      <ol class="carousel-indicators">
        <li data-target="#{{ page.modal-id }}-carousel-aac-mobile" data-slide-to="0" class="active"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-mobile" data-slide-to="1"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-mobile" data-slide-to="2"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-mobile" data-slide-to="3"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-mobile" data-slide-to="4"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-mobile" data-slide-to="5"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-mobile" data-slide-to="6"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-mobile" data-slide-to="7"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-mobile" data-slide-to="8"></li>
      </ol>

      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/login_mobile.jpg" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/login_mobile.jpg" alt="Login (Mobile)" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Login</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/signup_mobile.jpg" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/signup_mobile.jpg" alt="Signup (Mobile)" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Signup</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/sentencebuilderscreen_mobile.jpg" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/sentencebuilderscreen_mobile.jpg" alt="Sentence Builder (Mobile)" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Sentence Builder</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/EmotionScreen_mobile.jpg" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/EmotionScreen_mobile.jpg" alt="Emotion Screen" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Emotion Screen</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/pictograms_mobile.jpg" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/pictograms_mobile.jpg" alt="Pictogram Grid" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Pictogram Grid</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/CameraScreen_mobile.jpg" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/CameraScreen_mobile.jpg" alt="Camera Captioning" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Camera Captioning</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/LiveSceneModeScreen_mobile.jpg" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/LiveSceneModeScreen_mobile.jpg" alt="Live Scene Mode" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Live Scene Mode</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/profilescreen.jpg" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/profilescreen.jpg" alt="Profile &amp; Settings" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Profile &amp; Settings</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/loading_screen_mobile.jpg" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/loading_screen_mobile.jpg" alt="Loading Screen" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Loading Screen</h4></div>
        </div>
      </div>

      <a class="left carousel-control" href="#{{ page.modal-id }}-carousel-aac-mobile" role="button" data-slide="prev" aria-label="Previous slide">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#{{ page.modal-id }}-carousel-aac-mobile" role="button" data-slide="next" aria-label="Next slide">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
  </div>

  <!-- FIREBASE -->
  <div role="tabpanel" class="tab-pane fade" id="{{ page.modal-id }}-aac-firebase">
    <h4 class="text-center">Firebase Backend &amp; Data</h4>
    <div id="{{ page.modal-id }}-carousel-aac-firebase" class="carousel slide portfolio-carousel" aria-label="Firebase screenshots">
      <ol class="carousel-indicators">
        <li data-target="#{{ page.modal-id }}-carousel-aac-firebase" data-slide-to="0" class="active"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-firebase" data-slide-to="1"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-firebase" data-slide-to="2"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-firebase" data-slide-to="3"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-firebase" data-slide-to="4"></li>
        <li data-target="#{{ page.modal-id }}-carousel-aac-firebase" data-slide-to="5"></li>
      </ol>

      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/firebase_auth.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/firebase_auth.png" alt="Firebase Authentication" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Firebase Authentication</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/firebase_database.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/firebase_database.png" alt="Firebase Realtime Database" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Realtime Database</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/realtimedatabase_rules.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/realtimedatabase_rules.png" alt="Realtime Database Rules" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Realtime DB Rules</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/userlogs_firebase.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/userlogs_firebase.png" alt="User Logs Node" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>User Logs</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/users_firebase.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/users_firebase.png" alt="Users Node" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Users</h4></div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/aac-ai/caregivers_firebase.png" target="_blank" rel="noopener">
            <img src="img/portfolio/aac-ai/caregivers_firebase.png" alt="Caregivers Node" class="img-responsive">
          </a>
          <div class="carousel-caption"><h4>Caregivers</h4></div>
        </div>
      </div>

      <a class="left carousel-control" href="#{{ page.modal-id }}-carousel-aac-firebase" role="button" data-slide="prev" aria-label="Previous slide">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#{{ page.modal-id }}-carousel-aac-firebase" role="button" data-slide="next" aria-label="Next slide">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
  </div>

</div>

<!-- Init once; pause hidden; cycle active (prevents reset to slide 1) -->
<script>
  (function ($) {
    // Carousels in this modal
    var ids = [
      '#{{ page.modal-id }}-carousel-aac-web',
      '#{{ page.modal-id }}-carousel-aac-mobile',
      '#{{ page.modal-id }}-carousel-aac-firebase'
    ];
    var $cars = $(ids.join(','));

    // Initialize once (no data-ride attribute to avoid re-triggers)
    $cars.carousel({ interval: 6000, pause: 'hover', wrap: true });

    function cycleOnly($el) {
      $cars.carousel('pause');
      if ($el && $el.length) { $el.carousel('cycle'); }
    }

    // Determine modal selector (common bootstrap portfolio templates use 'portfolioModal{{ id }}')
    var modalSelPrimary = '#portfolioModal{{ page.modal-id | default: "project-aac-ai" }}';
    var modalSelFallback = '#{{ page.modal-id | default: "project-aac-ai" }}';
    var $modal = $(modalSelPrimary);
    if (!$modal.length) { $modal = $(modalSelFallback); }

    // When the modal opens, cycle whichever tab pane is visible
    $modal.on('shown.bs.modal', function () {
      var $active = $('.tab-pane.in.active', this).find('.carousel');
      if (!$active.length) { $active = $('#{{ page.modal-id }}-aac-web .carousel'); } // fallback
      cycleOnly($active);
      // nudge images to recalc within fixed viewport
      $active.find('.item.active img').trigger('load');
    });

    // Pause all when the modal closes
    $modal.on('hide.bs.modal', function () {
      $cars.carousel('pause');
    });

    // On tab change: don't re-init; just switch which one cycles
    $('a[data-toggle="tab"][href^="#{{ page.modal-id }}-aac-"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr('href');
      cycleOnly($(target).find('.carousel'));
    });

    // Handle viewport changes (orientation / resize)
    var resizeTimer;
    $(window).on('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){
        // CSS handles height; this just resets any transient zoom on active slide
        $('.portfolio-carousel .item.active img').each(function(){ this.style.transform = 'scale(1)'; });
      }, 120);
    });
  })(jQuery);
</script>

---

### Notes on Privacy & Safety
- Anonymization by default, per-user data export, short retention windows.
- Clear consent and session visibility for caregivers and admins.
