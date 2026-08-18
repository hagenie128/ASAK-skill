# asak-doc-sync — admin menu soft delete

날짜: 2026-08-11
주제: 관리자 메뉴 CRUD · soft delete 문서 동기화

## 1. 대상 저장소와 기준 커밋

| 항목 | 값 |
| --- | --- |
| 코드 저장소 | `ASAK-back` |
| 기준 커밋 | `73ab0f7` feat: 관리자 메뉴 상세·영양·재료와 soft delete 및 Bruno 정리 |
| 문서 루트 | `ASAK/docs/product_bible/...` |
| 소스/DB/Figma 수정 | 없음 (문서만) |

## 2. 확인한 코드·문서

### 코드
- `AdminMenuController` — GET/POST/PATCH/DELETE, categories, ingredients
- `AdminMenuService` — create/update/softDelete, `saveMenuImage`(미연결)
- `AdminMenuMapper` / `.xml` — `softDeleteMenu`, `deleted_at IS NULL` 상세
- `CreateMenuRequest` 및 child DTO
- `ErrorCode` MENU_* 계열
- `docs/migrations/2026-08-11_menu_soft_delete.sql`, `docs/view.sql`
- Bruno `api/admin/05`–`12`, `09-delete-menu.bru`

### 문서 (갱신 전)
- `MENU_MANAGEMENT_API_CONTRACT.md` (2026-08-06 미구현 스냅샷)
- `MENU_MANAGEMENT_IMPLEMENTATION.md`
- `MENU_API_CONTRACT.md` §6 DELETE deferred
- `MENU_MANAGEMENT_EDGE_CASE_AND_QA.md`
- `MENU_MANAGEMENT_TESTS.md`
- `MENU_MANAGEMENT_ARCHITECTURE.md` §9

### 실행 검증
- 이번 문서 동기화 세션에서 API/E2E 실행 없음 → **미검증**

## 3. 갱신한 문서

1. `ASAK/docs/product_bible/03_Menu_Inventory_SoldOut/menu-management/MENU_MANAGEMENT_API_CONTRACT.md`
2. `ASAK/docs/product_bible/11_Backend_Implementation/02-menu/MENU_MANAGEMENT_IMPLEMENTATION.md`
3. `ASAK/docs/product_bible/03_Menu_Inventory_SoldOut/menu/MENU_API_CONTRACT.md`
4. `ASAK/docs/product_bible/03_Menu_Inventory_SoldOut/menu-management/MENU_MANAGEMENT_EDGE_CASE_AND_QA.md`
5. `ASAK/docs/product_bible/09_QA_Bible/02-admin/MENU_MANAGEMENT_TESTS.md`
6. `ASAK/docs/product_bible/03_Menu_Inventory_SoldOut/menu-management/MENU_MANAGEMENT_ARCHITECTURE.md` (§9만)
7. 본 보고서: `docs/ai-reports/2026-08-11/asak-doc-sync-admin-menu-soft-delete.md` (+ ASAK 경로 복사)

## 4. 변경 근거

| 문서 변경 | 코드 근거 | 상태 |
| --- | --- | --- |
| POST/PATCH/DELETE·ingredients = 구현됨 | Controller + Service + Mapper | 구현됨 |
| DELETE = soft delete `deleted_at` | `softDeleteMenu` SQL | 구현됨 |
| Create body = `CreateMenuRequest` camelCase | DTO | 구현됨 |
| 재료 path = `/api/admin/menus/ingredients` | `@GetMapping("/ingredients")` | 구현됨 |
| size 기본 12 | `MenuListRequest` | 구현됨 |
| Image upload API | `saveMenuImage` only | 미연결 |
| Draft `MENU_DELETE_CONFLICT` | `ErrorCode`에 없음 | 계약 불일치 |

## 5. 실행 또는 검증 결과

- 문서-코드 대조만 수행.
- `git diff --check` 대상: 갱신 문서·본 보고서 (별도 실행).

## 6. 남은 불일치

- Product Bible 구 Draft 필드명(`menuName`, `basePrice` 등) vs 현재 DTO → 본문에 코드 shape로 교체, 구안은 불일치로 표기.
- Draft error code 목록 vs `ErrorCode` enum.

## 7. 결정 필요 사항

1. 이미지: JSON `imageUrl` 유지 vs multipart Controller 연결
2. `MENU_DELETE_CONFLICT` 도입 여부 (현재 `MENU_DELETE_FAILED` / `MENU_NOT_FOUND`)
3. 재료 목록 keyword·paging 추가 여부
4. Admin UI ConfirmDialog·삭제 E2E 검증

## 8. 수정하지 않은 범위

- Screen Bible 전면, Figma, DevCopilot, Kiosk 주문·결제 계약
- ASAK-Admin / ASAK-Kiosk 소스
- 실제 DB (이미 soft delete 반영된 상태는 이전 작업 이력; 본 스킬에서 DB 변경 없음)
- Bruno 컬렉션 (이미 코드와 맞춤 커밋됨)
