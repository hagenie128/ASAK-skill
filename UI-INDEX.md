# ASAK UI 인덱스

화면 하나를 고치려 할 때 **여기부터 본다.** 화면명 → Figma 노드 → 코드 파일 → 로컬 에셋 → 스크린샷 → 미구현 기능을 한 표에 모았다.

세부 기록은 각 프로젝트 문서에 그대로 남아 있으며, 이 문서는 그 문서들을 대체하지 않고 진입점 역할만 한다.

| 문서 | 다루는 내용 |
| --- | --- |
| [ASAK-Kiosk/docs/figma-ui-handoff.md](ASAK-Kiosk/docs/figma-ui-handoff.md) | 키오스크 화면 매핑, 상태 화면 preview route, Foundation token 정리 제안 |
| [ASAK-Kiosk/docs/figma-logo-asset-log.md](ASAK-Kiosk/docs/figma-logo-asset-log.md) | 키오스크 로고·헤더·결제 에셋의 출처와 캡처 위치 |
| [ASAK-Admin/docs/figma-visual-parity-log.md](ASAK-Admin/docs/figma-visual-parity-log.md) | 관리자 노드별 시각 대조, 효과 대체, 토큰 제안 |
| [ASAK-Admin/docs/ui-implementation-map.md](ASAK-Admin/docs/ui-implementation-map.md) | 관리자 라우트별 이식 파일과 데이터 연결 경계 |
| [ASAK-Admin/docs/07-figma-mcp-implementation-guide.md](ASAK-Admin/docs/07-figma-mcp-implementation-guide.md) | 관리자 Figma 이식 절차 |

## 기준 파일 (중요)

- **현재 기준은 하나뿐이다.** `ASAK — Design System & Product UI 0718`
- File key: `yHhvn5RKjBd91U8BJUQz7F`
- URL: <https://www.figma.com/design/yHhvn5RKjBd91U8BJUQz7F/ASAK-%E2%80%94-Design-System---Product-UI-0718>
- Kiosk 캔버스: `134:7720` — `🛒 05-C. Screens / Kiosk (Implementation Final)`
- Admin 캔버스: `134:10606` — `📊 06-C. Screens / Admin (Implementation Final)`

`ASAK-Kiosk/docs/figma-ui-handoff.md`에 적힌 `JSrjOy668zhfkiLplCkreh`(0715)는 **구버전**이다. 노드 ID는 두 파일에서 우연히 겹치므로, 파일 키를 확인하지 않고 노드 번호만 보고 작업하면 옛 시안을 이식하게 된다. 항상 위 파일 키를 쓴다.

기준 해상도: Kiosk `1080 × 1920`, Admin Desktop `1920 × 1080`.

## Kiosk 화면

라우트는 `ASAK-Kiosk/src/apps/kiosk/KioskApp.jsx`에서 조립한다. 공통 스타일은 `src/styles/commonStyle.css`, 토큰은 `src/styles/tokens.css`.

| 화면 | Figma 노드 | 코드 파일 | 로컬 에셋 | 스크린샷 | 미구현 |
| --- | --- | --- | --- | --- | --- |
| Home | `134:7721` / HC `224:12713` | `pages/kiosk/HomePage.jsx`, `components/kiosk/OrderTypeSelector.jsx` | `assets/figma/asak-logo-home-light.png` | [기본](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-home-1080x1920.png) · [고대비](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-home-high-contrast-1080x1920.png) | — |
| Menu List | `134:7792` | `pages/kiosk/MenuListPage.jsx`, `CategoryTabs.jsx`, `MenuCard.jsx`, `MenuListFooter.jsx` | `assets/figma/kiosk-header-logo.svg`, `icon-kiosk-back.svg`, `icon-kiosk-home.svg` | [기본](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-menu-list-1080x1920.png) · [toast](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-menu-list-toast-1080x1920.png) · [loading](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-menu-list-loading-1080x1920.png) · [empty](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-menu-list-empty-1080x1920.png) · [error](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-menu-list-error-1080x1920.png) · [sold-out](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-menu-list-sold-out-1080x1920.png) · [with-cart](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-menu-list-with-cart-1080x1920.png) | 카테고리 API |
| Menu Detail | `134:7810` | `MenuDetailPage.jsx`, `AllergenAccordion.jsx`, `KioskToast.jsx`, `KioskConfirmDialog.jsx` | `public/assets/menu/*.png` | [기본](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-menu-detail-1080x1920.png) · [allergy](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-menu-detail-allergy-1080x1920.png) · [toast](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-menu-detail-toast-1080x1920.png) · [confirm](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-menu-detail-confirm-1080x1920.png) | 장바구니 수정 흐름 |
| Cart | `134:7835` | `CartPage.jsx`, `CartItem.jsx`, `QuantityStepper.jsx` | — | [기본](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-cart-1080x1920.png) · [confirm](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-cart-confirm-1080x1920.png) · [toast](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-cart-toast-1080x1920.png) · [empty](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-cart-empty-1080x1920.png) | 품절 처리 |
| Payment | `134:7861` 계열 | `PaymentPage.jsx` | `icon-kiosk-card.svg`, `logo-kakaopay.png`, `payment-processing-illustration.png` | [기본](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-payment-1080x1920.png) · [selected](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-payment-selected-1080x1920.png) · [expanded](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-payment-expanded-1080x1920.png) · [processing](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-payment-processing-1080x1920.png) · [disabled](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-payment-disabled-1080x1920.png) · [loading](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-payment-loading-1080x1920.png) · [load-error](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-payment-error-load-1080x1920.png) | 결제 요청 |
| Order Complete | 0718 `134:7926` (0714 레이아웃) | `OrderCompletePage.jsx` | `order-complete-ticket.svg`, `asak-s-logo.svg`, `order-complete-barcode.svg` | [기본](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-complete-1080x1920.png) · [receiptPrint](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-complete-receipt-print-1080x1920.png) · [receiptError](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-complete-receipt-error-1080x1920.png) | 출력·자동 홈 복귀 |
| Accessibility | `134:7972` / HC `134:8005` | `AccessibilityPage.jsx` | — | [기본](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-accessibility-1080x1920.png) · [고대비](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-accessibility-high-contrast-1080x1920.png) | 고대비·글자 크기 전역 적용 |
| Payment Error | `134:7900` 계열 | `PaymentErrorPage.jsx` | — | [declined](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-payment-error-1080x1920.png) · [network](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-payment-error-network-1080x1920.png) · [retry](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-payment-error-retry-1080x1920.png) | — |
| Timeout | `134:7913` 계열 | `TimeoutPage.jsx` | — | [expired](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-timeout-1080x1920.png) · [warning](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-timeout-warning-1080x1920.png) · [continue](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-timeout-continue-1080x1920.png) | — |
| Receipt | `3014:40926` 계열 | `ReceiptPage.jsx` | — | [preview](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-receipt-1080x1920.png) · [printing](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-receipt-printing-1080x1920.png) · [success](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-receipt-success-1080x1920.png) · [error](ASAK-Kiosk/docs/screenshots/2026-07-19-kiosk-receipt-error-1080x1920.png) | — |

상태 화면은 `/ui-preview/:screen/:state`로 확인한다.

| screen | 지원 state |
| --- | --- |
| `home` | `default`, `high-contrast` (`selected`/`selection` 별칭) |
| `menu` | `default`, `loading`, `empty`, `error`, `sold-out`, `with-cart`, `empty-cart`, `item-added`, `success` |
| `detail` | `default`, `loading`, `error`, `sold-out`, `allergy`, `allergy-expanded`, `menu-limit`, `cart-limit`, `success`, `confirm`/`discard` |
| `cart` | `default`, `empty`, `confirm`/`clear-confirm`, `delete-confirm`, `quantity-changed`, `option-updated`, `item-deleted`, `success` |
| `payment` | `default`, `selected`/`selection`, `expanded`, `processing`/`progress`, `disabled`, `loading`, `error`/`network-error` |
| `payment-error` | `declined`, `network-failure`/`network`, `retry`, `error` |
| `timeout` | `expired`, `warning`, `continue` (`error`/`confirm`/`progress` 별칭) |
| `accessibility` | `default`, `high-contrast`/`selection`, `reverted`/`success` |
| `receipt` | `preview`, `printing`, `success`, `error` |
| `complete` | `default`, `receiptPrint`/`receipt-print`, `receiptError`/`receipt-error` |

### Kiosk에서 아직 화면 자체가 없는 것

없음. SCR-012/013/023은 라우트·페이지로 이식됨. 상태 변형은 `/ui-preview/:screen/:state`로 확인.

## Admin 화면

라우트는 `ASAK-Admin/src/apps/AdminApp.jsx`. 공통 셸은 `layouts/AdminLayout.jsx` + `components/admin/AdminSidebar.jsx`, 스타일은 `src/styles/app-shell.css`.

| 화면 | 경로 | Figma 노드 | 코드 파일 | 스크린샷 | 미구현 |
| --- | --- | --- | --- | --- | --- |
| Live Order | `/` | `235:6361` / `134:10607` | `OrderListPage.jsx`, `LiveOrderPreview.jsx` | [기본](ASAK-Admin/docs/screenshots/2026-07-19-admin-live-orders-1920x1080.png) | 주문 조회, 상태 전이, TTS |
| Dashboard | `/dashboard` | `227:5008` | `DashboardPage.jsx`, `AdminTopHeader.jsx` | [기본](ASAK-Admin/docs/screenshots/2026-07-19-admin-dashboard-1920x1080.png) | KPI·최근주문 adapter |
| Order Management | `/orders` | `134:10630` | `OrderManagementPreview.jsx` | [기본](ASAK-Admin/docs/screenshots/2026-07-19-admin-order-management-1920x1080.png) | 필터·검색·페이지네이션 |
| Sold-out | `/sold-out` | `241:14211` / `134:11863` | `SoldOutManagePage.jsx` | [기본](ASAK-Admin/docs/screenshots/2026-07-19-admin-sold-out-1920x1080.png) | 품절 draft store, 저장 |
| Menu Management | `/menus` | `134:12137` | `MenuManagePage.jsx` | [기본](ASAK-Admin/docs/screenshots/2026-07-19-admin-menu-management-1920x1080.png) | 메뉴 조회·검색 |
| Menu Edit | `/menus/edit` | `134:12328` | `MenuEditPage.jsx` | [기본](ASAK-Admin/docs/screenshots/2026-07-19-admin-menu-edit-1920x1080.png) | 폼·검증·업로드 |
| Payment Methods | `/payment-methods` | `134:11493` | `PaymentMethodPage.jsx` | [기본](ASAK-Admin/docs/screenshots/2026-07-19-admin-payment-1920x1080.png) | 정렬·토글·정책 저장 |
| Sales Summary | `/sales` | `134:10661` | `SalesSummaryPage.jsx` | [기본](ASAK-Admin/docs/screenshots/2026-07-19-admin-sales-1920x1080.png) | 기간 필터, sales adapter |
| Daily Sales | `/sales/daily` | `134:11150` | `DailySalesPage.jsx` | [기본](ASAK-Admin/docs/screenshots/2026-07-19-admin-sales-daily-1920x1080.png) | 일별 adapter |
| Monthly Sales | `/sales/monthly` | `134:10957` | `MonthlySalesPage.jsx` | [기본](ASAK-Admin/docs/screenshots/2026-07-19-admin-sales-monthly-1920x1080.png) | 월별 adapter |
| Login | `/login` | `134:12033` | `LoginPage.jsx` | [기본](ASAK-Admin/docs/screenshots/2026-07-19-admin-login-1920x1080.png) | 인증 API, 세션 |

공통 상단바는 `AdminTopHeader` (`241:14215` 기준). MainContent 여백은 `padding: 40px`, 헤더↔본문 `gap: 24px`, 패널 `overflow: clip`.

관리자 에셋은 전부 `ASAK-Admin/src/assets/figma/` 안에 있다: `asak-admin-logo.svg`, `asak-s-logo.svg`, `asak-s-logo-live.svg`, `icon-nav-*.svg`(7종), `icon-nav-caret-down.svg`, `icon-nav-signout.svg`, `promo-lettuce.png`, `promo-carrot.png`, `icon-order-*.svg`, `soldout-*.png`.

### Admin에서 아직 화면 자체가 없는 것

없음. SCR-020/021은 `DailySalesPage` / `MonthlySalesPage`로 분리 이식됨.

## 공통 사이드바 (Admin/Navbar)

Figma `227:5009`. 모든 관리자 화면이 이 instance를 공유하므로, 여기를 고치면 전 화면에 반영된다.

| Figma 라벨 | 경로 | 아이콘 |
| --- | --- | --- |
| Home | `/dashboard` | `Icon/Nav/SquaresFour` |
| 주문 관리 | `/orders` | `Icon/Nav/ForkKnife` |
| 매출 관리 | `/sales` | `Icon/Nav/ChartLineUp` + `Icon/CaretDown` |
| ├ 일별 매출 | `/sales/daily` | 없음 (36px 들여쓰기) |
| └ 월별 매출 | `/sales/monthly` | 없음 (36px 들여쓰기) |
| 메뉴 관리 | `/menus` | `Icon/Nav/BowlFood` |
| 항목 품절 관리 | `/sold-out` | `Icon/Nav/CalendarDots` |
| 결제수단 설정 | `/payment-methods` | `Icon/Nav/Notebook` |
| 주문 현황 (프로모 카드 버튼) | `/` | 없음 (다크 버튼) |
| Logout | — | `Icon/Nav/SignOut` (비활성) |

`/` Live Order 화면은 Figma 원본이 상단 전체 폭 bar 레이아웃이라 사이드바를 쓰지 않는다. 이건 결함이 아니라 `SCR-009`의 정본 구성이다.

## Figma를 그대로 따르지 않은 부분

복제하지 않기로 한 값은 여기에 모은다. Figma를 고칠 때 같이 정리한다.

| 위치 | Figma 값 | 코드에서 쓴 값 | 이유 |
| --- | --- | --- | --- |
| QuantityStepper `+` 버튼 | 라임 배경 위 회색 글자(`#6b7280`) | `#1a1a1a` | 라임 배경 대비가 부족하다. Figma의 잔여 토큰으로 판단 |
| Admin 하위 메뉴 행 | `drop-shadow 0 2px 4px rgba(0,0,0,.08)` | 없음 | 배경이 투명한 텍스트 행이라 글자에만 그림자가 생긴다 |
| Admin 반응형 | 규격 없음 | 1280px 아이콘 rail, 720px 1열 | Figma는 1920 고정폭만 정의한다 |
| Live Order 옵션 원형 | 48px | 40px 표시 + 48px 터치 영역 | 밀도 조정. 터치 기준은 유지 |
| 결제수단 브랜드 마크 | 브랜드 로고 | 색상·문자 마크 | 외부 에셋 라이선스 의존을 만들지 않음 |
| Order Complete | 0718 `134:7926` (구 카드형) | **0718 `134:7926` ← 0714 레이아웃 이식** | 피그마·코드 모두 큰 주문번호+티켓 레이아웃으로 통일 |

## 열려 있는 결정

- **Menu Card 이름 잘림.** Figma `Kiosk/MenuCard`(`150:678`)는 이름에 `white-space: nowrap` + `overflow: clip`을 쓴다. 시안의 표본 문자열이 `메뉴이름`이라 문제가 없었지만, 실제 메뉴명(`스파이시 쉬림프 샌드위치`)은 잘려서 `스파이시 쉬림…`으로 보인다. 현재 코드는 Figma를 그대로 따랐다. 2줄 허용으로 바꾸려면 카드 높이 369px 안에서 이미지 크기나 여백을 다시 배분해야 한다.

## 2026-07-19 작업 기록

1. **Kiosk 전역 `box-sizing: border-box` 추가** (`src/styles/global.css`).
   이게 키오스크가 전반적으로 어긋나 보이던 근본 원인이었다. CSS에는 Figma 수치가 정확히 적혀 있었지만 `border-box`가 없어 `height: 140px` 헤더가 `140 + padding 72 + border 1 = 213px`로 렌더링됐고, 그만큼 아래 모든 요소가 밀렸다. 수정 후 헤더 140 / 요약 320 / 옵션영역 1280 / CTA 180으로 Figma 좌표와 일치한다.
2. **Admin 사이드바를 Figma `227:5009`로 재작성.** 메뉴 구성·순서·라벨, 매출 관리 하위 그룹, 프로모 카드, Logout을 추가했다. `AdminApp`에 남아 있던 두 번째 사이드바 마크업과 충돌하던 레거시 CSS(`.admin-sidebar nav a`)를 제거했다.
3. **Kiosk 메뉴상세를 `134:7810` 구조로 재구성.** 이미지를 좌측으로 옮기고 BEST/NEW/Vegan 배지와 kcal을 추가, 수량 스테퍼를 가격 행 우측으로 옮겼다. 옵션 그룹의 흰 카드 래퍼를 없앴다.
4. **Kiosk 메뉴카드를 305×369 고정으로 정리.** 이름 줄 수에 따라 카드 높이가 달라지던 문제를 없앴다. `.menuGrid`는 `minmax(0, 1fr)`을 쓴다.
5. **카테고리 탭 선택 표시를 직선 6px 라임 막대로 교체.** 기존 `box-shadow: inset 0 -6px 0`은 `border-radius: 999px`와 겹쳐 곡선 스우시로 보였다.
6. **`주문내역` 패널을 조건부 렌더링으로 변경.** Figma `Shared/CartFooterBar`는 Default에서 `hidden=true`, `Items Added`에서 표시된다. 삭제가 아니라 "담긴 메뉴가 없으면 숨김"이 정본이다.
7. **품절 관리 페이지의 중복 야채 장식 제거.** `SoldOutManagePage`가 `.sold-out-promo`를 `position: fixed`로
   사이드바 위에 그리고 있어서, 새 프로모 카드의 `주문 현황` 버튼과 안내 문구를 가렸다.
8. **mock 플레이스홀더 보강** (`ASAK-Kiosk/public/mocks/kiosk.json`). 메뉴 9개, 옵션 그룹 3개(베이스 8 / 드레싱 2 / 토핑 6), 상세 배지 3종. 레이아웃을 눈으로 검증하기 위한 표시용 데이터이며 실제 데이터 연결은 담당자가 API·adapter로 교체한다.

## 2026-07-19 2차: Figma 1:1 정밀 대조 진행 상황

화면 하나를 고칠 때마다 ①Figma 노드 실측 → ②재작성 → ③캡처 대조 → ④CSS 점검 → ⑤이전 화면 회귀 확인 순서로 진행한다.

| 화면 | 상태 | 비고 |
| --- | --- | --- |
| Admin 사이드바 `227:5009` | 완료 | 메뉴·프로모 카드·Logout, 매출 관리 → `/sales` + 하위 메뉴 |
| Admin Dashboard `227:5008` | 완료 | KPI 1008 / Middle 1080 / Bottom 1616, 최근주문 6열, 상태 텍스트 색상 |
| Admin Sales Summary `134:10661` | 완료 | 기간 필터·KPI 3장·시간대 차트·비중 카드 2장·일자별 표·인기 메뉴 |
| Admin Login `134:12033` | 완료 | 배경 사진 + 흰 베일, 라임 체크박스, 라임 CTA |
| Admin Payment Methods `134:11493` | 완료 | 898+16+686 2열, 이모지 아이콘, 중앙 저장바 560 |
| Admin Menu Management `134:12137` | 완료 | 좌 980 목록 + 우 700 상세 패널(전에는 상세 패널이 아예 없었음) |
| Admin Sold-out `134:11863` | 완료 | 744+80+744 3단, 134×144 카드, 원형 이동 버튼, 하단 저장바 |
| Admin Order Management `134:10630` | 완료 | 환불 셀 빨간 박스, 상세 패널 48px 행, 주문일시 초 단위 |
| Admin Live Order `134:10607` | 완료 | 1차 대조에서 이미 거의 일치. 사이드바 미사용이 정본 |
| Kiosk Home / MenuList / MenuDetail / Payment / Accessibility | 완료 | Figma와 일치 확인 |
| Kiosk Order Complete `134:7926` | 완료 | 하단 버튼이 세로로 쌓여 잘리던 것을 2개 가로 배치로, 문구를 Figma 값으로 |
| Kiosk Cart `134:7835` | 완료 | CartItem에 클래스가 아예 없어 무스타일이었음. 카드+라임 요약 스트립, 항목수/비우기 행, 합계 카드, 2버튼 CTA 추가 |
| Kiosk SCR-012/013/023 | 완료 | 결제오류·타임아웃·영수증 라우트 이식 |
| 상태 변형 | 완료 | `/ui-preview/:screen/:state` + toast/confirm/allergy 캡처 |

토큰 이탈·중복·파일 밖 참조는 **[FIGMA-TOKEN-REPORT.md](FIGMA-TOKEN-REPORT.md)** 에 따로 정리했다.

### 2차에서 발견해 고친 결함

1. **`.sr-only` 미정의.** 관리자 CSS에 정의가 없어 스크린리더용 숨김 라벨이 화면에 그대로 노출됐다(메뉴 관리 검색창). 공통 규칙으로 추가했다.
2. **Dashboard MainContent 위치.** Figma에서 이 프레임만 `(301,16)`에 놓여 있는데 폭이 `1616 = 1920 - 240 - 32*2`라 의도는 `(240,0)`이다. 다른 화면(매출·결제·메뉴)은 모두 `240`이므로 코드는 `240` 기준으로 통일했다. ~~Figma에서 이 프레임을 61px 왼쪽으로 옮기면 파일이 일관돼진다.~~ → **2026-07-19 Figma에서 `(240,0)`으로 이동 완료** (FIGMA-TOKEN-REPORT §10 참고).
3. **품절 관리의 중복 야채 장식.** 페이지가 `position: fixed`로 사이드바 위에 겹쳐 그리고 있었다. 제거.
4. **`CartItem`에 CSS 클래스가 하나도 없었다.** 마크업만 있고 스타일이 없어 장바구니 항목이 무스타일로 나왔다. 장바구니가 비어 있어 이제껏 아무도 못 본 상태였다.
5. **주문 완료 화면 하단 버튼이 세로로 쌓여 화면 밖으로 잘렸다.** `.order-complete-page__footer`에 grid 선언이 빠져 있었다.
6. **Kiosk CSS 속성 충돌 3건.** `order-complete-page__content` / `order-complete-page h1` / `payment-page__footer`가 각각 두 번 선언되어 있었다. 공통 규칙과 화면별 규칙을 분리해 **충돌 0건**으로 정리.

### CSS 점검 현황

| 파일 | 규칙 수 | 속성 충돌 | lint |
| --- | --- | --- | --- |
| `ASAK-Admin/src/styles/app-shell.css` | 622 | 4 (모두 이번에 손대지 않은 기존 구역) | 0 error |
| `ASAK-Kiosk/src/styles/commonStyle.css` | 274 | **0** | 0 error |

고아 클래스(마크업에 없는 선택자)는 아직 남겨 뒀다. 상태 변형 화면을 만들 때 쓰일 수 있어서
전부 만든 뒤 마지막에 정리한다.

## 스크린샷 다시 찍기

Dev 서버: Kiosk `127.0.0.1:5201`, Admin `127.0.0.1:5202` (`--host 127.0.0.1`).

```sh
chrome --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1080,1920 \
  --virtual-time-budget=14000 \
  --screenshot=out.png "http://127.0.0.1:5201/menu"
```

Admin은 `--window-size=1920,1080`. 최신 전수 캡처: **2026-07-19 6차** (Kiosk 기본+상태 37장 · Admin 11장).

## 2026-07-19 3차: Cursor 전수 이식 (정적 UI)

기준: Figma `yHhvn5RKjBd91U8BJUQz7F`. CSS 파일 체계(`tokens.css` / `commonStyle.css` / `app-shell.css`)는 유지하고 섹션만 수정.

### 이번에 한 일

1. **Home `134:7721`** — 히어로 사진 + 오버레이, `매장에서 먹기`, fork/bag 아이콘, store/navigate 제거
2. **Cart `134:7835`** — 정적 2항목 CartItemCard (빈 Zustand 대신)
3. **Menu List / Detail** — store·checkout·addItem 흐름 제거, 정적 mock
4. **Payment / Complete** — 정적 16,800원·주문번호
5. **신규** — `/payment-error` SCR-012, `/timeout` SCR-013, `/receipt` SCR-023
6. **`/ui-preview/:screen/:state`** — 실제 페이지 + `viewState`
7. **스크린샷** — Kiosk·Admin 재캡처 (dev `127.0.0.1:5201` / `5202`)

로고는 기존 로컬 에셋 유지. **사용자가 별도 이미지로 교체 예정.**

토큰: [FIGMA-TOKEN-REPORT.md](FIGMA-TOKEN-REPORT.md)

## 2026-07-19 4차: 상태·매출 분리

1. **Menu Detail** — `AllergenAccordion` 펼침(`allergy`/`allergy-expanded`), toast(`menu-limit`/`cart-limit`/`success`), discard confirm
2. **Cart / Menu List** — clear·delete confirm, toast viewState
3. **Admin** — `/sales/daily` → `DailySalesPage`(`134:11150`), `/sales/monthly` → `MonthlySalesPage`(`134:10957`)
4. **CSS** — `commonStyle.css` allergen/toast/confirm, `app-shell.css` sales-daily/monthly
5. **스크린샷** — allergy·confirm·일별/월별 재캡처

## 2026-07-19 5차: Admin 상단바 통일 + 오더카드 + 전수 스크린샷

1. **공통 상단바** — `AdminTopHeader` (`241:14215`). crumb 12 / title 28 / desc 14, gap 6
2. **MainContent** — `.admin-main` `padding: 40px`, 페이지 `gap: 24px`, 패널 `overflow: clip`
3. **Live Order** — 상단바·OrderCard(옵션 아이콘 4종, 포장 배지, wide 카드) Figma `235:6361` 반영
4. **전수 스크린샷** — Kiosk 16 + Admin 11 재캡처, 상태 변형 링크를 인덱스 표에 추가

## 2026-07-19 6차: 픽셀 QA · 상태 전수

1. **Home 고대비** — `viewState=high-contrast` (`224:12713`). 버튼 top `1200`, accent `#c5ff00`
2. **Payment 상태 보강** — `selected` / `expanded`(라인 아이템+쉐브론) / `processing`(카드 리더 일러스트) / `disabled` / `loading` / `error`
3. **Payment Error · Timeout · Receipt · Accessibility** — 별칭·상태별 노드/카피 정리, 전수 캡처
4. **픽셀 결함 수정** — Payment/Complete 단계 인디케이터 span 크기 0 → 56×16 복구; 결제수단 카드 `padding/justify-center`·gap 36; CTA `is-ready` opacity
5. **스크린샷** — Kiosk 37장 + Admin 11장 재캡처, 위 표·state 목록 갱신

## 2026-07-19 7차: Order Complete 0714 정본 재이식

- 기준을 0718 `134:7926`(영수증 카드형)이 아니라 **0714 보존 시안** `VXKyzoNdsgM4oN57mrECxb` / `2:4877`로 교체
- 큰 주문번호 `1225`, 라임 레일 + 티켓 일러스트, 출력 안내, 빨간 `5`초, CTA `주문 번호만 출력` / `영수증 출력`
- 상태: `receiptPrint`, `receiptError` (toast)

## 2026-07-19 8차: 0718 Figma 녹인 뒤 코드 동기

- 피그마 `yHhvn5RKjBd91U8BJUQz7F` / `134:7926`에 0714 비주얼(티켓·S로고·바코드 SVG) + 0718 컴포넌트(Header/BottomCTA/Pretendard) 반영
- 코드 기준 노드를 `134:7926`으로 갱신, 라벨 40 / 안내 32 / CTA `#b5e30f`·180px, `order-complete-barcode.svg` 추가
- 상태 프레임: Default · Receipt Print · Receipt Error (y=13960)
