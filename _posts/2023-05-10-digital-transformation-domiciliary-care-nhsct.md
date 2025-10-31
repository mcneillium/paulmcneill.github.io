---
layout: post
title: "Aurora Domiciliary Care – NHSCT Analytics & Digital Transformation"
subtitle: "NI locality model, runs/rotas, ECM, Power BI, remittance & compliance (RQIA)"
modal-id: project-aurora-nhsct
thumbnail: aurora-nhsct-kpi.png
img: aurora-nhsct-kpi.png
alt: "NHSCT Power BI dashboards – Operations, Finance, Compliance, Runs & Rotas"
project-date: 2025-10-22
category: projects
description: "End-to-end NI domiciliary care analytics platform: Access/SQL data layer, Power BI KPIs, runs & rotas, ECM, remittance returns, RQIA."
github-url:
youtube-url:
---

### Overview
A Northern Ireland–specific, NHSCT-aligned transformation. I built a full analytics stack for a fictional provider **Aurora Domiciliary Care Ltd** to demonstrate best practice in **operations, workforce, finance, and compliance**. The showcase includes realistic **runs & rotas**, ECM fields (GPS, travel), **time-band uplift** for finance, **NHSCT localities**, and **RQIA** inspection outcomes—all with **GDPR-by-design**.

---

### Highlights
- **Runs & rotas**: AM/PM/Night shifts, primary/secondary carers, ordered client sequences.
- **ECM realism**: GPS check, travel minutes, weekend/evening/night bands.
- **Finance**: automated **remittance returns** (Claimed £) with **Evening +5%**, **Night +10%**, **Weekend +10%** uplifts; **payments** & variance.
- **Compliance & Quality**: RQIA timeline (Northern HSCNI), audits, incidents, complaints, training expiries.
- **Localities**: **Antrim/Ballymena, Causeway, Mid Ulster, East Antrim** views & benchmarks.

---

### Screens / Media
- **Executive KPI:** Training %, Missed %, On-Time %, Claimed vs Paid, Incident Rate, RQIA Score.
- **Operations:** on-time vs missed, volume by week, map by town/postcode.
- **Runs & Rotas (ECM):** run completion %, average visits/run, GPS/travel heatmap.
- **Finance:** Claimed vs Paid (weekly), variance waterfall by locality, outstanding returns.
- **Compliance:** RQIA/Audits timeline, Incident categories, Complaints SLA.

> Data: **fully synthetic**, NI/NHSCT-specific, ready to import into Power BI.  
> Download: Dataset (ZIP) & Excel Analyst Toolkit linked on this page.

---

### Stack
- **Data layer:** Access/SQL + CSV extracts; data validation; audit fields.
- **ETL:** Power Query; scheduled refresh.
- **Analytics:** Power BI (DAX, RLS, field parameters, drillthrough, decomposition).
- **Ops tooling:** Excel “Analyst Toolkit” (pivot-style summaries & charts).

---

### Governance & Security
- **UK GDPR / DPA 2018**: synthetic data; privacy by design; purpose limitation.
- **Access control**: RLS (Manager_By_Locality, Staff_Self); least-privilege roles.
- **Data quality**: Verified %, on-time SLA, missed visit %, training compliance.
- **Auditability**: incidents/complaints/audits/RQIA with dated follow-ups.
- **Retention**: documented retention windows & purge procedures (demo).

---

### Outcomes
- **Operational clarity**: missed visits < 1%, punctuality tracked; route efficiency measured (travel mins).
- **Financial accuracy**: consistent **Claimed vs Paid** tracking; variance transparency by client/locality.
- **Compliance readiness**: inspection-ready dashboards; training oversight; incident trend analysis.

---
