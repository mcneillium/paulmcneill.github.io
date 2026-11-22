#!/usr/bin/env python3
"""Draw the flood study figures shown on /research/.

Every plotted number is read from the study's own result files (development
chips only; the test and Bolivia results are not read here). The predictions
are the ones recorded in the study's protocols before each run. The fourth
figure is a made-up scene that explains the measure; it contains no data and
says so on its face.

    python scripts/research-flood-figures.py <flood-repo> [<output-folder>]

The output folder defaults to img/research/. Needs matplotlib and the Inter
font. Afterwards run `node scripts/optimize-images.js` for the WebP copies.
"""
import json
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.lines import Line2D
from matplotlib.patches import FancyBboxPatch, Rectangle

if len(sys.argv) < 2:
    sys.exit("usage: python scripts/research-flood-figures.py <flood-repo> [<output-folder>]")
REPO = Path(sys.argv[1])
OUT = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(__file__).resolve().parent.parent / "img" / "research"
OUT.mkdir(parents=True, exist_ok=True)

# The same surface, ink and colour order as the river and drug figures.
SURFACE = "#fcfcfb"
INK = "#0b0b0b"
INK_2 = "#52514e"
MUTED = "#898781"
GRID = "#e1e0d9"
AXIS = "#c3c2b7"
MODELS = [
    ("unet", "unet_baseline", "UNet, trained from scratch", "#2a78d6", "o"),
    ("frozen", "terramind_frozen", "Pretrained encoder, frozen", "#eb6834", "s"),
    ("updated", "terramind_updated", "Pretrained encoder, updated", "#1baf7a", "D"),
]
SEEDS = ["0", "1", "2"]
# Recorded before the UNet's error count (protocol 4): 75% and 80%.
UNET_PREDICTED = {"false_water": 0.75, "missed_water": 0.80}

if not any("Inter" == f.name for f in font_manager.fontManager.ttflist):
    sys.exit("The Inter font is not installed; the figures would not match the others.")
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


def load(folder, name):
    return json.loads((REPO / "results" / folder / name).read_text(encoding="utf-8"))


def mean(xs):
    xs = list(xs)
    return sum(xs) / len(xs)


errors = {key: load(folder, "error_reproduction_development.json") for key, folder, *_ in MODELS}
first = errors["unet"]["seeds"]["0"]["counts"]
OTSU_FALSE, OTSU_MISSED = first["otsu_false_water"], first["otsu_missed_water"]


def rate(key, kind):
    """Share of the labels' errors of one kind that a model repeats, mean of the seeds."""
    return mean(errors[key]["seeds"][s]["rates"][f"reproduction_{kind}"] for s in SEEDS)


def new_pixels(key, kind):
    return mean(errors[key]["seeds"][s]["rates"][f"new_{kind}_pixels"] for s in SEEDS)


def heading(fig, title, subtitle, top=0.955):
    fig.text(0.045, top, title, fontsize=17.5, color=INK, ha="left", va="top")
    fig.text(0.045, top - 0.062 * (7.0 / fig.get_figheight()), subtitle, fontsize=12, color=INK_2, ha="left", va="top")


def quiet(ax, grid="x"):
    for side in ("top", "right", "left", "bottom"):
        ax.spines[side].set_visible(False)
    ax.tick_params(length=0)
    ax.grid(axis=grid, color=GRID, linewidth=1)
    ax.set_axisbelow(True)


def bar(ax, y, value, colour, thickness=0.3):
    """A thin horizontal bar: square at the baseline, rounded (4 px) at the data end."""
    (x0, y0), (x1, y1) = ax.transData.transform([(0, 0), (1, 1)])
    per_x, per_y = abs(x1 - x0), abs(y1 - y0)          # pixels per data unit
    radius = min(4.0 / per_x, value / 2)
    ax.add_patch(FancyBboxPatch((0, y - thickness / 2), value, thickness,
                                boxstyle=f"round,pad=0,rounding_size={radius}", mutation_aspect=per_x / per_y,
                                color=colour, linewidth=0, zorder=3))
    ax.add_patch(Rectangle((0, y - thickness / 2), max(value - radius, 0), thickness, color=colour, linewidth=0,
                           zorder=3))


def save(fig, name):
    path = OUT / name
    fig.savefig(path, dpi=100)
    plt.close(fig)
    print(f"wrote {path}")


# ---------------------------------------------------------------- figure 1
def figure_fixed_and_added():
    fig = plt.figure(figsize=(14, 7.4))
    heading(fig, "The closer a model copies its labels, the fewer mistakes it fixes and the fewer it adds",
            f"Thousands of pixels on the 252 development chips, mean of three seeds. The labels themselves have "
            f"{OTSU_FALSE / 1e6:.2f} million false-water and {OTSU_MISSED / 1e6:.2f} million missed-water pixels.")
    panels = [
        ("Labels' false water that the model puts right", lambda k: OTSU_FALSE * (1 - rate(k, "false_water"))),
        ("New false water the model adds", lambda k: new_pixels(k, "false_water")),
        ("Labels' missed water that the model recovers", lambda k: OTSU_MISSED * (1 - rate(k, "missed_water"))),
        ("New missed water the model adds", lambda k: new_pixels(k, "missed_water")),
    ]
    axes = fig.subplots(2, 2, sharex=True, gridspec_kw=dict(left=0.235, right=0.965, top=0.80, bottom=0.085,
                                                            wspace=0.10, hspace=0.42))
    for ax, (title, value) in zip(axes.flat, panels):
        quiet(ax)
        ax.set_xlim(0, 800)
        ax.set_ylim(len(MODELS) - 0.45, -0.55)
        ax.set_xticks([0, 200, 400, 600, 800])
        ax.set_yticks(range(len(MODELS)))
        ax.set_title(title, loc="left", fontsize=13, color=INK, pad=10)
        ax.axvline(0, color=AXIS, linewidth=1)
        show_names = ax in axes[:, 0]
        ax.set_yticklabels([m[2] for m in MODELS] if show_names else [], fontsize=12.5, color=INK)
        ax.tick_params(axis="y", pad=10)
    fig.canvas.draw()
    for ax, (title, value) in zip(axes.flat, panels):
        for i, (key, _, _, colour, _) in enumerate(MODELS):
            thousands = value(key) / 1000
            bar(ax, i, thousands, colour)
            ax.text(thousands + 12, i, f"{thousands:.0f}", va="center", ha="left", fontsize=12.5, color=INK)
    for ax in axes[1]:
        ax.set_xlabel("Thousands of pixels", fontsize=11.5, color=INK_2, labelpad=8)
    save(fig, "flood-fixed-and-added.png")


# ---------------------------------------------------------------- figure 2
def figure_by_event():
    by_event = errors["updated"]["by_event"]
    unet_events = errors["unet"]["by_event"]
    events = sorted(by_event, key=lambda e: -by_event[e]["otsu_false_water"])

    def share(event, key):
        if key == "unet":
            return 100 * unet_events[event]["reproduction_false_water"]
        return 100 * by_event[event][key]["false_water"]

    fig = plt.figure(figsize=(14, 8.2))
    heading(fig, "The gap comes mostly from the floods where the labels have the most false water",
            "Share of the labels' false water that each model repeats, by flood event. Development chips, mean of three seeds.\n"
            "Floods are ordered by how much false water the labels contain there (thousands of pixels, in brackets).",
            top=0.962)
    ax = fig.add_axes([0.205, 0.085, 0.76, 0.70])
    quiet(ax)
    ax.set_xlim(60, 101.5)
    ax.set_ylim(len(events) - 0.4, -0.6)
    ax.set_xticks(range(60, 101, 10))
    ax.set_xticklabels([f"{t}%" for t in range(60, 101, 10)])
    ax.set_yticks(range(len(events)))
    ax.set_yticklabels([f"{e}  ({by_event[e]['otsu_false_water'] / 1000:,.0f})" for e in events], fontsize=12.5, color=INK)
    ax.tick_params(axis="y", pad=12)
    for i, event in enumerate(events):
        values = [share(event, key) for key, *_ in MODELS]
        ax.plot([min(values), max(values)], [i, i], color=AXIS, linewidth=2, solid_capstyle="round", zorder=2)
        for (key, _, _, colour, marker), v in zip(MODELS, values):
            ax.plot(v, i, marker=marker, markersize=11.5 if marker != "D" else 10.5, color=colour,
                    markeredgecolor=SURFACE, markeredgewidth=2, linestyle="none", zorder=3)
    # Label the extremes of the two floods that carry the gap.
    for event in events[:2]:
        i = events.index(event)
        ax.text(share(event, "unet") - 0.9, i, f"{share(event, 'unet'):.1f}%", ha="right", va="center", fontsize=12, color=INK)
        ax.text(share(event, "updated") + 0.9, i, f"{share(event, 'updated'):.1f}%", ha="left", va="center", fontsize=12, color=INK)
    handles = [Line2D([], [], marker=m, markersize=10, color=c, markeredgecolor=SURFACE, markeredgewidth=1.5,
                      linestyle="none", label=label) for _, _, label, c, m in MODELS]
    fig.legend(handles=handles, loc="upper left", bbox_to_anchor=(0.195, 0.855), ncol=3, frameon=False,
               fontsize=12.5, handletextpad=0.3, columnspacing=2.2)
    ax.set_xlabel("Labels' false water repeated (100% = an exact copy of the labels)", fontsize=11.5, color=INK_2, labelpad=10)
    save(fig, "flood-by-event.png")


# ---------------------------------------------------------------- figure 3
def figure_predictions():
    predicted = {"unet": UNET_PREDICTED}
    for key in ("frozen", "updated"):
        rows = {p["key"]: p["predicted"] for p in errors[key]["prediction"]}
        predicted[key] = {"false_water": rows["false_water"], "missed_water": rows["missed_water"]}

    fig = plt.figure(figsize=(14, 5.9))
    heading(fig, "Every prediction was on record before its run, including the one that was badly wrong",
            "Share of the labels' errors each model repeats: what I predicted before training, and what the run found. "
            "Development chips, mean of three seeds.", top=0.945)
    axes = fig.subplots(1, 2, sharey=True, gridspec_kw=dict(left=0.235, right=0.965, top=0.69, bottom=0.14, wspace=0.09))
    for ax, kind, title in zip(axes, ("false_water", "missed_water"),
                               ("Labels' false water repeated", "Labels' missed water repeated")):
        quiet(ax)
        ax.set_xlim(38, 101.5)
        ax.set_ylim(len(MODELS) - 0.5, -0.6)
        ax.set_xticks(range(40, 101, 20))
        ax.set_xticklabels([f"{t}%" for t in range(40, 101, 20)])
        ax.set_yticks(range(len(MODELS)))
        ax.set_yticklabels([m[2] for m in MODELS], fontsize=12.5, color=INK)
        ax.tick_params(axis="y", pad=10)
        ax.set_title(title, loc="left", fontsize=13, color=INK, pad=10)
        for i, (key, _, _, colour, _) in enumerate(MODELS):
            guess, found = 100 * predicted[key][kind], 100 * rate(key, kind)
            ax.plot([guess, found], [i, i], color=colour, linewidth=2, solid_capstyle="round", alpha=0.45, zorder=2)
            ax.plot(guess, i, marker="o", markersize=11, markerfacecolor=SURFACE, markeredgecolor=colour,
                    markeredgewidth=2, linestyle="none", zorder=3)
            ax.plot(found, i, marker="o", markersize=12, color=colour, markeredgecolor=SURFACE,
                    markeredgewidth=2, linestyle="none", zorder=4)
            g = f"{guess:.0f}%" if guess == round(guess) else f"{guess:.1f}%"
            left = min(guess, found)
            if left >= 74:
                # Room on the left of the pair: one label, clear of the panel edge.
                ax.text(left - 1.6, i, f"predicted {g}, found {found:.1f}%", ha="right", va="center",
                        fontsize=11.5, color=INK)
            else:
                ax.text(guess, i - 0.26, f"predicted {g}", ha="center", va="bottom", fontsize=11.5, color=INK)
                ax.text(found, i - 0.26, f"found {found:.1f}%", ha="center", va="bottom", fontsize=11.5, color=INK)
    handles = [
        Line2D([], [], marker="o", markersize=10, markerfacecolor=SURFACE, markeredgecolor=INK_2, markeredgewidth=2,
               linestyle="none", label="Predicted before the run"),
        Line2D([], [], marker="o", markersize=10.5, color=INK_2, markeredgecolor=SURFACE, markeredgewidth=1.5,
               linestyle="none", label="Found"),
    ]
    fig.legend(handles=handles, loc="upper left", bbox_to_anchor=(0.225, 0.835), ncol=2, frameon=False,
               fontsize=12.5, handletextpad=0.3, columnspacing=2.2)
    save(fig, "flood-predictions.png")


# ---------------------------------------------------------------- figure 4
def figure_measure():
    """A made-up scene: no data. It shows what 'repeated' and 'put right' mean."""
    rows, cols = 9, 14
    water = "#2a78d6"
    false_colour, missed_colour = "#eb6834", "#1baf7a"
    false_pale, missed_pale = "#f9d3c2", "#bfe9d9"
    land = "#efeee9"

    def river(c):  # the row of the river's centre in column c
        return 1.2 + 0.42 * c

    truth = {(r, c) for r in range(rows) for c in range(cols) if abs(r - river(c)) < 1.05}
    field = {(r, c) for r in range(5, 9) for c in range(1, 5)} - truth          # dry ground the rule calls water
    gap = {(r, c) for (r, c) in truth if 8 <= c <= 12}                           # water the rule misses
    label = (truth - gap) | field
    kept_field = {(r, c) for (r, c) in field if not (r == 5 or (r == 6 and c == 4))}
    kept_gap = {(r, c) for (r, c) in gap if c >= 9}
    extra = {(1, 10)}                                                           # a mistake of the model's own
    model = (truth - kept_gap) | kept_field | extra

    fig = plt.figure(figsize=(14, 4.9))
    heading(fig, "How the measure works: which of the labels' mistakes does the model repeat?",
            "A made-up scene for illustration only. It is not an image from the dataset and it shows no result.",
            top=0.94)
    titles = ["Hand label, the reference", "Automatic label, used in training",
              "The model's map", "What is counted"]
    axes = fig.subplots(1, 4, gridspec_kw=dict(left=0.045, right=0.965, top=0.70, bottom=0.25, wspace=0.09))

    def draw(ax, colour_of):
        ax.set_xlim(0, cols)
        ax.set_ylim(rows, 0)
        ax.set_aspect("equal")
        ax.axis("off")
        for r in range(rows):
            for c in range(cols):
                ax.add_patch(Rectangle((c + 0.04, r + 0.04), 0.92, 0.92, color=colour_of((r, c)), linewidth=0))

    draw(axes[0], lambda p: water if p in truth else land)
    draw(axes[1], lambda p: water if p in label else land)
    draw(axes[2], lambda p: water if p in model else land)

    def counted(p):
        if p in field:
            return false_colour if p in model else false_pale
        if p in gap:
            return missed_colour if p not in model else missed_pale
        return land
    draw(axes[3], counted)
    for ax, title in zip(axes, titles):
        ax.set_title(title, loc="left", fontsize=12.5, color=INK, pad=9)

    key = [
        (water, "Water"),
        (false_colour, "False water, repeated by the model"),
        (false_pale, "False water, put right"),
        (missed_colour, "Missed water, repeated by the model"),
        (missed_pale, "Missed water, recovered"),
    ]
    handles = [Line2D([], [], marker="s", markersize=13, color=c, linestyle="none", label=t) for c, t in key]
    fig.legend(handles=handles, loc="lower left", bbox_to_anchor=(0.036, 0.105), ncol=5, frameon=False,
               fontsize=12, handletextpad=0.2, columnspacing=1.6)
    n_false, n_missed = len(field), len(gap)
    fig.text(0.045, 0.06,
             f"In this scene the model repeats {len(kept_field)} of the {n_false} false-water squares and "
             f"{len(kept_gap)} of the {n_missed} missed-water squares. Its one new mistake, top right of its map, "
             f"is counted separately.", fontsize=12, color=INK_2, ha="left", va="center")
    save(fig, "flood-measure.png")


figure_measure()
figure_fixed_and_added()
figure_by_event()
figure_predictions()
