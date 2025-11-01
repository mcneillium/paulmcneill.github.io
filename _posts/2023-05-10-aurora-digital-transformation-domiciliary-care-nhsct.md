---
layout: post
title: "Aurora Domiciliary Care – NHSCT Analytics & Digital Transformation"
subtitle: "Northern Ireland locality model | ECM realism | Power BI transformation suite"
modal-id: project-aurora-nhsct
thumbnail: /img/portfolio/aurora/aurora_dashboard_kpi_pbi.png
img: /img/portfolio/aurora/aurora_dashboard_ops_pbi.png
alt: "NHSCT Power BI dashboards for Operations, Finance, Workforce & Compliance"
project-date: 2025-10-31
category: projects
description: "Comprehensive Northern Ireland domiciliary care analytics platform built for Aurora Domiciliary Care Ltd — combining Access/SQL data layers, Power BI dashboards, remittance automation, ECM realism, and RQIA compliance oversight."
github-url: https://github.com/mcneillium/Aurora-Domiciliary-Care
youtube-url:
---

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

## <span id="gallery">🗂️ Gallery (click to enlarge)</span>

<div class="aurora-grid" role="list">
  <!-- Use data-index for lightbox navigation order -->
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

  <!-- Optional wide overview hero if you want it included -->
  <figure class="aurora-item aurora-item--wide" role="listitem" data-index="9">
    <img src="/img/portfolio/aurora/aurora_dashboard_ops_ws.png" alt="Wide overview of Operations dashboard" loading="lazy">
    <figcaption>Operations Dashboard – Wide Overview</figcaption>
  </figure>
</div>

<!-- Accessible Lightbox Modal -->
<div class="aurora-lightbox" id="auroraLightbox" aria-modal="true" role="dialog" aria-label="Image viewer" hidden>
  <button class="lb-close" type="button" aria-label="Close (Esc)">&times;</button>
  <button class="lb-prev" type="button" aria-label="Previous (←)">&lsaquo;</button>
  <img class="lb-img" src="" alt="">
  <div class="lb-caption" id="lbCaption"></div>
  <button class="lb-next" type="button" aria-label="Next (→)">&rsaquo;</button>
</div>

<a class="aurora-backtop" href="#top" aria-label="Back to top">↑</a>

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

/* Gallery grid 3/2/1 */
.aurora-grid {
  display:grid; gap:1rem; margin-top:1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
@media (max-width: 991px){ .aurora-grid{ grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 575px){ .aurora-grid{ grid-template-columns: 1fr; } }

/* Items */
.aurora-item { margin:0; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,.06); cursor:zoom-in; }
.aurora-item img { width:100%; height:auto; display:block; transition: transform .25s ease; }
.aurora-item:hover img { transform: scale(1.03); }
.aurora-item figcaption { font-size:.9rem; color:#666; padding:.5rem .75rem .75rem; }
.aurora-item--wide { grid-column: 1 / -1; }

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

/* Back to top */
.aurora-backtop{
  position: fixed; right: 1rem; bottom: 1rem; text-decoration:none;
  background:#fff; border:1px solid #ddd; border-radius:999px; padding:.4rem .6rem;
  box-shadow:0 4px 12px rgba(0,0,0,.12); color:#333; font-weight:600;
  opacity:.9;
}
.aurora-backtop:hover{ opacity:1; }
</style>

<script>
// Simple lightbox with keyboard navigation
(function(){
  const items = Array.from(document.querySelectorAll('.aurora-item'));
  const lb = document.getElementById('auroraLightbox');
  if (!lb || !items.length) return;

  const img = lb.querySelector('.lb-img');
  const cap = lb.querySelector('.lb-caption');
  const btnPrev = lb.querySelector('.lb-prev');
  const btnNext = lb.querySelector('.lb-next');
  const btnClose = lb.querySelector('.lb-close');

  const sources = items.map(fig => {
    const i = fig.querySelector('img');
    return {
      src: i.getAttribute('src'),
      alt: i.getAttribute('alt') || '',
      cap: fig.querySelector('figcaption')?.textContent?.trim() || ''
    };
  });

  let index = 0;

  function open(idx){
    index = (idx + sources.length) % sources.length;
    const s = sources[index];
    img.src = s.src;
    img.alt = s.alt;
    cap.textContent = s.cap || s.alt || '';
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lb.hidden = true;
    document.body.style.overflow = '';
    img.src = '';
    img.alt = '';
    cap.textContent = '';
  }
  function prev(){ open(index - 1); }
  function next(){ open(index + 1); }

  items.forEach((fig, i) => {
    fig.addEventListener('click', () => open(i));
    fig.addEventListener('keypress', (e) => { if (e.key === 'Enter') open(i); });
    fig.setAttribute('tabindex', '0');
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-label', (fig.querySelector('figcaption')?.textContent || 'Open image') + ' (press Enter)');
  });

  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  btnClose.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

  window.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
</script>
