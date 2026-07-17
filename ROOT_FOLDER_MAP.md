# 워크스페이스 루트 폴더 지도

> 비슷한 내용이 **여러 폴더에 조금씩 다르게** 있는 이유를 정리한 문서입니다.  
> 구현할 때는 **정본 한곳**만 보세요. 나머지는 복사본·역할별 메모·보관입니다.

## 루트에서 무엇을 쓰나

| 폴더/파일 | 역할 | 정본? | 비고 |
|---|---|---|---|
| [`ASAK/docs/`](ASAK/docs/README.md) | **중앙 문서 허브** | ✅ | [태그 인덱스](ASAK/docs/DOCUMENT_TAG_INDEX.md) |
| [`ASAK/docs/product_bible/`](ASAK/docs/product_bible/) | 제품·API·화면 정본 | ✅ `#canonical` | 여기 내용 복사 금지 |
| `ASAK-Kiosk/` | 키오스크 코드 + 로컬 메모 | `#repo-local` | 계약은 Bible/Canonical |
| `ASAK-Admin/` | 관리자 코드 + 로컬 메모 | `#repo-local` | Admin 구현 정본 저장소 |
| `ASAK-back/` | 백엔드 코드 | `#repo-local` | Pack 11 |
| `asak-agent-kit/` | 에이전트 스킬 **배포 원본** | 도구용 | 패키지별로 복사본 생성 |
| `.agents/` · `.claude/` | 워크스페이스에 깔린 스킬 **실행본** | 도구용 | 내용은 kit와 **동일 15개** (삭제하지 말 것) |
| `.cursor/` | Cursor 규칙·설정 | 도구용 | |
| `AGENTS.md` · `CLAUDE.md` | 에이전트 공통 지침 | `#current` | 거의 같은 내용(도구별 진입점) |
| `docs/` | → ASAK/docs 포인터만 | stub | |
| `ASAK-pr5-audit/` · `_rollback_backup/` | 감사·롤백 백업 | `#archive`급 | 일상 작업 제외 |
| `scripts/` | 워크스페이스 스크립트 | — | |

## “비슷한 문서” → 어디를 정본으로

| 주제 | 여러 곳에 있는 것 | **정본 / 먼저 볼 곳** | 나머지는 |
|---|---|---|---|
| 제품 규칙·API·화면 ID | Bible / wiki / Notion / contracts | **Product Bible** + [Canonical Contract](ASAK/docs/governance/CANONICAL_CONTRACT_DECISIONS.md) | wiki·Notion·repo contracts는 참고 |
| 화면 구현 순서·작업 카드 | `guides/07~11`(보관) / `implementation_guide/` | **`implementation_guide/00_START_HERE.md`** | guides 07~11은 `_archive` |
| 팀 온보딩 | `guides/01~06` / `operations/setup` | **operations GETTING_STARTED** → guides 01~06 | |
| Figma QA | design UNIFIED / claude / Kiosk·Admin figma guide | **`ASAK/docs/design/` UNIFIED** | repo figma guide는 MCP→코드 연결용 |
| SCR 목록 | screens.md / wiki screen / Pack 07 | **Pack 07 Screen Registry** | screens·wiki는 산출물·표 |
| Figma→코드 | Kiosk `figma-mcp-*.md` / Admin `07-figma-*.md` | 저장소별 유지 (화면 범위가 다름) | 중앙 design QA와 함께 |
| API 필드 | wiki rest-api / Kiosk api-data-contract / Bible contracts | **Bible API Contract** + Canonical | wiki·프론트 contract는 기대 shape |
| 에이전트 스킬 | `.agents` = `.claude` = kit 패키지들 | **asak-agent-kit** (배포 원본) | 루트 `.agents`/`.claude`는 실행용 복제 |

## ASAK/docs 안에서 이미 줄인 것

| 겹침 | 조치 |
|---|---|
| design QA·프롬프트 다수 | 루트 4개만 유지, 나머지 `design/_archive` |
| Notion export ~270 | `_archive/notion-export` |
| Wiki 부가 요약 | `_archive/wiki-secondary` |
| guides 07~11 (프론트/백/흐름) | `_archive/guides-dev-overlap` ← **이번** |
| screens-wiki | `_archive/screens-legacy` ← **이번** |
| doc 구조/병합 계획서 2개 | `_archive/doc-mgmt-plans` ← **이번** |

## 건드리면 안 되는 것

- `product_bible` Pack 본문 (정본)
- `.agents` / `.claude` 스킬 (에이전트가 읽음 — kit와 내용 같아도 경로 필요)
- `ASAK-Kiosk` / `Admin` / `back`의 README·IMPLEMENTATION_PLAN (저장소별 실행 맥락)

자세한 태그: [`ASAK/docs/DOCUMENT_TAG_INDEX.md`](ASAK/docs/DOCUMENT_TAG_INDEX.md)
