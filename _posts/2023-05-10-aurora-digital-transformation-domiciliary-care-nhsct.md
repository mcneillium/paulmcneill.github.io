---
layout: post
title: "Aurora Domiciliary Care: Power BI Analytics"
subtitle: "A six-page Power BI model for a fictional Northern Ireland home-care provider, on a synthetic 16-table dataset"
modal-id: project-aurora-nhsct
thumbnail: aurora/aurora_dashboard_ops_pbi.png
img: aurora/aurora_dashboard_ops_pbi.png
alt: "Power BI dashboards for operations, finance, workforce and compliance, on synthetic data"
project-date: 2025-10-31
category: projects
permalink: /projects/aurora-nhs-transformation/
redirect_from:
  - /projects/2023/05/10/aurora-digital-transformation-domiciliary-care-nhsct/
description: "A demonstration analytics model for a fictional home-care provider in the Northern Health and Social Care Trust area: 16 synthetic tables, Power Query, DAX measures, six Power BI pages with row-level security, and an Excel mirror."
impact: "Models visits, workforce and finance using synthetic care data"
architecture: aurora
github-url: https://github.com/mcneillium/Aurora-Domiciliary-Care
youtube-url:
---

<!-- QUICK NAV -->
<nav class="aurora-toc" aria-label="Quick navigation">
  <a href="#overview">Overview</a>
  <a href="#highlights">Highlights</a>
  <a href="#dashboards">Dashboards</a>
  <a href="#tech">Tech</a>
  <a href="#governance">Governance</a>
  <a href="#outcomes">Outcomes</a>
  <a href="#assets">Assets</a>
  <a href="#gallery">Gallery</a>
</nav>

<h3 id="overview">Overview</h3>
**Aurora Domiciliary Care** is a fictional home-care provider I created to show how a Northern Ireland care company could report on its **operations, workforce, finance and compliance**. I designed the data model, generated the data and built the reports.

The data is **synthetic**: 16 tables of clients, staff, visits, runs and rotas, remittances, trust payments, incidents, complaints, training and inspections, shaped to the Northern Health and Social Care Trust (NHSCT) area and the RQIA inspection scale. No real person or provider is represented, and this was not commissioned by the NHSCT or any provider.

The same fictional provider runs my [Aurora care management app](/projects/ai-social-healthcare-platform/), which adds live vitals monitoring and an explainable admission-risk model.

---

### <span id="highlights">🔍 Key Highlights</span>
- **Runs & Rotas:** AM/PM/Night visits, primary/secondary carers, ordered sequences, travel-time mapping.  
- **ECM Realism:** GPS validation, travel minutes, weekend/evening/night uplifts, visit verification.  
- **Finance Automation:** Claimed vs Paid variance tracking, evening (+5%), night (+10%), weekend (+10%) uplifts, and remittance reconciliation.  
- **Compliance & Quality:** RQIA inspections with timeline and outcome scores, incident tracking, complaints SLA, and training expiry analytics.  
- **Locality Benchmarking:** Antrim/Ballymena, Causeway, Mid Ulster, and East Antrim KPI comparisons.

---

## <span id="dashboards">🖥️ Dashboards</span>

<!-- Dashboards Tabs -->
<nav class="aurora-toc" aria-label="Report formats">
<a href="#dash-powerbi">Power BI</a>
<a href="#dash-excel">Excel</a>
</nav>

<div class="tab-content aurora-tabcontent" style="margin-top:1rem">

  <!-- Dashboards: POWER BI -->
  <div id="dash-powerbi">
    <h3>Power BI</h3>
    <div class="aurora-grid">
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_dashboard_kpi_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_kpi_pbi.png" alt="Executive KPI Dashboard" loading="lazy"></a>
        <figcaption>Executive KPI Dashboard</figcaption>
      </figure>
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_dashboard_ops_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_ops_pbi.png" alt="Operations Performance Overview" loading="lazy"></a>
        <figcaption>Operations Performance Overview</figcaption>
      </figure>
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_dashboard_finance_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_finance_pbi.png" alt="Finance Claimed vs Paid Analysis" loading="lazy"></a>
        <figcaption>Finance Claimed vs Paid</figcaption>
      </figure>
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_dashboard_qa_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_qa_pbi.png" alt="Compliance: RQIA, Incidents, Complaints" loading="lazy"></a>
        <figcaption>Compliance & Quality</figcaption>
      </figure>
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_dashboard_rr_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_rr_pbi.png" alt="Runs & Rotas Overview" loading="lazy"></a>
        <figcaption>Runs & Rotas (Overview)</figcaption>
      </figure>
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_dashboard_wf_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_wf_pbi.png" alt="Workforce KPIs" loading="lazy"></a>
        <figcaption>Workforce KPIs</figcaption>
      </figure>
    </div>
  </div>

  <!-- Dashboards: EXCEL -->
  <div id="dash-excel">
    <h3>Excel</h3>
    <div class="aurora-grid">
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_kpi_excel.png"><img src="/img/portfolio/aurora/aurora_kpi_excel.png" alt="Excel KPI Overview" loading="lazy"></a>
        <figcaption>Excel – KPI Overview</figcaption>
      </figure>
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_carepackages_excel.png"><img src="/img/portfolio/aurora/aurora_carepackages_excel.png" alt="Excel Care Packages View" loading="lazy"></a>
        <figcaption>Excel – Care Packages</figcaption>
      </figure>
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_clients_excel.png"><img src="/img/portfolio/aurora/aurora_clients_excel.png" alt="Excel Clients Table" loading="lazy"></a>
        <figcaption>Excel – Clients</figcaption>
      </figure>
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_rr_excel.png"><img src="/img/portfolio/aurora/aurora_rr_excel.png" alt="Excel Runs & Rotas" loading="lazy"></a>
        <figcaption>Excel – Runs & Rotas</figcaption>
      </figure>
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_remittance_excel.png"><img src="/img/portfolio/aurora/aurora_remittance_excel.png" alt="Excel Remittance Reconciliation" loading="lazy"></a>
        <figcaption>Excel – Remittance</figcaption>
      </figure>
      <figure class="aurora-item">
        <a href="/img/portfolio/aurora/aurora_trustpayments_excel.png"><img src="/img/portfolio/aurora/aurora_trustpayments_excel.png" alt="Excel Trust Payments" loading="lazy"></a>
        <figcaption>Excel – Trust Payments</figcaption>
      </figure>
    </div>
  </div>

</div>

---

### <span id="tech">⚙️ Tech Stack</span>
| Layer | Technology |
|:--|:--|
| **Data layer** | 16 CSV tables (the source of truth), regenerated by seeded Python scripts so every change can be repeated |
| **ETL / Prep** | Power Query, scheduled refresh, DAX measures |
| **Analytics** | Power BI (RLS, field parameters, drillthrough, decomposition tree) |
| **Ops Toolkit** | Excel-based Analyst Toolkit (pivots, slicers, validation charts) |

---

### <span id="governance">🔐 Governance & Security</span>
- **UK GDPR / DPA 2018:** fully synthetic dataset; names and addresses checked against public NI registers so none belongs to a real person.  
- **Access Control:** Power BI RLS roles — `Manager_By_Locality`, `Staff_Self`.  
- **Data Quality:** Verified %, On-Time SLA %, Missed Visit %, Training Compliance %.  
- **Audit trail:** incidents, complaints, audits and RQIA outcomes are kept as dated records, so every figure on a page traces back to rows.

---

### <span id="outcomes">📊 What it shows</span>
- **Operations:** missed and late visits by locality, punctuality against a five-minute window, and travel time between calls.  
- **Finance:** claimed against paid for every remittance, with evening, night and weekend uplifts applied by rule.  
- **Compliance:** RQIA inspection outcomes over time, incident and complaint handling, and training that is about to expire.  
- **Access control:** row-level security so a locality manager sees only their locality and a carer only their own visits.  

All figures on these pages come from the synthetic data, so they show what the reports can do, not how any real provider performs.

---

### <span id="assets">🧩 In the repository</span>
- `aurora_ni_nhsct_dataset/`: the 16 CSV tables and the Power BI file (`aurora_nhsct.pbix`)  
- `Aurora_NI_Analyst_Toolkit.xlsx`: the same data as values and charts for people without Power BI  
- `docs/measures/`: paste-ready DAX measures and Power Query M  
- `scripts/`: seeded data-regeneration scripts  
- `Screenshots/`: every dashboard, desktop and mobile  

---

## <span id="gallery">🗂️ Gallery</span>

<!-- Gallery Tabs -->
<nav class="aurora-toc" aria-label="Report formats">
<a href="#tab-powerbi">Power BI</a>
<a href="#tab-excel">Excel</a>
</nav>

<div class="tab-content aurora-tabcontent" style="margin-top:1rem">

  <!-- GALLERY: POWER BI (full set including mobile + DAX + modeling) -->
  <div id="tab-powerbi">
    <h3>Power BI</h3>
    <div class="aurora-grid" role="list">
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_kpi_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_kpi_pbi.png" alt="Executive KPI Dashboard" loading="lazy"></a><figcaption>Executive KPI Dashboard</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_kpi__mobile_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_kpi__mobile_pbi.png" alt="Executive KPI (Mobile)" loading="lazy"></a><figcaption>KPI (Mobile)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_ops_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_ops_pbi.png" alt="Operations Performance Overview" loading="lazy"></a><figcaption>Operations Overview</figcaption></figure>
      <figure class="aurora-item aurora-item--wide" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_ops_ws.png"><img src="/img/portfolio/aurora/aurora_dashboard_ops_ws.png" alt="Operations Dashboard Wide" loading="lazy"></a><figcaption>Operations (Wide)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_finance_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_finance_pbi.png" alt="Finance Claimed vs Paid" loading="lazy"></a><figcaption>Finance – Claimed vs Paid</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_finance_mobile_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_finance_mobile_pbi.png" alt="Finance Mobile" loading="lazy"></a><figcaption>Finance (Mobile)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_qa_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_qa_pbi.png" alt="Quality & Compliance" loading="lazy"></a><figcaption>Quality & Compliance</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_qa_mobile_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_qa_mobile_pbi.png" alt="Quality & Compliance (Mobile)" loading="lazy"></a><figcaption>Compliance (Mobile)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_rr_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_rr_pbi.png" alt="Runs & Rotas Overview" loading="lazy"></a><figcaption>Runs & Rotas</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_rr_mobile_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_rr_mobile_pbi.png" alt="Runs & Rotas (Mobile)" loading="lazy"></a><figcaption>Runs & Rotas (Mobile)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_wf_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_wf_pbi.png" alt="Workforce KPIs" loading="lazy"></a><figcaption>Workforce KPIs</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_dashboard_wf_mobile_pbi.png"><img src="/img/portfolio/aurora/aurora_dashboard_wf_mobile_pbi.png" alt="Workforce KPIs (Mobile)" loading="lazy"></a><figcaption>Workforce (Mobile)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_clients_pq_pbi.png"><img src="/img/portfolio/aurora/aurora_clients_pq_pbi.png" alt="Power Query Clients Transform" loading="lazy"></a><figcaption>Power Query – Clients</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_training_records_pq_pbi.png"><img src="/img/portfolio/aurora/aurora_training_records_pq_pbi.png" alt="Power Query Training Records" loading="lazy"></a><figcaption>Power Query – Training Records</figcaption></figure>

      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_tables_pbi.png"><img src="/img/portfolio/aurora/aurora_tables_pbi.png" alt="Power BI Tables View" loading="lazy"></a><figcaption>Tables View</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_relationship_pbi.png"><img src="/img/portfolio/aurora/aurora_relationship_pbi.png" alt="Power BI Relationship Model" loading="lazy"></a><figcaption>Relationship Model</figcaption></figure>

      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_measure_example_1.png"><img src="/img/portfolio/aurora/aurora_measure_example_1.png" alt="DAX Measure Example 1" loading="lazy"></a><figcaption>DAX Measure – 1</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_measure_example_2.png"><img src="/img/portfolio/aurora/aurora_measure_example_2.png" alt="DAX Measure Example 2" loading="lazy"></a><figcaption>DAX Measure – 2</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_measure_example_3.png"><img src="/img/portfolio/aurora/aurora_measure_example_3.png" alt="DAX Measure Example 3" loading="lazy"></a><figcaption>DAX Measure – 3</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_measure_example_4.png"><img src="/img/portfolio/aurora/aurora_measure_example_4.png" alt="DAX Measure Example 4" loading="lazy"></a><figcaption>DAX Measure – 4</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_measure_example_5.png"><img src="/img/portfolio/aurora/aurora_measure_example_5.png" alt="DAX Measure Example 5" loading="lazy"></a><figcaption>DAX Measure – 5</figcaption></figure>

      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_measures_dash.png"><img src="/img/portfolio/aurora/aurora_measures_dash.png" alt="Measures dashboard" loading="lazy"></a><figcaption>Measures Dashboard</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_pq_editor.png"><img src="/img/portfolio/aurora/aurora_pq_editor.png" alt="Power Query Editor" loading="lazy"></a><figcaption>Power Query Editor</figcaption></figure>
    </div>
  </div>

  <!-- GALLERY: EXCEL (all Excel assets) -->
  <div id="tab-excel">
    <h3>Excel</h3>
    <div class="aurora-grid" role="list">
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_kpi_excel.png"><img src="/img/portfolio/aurora/aurora_kpi_excel.png" alt="Excel KPI Overview" loading="lazy"></a><figcaption>Excel – KPI Overview</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_carepackages_excel.png"><img src="/img/portfolio/aurora/aurora_carepackages_excel.png" alt="Excel Care Packages View" loading="lazy"></a><figcaption>Excel – Care Packages</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_clients_excel.png"><img src="/img/portfolio/aurora/aurora_clients_excel.png" alt="Excel Clients Table" loading="lazy"></a><figcaption>Excel – Clients</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_rr_excel.png"><img src="/img/portfolio/aurora/aurora_rr_excel.png" alt="Excel Runs & Rotas" loading="lazy"></a><figcaption>Excel – Runs & Rotas</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_remittance_excel.png"><img src="/img/portfolio/aurora/aurora_remittance_excel.png" alt="Excel Remittance Reconciliation" loading="lazy"></a><figcaption>Excel – Remittance</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_trustpayments_excel.png"><img src="/img/portfolio/aurora/aurora_trustpayments_excel.png" alt="Excel Trust Payments" loading="lazy"></a><figcaption>Excel – Trust Payments</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_expenses_excel.png"><img src="/img/portfolio/aurora/aurora_expenses_excel.png" alt="Excel Expenses" loading="lazy"></a><figcaption>Excel – Expenses</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_mileage_excel.png"><img src="/img/portfolio/aurora/aurora_mileage_excel.png" alt="Excel Mileage" loading="lazy"></a><figcaption>Excel – Mileage</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_staff_excel.png"><img src="/img/portfolio/aurora/aurora_staff_excel.png" alt="Excel Staff" loading="lazy"></a><figcaption>Excel – Staff</figcaption></figure>
      <figure class="aurora-item" role="listitem"><a href="/img/portfolio/aurora/aurora_complaints_excel.png"><img src="/img/portfolio/aurora/aurora_complaints_excel.png" alt="Excel Complaints" loading="lazy"></a><figcaption>Excel – Complaints</figcaption></figure>
    </div>
  </div>

</div>

<style>
.aurora-toc { display: flex; flex-wrap: wrap; gap: .75rem; margin: 1rem 0; }
.aurora-grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr)); }
.aurora-item { margin: 0; }
.aurora-item img { width: 100%; height: auto; }
.aurora-item figcaption { color: var(--text-dim); font-size: .9rem; }
.aurora-item--wide { grid-column: 1 / -1; }
</style>
