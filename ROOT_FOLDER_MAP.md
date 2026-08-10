# 워크스페이스 루트 폴더 지도

> 갱신: **2026-08-07** · 비슷한 내용이 **여러 폴더에 조금씩 다르게** 있는 이유를 정리합니다.
> 구현할 때는 **정본 한곳**만 보세요.

## 루트에서 무엇을 쓰나

| 폴더/파일 | 역할 | 정본? | 비고 |
|---|---|---|---|
| [`ASAK/docs/`](ASAK/docs/README.md) | **중앙 문서 허브** | ✅ | [문서 인벤토리](ASAK/docs/document-inventory-slim-2026-07-20.md) |
| [`ASAK/docs/product_bible/`](ASAK/docs/product_bible/) | 제품·API·화면 정본 | ✅ `#canonical` | Pack README 먼저 |
| `ASAK-Kiosk/` | 키오스크 코드 + 로컬 메모 | `#repo-local` | 계약은 Bible/Canonical |
| `ASAK-Admin/` | 관리자 코드 + 로컬 메모 | `#repo-local` | Admin 구현 정본 저장소 |
| `ASAK-back/` | 백엔드 코드 | `#repo-local` | Pack 11 · 원격은 `ASAK-backend` |
| `sources/` · `packages/` · `metadata/` · `scripts/` | 에이전트 스킬 **원본·배포본** | 도구용 | `scripts/sync-skills.ps1` |
| `.agents/` · `.claude/` | 스킬 **실행본** | 도구용 | 로컬만 (gitignore) |
| `AGENTS.md` · `CLAUDE.md` | 에이전트 공통 지침 | `#current` | 있으면 |

## “비슷한 문서” → 어디를 정본으로

| 주제 | **정본 / 먼저 볼 곳** | 나머지 |
|---|---|---|
| 제품 규칙·API·SCR | **Product Bible** + [Canonical](ASAK/docs/governance/canonical-contract-decisions-2026-07-16.md) | Wiki Notion export = Historical |
| 구현 현실 | [baseline](ASAK/docs/wiki/current-status-baseline.md) + [구현 맵](ASAK/docs/planning/current-implementation-map-2026-07-16.md) | |
| 화면 작업 카드 | [implementation_guide/00_START_HERE](ASAK/docs/implementation_guide/00-start-here.md) | guides 07~11 = archive |
| 저장소별 스프린트 | [app-implementation-hub](ASAK/docs/planning/app-implementation-hub.md) + 각 `IMPLEMENTATION_PLAN` | Pack 11/12 = 정책 |
| Figma 실행 | [design/README](ASAK/docs/design/README.md) 실행 스택 | `_archive/figma-plans-2026-07-17/` |
| Figma↔코드 | [ui-index.md](ui-index.md) | repo figma handoff |
| API 필드 | Bible + Canonical | wiki rest-api = legacy path 보존 |
| 스킬 문서 | `sources/skills/` | `packages/*`는 sync 복제본 · `asak-skill-docs-fixed`는 제거됨 |

## 앱 폴더 규칙 (Admin / Kiosk)

- **파일이 하나뿐인 도메인** → 하위 폴더를 만들지 않고 플랫 유지
  예: `components/admin/DashboardPanels.jsx`, `styles/admin/dashboard.css`
- **파일이 여럿인 도메인만** 하위 폴더
  예: `components/admin/menus/`, `styles/admin/shared/`

## 건드리면 안 되는 것

- `product_bible` Pack 본문
- `.agents` / `.claude` 스킬 실행본 (동기화 스크립트로만 갱신)
- `docs/notion`, `worklog/daily` (스크립트 입력)

태그·KEEP 목록: [`ASAK/docs/document-tag-index-2026-07-20.md`](ASAK/docs/document-tag-index-2026-07-20.md)
