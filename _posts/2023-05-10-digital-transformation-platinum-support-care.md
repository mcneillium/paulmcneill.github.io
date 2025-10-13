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

<!-- ACCESS (Data Layer) -->
<h4 class="mt-4">Microsoft Access (Data Layer)</h4>
<div class="row" style="margin-left:-7px; margin-right:-7px;">
  <div class="col-xs-12 col-sm-6 col-md-3" style="padding:7px;">
    <figure class="m-0">
      <img src="img/portfolio/pscs/pscs_access_frm_1.png" alt="Access data-entry form for Visits" class="img-responsive center-block" style="border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,.08);">
      <figcaption class="small text-muted" style="margin-top:6px;">Form: Visit entry</figcaption>
    </figure>
  </div>
  <div class="col-xs-12 col-sm-6 col-md-3" style="padding:7px;">
    <figure class="m-0">
      <img src="img/portfolio/pscs/pscs_access_rel_1.png" alt="Access relationships diagram linking Clients, Staff, Schedules and Visits" class="img-responsive center-block" style="border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,.08);">
      <figcaption class="small text-muted" style="margin-top:6px;">Relationships</figcaption>
    </figure>
  </div>
  <div class="col-xs-12 col-sm-6 col-md-3" style="padding:7px;">
    <figure class="m-0">
      <img src="img/portfolio/pscs/pscs_access_tbl_1.png" alt="Access Visits table showing sample rows with durations and notes" class="img-responsive center-block" style="border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,.08);">
      <figcaption class="small text-muted" style="margin-top:6px;">Table view</figcaption>
    </figure>
  </div>
  <div class="col-xs-12 col-sm-6 col-md-3" style="padding:7px;">
    <figure class="m-0">
      <img src="img/portfolio/pscs/pscs_access_val_1.png" alt="Access validation message enforcing minimum duration" class="img-responsive center-block" style="border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,.08);">
      <figcaption class="small text-muted" style="margin-top:6px;">Validation rule</figcaption>
    </figure>
  </div>
</div>

<!-- POWER BI (Reporting Layer) -->
<h4 style="margin-top:24px;">Power BI (Reporting Layer)</h4>
<div class="row" style="margin-left:-7px; margin-right:-7px;">
  <div class="col-xs-12 col-sm-6 col-md-3" style="padding:7px;">
    <figure class="m-0">
      <img src="img/portfolio/pscs/pscs_powerbi_import_1.png" alt="Power BI get data dialog with Access connector selected" class="img-responsive center-block" style="border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,.08);">
      <figcaption class="small text-muted" style="margin-top:6px;">Import (Access)</figcaption>
    </figure>
  </div>
  <div class="col-xs-12 col-sm-6 col-md-3" style="padding:7px;">
    <figure class="m-0">
      <img src="img/portfolio/pscs/pscs_powerbi_pq_1.png" alt="Power Query editor preview of the Training table" class="img-responsive center-block" style="border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,.08);">
      <figcaption class="small text-muted" style="margin-top:6px;">Power Query</figcaption>
    </figure>
  </div>
  <div class="col-xs-12 col-sm-6 col-md-3" style="padding:7px;">
    <figure class="m-0">
      <img src="img/portfolio/pscs/pscs_powerbi_rel_1.png" alt="Power BI data model showing relationships between fact and dimension tables" class="img-responsive center-block" style="border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,.08);">
      <figcaption class="small text-muted" style="margin-top:6px;">Data model</figcaption>
    </figure>
  </div>
  <div class="col-xs-12 col-sm-6 col-md-3" style="padding:7px;">
    <figure class="m-0">
      <img src="img/portfolio/pscs/pscs_powerbi_vis_1.png" alt="Power BI KPI visuals showing visits, average duration and completions" class="img-responsive center-block" style="border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,.08);">
      <figcaption class="small text-muted" style="margin-top:6px;">KPI dashboard</figcaption>
    </figure>
  </div>
</div>
