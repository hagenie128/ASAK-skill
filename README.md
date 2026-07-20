# ASAK Workspace 안내

여러 ASAK 프로젝트를 한곳에서 여는 **작업공간**입니다. Cursor에서는 **`ASAK.code-workspace`** 를 여세요. Source Control에 네 레포가 각각 보입니다.

## 프로젝트

| 폴더 | 역할 | 원격 |
| --- | --- | --- |
| `ASAK` | 중앙 문서 + 데이터 | [`hagenie128/ASAK`](https://github.com/hagenie128/ASAK) |
| `ASAK-Kiosk` | 주문 키오스크 | [`hagenie128/ASAK-Kiosk`](https://github.com/hagenie128/ASAK-Kiosk) |
| `ASAK-Admin` | 관리자 | [`hagenie128/ASAK_Admin`](https://github.com/hagenie128/ASAK_Admin) |
| `ASAK-back` | 백엔드 | [`hagenie128/ASAK-back`](https://github.com/hagenie128/ASAK-back) |

## 어디부터 보나

| 목적 | 경로 |
| --- | --- |
| **문서 시작 (단일 입구)** | [`ASAK/docs/START_HERE.md`](ASAK/docs/START_HERE.md) |
| **구현 현실 (2026-07-20)** | [`ASAK/docs/wiki/current-status-baseline.md`](ASAK/docs/wiki/current-status-baseline.md) |
| **WBS / 할 일** | [`ASAK/docs/wiki/wbs-v2.md`](ASAK/docs/wiki/wbs-v2.md) · [`wbs-status-notes.md`](ASAK/docs/wiki/wbs-status-notes.md) |
| UI 화면 매핑 (Figma↔코드) | [`ui-index.md`](ui-index.md) |
| 중앙 문서 허브 | [`ASAK/docs/README.md`](ASAK/docs/README.md) · [`ASAK/PROJECT_HUB.md`](ASAK/PROJECT_HUB.md) |
| 구현 맵 | [`ASAK/docs/planning/current-implementation-map-2026-07-16.md`](ASAK/docs/planning/current-implementation-map-2026-07-16.md) |
| 앱 구현 허브 | [`ASAK/docs/planning/app-implementation-hub.md`](ASAK/docs/planning/app-implementation-hub.md) |
| Kiosk 계획·구조 | [`ASAK-Kiosk/IMPLEMENTATION_PLAN.md`](ASAK-Kiosk/IMPLEMENTATION_PLAN.md) · [`STRUCTURE_GUIDE`](ASAK-Kiosk/src/STRUCTURE_GUIDE.md) |
| Admin 계획·구조 | [`ASAK-Admin/IMPLEMENTATION_PLAN.md`](ASAK-Admin/IMPLEMENTATION_PLAN.md) · [`STRUCTURE_GUIDE`](ASAK-Admin/src/STRUCTURE_GUIDE.md) |
| Backend 계획 | [`ASAK-back/IMPLEMENTATION_PLAN.md`](ASAK-back/IMPLEMENTATION_PLAN.md) |
| Figma 토큰 보고서 | [`ASAK/docs/design/figma-token-report.md`](ASAK/docs/design/figma-token-report.md) |
| Bruno API | [`ASAK-back/api/`](ASAK-back/api/) |

정책 정본은 `ASAK/docs/product_bible/` ([얇은 안내](ASAK/docs/product_bible/README.md)). **한물간 문서**는 `ASAK/docs/archive/` — 실행에 쓰지 마세요.

## Git

상위 `ASAK-workspace`는 `.gitmodules`로 네 프로젝트를 gitlink합니다. **코드 변경은 하위 폴더에서** 커밋·푸시하세요.

```powershell
cd C:\ASAK-workspace\ASAK-Kiosk   # 또는 Admin / back / ASAK
git status
git add .
git commit -m "your message"
git push
```

워크스페이스 메타(README, ui-index, submodule SHA)만 루트에서 커밋합니다.
