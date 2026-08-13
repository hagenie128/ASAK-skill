# -*- coding: utf-8 -*-
import os
import re
from pathlib import Path

import pymysql


def load_env() -> None:
    env = Path(r"c:\ASAK-workspace\ASAK-back\.env")
    for line in env.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())


def strip_name(name: str) -> str:
    s = (name or "").strip().replace("（", "(").replace("）", ")")
    s = re.sub(r"^\[프로틴\]", "", s)
    return re.sub(r"\s+", "", s)


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
    cur.execute("SELECT id, name FROM ing")
    ings = {strip_name(n): (i, n) for i, n in cur.fetchall()}

    csv_names = [
        "채소",
        "시즈닝 닭가슴살",
        "에그",
        "옥수수",
        "올리브",
        "토마토",
        "슈레드치즈",
        "(저당) 랜치",
        "두부",
        "머쉬룸",
        "양파",
        "적채",
        "당근라페",
        "견과류",
        "참기름",
        "청양간장 드레싱",
        "귀리",
        "찹쌀",
        "찰보리",
        "고추장제육",
        "양파플레이크",
        "후리가케",
        "고추장비빔",
        "파스타면",
        "바베큐소스",
        "(저당) 들기름소이",
        "오리엔탈",
        "메밀면",
        "그라운드비프",
        "화이트치즈",
        "바질페스토",
        "채소믹스",
        "통밀 치아바타",
        "크리미칠리",
        "잠봉",
        "단호박",
        "곡물",
        "곡물, 채소",
        "채소볼",
    ]
    print("--- name resolve ---")
    for n in csv_names:
        key = strip_name(n)
        hit = ings.get(key)
        if hit:
            print("OK", n, "->", hit)
            continue
        # fuzzy
        cands = [v for k, v in ings.items() if key in k or k in key]
        print("MISS", n, "cands", cands[:5])

    print("--- ranch cob 2114 ---")
    cur.execute(
        """
        SELECT mi.role_id, i.name, mi.is_default, mi.sort_no, mi.can_remove
        FROM menu_ing mi JOIN ing i ON i.id=mi.ing_id
        WHERE mi.menu_id=2114 ORDER BY mi.sort_no, mi.id
        """
    )
    for r in cur.fetchall():
        print(r)

    print("--- sandwich 7264 ---")
    cur.execute(
        "SELECT policy_id, sort_no, required FROM menu_opt_policy WHERE menu_id=7264 ORDER BY sort_no"
    )
    print(cur.fetchall())
    cur.execute(
        """
        SELECT mi.role_id, i.name, mi.is_default, mi.sort_no
        FROM menu_ing mi JOIN ing i ON i.id=mi.ing_id
        WHERE mi.menu_id=7264 ORDER BY mi.sort_no, mi.id
        """
    )
    for r in cur.fetchall():
        print(r)

    print("--- wrap 10069 ---")
    cur.execute(
        """
        SELECT mi.role_id, i.name, mi.is_default, mi.sort_no
        FROM menu_ing mi JOIN ing i ON i.id=mi.ing_id
        WHERE mi.menu_id=10069 ORDER BY mi.sort_no, mi.id
        """
    )
    for r in cur.fetchall():
        print(r)

    print("--- poke 2820 ---")
    cur.execute(
        """
        SELECT mi.role_id, i.name, mi.is_default, mi.sort_no
        FROM menu_ing mi JOIN ing i ON i.id=mi.ing_id
        WHERE mi.menu_id=2820 ORDER BY mi.sort_no, mi.id
        """
    )
    for r in cur.fetchall():
        print(r)

    conn.close()


if __name__ == "__main__":
    main()
