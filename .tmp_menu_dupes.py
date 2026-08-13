# -*- coding: utf-8 -*-
import os
import re
from collections import defaultdict
from pathlib import Path

import pymysql


def strip_name(name: str) -> str:
    s = (name or "").strip().lower()
    s = s.replace("[프로틴]", "")
    return re.sub(r"\s+", "", s)


def load_env() -> None:
    env = Path(r"c:\ASAK-workspace\ASAK-back\.env")
    for line in env.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())


def main() -> None:
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
    cur = conn.cursor()
    cur.execute(
        """
        SELECT m.id, m.name, m.cat_id, c.name AS cat_name,
               (SELECT COUNT(*) FROM menu_nutr n WHERE n.menu_id=m.id) AS has_nutr,
               (SELECT COUNT(*) FROM menu_opt_policy p WHERE p.menu_id=m.id) AS has_policy,
               (SELECT COUNT(*) FROM menu_ing mi WHERE mi.menu_id=m.id) AS ing_cnt
        FROM menu m
        LEFT JOIN category c ON c.id = m.cat_id
        ORDER BY m.name, m.id
        """
    )
    rows = cur.fetchall()
    by_name: dict[str, list] = defaultdict(list)
    for r in rows:
        by_name[strip_name(r[1])].append(r)

    print("total menus:", len(rows))
    dup_groups = {k: v for k, v in by_name.items() if len(v) > 1}
    print("duplicate name groups:", len(dup_groups))
    for key, items in sorted(dup_groups.items(), key=lambda x: -len(x[1])):
        print("\n===", key, f"({len(items)}) ===")
        for r in items:
            print(
                f"  id={r[0]} name={r[1]!r} cat={r[3]}({r[2]}) "
                f"nutr={r[4]} policy={r[5]} menu_ing={r[6]}"
            )

    conn.close()


if __name__ == "__main__":
    main()
