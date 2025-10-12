# Platinum Support & Care – Sample Analytics Project (Portfolio)

This package contains **mock data** and artifacts to demonstrate a full analytics workflow for a care provider:
- Microsoft **Access** schema (tables/relationships)
- Power **BI** model (Power Query M + DAX measures + RLS mapping)
- **Excel** reporting templates guidance (Power Query + Pivots)
- **Mobile** visit logging form schema (JSON)
- Clean **CSV** datasets for Clients, Staff, Training, Schedules, Visits, and RLS mapping

> All data is synthetic and safe for public demos.

## Folder Contents
- `clients.csv`, `staff.csv`, `training.csv`, `schedules.csv`, `visits.csv`, `rls_user_map.csv`
- `access_schema.sql`
- `powerquery_*.m`
- `powerbi_measures.dax`
- `mobile_visit_form_schema.json`
- `excel_templates_readme.md`

## Suggested Power BI Pages
1. **Operations Overview** – Visits completed, On-Time %, Avg Duration, Satisfaction.
2. **Workforce** – Staff activity, Mobile-enabled adoption, Training Valid %.
3. **Clients & Outcomes** – Visits by condition/location, Client satisfaction trends.
4. **Compliance** – Late/missed visits, overdue trainings.
5. **RLS Demo** – Show how a Carer vs Manager sees different data.

## RLS Roles (example)
- **Carer**: sees only visits where `Visits[StaffID]` = their ID (map via `rls_user_map.csv`).
- **Senior**: sees their team (extend with a Team table if desired).
- **Manager**: sees all data.

## Getting Started (Power BI)
- Get Data > Text/CSV > load all six CSVs.
- Apply the provided `.m` scripts to set types and add columns.
- Create relationships: Visits → Clients/Staff/Calendar; Schedules similarly.
- Add measures from `powerbi_measures.dax`.
- Build visuals; add slicers for `Month`, `Location`, `PrimaryCondition`, `Role`.

## Access Demo
- Use `access_schema.sql` as logical guidance to recreate tables and relationships in an `.accdb`.
- Import the CSVs into the corresponding tables.
- Build forms for Client, Staff, and Visit entry; include validation (required fields; duration >= 15).

## Excel Demo
- Use `excel_templates_readme.md` to wire up Power Query connections and Pivots.
- Save as templates and connect slicers (Staff, Condition, Month).