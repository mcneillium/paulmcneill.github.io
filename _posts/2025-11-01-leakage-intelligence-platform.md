---
layout: post
title: "Leakage Intelligence Platform"
subtitle: "Weekly forecasting, risk scoring and planning for a water network of more than 1,250 metered areas"
modal-id: project-leakage-platform
alt: "Diagram of the leakage intelligence platform"
architecture: leakage-hub
project-date: 2025-11-01
category: projects
client: "UK water utility (consultancy contract)"
permalink: /projects/leakage-intelligence-platform/
description: "The platform and models a UK water utility uses to plan leakage work across more than 1,250 areas, and the audit of how far its results can be trusted."
impact: "Weekly forecasting and planning across 1,250+ metered areas"
github-url:
youtube-url:
---

### Overview
Since November 2025 I have worked on a consultancy contract with a UK water utility. My main piece of work is the **leakage intelligence platform** its leakage team uses to see where water is being lost and to plan where to look next, across a network of more than 1,250 district metered areas (DMAs).

The data and results belong to the utility, so this page describes the system and my role. It shows no operational data, figures or screenshots.

---

### The problem
Leakage is measured indirectly, from night-time flows into each metered area, and the data is noisy, irregular and incomplete. Repairs are often inferred from a drop in flow rather than recorded directly, recording practice changes over time, and freezing weather can change the picture within days. The team needs to know each week which areas are getting worse, which repairs are holding, and where limited detection crews will do most good, with reasoning that can be explained to a regulator.

---

### What I built
- **A weekly 15-stage pipeline**: ingestion and unit harmonisation, anomaly detection, recalculation of reactive figures, health-check scoring, forecasts, a written intelligence summary and a dashboard refresh.
- **Forecasting and risk models**: gradient boosting (LightGBM), an LSTM, quantile models for forecast ranges, survival models for time to the next burst, and burst-risk and repair-sustainability models, at horizons from 4 to 52 weeks.
- **Scoring and planning tools**: a six-domain health check for every area, weather and freeze-thaw exposure, pressure management benefit, renewal priority, drift detection and a scheduler for detection teams.
- **A 25-page web application** with maps, charts, scenario tools and role-based access.
- **About 180 Python modules** with an automated test suite.

---

### How I check it
The most useful thing I did was audit the platform's own models. I inventoried all 50 model components and found problems that made some results look better than they were:
- a forecast target that, through an indexing error, looked mostly backwards rather than forwards;
- features that would not exist at the moment a prediction is made;
- shuffled cross-validation that let related events leak between training and test data;
- test data reused for early stopping and threshold choice, so the "test" score was really a validation score;
- forecast ranges whose coverage was checked on the data used to fit them.

I then rebuilt the evaluation around **rolling forecast origins**, strict checks that every training label is complete before each origin, and simple baselines (same as last week, a rolling mean, the same week last year), so any model has to beat the obvious before it is trusted. The headline accuracy figures in the earlier model cards are not independent accuracy, so I no longer quote them.

That experience is what my [public research studies](/research/) are about: what a model can be trusted to say when the data is imperfect and conditions change.

---

### What it fed into
- Analytical sections and figures for a long-term leakage strategy to 2050, produced through a reproducible document build.
- An interim freeze-thaw preparation report for winter 2026/27, which I wrote.

---

### How it was built
I designed the system, set its rules and checks, and reviewed and tested what went in. Much of the code was written with AI coding agents working under that direction, including scheduled overnight runs, and every change is logged.

---

### Tech stack
Python, pandas, LightGBM, PyTorch, scikit-learn, lifelines, Flask, Chart.js, Leaflet, Open-Meteo weather data, pytest.
