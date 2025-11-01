---
layout: post
title: "Aurora Domiciliary Care – NHSCT Analytics & Digital Transformation"
subtitle: "Northern Ireland locality model | ECM realism | Power BI transformation suite"
modal-id: project-aurora-nhsct
thumbnail: /img/portfolio/aurora/aurora_dashboard_kpi_pbi.png
img: /img/portfolio/aurora/aurora_dashboard_ops_ws.png
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

### <span id="dashboards">🖥️ Dashboards</span>

**Executive KPI Dashboard**  
![Aurora KPI Dashboard](/img/portfolio/aurora/aurora_dashboard_kpi_pbi.png "Executive KPI Dashboard")

**Operations View**  
![Aurora Operations Dashboard](/img/portfolio/aurora/aurora_dashboard_ops_pbi.png "Operations Performance Overview")

**Finance Analytics**  
![Aurora Finance Dashboard](/img/portfolio/aurora/aurora_dashboard_finance_pbi.png "Finance Claimed vs Paid Analysis")

**Compliance & Quality**  
![Aurora Compliance Dashboard](/img/portfolio/aurora/aurora_dashboard_qa_pbi.png "RQIA, Incidents, and Complaints Overview")

**Workforce Snapshot (Mobile)**  
![Aurora Workforce Mobile](/img/portfolio/aurora/aurora_dashboard_wf_mobile_pbi.png "Workforce KPIs – Mobile")

**Runs & Rotas (Mobile)**  
![Aurora R&R Mobile](/img/portfolio/aurora/aurora_dashboard_rr_mobile_pbi.png "Runs & Rotas – Mobile")

**Power BI Measure Examples**  
![Aurora Measure Example 1](/img/portfolio/aurora/aurora_measure_example_1.png "Power BI DAX Example 1")  
![Aurora Measure Example 2](/img/portfolio/aurora/aurora_measure_example_2.png "Power BI DAX Example 2")  
![Aurora Measure Example 3](/img/portfolio/aurora/aurora_measure_example_3.png "Power BI DAX Example 3")

> All data is **synthetic**, **NHSCT-locality accurate**, and **Power BI ready**.  
> 📦 Download: Dataset ZIP + Excel Analyst Toolkit linked on this page.

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

## <span id="gallery">🗂️ Gallery (Tabbed)</span>

<!-- Tabs -->
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

  <!-- POWER BI -->
  <div role="tabpanel" class="tab-pane fade in active" id="tab-powerbi">
    <div class="aurora-grid" role="list">
      <figure class="aurora-item" role="listitem" data-index="0">
        <img src="/img/portfolio/aurora/aurora_dashboard_kpi_pbi.png" alt="Executive KPI Dashboard" loading="lazy">
        <figcaption>Executive KPI Dashboard</figcaption>
      </figure>
      <figure class="aurora-item" role="listitem" data-index="1">
        <img src="/img/portfolio/aurora/aurora_dashboard_ops_pbi.png" alt="Operations Performance Overview" loading="lazy">
        <figcaption>Operations Performance Overview</figcaption>
      </figure>
      <figure class="aurora-item" role="listitem" data-index="2">
        <img src="/img/portfolio/aurora/aurora_dashboard_finance_pbi.png" alt="Finance Claimed vs Paid Analysis" loading="lazy">
        <figcaption>Finance Claimed vs Paid</figcaption>
      </figure>
      <figure class="aurora-item" role="listitem" data-index="3">
        <img src="/img/portfolio/aurora/aurora_dashboard_qa_pbi.png" alt="Compliance: RQIA, Incidents, Complaints" loading="lazy">
        <figcaption>Compliance & Quality</figcaption>
      </figure>
      <figure class="aurora-item" role="listitem" data-index="4">
        <img src="/img/portfolio/aurora/aurora_dashboard_wf_mobile_pbi.png" alt="Workforce KPIs (mobile)" loading="lazy">
        <figcaption>Workforce (Mobile)</figcaption>
      </figure>
      <figure class="aurora-item" role="listitem" data-index="5">
        <img src="/img/portfolio/aurora/aurora_dashboard_rr_mobile_pbi.png" alt="Runs & Rotas (mobile)" loading="lazy">
        <figcaption>Runs & Rotas (Mobile)</figcaption>
      </figure>
      <figure class="aurora-item" role="listitem" data-index="6">
        <img src="/img/portfolio/aurora/aurora_measure_example_1.png" alt="Power BI DAX Measure Example 1" loading="lazy">
        <figcaption>DAX Measure – Example 1</figcaption>
      </figure>
      <figure class="aurora-item" role="listitem" data-index="7">
        <img src="/img/portfolio/aurora/aurora_measure_example_2.png" alt="Power BI DAX Measure Example 2" loading="lazy">
        <figcaption>DAX Measure – Example 2</figcaption>
      </figure>
      <figure class="aurora-item" role="listitem" data-index="8">
        <img src="/img/portfolio/aurora/aurora_measure_example_3.png" alt="Power BI DAX Measure Example 3" loading="lazy">
        <figcaption>DAX Measure – Example 3</figcaption>
      </figure>
      <figure class="aurora-item aurora-item--wide" role="listitem" data-index="9">
        <img src="/img/portfolio/aurora/aurora_dashboard_ops_ws.png" alt="Wide overview of Operations dashboard" loading="lazy">
        <figcaption>Operations Dashboard – Wide Overview</figcaption>
      </figure>
    </div>
  </div>

  <!-- EXCEL -->
  <div role="tabpanel" class="tab-pane fade" id="tab-excel">
    <div class="aurora-empty">
      <p class="lead">Excel Analyst Toolkit</p>
      <p>Add screenshots here (e.g., pivots, slicers, validation charts). Place new images in <code>/img/portfolio/aurora/</code> and duplicate any <code>&lt;figure&gt;</code> from the Power BI tab with updated filenames.</p>
      <ol class="mb-0">
        <li>Suggested names: <code>aurora_excel_pivots.png</code>, <code>aurora_excel_slicers.png</code></li>
        <li>Update <code>src</code>, <code>alt</code>, and caption text.</li>
      </ol>
    </div>
  </div>

  <!-- ACCESS (TBC) -->
  <div role="tabpanel" class="tab-pane fade" id="tab-access">
    <div class="aurora-empty">
      <p class="lead">Access Data Model (TBC)</p>
      <p>Future images: schema diagram, table validation, audit trail examples. When ready, add files like <code>aurora_access_schema.png</code> and duplicate a figure block here.</p>
    </div>
  </div>
</div>

<!-- Accessible Lightbox Modal (shared by all tabs) -->
<div class="aurora-lightbox" id="auroraLightbox" aria-modal="true" role="dialog" aria-label="Image viewer" hidden>
  <button class="lb-close" type="button" aria-label="Close (Esc)">&times;</button>
  <button class="lb-prev" type="button" aria-label="Previous (←)">&lsaquo;</button>
  <img class="lb-img" src="" alt="">
  <div class="lb-caption" id="lbCaption"></div>
  <button class="lb-next" type="button" aria-label="Next (→)">&rsaquo;</button>
</div>

<a class="aurora-backtop" href="#page-top" aria-label="Back to top">↑</a>

<!-- STYLES (safe to include inline for this post) -->
<style>
/* Quick nav chips */
.aurora-toc {
  display:flex; flex-wrap:wrap; gap:.5rem; margin: 0 0 1rem 0;
}
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
.aurora-grid {
  display:grid; gap:1rem; margin-top:.25rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
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
.aurora-lightbox{
  position:fixed; inset:0; background:rgba(0,0,0,.82);
  display:flex; align-items:center; justify-content:center; z-index:1050;
  padding:2rem;
}
.aurora-lightbox .lb-img{
  max-width: min(92vw, 1400px);
  max-height: 80vh;
  border-radius:12px; box-shadow: 0 8px 24px rgba(0,0,0,.35);
}
.aurora-lightbox .lb-caption{
  color:#f2f2f2; margin-top:.75rem; font-size:.95rem; text-align:center; max-width:85ch;
}
.lb-close, .lb-prev, .lb-next {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,.1); color:#fff; border:0;
  padding:.4rem .6rem; border-radius:10px; font-size:2rem; line-height:1;
}
.lb-close { top: 1rem; right: 1rem; transform:none; font-size:2.25rem; }
.lb-prev { left: 1rem; }
.lb-next { right: 1rem; }

/* Back to top button */
.aurora-backtop{
  position: fixed; right: 1rem; bottom: 1rem; text-decoration:none;
  background:#fff; border:1px solid #ddd; border-radius:999px; padding:.4rem .6rem;
  box-shadow:0 4px 12px rgba(0,0,0,.12); color:#333; font-weight:600;
  opacity:.9;
}
.aurora-backtop:hover{ opacity:1; }
</style>

<!-- SCRIPTS (requires jQuery + Bootstrap already on page) -->
<script>
(function(){
  // Deep-link tabs via URL hash (#tab-powerbi, #tab-excel, #tab-access)
  function activateHashTab() {
    var hash = window.location.hash;
    if (hash && hash.indexOf('#tab-') === 0) {
      var $tab = $('a[href="'+hash+'"]');
      if ($tab.length) $tab.tab('show');
    }
  }
  $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    var target = $(e.target).attr('href');
    if (history.pushState) history.pushState(null, null, target);
    else window.location.hash = target;
  });
  activateHashTab();
  $(window).on('hashchange', activateHashTab);

  // Accessible Lightbox, scoped to visible tab
  var lb = document.getElementById('auroraLightbox');
  if (!lb) return;

  var img = lb.querySelector('.lb-img');
  var cap = lb.querySelector('.lb-caption');
  var btnPrev = lb.querySelector('.lb-prev');
  var btnNext = lb.querySelector('.lb-next');
  var btnClose = lb.querySelector('.lb-close');

  var sources = [];
  var index = 0;

  function collectSources() {
    var activePane = document.querySelector('.tab-pane.active');
    var items = activePane ? Array.prototype.slice.call(activePane.querySelectorAll('.aurora-item')) : [];
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
