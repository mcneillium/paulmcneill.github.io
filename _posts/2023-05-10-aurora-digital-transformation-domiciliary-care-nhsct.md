---
layout: post
title: "Aurora Domiciliary Care – NHSCT Analytics & Digital Transformation"
subtitle: "Northern Ireland locality model | ECM realism | Power BI transformation suite"
modal-id: project-aurora-nhsct
thumbnail: aurora/aurora_dashboard_ops_pbi.png
img: aurora/aurora_dashboard_ops_pbi.png
alt: "NHSCT Power BI dashboards for Operations, Finance, Workforce & Compliance"
project-date: 2025-10-31
category: projects
description: "Comprehensive Northern Ireland domiciliary care analytics platform built for Aurora Domiciliary Care Ltd — combining Access/SQL data layers, Power BI dashboards, remittance automation, ECM realism, and RQIA compliance oversight."
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

### <span id="overview">Overview</span>
A Northern Ireland–specific, NHSCT-aligned transformation project. I designed and built **Aurora Domiciliary Care**, a full analytics ecosystem showcasing best practice in **operations, workforce, finance, and compliance**.  
It features realistic **runs & rotas**, **ECM data** (GPS, travel, shift types), **finance uplift rules**, and **NHSCT locality models**, all with **GDPR-by-design** principles and role-based security.

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
<ul class="nav nav-pills aurora-tabs" role="tablist">
  <li role="presentation" class="active">
    <a href="#dash-powerbi" aria-controls="dash-powerbi" role="tab" data-toggle="tab">Power BI</a>
  </li>
  <li role="presentation">
    <a href="#dash-excel" aria-controls="dash-excel" role="tab" data-toggle="tab">Excel</a>
  </li>
  <li role="presentation">
    <a href="#dash-access" aria-controls="dash-access" role="tab" data-toggle="tab">Access (TBC)</a>
  </li>
</ul>

<div class="tab-content aurora-tabcontent" style="margin-top:1rem">

  <!-- Dashboards: POWER BI -->
  <div role="tabpanel" class="tab-pane fade in active" id="dash-powerbi">
    <div class="aurora-grid">
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_dashboard_kpi_pbi.png" alt="Executive KPI Dashboard" loading="lazy">
        <figcaption>Executive KPI Dashboard</figcaption>
      </figure>
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_dashboard_ops_pbi.png" alt="Operations Performance Overview" loading="lazy">
        <figcaption>Operations Performance Overview</figcaption>
      </figure>
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_dashboard_finance_pbi.png" alt="Finance Claimed vs Paid Analysis" loading="lazy">
        <figcaption>Finance Claimed vs Paid</figcaption>
      </figure>
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_dashboard_qa_pbi.png" alt="Compliance: RQIA, Incidents, Complaints" loading="lazy">
        <figcaption>Compliance & Quality</figcaption>
      </figure>
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_dashboard_rr_pbi.png" alt="Runs & Rotas Overview" loading="lazy">
        <figcaption>Runs & Rotas (Overview)</figcaption>
      </figure>
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_dashboard_wf_pbi.png" alt="Workforce KPIs" loading="lazy">
        <figcaption>Workforce KPIs</figcaption>
      </figure>
    </div>
  </div>

  <!-- Dashboards: EXCEL -->
  <div role="tabpanel" class="tab-pane fade" id="dash-excel">
    <div class="aurora-grid">
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_kpi_excel.png" alt="Excel KPI Overview" loading="lazy">
        <figcaption>Excel – KPI Overview</figcaption>
      </figure>
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_carepackages_excel.png" alt="Excel Care Packages View" loading="lazy">
        <figcaption>Excel – Care Packages</figcaption>
      </figure>
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_clients_excel.png" alt="Excel Clients Table" loading="lazy">
        <figcaption>Excel – Clients</figcaption>
      </figure>
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_rr_excel.png" alt="Excel Runs & Rotas" loading="lazy">
        <figcaption>Excel – Runs & Rotas</figcaption>
      </figure>
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_remittance_excel.png" alt="Excel Remittance Reconciliation" loading="lazy">
        <figcaption>Excel – Remittance</figcaption>
      </figure>
      <figure class="aurora-item">
        <img src="/img/portfolio/aurora/aurora_trustpayments_excel.png" alt="Excel Trust Payments" loading="lazy">
        <figcaption>Excel – Trust Payments</figcaption>
      </figure>
    </div>
  </div>

  <!-- Dashboards: ACCESS -->
  <div role="tabpanel" class="tab-pane fade" id="dash-access">
    <div class="aurora-empty">
      <p class="lead">Access Data Model (TBC)</p>
      <p>Planned: schema diagram, table validation, audit trail examples.</p>
    </div>
  </div>
</div>

---

### <span id="tech">⚙️ Tech Stack</span>
| Layer | Technology |
|:--|:--|
| **Data Layer** | Microsoft Access / SQL – validated tables with audit fields |
| **ETL / Prep** | Power Query, scheduled refresh, DAX measures |
| **Analytics** | Power BI (RLS, field parameters, drillthrough, decomposition tree) |
| **Ops Toolkit** | Excel-based Analyst Toolkit (pivots, slicers, validation charts) |

---

### <span id="governance">🔐 Governance & Security</span>
- **UK GDPR / DPA 2018:** Fully synthetic dataset; privacy-by-design model.  
- **Access Control:** Power BI RLS roles — `Manager_By_Locality`, `Staff_Self`.  
- **Data Quality:** Verified %, On-Time SLA %, Missed Visit %, Training Compliance %.  
- **Audit & Retention:** Full traceability for incidents, complaints, audits, and RQIA outcomes with purge policy demo.

---

### <span id="outcomes">📊 Outcomes</span>
- **Operational Insight:** Missed visits <1%, punctuality and travel-time performance measured.  
- **Financial Transparency:** End-to-end claimed/paid reconciliation and locality variance clarity.  
- **Compliance Readiness:** Real-time inspection and training readiness dashboards; full audit traceability.  
- **Transformational Model:** Demonstrates NI-specific digital transformation aligned with NHSCT locality structure.

---

### <span id="assets">🧩 Assets</span>
- `Aurora.accdb` — Access data model (clients, staff, runs, finance, compliance)  
- `Aurora_PowerBI.pbix` — Executive dashboards  
- `Aurora_Analyst_Toolkit.xlsx` — Excel insights pack  
- `/img/portfolio/aurora/` — Screenshot gallery

---

## <span id="gallery">🗂️ Gallery</span>

<!-- Gallery Tabs -->
<ul class="nav nav-pills aurora-tabs" role="tablist">
  <li role="presentation" class="active">
    <a href="#tab-powerbi" aria-controls="tab-powerbi" role="tab" data-toggle="tab">Power BI</a>
  </li>
  <li role="presentation">
    <a href="#tab-excel" aria-controls="tab-excel" role="tab" data-toggle="tab">Excel</a>
  </li>
  <li role="presentation">
    <a href="#tab-access" aria-controls="tab-access" role="tab" data-toggle="tab">Access (TBC)</a>
  </li>
</ul>

<div class="tab-content aurora-tabcontent" style="margin-top:1rem">

  <!-- GALLERY: POWER BI (full set including mobile + DAX + modeling) -->
  <div role="tabpanel" class="tab-pane fade in active" id="tab-powerbi">
    <div class="aurora-grid" role="list">
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_kpi_pbi.png" alt="Executive KPI Dashboard" loading="lazy"><figcaption>Executive KPI Dashboard</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_kpi__mobile_pbi.png" alt="Executive KPI (Mobile)" loading="lazy"><figcaption>KPI (Mobile)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_ops_pbi.png" alt="Operations Performance Overview" loading="lazy"><figcaption>Operations Overview</figcaption></figure>
      <figure class="aurora-item aurora-item--wide" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_ops_ws.png" alt="Operations Dashboard Wide" loading="lazy"><figcaption>Operations (Wide)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_finance_pbi.png" alt="Finance Claimed vs Paid" loading="lazy"><figcaption>Finance – Claimed vs Paid</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_finance_mobile_pbi.png" alt="Finance Mobile" loading="lazy"><figcaption>Finance (Mobile)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_qa_pbi.png" alt="Quality & Compliance" loading="lazy"><figcaption>Quality & Compliance</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_qa_mobile_pbi.png" alt="Quality & Compliance (Mobile)" loading="lazy"><figcaption>Compliance (Mobile)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_rr_pbi.png" alt="Runs & Rotas Overview" loading="lazy"><figcaption>Runs & Rotas</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_rr_mobile_pbi.png" alt="Runs & Rotas (Mobile)" loading="lazy"><figcaption>Runs & Rotas (Mobile)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_wf_pbi.png" alt="Workforce KPIs" loading="lazy"><figcaption>Workforce KPIs</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_dashboard_wf_mobile_pbi.png" alt="Workforce KPIs (Mobile)" loading="lazy"><figcaption>Workforce (Mobile)</figcaption></figure>

      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_clients_pq_pbi.png" alt="Power Query Clients Transform" loading="lazy"><figcaption>Power Query – Clients</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_training_records_pq_pbi.png" alt="Power Query Training Records" loading="lazy"><figcaption>Power Query – Training Records</figcaption></figure>

      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_tables_pbi.png" alt="Power BI Tables View" loading="lazy"><figcaption>Tables View</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_relationship_pbi.png" alt="Power BI Relationship Model" loading="lazy"><figcaption>Relationship Model</figcaption></figure>

      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_measure_example_1.png" alt="DAX Measure Example 1" loading="lazy"><figcaption>DAX Measure – 1</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_measure_example_2.png" alt="DAX Measure Example 2" loading="lazy"><figcaption>DAX Measure – 2</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_measure_example_3.png" alt="DAX Measure Example 3" loading="lazy"><figcaption>DAX Measure – 3</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_measure_example_4.png" alt="DAX Measure Example 4" loading="lazy"><figcaption>DAX Measure – 4</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_measure_example_5.png" alt="DAX Measure Example 5" loading="lazy"><figcaption>DAX Measure – 5</figcaption></figure>

      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_measures_dash.png" alt="Measures dashboard" loading="lazy"><figcaption>Measures Dashboard</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_pq_editor.png" alt="Power Query Editor" loading="lazy"><figcaption>Power Query Editor</figcaption></figure>
    </div>
  </div>

  <!-- GALLERY: EXCEL (all Excel assets) -->
  <div role="tabpanel" class="tab-pane fade" id="tab-excel">
    <div class="aurora-grid" role="list">
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_kpi_excel.png" alt="Excel KPI Overview" loading="lazy"><figcaption>Excel – KPI Overview</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_carepackages_excel.png" alt="Excel Care Packages View" loading="lazy"><figcaption>Excel – Care Packages</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_clients_excel.png" alt="Excel Clients Table" loading="lazy"><figcaption>Excel – Clients</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_rr_excel.png" alt="Excel Runs & Rotas" loading="lazy"><figcaption>Excel – Runs & Rotas</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_remittance_excel.png" alt="Excel Remittance Reconciliation" loading="lazy"><figcaption>Excel – Remittance</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_trustpayments_excel.png" alt="Excel Trust Payments" loading="lazy"><figcaption>Excel – Trust Payments</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_expenses_excel.png" alt="Excel Expenses" loading="lazy"><figcaption>Excel – Expenses</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_mileage_excel.png" alt="Excel Mileage" loading="lazy"><figcaption>Excel – Mileage</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_staff_excel.png" alt="Excel Staff" loading="lazy"><figcaption>Excel – Staff</figcaption></figure>
      <figure class="aurora-item" role="listitem"><img src="/img/portfolio/aurora/aurora_complaints_excel.png" alt="Excel Complaints" loading="lazy"><figcaption>Excel – Complaints</figcaption></figure>
    </div>
  </div>

  <!-- GALLERY: ACCESS -->
  <div role="tabpanel" class="tab-pane fade" id="tab-access">
    <div class="aurora-empty">
      <p class="lead">Access Data Model (TBC)</p>
      <p>Future: schema diagram, table validation, audit trail examples.</p>
    </div>
  </div>
</div>

<!-- Accessible Lightbox Modal (shared by all tabs/sections) -->
<div class="aurora-lightbox" id="auroraLightbox" aria-modal="true" role="dialog" aria-label="Image viewer" hidden>
  <button class="lb-close" type="button" aria-label="Close (Esc)">&times;</button>
  <button class="lb-prev" type="button" aria-label="Previous (←)">&lsaquo;</button>
  <img class="lb-img" src="" alt="">
  <div class="lb-caption" id="lbCaption"></div>
  <button class="lb-next" type="button" aria-label="Next (→)">&rsaquo;</button>
</div>

<a class="aurora-backtop" href="#page-top" aria-label="Back to top">↑</a>

<!-- STYLES -->
<style>
/* Quick nav chips */
.aurora-toc { display:flex; flex-wrap:wrap; gap:.5rem; margin: 0 0 1rem 0; }
.aurora-toc a{
  display:inline-block; padding:.35rem .6rem; border:1px solid #e1e1e1; border-radius:999px;
  text-decoration:none; font-size:.9rem; color:#333; background:#fff;
}
.aurora-toc a:hover{ background:#f7f7f7; }

/* Tabs */
.aurora-tabs { margin-bottom:.25rem; }
.aurora-tabs > li > a { border-radius:999px; }
.aurora-tabs > li.active > a,
.aurora-tabs > li.active > a:focus,
.aurora-tabs > li.active > a:hover { color:#333; background:#ffd800; border-color:#ffd800; }

/* Tab content wrapper */
.aurora-tabcontent { background:#fff; border:1px solid #eee; border-radius:12px; padding:1rem; }

/* Grid 3/2/1 (no horizontal scroll) */
.aurora-grid { display:grid; gap:1rem; margin-top:.25rem; grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 991px){ .aurora-grid{ grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 575px){ .aurora-grid{ grid-template-columns: 1fr; } }

/* Items & hover */
.aurora-item { margin:0; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,.06); cursor:zoom-in; }
.aurora-item img { width:100%; height:auto; display:block; transition: transform .25s ease; }
.aurora-item:hover img { transform: scale(1.03); }
.aurora-item figcaption { font-size:.9rem; color:#666; padding:.5rem .75rem .75rem; }
.aurora-item--wide { grid-column: 1 / -1; }

/* Empty states */
.aurora-empty { text-align:center; padding:2rem 1rem; color:#666; border:2px dashed #e9e9e9; border-radius:12px; }

/* Lightbox */
.aurora-lightbox[hidden]{ display:none !important; }
.aurora-lightbox{ position:fixed; inset:0; background:rgba(0,0,0,.82); display:flex; align-items:center; justify-content:center; z-index:1050; padding:2rem; }
.aurora-lightbox .lb-img{ max-width: min(92vw, 1400px); max-height: 80vh; border-radius:12px; box-shadow: 0 8px 24px rgba(0,0,0,.35); }
.aurora-lightbox .lb-caption{ color:#f2f2f2; margin-top:.75rem; font-size:.95rem; text-align:center; max-width:85ch; }
.lb-close, .lb-prev, .lb-next {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,.1); color:#fff; border:0;
  padding:.4rem .6rem; border-radius:10px; font-size:2rem; line-height:1;
}
.lb-close { top: 1rem; right: 1rem; transform:none; font-size:2.25rem; }
.lb-prev { left: 1rem; }
.lb-next { right: 1rem; }

/* Back to top */
.aurora-backtop{
  position: fixed; right: 1rem; bottom: 1rem; text-decoration:none;
  background:#fff; border:1px solid #ddd; border-radius:999px; padding:.4rem .6rem;
  box-shadow:0 4px 12px rgba(0,0,0,.12); color:#333; font-weight:600; opacity:.9;
}
.aurora-backtop:hover{ opacity:1; }
</style>

<!-- SCRIPTS (requires jQuery + Bootstrap already on page) -->
<script>
(function(){
  // Deep-link tabs via URL hash
  function activateHashTab() {
    var hash = window.location.hash;
    if (hash && hash.indexOf('#tab-') === 0) { var $tab = $('a[href="'+hash+'"]'); if ($tab.length) $tab.tab('show'); }
    if (hash && hash.indexOf('#dash-') === 0) { var $tab2 = $('a[href="'+hash+'"]'); if ($tab2.length) $tab2.tab('show'); }
  }
  $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    var target = $(e.target).attr('href');
    if (history.pushState) history.pushState(null, null, target); else window.location.hash = target;
  });
  activateHashTab();
  $(window).on('hashchange', activateHashTab);

  // Lightbox scoped to the currently visible tab-content or dashboards section
  var lb = document.getElementById('auroraLightbox');
  if (!lb) return;

  var img = lb.querySelector('.lb-img');
  var cap = lb.querySelector('.lb-caption');
  var btnPrev = lb.querySelector('.lb-prev');
  var btnNext = lb.querySelector('.lb-next');
  var btnClose = lb.querySelector('.lb-close');

  var sources = [];
  var index = 0;

  function currentItems(){
    // prefer active tab; fallback to any grid in view
    var activePane = document.querySelector('.tab-pane.active');
    if (activePane) return Array.prototype.slice.call(activePane.querySelectorAll('.aurora-item'));
    return Array.prototype.slice.call(document.querySelectorAll('.aurora-grid .aurora-item'));
  }

  function collectSources() {
    var items = currentItems();
    sources = items.map(function(fig){
      var i = fig.querySelector('img');
      return {
        node: fig,
        src: i.getAttribute('src'),
        alt: i.getAttribute('alt') || '',
        cap: (fig.querySelector('figcaption') && fig.querySelector('figcaption').textContent || '').trim()
      };
    });
    items.forEach(function(fig, i){
      fig.setAttribute('tabindex','0');
      fig.setAttribute('role','button');
      var label = (fig.querySelector('figcaption') && fig.querySelector('figcaption').textContent || 'Open image').trim();
      fig.setAttribute('aria-label', label + ' (press Enter)');
      fig.onclick = function(){ openLB(i); };
      fig.onkeypress = function(e){ if (e.key === 'Enter') openLB(i); };
    });
  }

  function openLB(i){
    if (!sources.length) collectSources();
    index = (i + sources.length) % sources.length;
    var s = sources[index];
    img.src = s.src; img.alt = s.alt; cap.textContent = s.cap || s.alt || '';
    lb.hidden = false; document.body.style.overflow = 'hidden';
  }
  function closeLB(){
    lb.hidden = true; document.body.style.overflow = '';
    img.src = ''; img.alt = ''; cap.textContent = '';
  }
  function prevLB(){ openLB(index - 1); }
  function nextLB(){ openLB(index + 1); }

  $('a[data-toggle="tab"]').on('shown.bs.tab', function(){ collectSources(); });

  btnPrev.addEventListener('click', prevLB);
  btnNext.addEventListener('click', nextLB);
  btnClose.addEventListener('click', closeLB);
  lb.addEventListener('click', function(e){ if (e.target === lb) closeLB(); });
  window.addEventListener('keydown', function(e){
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') prevLB();
    if (e.key === 'ArrowRight') nextLB();
  });

  // Initial bind
  collectSources();
})();
</script>
