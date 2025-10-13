---
layout: post
title: "Digital Transformation – Platinum Support & Care"
subtitle: "Access apps, Power BI KPIs & mobile logging for carers"
modal-id: project-platinum
thumbnail: platinum-powerbi-access.png
img: platinum-powerbi-access.png
alt: "Platinum Support & Care Power BI + Access"
project-date: 2023-05-10
category: projects
description: "Taking operations from paper to digital with Access, Power BI, and mobile logging for carers."
github-url:
youtube-url:
---

<!-- Scoped styles for this post -->
<style>
/* Tidy, centered carousels */
.portfolio-carousel { margin: 12px auto 28px; max-width: 1080px; }
.portfolio-carousel .carousel-inner > .item > img {
  display: block; margin: 0 auto; width: auto; max-height: 520px;
  border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,.08);
}
.portfolio-carousel .carousel-caption {
  position: static; padding: 8px 0 0; font-size: 13px; color: #6c757d; text-shadow: none;
}
.portfolio-carousel .carousel-control { background: none; color: #2c3e50; width: 8%; }
.portfolio-carousel .carousel-indicators { bottom: -10px; }
.portfolio-carousel .carousel-indicators li { border-color: #2c3e50; }
.portfolio-carousel .carousel-indicators .active { background-color: #2c3e50; }

/* Headings + intro text */
.media-section { text-align: center; }
.media-section h4 { margin-top: 28px; margin-bottom: 12px; }
.media-section .section-intro { max-width: 900px; margin: 0 auto 8px; color: #6c757d; }

/* Accessibility focus for controls */
.portfolio-carousel .left.carousel-control:focus,
.portfolio-carousel .right.carousel-control:focus { outline: 2px solid #2c3e50; }
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

<div class="media-section">
  <p class="section-intro">Swipe / click through the slides to preview the build from data layer to reporting.</p>

  <!-- ACCESS (Data Layer) -->
  <h4 class="mt-4">Microsoft Access (Data Layer)</h4>
  <div id="carousel-access" class="carousel slide portfolio-carousel" data-ride="carousel" aria-label="Microsoft Access slides">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#carousel-access" data-slide-to="0" class="active"></li>
      <li data-target="#carousel-access" data-slide-to="1"></li>
      <li data-target="#carousel-access" data-slide-to="2"></li>
      <li data-target="#carousel-access" data-slide-to="3"></li>
    </ol>

  <!-- Slides -->
  <div class="carousel-inner" role="listbox">
      <div class="item active">
        <img src="img/portfolio/pscs/pscs_access_frm_1.png" alt="Access data-entry form for Visits" class="img-responsive">
        <div class="carousel-caption">Form: Visit entry</div>
      </div>
      <div class="item">
        <img src="img/portfolio/pscs/pscs_access_rel_1.png" alt="Access relationships diagram linking Clients, Staff, Schedules and Visits" class="img-responsive">
        <div class="carousel-caption">Relationships</div>
      </div>
      <div class="item">
        <img src="img/portfolio/pscs/pscs_access_tbl_1.png" alt="Access Visits table showing sample rows with durations and notes" class="img-responsive">
        <div class="carousel-caption">Table view</div>
      </div>
      <div class="item">
        <img src="img/portfolio/pscs/pscs_access_val_1.png" alt="Access validation message enforcing minimum duration" class="img-responsive">
        <div class="carousel-caption">Validation rule</div>
      </div>
    </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-access" role="button" data-slide="prev" aria-label="Previous slide">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    </a>
    <a class="right carousel-control" href="#carousel-access" role="button" data-slide="next" aria-label="Next slide">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    </a>
  </div>

  <!-- POWER BI (Reporting Layer) -->
  <h4>Power BI (Reporting Layer)</h4>
  <div id="carousel-powerbi" class="carousel slide portfolio-carousel" data-ride="carousel" aria-label="Power BI slides">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#carousel-powerbi" data-slide-to="0" class="active"></li>
      <li data-target="#carousel-powerbi" data-slide-to="1"></li>
      <li data-target="#carousel-powerbi" data-slide-to="2"></li>
      <li data-target="#carousel-powerbi" data-slide-to="3"></li>
    </ol>

  <!-- Slides -->
  <div class="carousel-inner" role="listbox">
      <div class="item active">
        <img src="img/portfolio/pscs/pscs_powerbi_import_1.png" alt="Power BI get data dialog with Access connector selected" class="img-responsive">
        <div class="carousel-caption">Import (Access)</div>
      </div>
      <div class="item">
        <img src="img/portfolio/pscs/pscs_powerbi_pq_1.png" alt="Power Query editor preview of the Training table" class="img-responsive">
        <div class="carousel-caption">Power Query</div>
      </div>
      <div class="item">
        <img src="img/portfolio/pscs/pscs_powerbi_rel_1.png" alt="Power BI data model showing relationships between fact and dimension tables" class="img-responsive">
        <div class="carousel-caption">Data model</div>
      </div>
      <div class="item">
        <img src="img/portfolio/pscs/pscs_powerbi_vis_1.png" alt="Power BI KPI visuals showing visits, average duration and completions" class="img-responsive">
        <div class="carousel-caption">KPI dashboard</div>
      </div>
    </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-powerbi" role="button" data-slide="prev" aria-label="Previous slide">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    </a>
    <a class="right carousel-control" href="#carousel-powerbi" role="button" data-slide="next" aria-label="Next slide">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    </a>
  </div>
</div>
