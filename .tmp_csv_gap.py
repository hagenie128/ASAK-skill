# -*- coding: utf-8 -*-
"""CSV vs DB gap report for salady_menu_merged_20260812.csv"""
import csv
import json
import os
import re
from collections import defaultdict
from pathlib import Path

import pymysql

ROOT = Path(r"c:\ASAK-workspace\ASAK\asak-data")
CSV_PATH = ROOT / "scripts/input/salady_menu_merged_20260812.csv"
SEED = ROOT / "seed-v3"

MENU_ALIASES = {
    "단호박노릇두부샐러디": "노릇두부단호박샐러디",
    "소고기비빔메밀누들볼": "비빔메밀면누들볼",
}
NUTR_MAP = [
    ("serving_g", "제공량(g)"),
    ("kcal", "열량(kcal)"),
    ("carb_g", "탄수화물(g)"),
    ("sugar_g", "당류(g)"),
    ("protein_g", "단백질(g)"),
    ("fat_g", "지방(g)"),
    ("saturated_fat_g", "포화지방(g)"),
    ("sodium_mg", "나트륨(mg)"),
]
LOW = {231, 232}


def strip_name(name: str) -> str:
    s = (name or "").strip().lower().replace("[프로틴]", "")
    return re.sub(r"\s+", "", s)


def load_env() -> None:
    env = Path(r"c:\ASAK-workspace\ASAK-back\.env")
    for line in env.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())


def pick_canonical(hits: list, policy: dict[int, int]) -> dict:
    def pri(m):
        cat = int(m["cat_id"])
        cat_rank = 0 if cat not in LOW else (1 if cat == 231 else 2)
        return (cat_rank, -policy.get(m["id"], 0), m["id"])

    return min(hits, key=pri)


def parse_float(v):
    if v is None or str(v).strip() == "":
        return None
    return float(str(v).replace(",", "").strip())


def main() -> None:
    with CSV_PATH.open(encoding="utf-8-sig", newline="") as f:
        csv_rows = list(csv.DictReader(f))

    load_env()
    url = os.environ["DB_URL"].replace("jdbc:mysql://", "")
    hp, _, rest = url.partition("/")
    db = rest.split("?", 1)[0]
    host, port = hp.split(":")
    conn = pymysql.connect(
        host=host,
        port=int(port),
        user=os.environ["DB_USERNAME"],
        password=os.environ["DB_PASSWORD"],
        database=db,
        charset="utf8mb4",
    )
    cur = conn.cursor(pymysql.cursors.DictCursor)

    cur.execute("SELECT id, name, cat_id, description FROM menu")
    menus = cur.fetchall()
    by_name = defaultdict(list)
    for m in menus:
        by_name[strip_name(m["name"])].append(m)

    cur.execute("SELECT menu_id, COUNT(*) c FROM menu_opt_policy GROUP BY menu_id")
    policy = {r["menu_id"]: r["c"] for r in cur.fetchall()}

    cur.execute(
        "SELECT menu_id, serving_g, kcal, carb_g, sugar_g, protein_g, fat_g, saturated_fat_g, sodium_mg FROM menu_nutr"
    )
    nutr = {r["menu_id"]: r for r in cur.fetchall()}

    cur.execute("SELECT menu_id, COUNT(*) c FROM menu_ing GROUP BY menu_id")
    mi_cnt = {r["menu_id"]: r["c"] for r in cur.fetchall()}

    cur.execute("SELECT menu_id, COUNT(*) c FROM menu_opt_policy GROUP BY menu_id")
    pol_cnt = {r["menu_id"]: r["c"] for r in cur.fetchall()}

    cur.execute(
        """
        SELECT mt.menu_id, GROUP_CONCAT(t.name ORDER BY t.name SEPARATOR '|') tags
        FROM menu_tag mt JOIN tag t ON t.id=mt.tag_id
        GROUP BY mt.menu_id
        """
    )
    tags = {r["menu_id"]: set((r["tags"] or "").split("|")) for r in cur.fetchall()}

    missing_menu = []
    nutr_diff = []
    no_menu_ing = []
    no_policy = []
    tag_diff = []
    desc_diff = []
    allergy_diff = []

    for row in csv_rows:
        name = row["메뉴명"].strip()
        key = strip_name(name)
        key = MENU_ALIASES.get(key, key)
        hits = by_name.get(key, [])
        if not hits:
            missing_menu.append(name)
            continue
        menu = pick_canonical(
            [{"id": h["id"], "cat_id": h["cat_id"], "name": h["name"], "description": h["description"]} for h in hits],
            policy,
        )
        mid = menu["id"]

        n = nutr.get(mid)
        if not n:
            nutr_diff.append((name, mid, "NO_NUTR", row.get("열량(kcal)")))
        else:
            for dbk, csvk in NUTR_MAP:
                cv = parse_float(row.get(csvk))
                if cv is None:
                    continue
                dv = n.get(dbk)
                if dv is None:
                    nutr_diff.append((name, mid, dbk, None, cv))
                elif abs(float(dv) - cv) > 0.15:
                    nutr_diff.append((name, mid, dbk, float(dv), cv))

        if mi_cnt.get(mid, 0) == 0:
            no_menu_ing.append((name, mid))
        if pol_cnt.get(mid, 0) == 0:
            no_policy.append((name, mid))

        csv_tags = set(t.strip() for t in re.split(r"[|]", row.get("태그") or "") if t.strip())
        db_tags = tags.get(mid, set())
        if csv_tags != db_tags and csv_tags:
            tag_diff.append((name, mid, csv_tags, db_tags))

        from_desc = row.get("토핑", "")
        dressing = row.get("추천/기본 드레싱", "")
        expected_desc = " · ".join(
            p
            for p in [
                from_desc.strip(),
                f"기본 드레싱: {dressing.strip()}" if dressing.strip() and "미제공" not in dressing else "",
            ]
            if p
        )
        if expected_desc and menu["description"] != expected_desc:
            desc_diff.append((name, mid, expected_desc[:60], (menu["description"] or "")[:60]))

        # allergy marks
        csv_allergens = []
        for col, val in row.items():
            if col.startswith("알레르기_") and (val or "").strip() == "●":
                csv_allergens.append(col.removeprefix("알레르기_"))
        if csv_allergens:
            cur.execute(
                """
                SELECT DISTINCT a.name
                FROM menu_ing mi
                JOIN ing_allergen ia ON ia.ing_id=mi.ing_id
                JOIN allergen a ON a.id=ia.allergen_id
                WHERE mi.menu_id=%s AND mi.is_default=1
                """,
                (mid,),
            )
            db_allergens = {r["name"] for r in cur.fetchall()}
            missing_a = set(csv_allergens) - db_allergens
            if missing_a:
                allergy_diff.append((name, mid, sorted(missing_a)))

    print("CSV rows:", len(csv_rows))
    print("missing_menu:", len(missing_menu), missing_menu)
    print("nutr_diff:", len(nutr_diff))
    for d in nutr_diff[:20]:
        print(" ", d)
    print("no_menu_ing:", len(no_menu_ing), no_menu_ing)
    print("no_policy:", len(no_policy), no_policy)
    print("tag_diff:", len(tag_diff))
    for d in tag_diff[:10]:
        print(" ", d)
    print("desc_diff:", len(desc_diff))
    for d in desc_diff[:10]:
        print(" ", d)
    print("allergy_diff:", len(allergy_diff))
    for d in allergy_diff[:15]:
        print(" ", d)

    conn.close()


if __name__ == "__main__":
    main()
