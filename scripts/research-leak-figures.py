#!/usr/bin/env python3
"""Draw the leak study figure shown on /research/.

Repair dates and which rule found each come from the study's results/study.json.
Night flow is recomputed with the study's own leak_rule.py from the L-Town files.

    python scripts/research-leak-figures.py <leak-repair-labels repo> <data folder> [<output-folder>]

The output folder defaults to img/research/. Needs matplotlib and the Inter
font. Afterwards run `node scripts/optimize-images.js` for the WebP copies.
"""
import json
import sys
from datetime import datetime
from pathlib import Path

import matplotlib
import pandas as pd

matplotlib.use("Agg")
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
from matplotlib import font_manager

if len(sys.argv) < 3:
    sys.exit("usage: python scripts/research-leak-figures.py <leak-repair-labels repo> <data folder> [<output-folder>]")
REPO = Path(sys.argv[1]).resolve()
DATA = Path(sys.argv[2]).resolve()
OUT = Path(sys.argv[3]) if len(sys.argv) > 3 else Path(__file__).resolve().parent.parent / "img" / "research"
OUT.mkdir(parents=True, exist_ok=True)

# The same surface, ink and colours as the other research figures.
SURFACE = "#fcfcfb"
INK = "#0b0b0b"
INK_2 = "#52514e"
MUTED = "#898781"
GRID = "#e1e0d9"
AXIS = "#c3c2b7"
BLUE = "#2a78d6"
ORANGE = "#eb6834"
TEST_YEAR = 2019
WEEK = 7

if not any("Inter" == f.name for f in font_manager.fontManager.ttflist):
    sys.exit("The Inter font is not installed; the figure would not match the others.")
plt.rcParams.update({
    "font.family": "Inter",
    "font.size": 12.5,
    "text.color": INK,
    "axes.edgecolor": AXIS,
    "axes.labelcolor": INK_2,
    "xtick.color": INK_2,
    "ytick.color": INK_2,
    "figure.facecolor": SURFACE,
    "axes.facecolor": SURFACE,
    "savefig.facecolor": SURFACE,
})


sys.path.insert(0, str(REPO))
import leak_rule  # noqa: E402

study = json.loads((REPO / "results" / "study.json").read_text(encoding="utf-8"))
test = study["test"]
WINDOW = {"3-day": "3", "7-day": "7"}

flows = pd.concat([leak_rule.read_year(DATA, year, "SCADA_Flows") for year in (2018, 2019)])
levels = pd.concat([leak_rule.read_year(DATA, year, "SCADA_Levels")[leak_rule.TANK] for year in (2018, 2019)])
nights = leak_rule.night_flow(flows[leak_rule.METERS].sum(axis=1), levels)
days = [day.to_pydatetime() for day in nights.index]
# Rounded to 2 places, as the figure was first drawn from values stored that way.
flow = [round(float(value), 2) for value in nights]
weekly = []
for i in range(len(flow)):
    if i < WEEK - 1:
        weekly.append(None)
    else:
        weekly.append(sum(flow[i - WEEK + 1:i + 1]) / WEEK)
keep = [i for i, day in enumerate(days) if day.year == TEST_YEAR]
x = [days[i] for i in keep]
y_daily = [flow[i] for i in keep]
y_weekly = [weekly[i] for i in keep]

fig, ax = plt.subplots(figsize=(7.0, 3.9), dpi=200)
ax.plot(x, y_daily, color=MUTED, linewidth=0.7, alpha=0.75)
ax.plot(x, y_weekly, color=INK, linewidth=1.6)

top = max(y_daily)
bottom = min(y_daily)
span = top - bottom
row_y = {"7-day": top + 0.20 * span, "3-day": top + 0.09 * span}
row_name = {"7-day": "7-night rule", "3-day": "3-night rule"}
row_colour = {"7-day": BLUE, "3-day": ORANGE}

for repair in test["repairs"]:
    when = datetime.strptime(repair["end"][:10], "%Y-%m-%d")
    ax.axvline(when, color=AXIS, linewidth=0.9, linestyle=(0, (3, 2)), zorder=0)
for name in ["7-day", "3-day"]:
    window = WINDOW[name]
    for repair in test["repairs"]:
        when = datetime.strptime(repair["end"][:10], "%Y-%m-%d")
        if repair[f"flag_{window}"] is not None:
            ax.plot([when], [row_y[name]], marker="o", markersize=7, color=row_colour[name], clip_on=False)
        else:
            ax.plot([when], [row_y[name]], marker="o", markersize=7, markerfacecolor=SURFACE, markeredgecolor=row_colour[name], markeredgewidth=1.4, clip_on=False)
    found = test["windows"][window]["found"]
    total = test["windows"][window]["repairs"]
    label = f"  {row_name[name]}: {found} of {total}"
    ax.text(x[-1], row_y[name], label, ha="left", va="center", fontsize=9.5, color=row_colour[name], clip_on=False)

ax.set_title("Filled dot: repair found.  Open dot: missed.  Dashed lines: the 7 real repairs.", loc="left", fontsize=9.5, color=INK_2)
ax.text(x[-1], y_weekly[-1], "  7-night mean", ha="left", va="center", fontsize=9.5, color=INK, clip_on=False)
ax.set(ylabel="Night flow (m³/h)", ylim=(bottom - 0.05 * span, top + 0.28 * span), xlim=(datetime(TEST_YEAR, 1, 1), datetime(TEST_YEAR, 12, 31)))
ax.xaxis.set_major_locator(mdates.MonthLocator())
ax.xaxis.set_major_formatter(mdates.DateFormatter("%b"))
ax.grid(axis="y", color=GRID, linewidth=0.8)
ax.set_axisbelow(True)
for side in ["top", "right"]:
    ax.spines[side].set_visible(False)
plt.tight_layout()
fig.savefig(OUT / "leak-night-flow.png")
print("Wrote", OUT / "leak-night-flow.png")
