---
layout: post
title: "Custom CRM"
subtitle: "A CRM for a small sales team, built from scratch: one TypeScript core, a Node.js server on PostgreSQL, and a demo that runs entirely in your browser"
modal-id: 7
thumbnail: custom-crm.png
img: custom-crm.png
gallery_dir: custom-crm
alt: "The Custom CRM dashboard: pipeline figures, pipeline by stage, won by month, forecast and activity charts"
project-date: "November 2026"
client: "Personal project"
category: CRM Software Development
permalink: /projects/custom-crm/
redirect_from:
  - "/crm software development/2024/09/06/project-5/"
description: "A CRM for small sales teams, built from scratch in TypeScript: companies, contacts, a deal pipeline, an activity log, tasks, email templates and a dashboard, on Node.js and PostgreSQL, with a live demo that runs PostgreSQL inside the browser."
impact: "Full CRM with a live demo that needs no server"
demo-url: /demos/custom-crm/
github-url: https://github.com/mcneillium/custom-crm
youtube-url:
---

### Overview
For a long time this page described a custom CRM "in development", with no code behind it. In November 2026 I built
it from scratch. It covers what a small sales team does every day: companies and contacts, a deal pipeline, a log of
calls, emails, meetings and notes, tasks, email templates and a dashboard of where the pipeline stands.

**[Open the live demo](/demos/custom-crm/)** and choose a sample person to sign in as. It runs entirely in your
browser on invented sample data; nothing is sent anywhere, and you can reset it from Settings.

---

### What it does
- **Pipeline board:** one column per stage with total and weighted value. Drag a card to move it, or focus it and press
  Alt with the arrow keys. Losing a deal asks for a reason, which feeds the win and loss review.
- **Deals:** every stage change is recorded with who made it and when. Moving into Won or Lost sets the close date.
- **Activity log:** calls, emails, meetings and notes against a deal, contact or company, on one timeline.
- **Email templates:** merge fields fill in the contact, company, deal and sender; copy the result or open it in your
  mail program, then log it as sent.
- **Tasks:** due dates, owners and links to deals, with overdue and due-today views.
- **Contacts and companies:** search, detail pages, CSV import with row-by-row errors, and CSV export.
- **Dashboard:** open and weighted pipeline, won this month, 90-day win rate, days to win, a forecast by expected close
  month, activity per week, a stage funnel built from the stage history, and figures by owner. Every chart has a table
  view.
- **Roles:** admins manage stages, templates and people; sales users do everything else.

### How it is built
- **One core, two databases.** All the SQL, validation and analytics live in one TypeScript package. The server runs
  it on PostgreSQL through a connection pool; the demo runs exactly the same code on PGlite, PostgreSQL compiled to
  WebAssembly.
- **Server:** Fastify with sessions in an HttpOnly cookie, scrypt password hashing, role checks and a REST API. Every
  write needs a JSON body or a custom header, which a cross-site form cannot send.
- **Web app:** React, installable as a PWA, with dark mode and a layout that works on a phone.
- **A bug found by testing against a real database:** with a pool, a transaction's statements could run on different
  connections. The server now keeps each transaction on one connection, and a test fires concurrent stage moves at
  PostgreSQL 16 to prove the history matches where each deal landed.

### Testing
- 31 automated tests: 17 for the core on an in-memory PostgreSQL, 11 for the server API (run on PostgreSQL 16 in CI),
  and 3 for the web app and the in-browser backend.
- Browser runs of the main workflows: dragging and keyboard moves, logging activity, templates, tasks, CSV import, and
  reloading with the data kept.
- An axe-core scan found no WCAG 2.1 AA violations on any screen, in light or dark mode.

### Limits
- It does not send email itself: it fills the template and hands it to your mail program.
- One currency (GBP) and one organisation per database; no attachments, calendar sync or single sign-on.
- The demo's first load downloads PostgreSQL for the browser, about 5 MB compressed.

### Tools
TypeScript, Node.js, Fastify, PostgreSQL, PGlite, React, Vite, zod, Vitest, Playwright, GitHub Actions.
