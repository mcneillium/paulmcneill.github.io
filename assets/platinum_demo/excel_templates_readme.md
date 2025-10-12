# Excel Reporting Suite (Templates & Guidance)

## Files
- `Monthly_KPI_Template.xlsx` – Pivot-based pack that connects to `visits.csv`, `schedules.csv`, and `clients.csv` via Power Query.
- `Exception_Report_Template.xlsx` – Highlights missing durations, null satisfaction scores, and overdue trainings.

## Power Query connections (Excel)
1. Data > Get Data > From Text/CSV > select each CSV in the `/platinum_support_care_portfolio_sample/` folder.
2. In the Power Query Editor, set types as in the provided `.m` scripts.
3. Close & Load To... **PivotTable Report** (for KPI template) or **Table** (for exception report).

## Suggested Pivot fields
- Rows: `Calendar[Month]`, `Clients[Location]`
- Columns: `Visits[Completed]` (Yes/No)
- Values: `Visits[DurationMinutes]` (Average), `Visits[VisitID]` (Count)

## Slicers
- `Clients[PrimaryCondition]`, `Staff[FullName]`, `Calendar[Year]`

## Conditional Formatting (Exception Report)
- DurationMinutes < 30 → Red fill
- SatisfactionScore is blank → Yellow fill
- Training[ExpiryDate] < TODAY() → Red text