#!/usr/bin/env python3
"""Draw the illustration of how the leak study's rule works, for /research/.

    python scripts/research-leak-rule-figure.py [<output-folder>]

The night flows are made up, so the figure shows the rule's steps and no
result. The drop is computed here exactly as the study defines it: the mean
of the w nights ending on day d, minus the mean of the w nights starting on
d+1, and a day is flagged only when its drop reaches the threshold and is the
largest within w days either side. The output folder defaults to img/research/.
Afterwards run `node scripts/optimize-images.js` for the WebP copies.
"""
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib import font_manager
from matplotlib.patches import FancyArrowPatch

OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / "img" / "research"
OUT.mkdir(parents=True, exist_ok=True)

SURFACE = "#fcfcfb"
INK = "#0b0b0b"
INK_2 = "#52514e"
MUTED = "#898781"
GRID = "#e1e0d9"
AXIS = "#c3c2b7"
BLUE = "#2a78d6"
ORANGE = "#eb6834"
BLUE_PALE = "#dbe8f8"
ORANGE_PALE = "#fbe1d6"

WINDOW = 3
NIGHTS = 28
REPAIR_AFTER = 14  # the repair happens between this night and the next
STEP = 25.0
THRESHOLD = 15.0
SEED = 7

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

rng = np.random.default_rng(SEED)
days = np.arange(1, NIGHTS + 1)
flow = 100.0 + rng.normal(0.0, 2.5, NIGHTS)
flow[days > REPAIR_AFTER] -= STEP

drop = np.full(NIGHTS, np.nan)
for i in range(WINDOW - 1, NIGHTS - WINDOW):
    before = flow[i - WINDOW + 1:i + 1].mean()
    after = flow[i + 1:i + WINDOW + 1].mean()
    drop[i] = before - after

flagged = []
for i in range(NIGHTS):
    if np.isnan(drop[i]) or drop[i] < THRESHOLD:
        continue
    near = drop[max(0, i - WINDOW):i + WINDOW + 1]
    if drop[i] >= np.nanmax(near):
        flagged.append(i)
if flagged != [REPAIR_AFTER - 1]:
    sys.exit(f"The made-up series should give one flag on night {REPAIR_AFTER}; it gave {[f + 1 for f in flagged]}.")
peak = flagged[0]
above = [i for i in range(NIGHTS) if not np.isnan(drop[i]) and drop[i] >= THRESHOLD]

before_days = days[peak - WINDOW + 1:peak + 1]
after_days = days[peak + 1:peak + WINDOW + 1]
before_mean = flow[peak - WINDOW + 1:peak + 1].mean()
after_mean = flow[peak + 1:peak + WINDOW + 1].mean()

fig = plt.figure(figsize=(14, 8.4), dpi=100)
fig.text(0.045, 0.955, "How the rule works: a repair shows up as a lasting step down in night flow",
         fontsize=16, color=INK, ha="left", va="center")
fig.text(0.045, 0.918, "Made-up night flows for illustration only. They are not data from the study and they show no result.",
         fontsize=12, color=INK_2, ha="left", va="center")
top, bottom = fig.subplots(2, 1, sharex=True, gridspec_kw=dict(left=0.075, right=0.885, top=0.86, bottom=0.15, hspace=0.32, height_ratios=[1.15, 1]))

for ax in (top, bottom):
    ax.axvline(REPAIR_AFTER + 0.5, color=MUTED, linewidth=1, linestyle=(0, (3, 2)), zorder=0)
    ax.grid(axis="y", color=GRID, linewidth=0.8)
    ax.set_axisbelow(True)
    for side in ("top", "right"):
        ax.spines[side].set_visible(False)

top.axvspan(before_days[0] - 0.5, before_days[-1] + 0.5, color=BLUE_PALE, zorder=0, linewidth=0)
top.axvspan(after_days[0] - 0.5, after_days[-1] + 0.5, color=ORANGE_PALE, zorder=0, linewidth=0)
top.plot(days, flow, color=INK, linewidth=1.3, marker="o", markersize=4.5, zorder=3)
top.hlines(before_mean, before_days[0] - 0.4, before_days[-1] + 0.4, color=BLUE, linewidth=2.6, zorder=4)
top.hlines(after_mean, after_days[0] - 0.4, after_days[-1] + 0.4, color=ORANGE, linewidth=2.6, zorder=4)
arrow_x = after_days[-1] + 1.3
top.add_patch(FancyArrowPatch((arrow_x, before_mean), (arrow_x, after_mean), arrowstyle="-|>", mutation_scale=14, color=INK_2, linewidth=1.2))
top.hlines(before_mean, after_days[-1] + 0.4, arrow_x, color=BLUE, linewidth=0.9, linestyle=(0, (2, 2)))
top.text(arrow_x + 0.35, (before_mean + after_mean) / 2, f"drop = {before_mean - after_mean:.1f}", fontsize=12, color=INK, va="center")
top.text(before_days[1], before_mean + 6.5, f"{WINDOW} nights before", fontsize=11.5, color=BLUE, ha="center")
top.text(after_days[1], after_mean - 6.0, f"{WINDOW} nights after", fontsize=11.5, color=ORANGE, ha="center")
top.text(REPAIR_AFTER + 0.62, flow.max() + 3.2, "repair", fontsize=11, color=INK_2, ha="left")
top.set(ylabel="Night flow (m³/h)", ylim=(flow.min() - 12, flow.max() + 8))

bottom.axhline(THRESHOLD, color=INK_2, linewidth=1, linestyle=(0, (5, 3)))
bottom.text(NIGHTS + 0.9, THRESHOLD, f"threshold {THRESHOLD:.0f}", fontsize=11.5, color=INK_2, va="center", ha="left", clip_on=False)
valid = ~np.isnan(drop)
bottom.plot(days[valid], drop[valid], color=MUTED, linewidth=1.2, zorder=2)
bottom.scatter(days[valid], drop[valid], s=22, color=MUTED, zorder=3)
over = [i for i in above if i != peak]
bottom.scatter(days[over], drop[over], s=34, color=SURFACE, edgecolor=BLUE, linewidth=1.4, zorder=4)
bottom.scatter([days[peak]], [drop[peak]], s=70, color=BLUE, zorder=5)
bottom.annotate("flagged: the largest drop\nwithin 3 nights either side", xy=(days[peak], drop[peak]),
                xytext=(days[peak] - 8.6, drop[peak] - 1), fontsize=11.5, color=BLUE, va="center",
                arrowprops=dict(arrowstyle="-", color=BLUE, linewidth=1))
bottom.annotate("also above the threshold,\nbut not the peak: no flag", xy=(days[over[-1]], drop[over[-1]]),
                xytext=(days[over[-1]] + 2.2, drop[over[-1]] + 2.5), fontsize=11.5, color=INK_2, va="center",
                arrowprops=dict(arrowstyle="-", color=INK_2, linewidth=0.8))
bottom.set(ylabel="Drop (m³/h)", xlabel="Night", xlim=(0.3, NIGHTS + 0.7), ylim=(np.nanmin(drop) - 4, np.nanmax(drop) + 6))
bottom.set_xticks(range(2, NIGHTS + 1, 2))

fig.text(0.045, 0.035,
         f"Each night's drop compares the mean of the {WINDOW} nights ending on it with the mean of the {WINDOW} nights after it. "
         f"{len(above)} nights clear the threshold here; only the peak is flagged.",
         fontsize=12, color=INK_2, ha="left", va="center")
fig.savefig(OUT / "leak-rule.png", dpi=100)
print("Wrote", OUT / "leak-rule.png")
