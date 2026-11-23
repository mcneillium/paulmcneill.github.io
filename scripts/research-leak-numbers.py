#!/usr/bin/env python3
"""Write _data/research_leak.json for /research/ from the leak study's result files.

    python scripts/research-leak-numbers.py <leak-repair-labels repo>

Every number on the page's leak section comes from this file. The predictions
are the ones recorded in the study's protocol before each run.
"""
import json
import sys
from datetime import datetime
from decimal import ROUND_HALF_UP, Decimal
from pathlib import Path

if len(sys.argv) < 2:
    sys.exit("usage: python scripts/research-leak-numbers.py <leak-repair-labels repo>")
REPO = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "_data" / "research_leak.json"

PREDICTED = {
    "3-day": {"found": "2 or 3", "found_low": 2, "found_high": 3, "flags_real": "50 to 80%"},
    "7-day": {"found": "4 or 5", "found_low": 4, "found_high": 5, "flags_real": "over 80%"},
}
LABELS = {"3-day": "3 nights before against 3 after", "7-day": "7 nights before against 7 after"}


def load(name):
    return json.loads((REPO / "results" / name).read_text(encoding="utf-8"))


def one_place(value):
    """One decimal place, halves rounded up (the result files hold two places)."""
    return str(Decimal(str(value)).quantize(Decimal("0.1"), rounding=ROUND_HALF_UP))


def nice_day(text):
    day = datetime.strptime(text[:10], "%Y-%m-%d")
    return f"{day.day} {day.strftime('%B')}"


dev = load("threshold_2018.json")
test = load("test_2019.json")

rules = []
for name in ["3-day", "7-day"]:
    d = dev["rules"][name]
    t = test["rules"][name]
    predicted = PREDICTED[name]
    row = {
        "id": name,
        "label": LABELS[name],
        "threshold": one_place(d["threshold_m3h"]),
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
for three, seven in zip(test["rules"]["3-day"]["repair_table"], test["rules"]["7-day"]["repair_table"]):
    if three["pipe"] != seven["pipe"]:
        sys.exit("The two rules' repair tables are in different orders.")
    row = {
        "pipe": three["pipe"],
        "day": nice_day(three["repaired"]),
        "leak": one_place(three["leak_m3h_at_repair"]),
        "drop_3": one_place(three["largest_drop_within_2_days_m3h"]),
        "found_3": three["found"],
        "drop_7": one_place(seven["largest_drop_within_2_days_m3h"]),
        "found_7": seven["found"],
    }
    repairs.append(row)

weekday = dev["night_flow_mean_by_weekday_m3h"]
ordered = sorted(float(value) for value in weekday.values())
out = {
    "generated_from": "results/threshold_2018.json and results/test_2019.json",
    "dev_night_flow": f"{dev['night_flow_mean_m3h']:.0f}",
    "test_night_flow": f"{test['night_flow_mean_m3h']:.0f}",
    "weekday_low": f"{ordered[0]:.0f}",
    "weekday_quiet_high": f"{ordered[4]:.0f}",
    "weekday_busy_low": f"{ordered[5]:.0f}",
    "weekday_busy_high": f"{ordered[6]:.0f}",
    "rules": rules,
    "repairs": repairs,
}
OUT.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
print("Wrote", OUT)
