---
layout: post
title: "Digital Transformation – Domiciliary Care Company"
subtitle: "Access apps, Power BI KPIs & mobile logging for carers"
modal-id: project-platinum
thumbnail: platinum-powerbi-access.png
img: platinum-powerbi-access.png
alt: "Domiciliary Care - Excel, Access & Power BI"
project-date: 2019-11-15
category: projects
description: "Taking operations from paper to digital with Excel, Access, Power BI, & mobile logging for carers."
github-url:
youtube-url:
---

<!-- Styles: tile gallery + viewer -->
<style>
/* Keep the entire modal usable on one screen */
.modal .modal-body { max-height: calc(100vh - 160px); overflow-y: auto; }

/* TILES */
.tile-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 8px;
}
.tile {
  background:#fafafa; border-radius:10px; overflow:hidden; position:relative;
  box-shadow: 0 2px 6px rgba(0,0,0,.08); transition: transform .18s ease, box-shadow .18s ease;
}
.tile:focus-within, .tile:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.18); }
.tile a { display:block; text-decoration:none; outline:0; }
.tile img {
  width:100%; height:180px; object-fit:cover; display:block;
  transition: transform .18s ease;
}
.tile:hover img { transform: scale(1.04); }
.tile .cap {
  position:absolute; left:8px; bottom:8px; right:8px;
  background: rgba(0,0,0,.55); color:#fff; font-size:13px; padding:6px 8px; border-radius:6px;
}

/* Viewer (single modal, custom controls) */
.viewer-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.8);
  display: none; align-items: center; justify-content: center; z-index: 9999;
}
.viewer-backdrop.open { display: flex; }
.viewer {
  position: relative; max-width: min(92vw, 1200px); max-height: 86vh;
  background: #111; border-radius: 10px; overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,.6);
  display:flex; flex-direction:column;
}
.viewer-header {
  display:flex; align-items:center; justify-content:space-between;
  padding:10px 12px; color:#eee; font-size:14px; background:#1b1b1b;
}
.viewer-body { position:relative; flex:1; display:flex; align-items:center; justify-content:center; background:#0f0f0f; }
.viewer-body img {
  max-width: 100%; max-height: 100%; object-fit: contain; display:block;
}
.viewer-caption {
  color:#eaeaea; background:#151515; font-size:14px; padding:10px 12px;
}

/* Controls */
.viewer-btn {
  position:absolute; top:50%; transform: translateY(-50%);
  width:44px; height:44px; border:none; border-radius:50%;
  background: rgba(255,255,255,.1); color:#fff; cursor:pointer;
}
.viewer-btn:hover { background: rgba(255,255,255,.2); }
.viewer-prev { left:10px; }
.viewer-next { right:10px; }
.viewer-close {
  background: transparent; border:none; color:#eee; font-size:20px; line-height:1;
  cursor:pointer; padding:4px 8px;
}

/* Keyboard focus */
.viewer-btn:focus, .viewer-close:focus, .tile a:focus { outline: 2px solid #2c7be5; outline-offset:2px; }

/* Tabs spacing */
.nav-tabs > li > a { padding: 10px 15px; }

/* Small screens: auto height tiles */
@media (max-width: 767px) {
  .tile img { height: 160px; }
}

/* Hide old carousel-specific classes if still present */
.portfolio-carousel { display:none !important; }
</style>

{% capture markdown %}
### Overview
End-to-end **digitization of daily operations**: centralized data, mobile logging for carers, and KPIs that leadership actually use.

---

### From Paper → Platform
- **Central Access database** for staff, clients, visits, incidents.
- **Mobile forms** (phone/tablet) → structured logs with validations.
- **Power BI**: utilization, care hours, outcomes, safeguarding, compliance.

### Highlights
- **Role-based access** (office, supervisor, carer) & audit trails.
- **Operational KPIs**: missed visits, response times, overtime, outcomes.
- **Scheduled refresh** for morning stand-ups and weekly reviews.

---

### Outcomes
- **Paper reduced to near-zero**; fewer transcription errors.
- **Faster incident response** with structured, real-time logging.
- **Better visibility** on service delivery and staff utilization.

---

### Approach
1. **Discovery**: map processes, paper forms, and reporting needs.  
2. **MVP**: Access tables + mobile forms; iterate weekly with field teams.  
3. **Scale**: Power BI dashboards, training, governance, refresh schedules.

---

### Stack
Access, Power BI, Power Query, Excel, SharePoint/Teams, (optional) Power Apps

---

### My Role
1. Solution design, data model, form design, BI KPIs, training & rollout.  
2. Set up refresh monitoring and documentation for handover.

---
{% endcapture %}
{{ markdown | markdownify }}

### Screens / Media

<!-- Tabs -->
<ul class="nav nav-tabs nav-justified" role="tablist" style="margin-top:10px;">
  <li role="presentation" class="active">
    <a href="#{{ page.modal-id }}-access" aria-controls="{{ page.modal-id }}-access" role="tab" data-toggle="tab">Access (Data Layer)</a>
  </li>
  <li role="presentation">
    <a href="#{{ page.modal-id }}-powerbi" aria-controls="{{ page.modal-id }}-powerbi" role="tab" data-toggle="tab">Power BI (Reporting Layer)</a>
  </li>
</ul>

<div class="tab-content" style="margin-top:15px;">

  <!-- ACCESS GALLERY -->
  <div role="tabpanel" class="tab-pane fade in active" id="{{ page.modal-id }}-access">
    <h4 class="text-center">Microsoft Access (Data Layer)</h4>
    <div class="tile-gallery" data-album="{{ page.modal-id }}-access">
      <div class="tile">
        <a href="img/portfolio/pscs/pscs_access_frm_1.png" data-caption="Form: Visit entry" data-index="0">
          <img src="img/portfolio/pscs/pscs_access_frm_1.png" alt="Access data-entry form for Visits" loading="lazy">
          <div class="cap">Form: Visit entry</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/pscs/pscs_access_rel_1.png" data-caption="Relationships" data-index="1">
          <img src="img/portfolio/pscs/pscs_access_rel_1.png" alt="Access relationships diagram linking Clients, Staff, Schedules and Visits" loading="lazy">
          <div class="cap">Relationships</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/pscs/pscs_access_tbl_1.png" data-caption="Table view" data-index="2">
          <img src="img/portfolio/pscs/pscs_access_tbl_1.png" alt="Access Visits table showing sample rows with durations and notes" loading="lazy">
          <div class="cap">Table view</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/pscs/pscs_access_val_1.png" data-caption="Validation rule" data-index="3">
          <img src="img/portfolio/pscs/pscs_access_val_1.png" alt="Access validation message enforcing minimum duration" loading="lazy">
          <div class="cap">Validation rule</div>
        </a>
      </div>
    </div>
  </div>

  <!-- POWER BI GALLERY -->
  <div role="tabpanel" class="tab-pane fade" id="{{ page.modal-id }}-powerbi">
    <h4 class="text-center">Power BI (Reporting Layer)</h4>
    <div class="tile-gallery" data-album="{{ page.modal-id }}-powerbi">
      <div class="tile">
        <a href="img/portfolio/pscs/pscs_powerbi_import_1.png" data-caption="Import (Access)" data-index="0">
          <img src="img/portfolio/pscs/pscs_powerbi_import_1.png" alt="Power BI get data dialog with Access connector selected" loading="lazy">
          <div class="cap">Import (Access)</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/pscs/pscs_powerbi_pq_1.png" data-caption="Power Query" data-index="1">
          <img src="img/portfolio/pscs/pscs_powerbi_pq_1.png" alt="Power Query editor preview of the Training table" loading="lazy">
          <div class="cap">Power Query</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/pscs/pscs_powerbi_rel_1.png" data-caption="Data model" data-index="2">
          <img src="img/portfolio/pscs/pscs_powerbi_rel_1.png" alt="Power BI data model showing relationships between fact and dimension tables" loading="lazy">
          <div class="cap">Data model</div>
        </a>
      </div>
      <div class="tile">
        <a href="img/portfolio/pscs/pscs_powerbi_vis_1.png" data-caption="KPI dashboard" data-index="3">
          <img src="img/portfolio/pscs/pscs_powerbi_vis_1.png" alt="Power BI KPI visuals showing visits, average duration and completions" loading="lazy">
          <div class="cap">KPI dashboard</div>
        </a>
      </div>
    </div>
  </div>

</div>

<!-- Single shared lightbox viewer (no Bootstrap carousel) -->
<div class="viewer-backdrop" id="{{ page.modal-id }}-viewer" aria-hidden="true" role="dialog" aria-label="Image viewer">
  <div class="viewer" role="document">
    <div class="viewer-header">
      <div><span id="{{ page.modal-id }}-viewer-pos">1/4</span></div>
      <button class="viewer-close" type="button" aria-label="Close viewer" id="{{ page.modal-id }}-viewer-close">✕</button>
    </div>
    <div class="viewer-body" id="{{ page.modal-id }}-viewer-body">
      <button class="viewer-btn viewer-prev" type="button" aria-label="Previous image" id="{{ page.modal-id }}-viewer-prev">‹</button>
      <img id="{{ page.modal-id }}-viewer-img" alt="">
      <button class="viewer-btn viewer-next" type="button" aria-label="Next image" id="{{ page.modal-id }}-viewer-next">›</button>
    </div>
    <div class="viewer-caption" id="{{ page.modal-id }}-viewer-cap">Caption</div>
  </div>
</div>

<!-- Minimal JS: album-aware viewer with keyboard + touch -->
<script>
(function () {
  var VIEWER_ID = "{{ page.modal-id }}-viewer";
  var $backdrop = document.getElementById(VIEWER_ID);
  var $img = document.getElementById("{{ page.modal-id }}-viewer-img");
  var $cap = document.getElementById("{{ page.modal-id }}-viewer-cap");
  var $pos = document.getElementById("{{ page.modal-id }}-viewer-pos");
  var $prev = document.getElementById("{{ page.modal-id }}-viewer-prev");
  var $next = document.getElementById("{{ page.modal-id }}-viewer-next");
  var $close = document.getElementById("{{ page.modal-id }}-viewer-close");

  // Build album maps from the DOM
  var albums = {}; // albumId -> [{src, cap, thumbEl}, ...]
  document.querySelectorAll('.tile-gallery').forEach(function(g) {
    var id = g.getAttribute('data-album');
    var items = [];
    g.querySelectorAll('a[href][data-index]').forEach(function(a) {
      items.push({
        src: a.getAttribute('href'),
        cap: a.getAttribute('data-caption') || a.querySelector('.cap')?.textContent || '',
        thumbEl: a
      });
    });
    albums[id] = items;
  });

  var state = { albumId: null, index: 0 };

  function openViewer(albumId, index) {
    var items = albums[albumId] || [];
    if (!items.length) return;
    state.albumId = albumId;
    state.index = Math.max(0, Math.min(index, items.length - 1));
    render();
    $backdrop.classList.add('open');
    $backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus close for a11y
    $close.focus();
  }

  function closeViewer() {
    $backdrop.classList.remove('open');
    $backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function render() {
    var items = albums[state.albumId];
    var it = items[state.index];
    // Preload next/prev lightly
    var preload = [state.index + 1, state.index - 1].filter(function(i){ return i>=0 && i<items.length; });
    preload.forEach(function(i){ var p = new Image(); p.src = items[i].src; });

    $img.src = it.src;
    $img.alt = it.cap || "Image " + (state.index + 1);
    $cap.textContent = it.cap || '';
    $pos.textContent = (state.index + 1) + "/" + items.length;
    // toggle buttons on edges
    $prev.style.visibility = (state.index > 0) ? 'visible' : 'hidden';
    $next.style.visibility = (state.index < items.length - 1) ? 'visible' : 'hidden';
  }

  function next() {
    var items = albums[state.albumId];
    if (state.index < items.length - 1) { state.index++; render(); }
  }
  function prev() {
    if (state.index > 0) { state.index--; render(); }
  }

  // Click handlers on tiles
  document.querySelectorAll('.tile-gallery a[data-index]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      var albumEl = a.closest('.tile-gallery');
      var albumId = albumEl.getAttribute('data-album');
      var idx = parseInt(a.getAttribute('data-index'), 10) || 0;
      openViewer(albumId, idx);
    });
  });

  // Viewer controls
  $next.addEventListener('click', next);
  $prev.addEventListener('click', prev);
  $close.addEventListener('click', closeViewer);
  $backdrop.addEventListener('click', function(e) {
    // Close if clicking backdrop (not when clicking inside the viewer panel)
    if (e.target === $backdrop) closeViewer();
  });

  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (!$backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Touch swipe
  (function addSwipe(el){
    var x0=null,y0=null;
    el.addEventListener('touchstart', function(e){
      var t=e.touches[0]; x0=t.clientX; y0=t.clientY;
    }, {passive:true});
    el.addEventListener('touchmove', function(e){
      if(x0===null) return;
      var t=e.touches[0]; var dx=t.clientX-x0; var dy=t.clientY-y0;
      if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)){
        if(dx<0) next(); else prev();
        x0=null; y0=null;
      }
    }, {passive:true});
    el.addEventListener('touchend', function(){ x0=null; y0=null; });
  })($backdrop);

  // Maintain tab-specific albums automatically (no extra JS needed).
})();
</script>
