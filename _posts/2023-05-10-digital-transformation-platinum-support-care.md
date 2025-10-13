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

<!-- Scoped styles -->
<style>
/* Unified carousel appearance */
.portfolio-carousel { position: relative; overflow: visible; padding-bottom: 28px; }
.portfolio-carousel .carousel-indicators { bottom: 6px; }

/* Fixed viewport so slides don't jump */
.portfolio-carousel .carousel-inner { height: 520px; overflow: visible; }
.portfolio-carousel .carousel-inner > .item {
  height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: #fafafa;
}

/* Natural aspect (no crop/zoom by default) */
.portfolio-carousel .carousel-inner > .item img {
  max-height: 100%; width: auto; height: auto; object-fit: contain;
  display: block; margin: 0 auto; border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,.08);
  transition: transform .2s ease, box-shadow .2s ease;
  transform-origin: center center;
}

/* Zoom wrapper allows pop-out beyond the frame */
.zoom-wrap { display: inline-block; position: relative; overflow: visible; }
.zoom-wrap:hover img, .zoom-wrap:focus img {
  transform: scale(1.6);
  box-shadow: 0 8px 24px rgba(0,0,0,.25);
  z-index: 5;
}

/* Caption stays readable */
.portfolio-carousel .carousel-caption {
  background: rgba(0,0,0,0.45);
  border-radius: 6px;
  padding: 8px 12px;
  bottom: 16px;
  z-index: 6;
}

/* Controls accessibility focus ring */
.portfolio-carousel .left.carousel-control:focus,
.portfolio-carousel .right.carousel-control:focus { outline: 2px solid #2c3e50; }

/* Tabs */
.nav-tabs > li > a { padding: 10px 15px; }
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
- Solution design, data model, form design, BI KPIs, training & rollout.  
- Set up refresh monitoring and documentation for handover.

---
{% endcapture %}
{{ markdown | markdownify }}

### Screens / Media

<!-- Tabs -->
<ul class="nav nav-tabs nav-justified" role="tablist" style="margin-top:10px;">
  <li role="presentation" class="active">
    <a href="#platinum-access" aria-controls="platinum-access" role="tab" data-toggle="tab">Access (Data Layer)</a>
  </li>
  <li role="presentation">
    <a href="#platinum-powerbi" aria-controls="platinum-powerbi" role="tab" data-toggle="tab">Power BI (Reporting Layer)</a>
  </li>
</ul>

<div class="tab-content" style="margin-top:15px;">

  <!-- ACCESS CAROUSEL -->
  <div role="tabpanel" class="tab-pane fade in active" id="platinum-access">
    <h4 class="text-center">Microsoft Access (Data Layer)</h4>
    <div id="carousel-access" class="carousel slide portfolio-carousel" aria-label="Microsoft Access slides">
      <ol class="carousel-indicators">
        <li data-target="#carousel-access" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-access" data-slide-to="1"></li>
        <li data-target="#carousel-access" data-slide-to="2"></li>
        <li data-target="#carousel-access" data-slide-to="3"></li>
      </ol>

  <div class="carousel-inner" role="listbox">
        <div class="item active">
          <a class="zoom-wrap" href="img/portfolio/pscs/pscs_access_frm_1.png" target="_blank" rel="noopener">
            <img src="img/portfolio/pscs/pscs_access_frm_1.png" alt="Access data-entry form for Visits" class="img-responsive">
          </a>
          <div class="carousel-caption">Form: Visit entry</div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/pscs/pscs_access_rel_1.png" target="_blank" rel="noopener">
            <img src="img/portfolio/pscs/pscs_access_rel_1.png" alt="Access relationships diagram linking Clients, Staff, Schedules and Visits" class="img-responsive">
          </a>
          <div class="carousel-caption">Relationships</div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/pscs/pscs_access_tbl_1.png" target="_blank" rel="noopener">
            <img src="img/portfolio/pscs/pscs_access_tbl_1.png" alt="Access Visits table showing sample rows with durations and notes" class="img-responsive">
          </a>
          <div class="carousel-caption">Table view</div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/pscs/pscs_access_val_1.png" target="_blank" rel="noopener">
            <img src="img/portfolio/pscs/pscs_access_val_1.png" alt="Access validation message enforcing minimum duration" class="img-responsive">
          </a>
          <div class="carousel-caption">Validation rule</div>
        </div>
      </div>

      <a class="left carousel-control" href="#carousel-access" role="button" data-slide="prev" aria-label="Previous slide">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#carousel-access" role="button" data-slide="next" aria-label="Next slide">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
  </div>

  <!-- POWER BI CAROUSEL -->
  <div role="tabpanel" class="tab-pane fade" id="platinum-powerbi">
    <h4 class="text-center">Power BI (Reporting Layer)</h4>
    <div id="carousel-powerbi" class="carousel slide portfolio-carousel" aria-label="Power BI slides">
      <ol class="carousel-indicators">
        <li data-target="#carousel-powerbi" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-powerbi" data-slide-to="1"></li>
        <li data-target="#carousel-powerbi" data-slide-to="2"></li>
        <li data-target="#carousel-powerbi" data-slide-to="3"></li>
      </ol>

  <div class="carousel-inner" role="listbox">
        <div class="item active">
          <a class="zoom-wrap" href="img/portfolio/pscs/pscs_powerbi_import_1.png" target="_blank" rel="noopener">
            <img src="img/portfolio/pscs/pscs_powerbi_import_1.png" alt="Power BI get data dialog with Access connector selected" class="img-responsive">
          </a>
          <div class="carousel-caption">Import (Access)</div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/pscs/pscs_powerbi_pq_1.png" target="_blank" rel="noopener">
            <img src="img/portfolio/pscs/pscs_powerbi_pq_1.png" alt="Power Query editor preview of the Training table" class="img-responsive">
          </a>
          <div class="carousel-caption">Power Query</div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/pscs/pscs_powerbi_rel_1.png" target="_blank" rel="noopener">
            <img src="img/portfolio/pscs/pscs_powerbi_rel_1.png" alt="Power BI data model showing relationships between fact and dimension tables" class="img-responsive">
          </a>
          <div class="carousel-caption">Data model</div>
        </div>
        <div class="item">
          <a class="zoom-wrap" href="img/portfolio/pscs/pscs_powerbi_vis_1.png" target="_blank" rel="noopener">
            <img src="img/portfolio/pscs/pscs_powerbi_vis_1.png" alt="Power BI KPI visuals showing visits, average duration and completions" class="img-responsive">
          </a>
          <div class="carousel-caption">KPI dashboard</div>
        </div>
      </div>

      <a class="left carousel-control" href="#carousel-powerbi" role="button" data-slide="prev" aria-label="Previous slide">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#carousel-powerbi" role="button" data-slide="next" aria-label="Next slide">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
  </div>

</div>

<!-- JS helper to pause non-visible carousels and resume active -->
<script>
  (function ($) {
    var ids = ['#carousel-access', '#carousel-powerbi'];
    var $cars = $(ids.join(','));

    // Initialize once (no repeated ride triggers)
    $cars.carousel({ interval: 6000, pause: 'hover', wrap: true });

    function cycleOnly($el) {
      $cars.carousel('pause');
      if ($el && $el.length) { $el.carousel('cycle'); }
    }

    // Start correct carousel when modal opens
    $('#{{ page.modal-id | default: "project-platinum" }}').on('shown.bs.modal', function () {
      var $active = $('.tab-pane.in.active').find('.carousel');
      if (!$active.length) { $active = $('#platinum-access .carousel'); } // fallback
      cycleOnly($active);
    });

    // Pause all when modal closes
    $('#{{ page.modal-id | default: "project-platinum" }}').on('hide.bs.modal', function () {
      $cars.carousel('pause');
    });

    // Switch active carousel on tab change (no reset)
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr('href');
      cycleOnly($(target).find('.carousel'));
    });
  })(jQuery);
</script>
