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
/* Keep the entire modal usable on one screen */
.modal .modal-body {
  max-height: calc(100vh - 160px);
  overflow-y: auto;
}

/* Unified carousel viewport: fixed to the screen, not content */
.portfolio-carousel {
  position: relative;
  height: 60vh;              /* one window */
  max-height: 620px;         /* cap on large screens */
  min-height: 360px;         /* floor on small screens */
  overflow: hidden;          /* children can't increase height */
  padding-bottom: 28px;      /* space for indicators */
}

/* Indicators stay inside */
.portfolio-carousel .carousel-indicators { bottom: 6px; }

/* Slides fill the viewport without changing it */
.portfolio-carousel .carousel-inner,
.portfolio-carousel .carousel-inner > .item { height: 100%; }
.portfolio-carousel .carousel-inner > .item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}

/* Images are contained (no crop, no stretch) */
.portfolio-carousel .carousel-inner > .item img {
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,.08);
  transition: transform .2s ease, box-shadow .2s ease;
  transform-origin: center center;
}

/* Gentle hover zoom that stays inside the slide */
.zoom-wrap {
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.zoom-wrap:hover img,
.zoom-wrap:focus img {
  transform: scale(1.15);
  box-shadow: 0 8px 24px rgba(0,0,0,.25);
  z-index: 1;
}

/* Caption overlays; never pushes height */
.portfolio-carousel .carousel-caption {
  background: rgba(0,0,0,0.45);
  border-radius: 6px;
  padding: 8px 12px;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  max-width: 85%;
  z-index: 2;
}

/* Controls accessibility focus ring */
.portfolio-carousel .left.carousel-control:focus,
.portfolio-carousel .right.carousel-control:focus { outline: 2px solid #2c3e50; }

/* Tabs */
.nav-tabs > li > a { padding: 10px 15px; }

/* Small screens: slightly shorter viewport */
@media (max-width: 767px) {
  .portfolio-carousel {
    height: 54vh;
    min-height: 300px;
  }
}

/* --- POP-ON-SCROLL effect (applies once when slide comes into view) --- */
.portfolio-carousel .carousel-inner > .item img.pop-on {}
.portfolio-carousel .carousel-inner > .item img.pop-on.popped {
  transform: scale(1.06);
  box-shadow: 0 10px 28px rgba(0,0,0,.28);
  transition: transform .25s ease, box-shadow .25s ease;
}
@media (min-width: 992px) {
  .portfolio-carousel .carousel-inner > .item img.pop-on.popped { transform: scale(1.08); }
}
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
    <a href="#{{ page.modal-id }}-access" aria-controls="{{ page.modal-id }}-access" role="tab" data-toggle="tab">Access (Data Layer)</a>
  </li>
  <li role="presentation">
    <a href="#{{ page.modal-id }}-powerbi" aria-controls="{{ page.modal-id }}-powerbi" role="tab" data-toggle="tab">Power BI (Reporting Layer)</a>
  </li>
</ul>

<div class="tab-content" style="margin-top:15px;">

  <!-- ACCESS CAROUSEL -->
  <div role="tabpanel" class="tab-pane fade in active" id="{{ page.modal-id }}-access">
    <h4 class="text-center">Microsoft Access (Data Layer)</h4>
    <div id="{{ page.modal-id }}-carousel-access" class="carousel slide portfolio-carousel" aria-label="Microsoft Access slides">
      <ol class="carousel-indicators">
        <li data-target="#{{ page.modal-id }}-carousel-access" data-slide-to="0" class="active"></li>
        <li data-target="#{{ page.modal-id }}-carousel-access" data-slide-to="1"></li>
        <li data-target="#{{ page.modal-id }}-carousel-access" data-slide-to="2"></li>
        <li data-target="#{{ page.modal-id }}-carousel-access" data-slide-to="3"></li>
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

      <a class="left carousel-control" href="#{{ page.modal-id }}-carousel-access" role="button" data-slide="prev" aria-label="Previous slide">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#{{ page.modal-id }}-carousel-access" role="button" data-slide="next" aria-label="Next slide">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
  </div>

  <!-- POWER BI CAROUSEL -->
  <div role="tabpanel" class="tab-pane fade" id="{{ page.modal-id }}-powerbi">
    <h4 class="text-center">Power BI (Reporting Layer)</h4>
    <div id="{{ page.modal-id }}-carousel-powerbi" class="carousel slide portfolio-carousel" aria-label="Power BI slides">
      <ol class="carousel-indicators">
        <li data-target="#{{ page.modal-id }}-carousel-powerbi" data-slide-to="0" class="active"></li>
        <li data-target="#{{ page.modal-id }}-carousel-powerbi" data-slide-to="1"></li>
        <li data-target="#{{ page.modal-id }}-carousel-powerbi" data-slide-to="2"></li>
        <li data-target="#{{ page.modal-id }}-carousel-powerbi" data-slide-to="3"></li>
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

      <a class="left carousel-control" href="#{{ page.modal-id }}-carousel-powerbi" role="button" data-slide="prev" aria-label="Previous slide">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#{{ page.modal-id }}-carousel-powerbi" role="button" data-slide="next" aria-label="Next slide">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
  </div>

</div>

<!-- JS: preserve current slide index + pop-on-scroll images -->
<script>
  (function ($) {
    // Carousels in this modal
    var carIds = [
      '#{{ page.modal-id }}-carousel-access',
      '#{{ page.modal-id }}-carousel-powerbi'
    ];
    // Remove any data-ride to prevent Bootstrap auto re-init
    carIds.forEach(function(sel){ $(sel).removeAttr('data-ride'); });

    var $cars = $(carIds.join(','));
    $cars.carousel({ interval: 6000, pause: 'hover', wrap: true });

    /* --- Keep current slide (no reset to first) --- */
    var idxState = {}; // { 'carousel-id': currentIndex }

    // Capture next index during slide
    $cars.on('slide.bs.carousel', function (e) {
      var id = this.id;
      idxState[id] = $(e.relatedTarget).index();
    });

    function resume($car) {
      if (!$car || !$car.length) return;
      var id = $car.attr('id');
      var toIdx = (typeof idxState[id] === 'number')
        ? idxState[id]
        : ($car.find('.item.active').index() || 0);
      $cars.carousel('pause');     // pause all
      $car.carousel(toIdx);        // go to saved index
      $car.carousel('cycle');      // then cycle only this one
    }

    // Detect modal element (common templates: #portfolioModal{{id}} or #{{id}})
    var modalSelPrimary = '#portfolioModal{{ page.modal-id | default: "project-platinum" }}';
    var modalSelFallback = '#{{ page.modal-id | default: "project-platinum" }}';
    var $modal = $(modalSelPrimary);
    if (!$modal.length) { $modal = $(modalSelFallback); }

    // On modal open: resume visible tab's carousel
    $modal.on('shown.bs.modal', function () {
      var $active = $('.tab-pane.in.active', this).find('.carousel');
      if (!$active.length) { $active = $(carIds[0]); }
      resume($active);
      // nudge active image to recalc within fixed viewport
      $active.find('.item.active img').trigger('load');
    });

    // Pause all when closing
    $modal.on('hide.bs.modal', function () { $cars.carousel('pause'); });

    // On tab switch: resume the target tab's carousel
    $('a[data-toggle="tab"][href^="#{{ page.modal-id }}-"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr('href');
      resume($(target).find('.carousel'));
    });

    /* --- Pop-out image once when its slide enters view --- */
    // Mark eligible images
    $cars.find('.item img').addClass('pop-on');

    // Use modal body as scroll root (falls back to viewport if not found)
    var rootEl = $modal.find('.modal-body')[0] || null;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          var img = entry.target;
          img.classList.add('popped');
          setTimeout(function(){ img.classList.remove('popped'); }, 800);
          io.unobserve(img); // fire once per image
        }
      });
    }, { root: rootEl, threshold: 0.6 });

    // Observe current active images immediately
    $cars.each(function(){
      $(this).find('.item.active img.pop-on').each(function(){ io.observe(this); });
    });

    // Observe new active image after each slide completes
    $cars.on('slid.bs.carousel', function(){
      $(this).find('.item.active img.pop-on').each(function(){ io.observe(this); });
    });

    // Defensive: on resize, reset transient transforms on active images
    var resizeTimer;
    $(window).on('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){
        $('.portfolio-carousel .item.active img').each(function(){ this.style.transform = ''; });
      }, 120);
    });
  })(jQuery);
</script>
