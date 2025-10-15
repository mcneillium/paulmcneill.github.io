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

<!-- Scoped styles: uniform viewport, non-cropping images, captions not blocked, indicators inside -->
<style>
/* Keep the entire modal usable on one screen */
.modal .modal-body { max-height: calc(100vh - 160px); overflow-y: auto; }

/* Unified carousel viewport: fixed to the screen, not content */
.portfolio-carousel {
  position: relative; height: 60vh; max-height: 620px; min-height: 360px;
  overflow: hidden; padding-bottom: 28px; /* room for indicators */
}

/* Ensure stacking order never blocks captions/indicators */
.portfolio-carousel .carousel-inner { z-index: 1; }
.portfolio-carousel .carousel-caption,
.portfolio-carousel .carousel-indicators,
.portfolio-carousel .left.carousel-control,
.portfolio-carousel .right.carousel-control { z-index: 2; }

/* Indicators stay inside */
.portfolio-carousel .carousel-indicators { bottom: 6px; }

/* Slides fill the viewport without changing it */
.portfolio-carousel .carousel-inner,
.portfolio-carousel .carousel-inner > .item { height: 100%; }
.portfolio-carousel .carousel-inner > .item {
  display: flex; align-items: center; justify-content: center; background: #fafafa;
}

/* Images are contained (no crop, no stretch) */
.portfolio-carousel .carousel-inner > .item img {
  max-height: 100%; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;
  border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,.08); transition: transform .2s ease, box-shadow .2s ease; transform-origin: center center;
}

/* Gentle hover zoom that stays inside the slide */
.zoom-wrap { display: inline-flex; max-width: 100%; max-height: 100%; overflow: hidden; }
.zoom-wrap:hover img, .zoom-wrap:focus img { transform: scale(1.08); box-shadow: 0 8px 24px rgba(0,0,0,.25); z-index: 1; }

/* Caption overlays; never pushes height */
.portfolio-carousel .carousel-caption {
  background: rgba(0,0,0,0.45); border-radius: 6px; padding: 8px 12px; bottom: 16px; left: 50%; transform: translateX(-50%);
  width: auto; max-width: 85%;
}

/* Controls accessibility focus ring */
.portfolio-carousel .left.carousel-control:focus,
.portfolio-carousel .right.carousel-control:focus { outline: 2px solid #2c3e50; }

/* Tabs */
.nav-tabs > li > a { padding: 10px 15px; }

/* Small screens: slightly shorter viewport */
@media (max-width: 767px) { .portfolio-carousel { height: 54vh; min-height: 300px; } }

/* POP-ON-SCROLL effect (fires once per image) */
.portfolio-carousel .carousel-inner > .item img.pop-on {}
.portfolio-carousel .carousel-inner > .item img.pop-on.popped {
  transform: scale(1.06); box-shadow: 0 10px 28px rgba(0,0,0,.28); transition: transform .25s ease, box-shadow .25s ease;
}
@media (min-width: 992px) { .portfolio-carousel .carousel-inner > .item img.pop-on.popped { transform: scale(1.08); } }
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

<!-- === Vendor scripts: keep exactly this order (remove if your theme already includes them) === -->
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

<!-- === Carousel logic (Bootstrap 3) === -->
<script>
(function () {
  // Guards: fail early with helpful messages if vendor scripts aren’t ready.
  if (typeof jQuery === 'undefined') {
    console.error('[carousel] jQuery not loaded before carousel script.');
    return;
  }
  if (!jQuery.fn || typeof jQuery.fn.carousel !== 'function') {
    if (window.bootstrap && window.bootstrap.Carousel) {
      console.error('[carousel] Detected Bootstrap 5 (no jQuery plugin). This code targets Bootstrap 3. Use BS5 API instead or include Bootstrap 3 JS.');
    } else {
      console.error('[carousel] Bootstrap 3 carousel plugin not found on $.fn.carousel. Ensure Bootstrap 3 JS loads after jQuery.');
    }
    return;
  }

  // Run after full load to avoid race conditions with modal/tab markup in partials.
  window.addEventListener('load', function () {
    (function ($) {
      var ids = ['#{{ page.modal-id }}-carousel-access', '#{{ page.modal-id }}-carousel-powerbi'];

      // prevent auto-ride via attributes
      ids.forEach(function (sel) { $(sel).removeAttr('data-ride'); });

      var $cars = $(ids.join(','));

      // guard: avoid double init if this script runs twice
      $cars.each(function () {
        var $c = $(this);
        if ($c.data('pf-init')) return;
        $c.data('pf-init', true).carousel({ interval: 6000, pause: 'hover', wrap: true }).carousel('pause');
      });

      // Persist current slide per carousel (store AFTER it changes)
      var idxState = {}; // { id: index }
      $cars.on('slid.bs.carousel', function () {
        idxState[this.id] = $(this).find('.item.active').index();
      });

      function resume($car) {
        if (!$car || !$car.length) return;

        // pause siblings only (don’t globally pause everything, which can reset state)
        $cars.not($car).carousel('pause');

        var id = $car.attr('id');
        // prefer saved index, else current active
        var to = (typeof idxState[id] === 'number') ? idxState[id] : $car.find('.item.active').index();

        // If we have a valid target index, jump there first, then start cycling.
        if (typeof to === 'number' && to >= 0) {
          // Start cycling only after we've navigated to the desired slide.
          $car.one('slid.bs.carousel.__resume', function () {
            $car.carousel('cycle');
          }).carousel(to);
        } else {
          $car.carousel('cycle');
        }
      }

      // Detect modal element (common templates: #portfolioModal{{id}} or #{{id}})
      var modalSelPrimary = '#portfolioModal{{ page.modal-id | default: "project-platinum" }}';
      var modalSelFallback = '#{{ page.modal-id | default: "project-platinum" }}';
      var $modal = $(modalSelPrimary);
      if (!$modal.length) { $modal = $(modalSelFallback); }

      // On modal open: start active tab's carousel (delay to let layout settle)
      $modal.on('shown.bs.modal', function () {
        var $activePane = $('.tab-pane.in.active', this);
        var $activeCar = $activePane.find('.carousel');
        if (!$activeCar.length) { $activeCar = $(ids[0]); }
        setTimeout(function () {
          resume($activeCar);
          $activeCar.find('.item.active img').trigger('load');
        }, 0);
      });

      // Pause all when closing
      $modal.on('hide.bs.modal', function () { $cars.carousel('pause'); });

      // On tab switch: resume just that tab's carousel
      $('a[data-toggle="tab"][href^="#{{ page.modal-id }}-"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr('href');
        resume($(target).find('.carousel'));
      });

      // One-time pop-on-scroll effect via IntersectionObserver
      $cars.find('.item img').addClass('pop-on');
      var rootEl = $modal.find('.modal-body')[0] || null;
      var io = new (window.IntersectionObserver || function (cb) {
        return { observe: function () { }, unobserve: function () { } };
      })(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            var img = entry.target; img.classList.add('popped');
            setTimeout(function () { img.classList.remove('popped'); }, 800);
            io.unobserve(img);
          }
        });
      }, { root: rootEl, threshold: 0.6 });

      $cars.each(function () {
        $(this).find('.item.active img.pop-on').each(function () { io.observe(this); });
      });
      $cars.on('slid.bs.carousel', function () {
        $(this).find('.item.active img.pop-on').each(function () { io.observe(this); });
      });

      // Touch swipe (Bootstrap 3 lacks this by default)
      $cars.on('touchstart', function (e) {
        var x0 = e.originalEvent.touches && e.originalEvent.touches[0].clientX;
        $(this).data('x0', x0);
      });
      $cars.on('touchmove', function (e) {
        var x0 = $(this).data('x0');
        if (!x0) return;
        var x = e.originalEvent.touches && e.originalEvent.touches[0].clientX;
        var dx = x - x0;
        if (Math.abs(dx) > 40) {
          $(this).carousel(dx > 0 ? 'prev' : 'next');
          $(this).data('x0', null);
        }
      });

      // Defensive: on resize, reset transient transforms on active images
      var t; $(window).on('resize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
          $('.portfolio-carousel .item.active img').each(function () { this.style.transform = ''; });
        }, 120);
      });
    })(jQuery);
  });
})();
</script>
