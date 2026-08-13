# asak-signoff — salady menu & asset sync

날짜: 2026-08-12
주제: 샐러디 merged CSV·seed·DB·Kiosk 에셋 동기화

## 1. 대상 저장소와 기준 커밋

| 저장소 | 원격 | merge 커밋 | 기능 커밋 |
| --- | --- | --- | --- |
| ASAK | `https://github.com/hagenie128/ASAK.git` | `eda7b68` | `4dc3677` |
| ASAK-Kiosk | `https://github.com/hagenie128/ASAK-Kiosk.git` | `b8c190f` | `47f5d90` |

소스코드·DB·원격 Git·Figma 수정: **없음** (본 문서·worklog만 갱신)

## 2. 확인한 근거

### 코드·스크립트

- `asak-data/scripts/apply_salady_menu_merged_20260812.py`
- `asak-data/scripts/apply_nutrition_allergy_csv_260715.py`
- `asak-data/scripts/dedupe_menus_seed_v3.py`
- `asak-data/scripts/trim_kiosk_png_assets.py`
- seed-v3 JSON 일괄, Kiosk `public/assets/menu|ingredients`

### Git

- 작업 브랜치 원격 push → `main` `--no-ff` merge → `origin/main` push
- 작업 브랜치 로컬·원격 삭제 완료 (세션 중 깃반영)

### DB (퇴근 시 read-only SELECT)

- `menu`: 58
- `menu_nutr`: 58
- `ing`: 92
- menu 이름 중복: 0

### 에셋 (퇴근 시 파일 count)

- Kiosk `public/assets/menu/*.png`: 58 (DB와 일치, orphan 0)
- Kiosk `public/assets/ingredients/photos/*.png`: 56
- Kiosk `dist/assets/menu/*.png`: 50 (10768~10775 8건 누락, gitignore)

### 리포트 JSON

- dedupe: 92 → 58, removed 34 (`dedupe_menus_seed_v3_report.json`)
- merged CSV sync (`salady_menu_merged_20260812_report.json`)

## 3. 실행한 검증

| 항목 | 결과 |
| --- | --- |
| 스크립트 `--apply-db` | 세션 중 실행 (nutrition, merged, dedupe) |
| CSV vs DB 리포트 | 세션 중 missing/diff 0 |
| PNG trim | 세션 중 148건 |
| orphan menu png 삭제 | 34 id × public/dist/asak-data |
| 퇴근 DB SELECT | menu 58, dup 0 |
| Git HEAD == origin/main | ASAK·Kiosk 각각 확인 |

## 4. 미검증 항목

- `npm run build`, `npm test`
- Kiosk 브라우저 UI·이미지 로드
- Admin API E2E
- `allergy_fix_checklist_live38` 자동 DB 적용
- Figma Frame/Node
- 배포 환경 서비스 확인

## 5. 갱신한 문서

1. `ASAK/worklog/daily/이하진/2026-08-12.md`
2. `ASAK/worklog/entries/이하진/2026-08-12-salady-menu-asset-sync.md`
3. 본 파일: `docs/ai-reports/2026-08-12/asak-signoff-salady-menu-asset-sync.md`

WBS·Product Bible·API 계약: **변경 없음** (데이터·에셋 작업, DoD 증거 부족)

## 6. Notion

```
Notion 미반영
원인: 퇴근 명령에 Notion sync 미포함, MCP 쓰기 미실행
필요한 사람 조치: Notion 일일 워크로그 DB에 daily 표 1행·entries 링크 수동 또는 sync 스크립트 실행
```

## 7. 다음 작업

- Kiosk build → dist menu 58건 확인
- 브라우저에서 신규·교체 이미지 확인
- 알레르기 체크리스트 적용 범위 결정
- worklog Git 반영 여부 팀 합의
