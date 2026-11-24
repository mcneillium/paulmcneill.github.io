#!/usr/bin/env python3
"""Write _data/research_leak.json for /research/ from the leak study's results.

    python scripts/research-leak-numbers.py <leak-repair-labels repo> <data folder>

Counts, thresholds and the repair table come from the study's
results/study.json. The night-flow means are recomputed with the study's own
leak_rule.py from the L-Town files, because study.json does not store them.
The predictions are the ones recorded in the study's protocol before each run.
"""
import json
import sys
from datetime import datetime
from decimal import ROUND_HALF_UP, Decimal
from pathlib import Path

import pandas as pd

if len(sys.argv) < 3:
    sys.exit("usage: python scripts/research-leak-numbers.py <leak-repair-labels repo> <data folder>")
REPO = Path(sys.argv[1]).resolve()
DATA = Path(sys.argv[2]).resolve()
OUT = Path(__file__).resolve().parent.parent / "_data" / "research_leak.json"
sys.path.insert(0, str(REPO))
import leak_rule  # noqa: E402

PREDICTED = {
    "3": {"found": "2 or 3", "found_low": 2, "found_high": 3, "flags_real": "50 to 80%"},
    "7": {"found": "4 or 5", "found_low": 4, "found_high": 5, "flags_real": "over 80%"},
}
LABELS = {"3": "3 nights before against 3 after", "7": "7 nights before against 7 after"}
IDS = {"3": "3-day", "7": "7-day"}


def one_place(value):
    """One decimal place, halves rounded up (the results hold two places)."""
    return str(Decimal(str(value)).quantize(Decimal("0.1"), rounding=ROUND_HALF_UP))


def nice_day(text):
    day = datetime.strptime(text[:10], "%Y-%m-%d")
    return f"{day.day} {day.strftime('%B')}"


study = json.loads((REPO / "results" / "study.json").read_text(encoding="utf-8"))
dev = study["development"]
test = study["test"]

rules = []
for window in ["3", "7"]:
    d = dev["windows"][window]
    t = test["windows"][window]
    predicted = PREDICTED[window]
    row = {
        "id": IDS[window],
        "label": LABELS[window],
        "threshold": one_place(study["thresholds"][window]),
        "dev_found": d["found"],
        "dev_repairs": d["repairs"],
        "dev_flags": d["flags"],
        "test_found": t["found"],
        "test_repairs": t["repairs"],
        "test_flags": t["flags"],
        "test_flags_real": t["found"],
        "predicted_found": predicted["found"],
        "predicted_flags_real": predicted["flags_real"],
        "found_met": predicted["found_low"] <= t["found"] <= predicted["found_high"],
    }
    rules.append(row)

repairs = []
for repair in test["repairs"]:
    row = {
        "pipe": repair["pipe"],
        "day": nice_day(repair["end"]),
        "leak": one_place(repair["size"]),
        "drop_3": one_place(repair["drop_3"]),
        "found_3": repair["flag_3"] is not None,
        "drop_7": one_place(repair["drop_7"]),
        "found_7": repair["flag_7"] is not None,
    }
    repairs.append(row)

flows = pd.concat([leak_rule.read_year(DATA, year, "SCADA_Flows") for year in (2018, 2019)])
levels = pd.concat([leak_rule.read_year(DATA, year, "SCADA_Levels")[leak_rule.TANK] for year in (2018, 2019)])
nights = leak_rule.night_flow(flows[leak_rule.METERS].sum(axis=1), levels)
nights_2018 = nights.loc["2018"]
nights_2019 = nights.loc["2019"]
weekday = sorted(nights_2018.groupby(nights_2018.index.weekday).mean())

out = {
    "generated_from": "results/study.json, with night-flow means recomputed by leak_rule.py",
    "dev_night_flow": f"{nights_2018.mean():.0f}",
    "test_night_flow": f"{nights_2019.mean():.0f}",
    "weekday_low": f"{weekday[0]:.0f}",
    "weekday_quiet_high": f"{weekday[4]:.0f}",
    "weekday_busy_low": f"{weekday[5]:.0f}",
    "weekday_busy_high": f"{weekday[6]:.0f}",
    "rules": rules,
    "repairs": repairs,
}
OUT.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
print("Wrote", OUT)
