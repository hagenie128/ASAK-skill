# -*- coding: utf-8 -*-
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(r"c:\ASAK-workspace\ASAK\asak-data\seed-v3")
menus = json.loads((ROOT / "menu.json").read_text(encoding="utf-8"))

LOW = {231, 232}


def strip_name(name: str) -> str:
    s = (name or "").strip().lower()
    s = s.replace("[프로틴]", "")
    return re.sub(r"\s+", "", s)


def priority(m: dict) -> tuple:
    cat = int(m.get("cat_id") or 0)
    cat_rank = 0 if cat not in LOW else (1 if cat == 231 else 2)
    return (cat_rank, int(m["id"]))


by = defaultdict(list)
for m in menus:
    by[strip_name(m["name"])].append(m)

dups = {k: v for k, v in by.items() if len(v) > 1}
print("seed menus", len(menus), "dup groups", len(dups))
for k, items in sorted(dups.items(), key=lambda x: -len(x[1]))[:10]:
    print(k, [(i["id"], i["name"], i["cat_id"]) for i in sorted(items, key=priority)])
