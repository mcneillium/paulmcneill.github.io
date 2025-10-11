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
- Dashboard, prediction ribbon, high-contrast mode.
- (Optional) Add more images here using standard Markdown:
  `![Prediction ribbon](img/portfolio/aac-ai-dashboard.png)`

### Notes on Privacy & Safety
- Anonymization by default, per-user data export, short retention windows.
- Clear consent and session visibility for caregivers and admins.

