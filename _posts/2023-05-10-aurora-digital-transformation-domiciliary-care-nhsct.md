---
layout: post
title: "Aurora Domiciliary Care – NHSCT Analytics & Digital Transformation"
subtitle: "Northern Ireland locality model | ECM realism | Power BI transformation suite"
modal-id: project-aurora-nhsct
thumbnail: /img/portfolio/aurora/aurora-nhsct-kpi.png
img: /img/portfolio/aurora/aurora-nhsct-dashboard.png
alt: "NHSCT Power BI dashboards for Operations, Finance, Workforce & Compliance"
project-date: 2025-10-31
category: projects
description: "Comprehensive Northern Ireland domiciliary care analytics platform built for Aurora Domiciliary Care Ltd — combining Access/SQL data layers, Power BI dashboards, remittance automation, ECM realism, and RQIA compliance oversight."
github-url:
youtube-url:
---

### Overview
A Northern Ireland–specific, NHSCT-aligned transformation project. I designed and built **Aurora Domiciliary Care**, a full analytics ecosystem showcasing best practice in **operations, workforce, finance, and compliance**.  
It features realistic **runs & rotas**, **ECM data** (GPS, travel, shift types), **finance uplift rules**, and **NHSCT locality models**, all with **GDPR-by-design** principles and role-based security.

---

### 🔍 Key Highlights
- **Runs & Rotas:** AM/PM/Night visits, primary/secondary carers, ordered sequences, travel-time mapping.  
- **ECM Realism:** GPS validation, travel minutes, weekend/evening/night uplifts, visit verification.  
- **Finance Automation:** Claimed vs Paid variance tracking, evening (+5%), night (+10%), weekend (+10%) uplifts, and remittance reconciliation.  
- **Compliance & Quality:** RQIA inspections with timeline and outcome scores, incident tracking, complaints SLA, and training expiry analytics.  
- **Locality Benchmarking:** Antrim/Ballymena, Causeway, Mid Ulster, and East Antrim KPI comparisons.

---

### 🖥️ Dashboards
**Executive KPI Dashboard**
![Aurora KPI Dashboard](/img/portfolio/aurora/aurora_kpi_dashboard.png "Executive KPI Dashboard")

**Operations View**
![Aurora Operations Dashboard](/img/portfolio/aurora/aurora_operations.png "Operations Performance Overview")

**Finance Analytics**
![Aurora Finance Dashboard](/img/portfolio/aurora/aurora_finance_dashboard.png "Finance Claimed vs Paid Analysis")

**Compliance & Quality**
![Aurora Compliance Dashboard](/img/portfolio/aurora/aurora_compliance_dashboard.png "RQIA, Incidents, and Complaints Overview")

**Power BI Measure Example**
![Aurora Measure Example](/img/portfolio/aurora/aurora_measure_example_3.png "Power BI DAX Measure Example")

> All data is **synthetic**, **NHSCT-locality accurate**, and **Power BI ready**.  
> 📦 Download: Dataset ZIP + Excel Analyst Toolkit linked on this page.

---

### ⚙️ Tech Stack
| Layer | Technology |
|:--|:--|
| **Data Layer** | Microsoft Access / SQL – validated tables with audit fields |
| **ETL / Prep** | Power Query, scheduled refresh, DAX measures |
| **Analytics** | Power BI (RLS, field parameters, drillthrough, decomposition tree) |
| **Ops Toolkit** | Excel-based Analyst Toolkit (pivots, slicers, validation charts) |

---

### 🔐 Governance & Security
- **UK GDPR / DPA 2018:** Fully synthetic dataset; privacy-by-design model.  
- **Access Control:** Power BI RLS roles — `Manager_By_Locality`, `Staff_Self`.  
- **Data Quality:** Verified %, On-Time SLA %, Missed Visit %, Training Compliance %.  
- **Audit & Retention:** Full traceability for incidents, complaints, audits, and RQIA outcomes with purge policy demo.

---

### 📊 Outcomes
- **Operational Insight:** Missed visits <1%, punctuality and travel-time performance measured.  
- **Financial Transparency:** End-to-end claimed/paid reconciliation and locality variance clarity.  
- **Compliance Readiness:** Real-time inspection and training readiness dashboards; full audit traceability.  
- **Transformational Model:** Demonstrates NI-specific digital transformation aligned with NHSCT locality structure.

---

### 🧩 Assets
- `Aurora.accdb` — Access data model (clients, staff, runs, finance, compliance)  
- `Aurora_PowerBI.pbix` — Executive dashboards  
- `Aurora_Analyst_Toolkit.xlsx` — Excel insights pack  
- `/img/portfolio/aurora/` — Screenshot gallery
