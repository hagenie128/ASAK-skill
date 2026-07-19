# Figma 토큰 정리 보고서

2026-07-19 이식 작업 중 각 노드의 design context에서 실제로 관찰한 값만 적었다.
추측한 값은 넣지 않았고, 확인하지 못한 영역은 "미확인"으로 표시했다.

기준 파일: `ASAK — Design System & Product UI 0718` / `yHhvn5RKjBd91U8BJUQz7F`

---

## 1. 실제로 variable에 연결되어 있던 토큰

이식하면서 코드가 이 값들을 그대로 따랐다.

| Figma variable | 값 | 쓰인 곳 |
| --- | --- | --- |
| `semantic/brand/primary` | `#b5e30f` | 사이드바 활성, CTA, 진행바, 배지 |
| `semantic/interactive/default` | `#b5e30f` | 키오스크 수량 + 버튼 |
| `color/green/300` | `#b5e30f` | 결제수단 저장 버튼 |
| `color/green/200` | `#c8f064` | 매출 시간대 막대 |
| `color/green/500` | `#6c9700` | 결제수단 토글 on |
| `semantic/bg/admin` | `#ffffff` | 관리자 패널 표면 |
| `semantic/bg/login` | `#ffffff` | 사이드바·로그인 표면 |
| `semantic/bg/subtle` | `#f5f5f5` | Logout 버튼, 키오스크 minus 버튼 |
| `semantic/border/default` | `#e5e7eb` | 카드·입력 테두리 |
| `color/coolgray/200` | `#e5e7eb` | 진행바 트랙 |
| `semantic/text/admin/primary` | `#111827` | 관리자 본문 |
| `color/coolgray/950` | `#111827` | 패널 제목 |
| `semantic/text/admin/secondary` | `#6b7280` | 관리자 보조 |
| `color/coolgray/700` | `#6b7280` | 축 라벨 |
| `semantic/text/secondary` | `#888888` | Logout 라벨, 키오스크 minus |
| `semantic/text/tertiary` | `#737373` | 사이드바 비활성 메뉴 |
| `color/neutral/600` | `#737373` | 표 헤더 |
| `color/neutral/800` | `#404040` | 표 본문 |
| `color/neutral/900` | `#212121` | 사이드바 활성 라벨, 주문 현황 버튼 배경 |
| `color/neutral/50` | `#f7f7f7` | 표 헤더 배경, 주문유형 박스 |
| `color/neutral/500` | `#888888` | 매출 요약 라벨 |
| `semantic/text/inverse` | `#292d30` | 키오스크 MenuCard 이름 |
| `semantic/status/error` | `#ef4444` | 전주 대비 하락, 필수 라벨 |
| `semantic/status/errorbg` | `#fff0eb` | 품절 배지 배경 |
| `semantic/status/successbg` | `#ebf5eb` | 기본 배지 배경 |
| `color/yellow/50` | `#fffbeb` | 결제수단 저장바 배경 |
| `color/yellow/400` | `#ffff80` | NEW 배지 |
| `color/red/100` | `#ffe6e7` | BEST 배지 배경 |
| `color/red/700` | `#ff0004` | BEST 배지 글자 |
| `color/overlay/light` | `#ffffff` | 표 본문 배경 |
| `gray/800` | `#737373` | 매출 관리 메뉴 라벨 |
| `gray/1600` | `#0d0d0d` | NEW 배지 글자 |

### 타이포그래피 스타일

| 스타일 | 정의 |
| --- | --- |
| `ASAK/Heading/3` | Pretendard Variable Bold 22 / lh 28 |
| `ASAK/Body/L` | Regular 20 / lh 28 |
| `ASAK/Body/M` | Regular 16 / lh 24 |
| `ASAK/Body/S` | Regular 14 / lh 20 |
| `ASAK/Label/S` | Medium 12 / lh 16 |

### 이펙트 스타일

| 스타일 | 정의 |
| --- | --- |
| `nav seleted`(원본 오타) | inner shadow 4겹 — 사이드바 활성 |
| `ASAK/Shadow/Subtle` | `0 2 8 #00000014` |
| `라임 전체 번짐` | drop shadow 4겹 `#C8F168` 계열 |

---

## 2. variable에 연결되지 않은 채 직접 입력된 값

**Figma에 토큰으로 추가할 후보다.** 코드에는 그대로 옮겼지만 지금은 하드코딩 상태다.

| 값 | 쓰인 곳 | 제안 이름 |
| --- | --- | --- |
| `#1a1a1a` | 키오스크 본문 텍스트, 메뉴명, 가격 | `semantic/text/primary` |
| `#808080` | 키오스크 보조 텍스트, 설명, kcal | `semantic/text/muted` |
| `#ebebeb` | 메뉴 상세 이미지 자리 | `semantic/bg/placeholder` |
| `#ededed` | 메뉴 상세 요약 하단 구분선 | `semantic/border/subtle` |
| `#f2f2f2` | 표 행 구분선 | `semantic/border/row` |
| `#f0f0f0` | 상태 진행바 트랙 | `semantic/bg/track` |
| `#fafafa` | 대시보드 차트 영역 배경 | `semantic/bg/chart` |
| `#f9fafb` | 매출 표 헤더 배경 | `semantic/bg/tablehead` |
| `#f28c0d` | 주문 상태 대기·조리중 | `semantic/status/pending` |
| `#6699ff` (`#69f`) | 주문 상태 완료 | `semantic/status/done` |
| `#bfd99e` / `#6ba629` | 대시보드 주간 막대 기본/강조 | `chart/bar/default`, `chart/bar/current` |
| `#92400e` / `#fffaf0` / `#b2801a` | 저장바 문구, QuickNote 배경·글자 | `semantic/status/warning*` |
| `#333333` / `#666666` | 대시보드 DateBadge, 날짜 | `semantic/bg/badge`, `semantic/text/date` |
| `#f2f5f5` | 결제수단 아이콘 배경 | `semantic/bg/icon` |
| `#077e40` | Vegan 배지 글자 | `semantic/status/vegan` |
| `#4a7a00` | 키오스크 메뉴 가격 초록 | `semantic/text/price` |
| `#4d4d4d` / `#262626` | 상태 요약 라벨·값 | neutral scale로 흡수 |

키오스크 쪽 `#f6f4ed`(배경), `#e4e0d6`(테두리) 계열은 코드 토큰(`--asak-*`)에만 있고
Figma variable로는 확인되지 않았다. 어느 쪽을 정본으로 할지 결정이 필요하다.

---

## 3. 같은 값이 여러 경로로 중복된 토큰

정리하지 않으면 어느 것을 써야 할지 매번 판단해야 한다.

| 값 | 중복 경로 | 제안 |
| --- | --- | --- |
| `#b5e30f` | `semantic/brand/primary`, `semantic/interactive/default`, `color/green/300` | primary 하나만 semantic으로 두고 나머지는 alias |
| `#e5e7eb` | `semantic/border/default`, `color/coolgray/200` | border는 semantic만, 트랙 배경은 별도 이름 |
| `#111827` | `semantic/text/admin/primary`, `color/coolgray/950` | semantic만 사용 |
| `#6b7280` | `semantic/text/admin/secondary`, `color/coolgray/700`, `semantic/text/disabled` | disabled를 분리 (아래 4번 참고) |
| `#737373` | `semantic/text/tertiary`, `color/neutral/600`, `gray/800` | `gray/800`은 값과 이름이 어긋난다. 제거 대상 |
| `#888888` | `semantic/text/secondary`, `color/neutral/500` | 하나로 통일 |
| `#f7f7f7` | `color/neutral/50`, 대시보드 표 헤더 직접 입력 | neutral/50으로 바인딩 |

`semantic/text/secondary(#888)`와 `semantic/text/admin/secondary(#6b7280)`가 둘 다 "secondary"라
이름만으로는 구분되지 않는다. 관리자 전용 스케일임을 이름에 남기거나 값을 통일해야 한다.

---

## 4. 그대로 복제하지 않은 값과 이유

| 위치 | Figma | 코드 | 이유 |
| --- | --- | --- | --- |
| 키오스크 QuantityStepper `+` | 라임 배경 위 `semantic/text/disabled #6b7280` | `#1a1a1a` | 라임 위 회색은 대비 부족. 잔여 토큰으로 판단 |
| Admin 하위 메뉴 행 | `drop-shadow 0 2 4 #00000014` | 없음 | 배경이 투명한 텍스트 행이라 글자에만 그림자가 생긴다 |
| 메뉴 관리 검색창 | 폭 113 고정 | 내용 폭 | Pretendard 한글 폭이 시안보다 넓어 "메뉴명 검색"이 잘린다 |
| 대시보드 MainContent | `(301, 16)` | `(240, 0)` | 폭 1616 = 1920−240−32×2. **Figma 프레임이 61px 어긋나 있다** |
| 로그인 배경 베일 | white→white20% 2겹 | 합성값 1겹(하단 알파 0.36) | 동일 결과, 레이어 1개 절약 |
| 반응형 | 정의 없음(1920 고정) | 1500/1400/1280/720 분기 | Figma에 반응형 규격이 없다 |

---

## 5. 파일 밖 참조 / 정리 대상 인스턴스

0718 파일의 `ImplementationChangeLog`는 **remote instance 0건**을 달성했다고 기록하지만,
이식 중 아래를 확인했다.

| 항목 | 노드 | 상태 |
| --- | --- | --- |
| `Deprecated/Kiosk-CategoryTap` | `150:737` | SCR-003 카테고리 바(`134:7809`)가 **아직 이 deprecated 컴포넌트를 쓰고 있다.** 정본은 `Kiosk/CategoryTab` |
| `nav seleted` | 이펙트 스타일 | 이름 오타. `Effect/Nav/Selected`로 rename 필요 |
| `Frame 1707479461` 등 | Menu/Payment **스크린** 페이지 다수 | 컴포넌트 페이지(Kiosk/Admin/Shared)는 §11에서 정리 완료. 스크린 페이지의 자동 이름은 이번 작업 미대상 |
| `Admin/Navbar` description | `150:4739` | React target이 `ASAK-Kiosk/src/components/admin/Navbar.jsx`로 적혀 있다. 실제 위치는 `ASAK-Admin/src/components/admin/AdminSidebar.jsx` |
| `Admin/SalesMetricCard` description | `150:2928` | React target이 `ASAK-Kiosk/...`로 잘못 기재 |
| `Admin/StatusBadge` description | `150:5064` | React target이 `ASAK-Kiosk/...`로 잘못 기재 |

컴포넌트 description의 React target 경로가 **Kiosk 프로젝트를 가리키는 것이 3건** 있다.
관리자 컴포넌트이므로 `ASAK-Admin/...`으로 고쳐야 개발자가 헷갈리지 않는다.

---

## 6. 에셋 관련

| 항목 | 내용 |
| --- | --- |
| `login-bg.png` | Figma 원본 그대로 받아 **1.5MB PNG**다. 배경 사진이므로 WebP/JPEG로 변환해 200KB 이하로 줄이는 편이 좋다 |
| 결제수단 아이콘 | Figma가 이모지(`💳 🟡 🟢 🔵`)를 쓴다. OS별 글리프가 달라 Windows/macOS/Android에서 모양이 바뀐다. 실제 브랜드 연동 단계에서 승인된 SVG로 교체 권장 |
| 사이드바 야채 일러스트 | `promo-lettuce.png`, `promo-carrot.png` 각 500×500 PNG. 표시 크기는 126/90px이므로 축소 가능 |

---

## 7. 미확인 영역

- Kiosk 화면의 variable 바인딩은 이번에 전수 확인하지 않았다. 코드는 `src/styles/tokens.css`의 `--asak-*` 근사값을 쓰고 있다.
- Figma의 Spacing/Radius/Elevation collection은 `Number/Spacing/24` 외에는 관찰되지 않았다. 실제로 없는지, 조회되지 않은 것인지 앱에서 확인이 필요하다.
- 상태 변형(loading/empty/error) 프레임의 토큰은 아직 대조하지 않았다.

---

## 8. 2026-07-19 3차에서 추가로 관찰한 값

| 값 | 쓰인 곳 | 비고 |
| --- | --- | --- |
| `#33383d` | 장바구니 제목 | variable 미연결 직접 입력 |
| `#994d4d` | 장바구니 비우기 | error와 다른 적갈색. `semantic/status/danger-text` 후보 |
| `#f5fbe0` | CartItem 하단 스트립, step done | `semantic/brand/subtle` / `color/green/50` |
| `#6c9700` | 수량 +/- 테두리 | `semantic/brand/secondary` / `color/green/500` |
| `#383d42` | 수량 minus disabled | `semantic/bg/elevated` |
| `#4a7a00` | MenuCard 가격 | 이미 보고서 §2에 있음 |
| `rgba(0,0,0,0.39)` | Home dark overlay | 토큰 없음. `semantic/overlay/home` 후보 |
| 홈 카드 top bar 8px | OrderTypeSelector | `semantic/brand/primary` 연결됨 |

### 파일 밖 / deprecated 인스턴스 (재확인)

- SCR-003 카테고리 바가 여전히 `Deprecated/Kiosk-CategoryTap` 인스턴스
- MCP asset URL은 코드에 넣지 않고 `src/assets/figma/` 로컬화함
- 홈 로고는 사용자 교체 예정이라 Figma vector 분해 SVG로 바꾸지 않음

---

## 9. 2026-07-19 4차에서 추가로 관찰한 값

| 값 | 쓰인 곳 | 제안 이름 |
| --- | --- | --- |
| `#fffbeb` | Allergy accordion 배경, toast 계열과 동일 yellow/50 | 이미 `color/yellow/50` — semantic 바인딩 권장 |
| `#fbbf24` | Allergy 아이콘·toast mark·confirm warning CTA | `color/yellow/400`과 값이 다름(`#ffff80`). `semantic/status/warning` 후보 |
| `#ef4444` | Allergy count/tag, confirm danger CTA | 이미 `semantic/status/error` |
| `#5da45d` | Toast success mark | `semantic/status/success` 후보 (successbg만 있음) |
| `rgba(0,0,0,0.45)` | Confirm overlay | `semantic/overlay/modal` 후보 |
| Confirm shadow | `0 2 3 / 0 10 14` | Elevation collection에 없음. `ASAK/Shadow/Dialog` 후보 |

---

## 10. 2026-07-19 Figma 파일 정리 작업 — 반영 완료

MCP로 0718 파일에 직접 반영했다. 변수 대조 결과, **Semantic 컬렉션은 이미 Primitive를
alias로 참조하는 구조**였다 (예: `Semantic/Brand/Primary → Color/Green/300`).
§3에서 "중복"으로 보였던 값 대부분은 design context가 alias 체인의 양쪽 이름을
모두 노출한 것으로, 변수 구조 자체는 정리되어 있었다.

### 반영된 수정

| 항목 | 내용 |
| --- | --- |
| `nav seleted` 이펙트 스타일 | **remote 스타일**이라 rename 불가 → 동일 이펙트(inner shadow 4겹)의 로컬 스타일 `Effect/Nav/Selected` 생성 후 로컬 사용처 6곳 재바인딩 (`150:4808` menu-itme, `150:3385`·`150:3868`·`3065:63856`·`3065:63341` Button Picker, `150:4874`). 인스턴스는 자동 반영 |
| SCR-003 카테고리 바 | `Kiosk/Category`의 `page=K` 변형 내부 탭 6개를 `Deprecated/Kiosk-CategoryTap` → 정본 `Kiosk/CategoryTab`으로 교체, 라벨 보존 (샐러드/샐러드/포케볼/랩&롤/사이다/음료) |
| `Kiosk/CategoryTab` 정본 자체 결함 | active 변형이 흰 배경 위 **흰 텍스트**(`Semantic/Text/Primary` 잔여 바인딩) + 라임 바 없음 상태였다. 코드·deprecated 스펙(Medium 32/40, `Semantic/Text/Tertiary`, 6px `Semantic/Brand/Primary` 바, gap 8)으로 수정. inactive도 동일 스펙 + 투명 스페이서(높이 고정용) 적용 |
| CategoryTab 깨진 variant 이름 | `state=Kiosk, 속성 2=CategoryTab, 속성 3=inactive` → `state=inactive`. 컴포넌트 셋 오류("existing errors") 해소, 이제 `state=active|disabled|inactive` |
| `Admin/Navbar` description | React target → `ASAK-Admin/src/components/admin/AdminSidebar.jsx` |
| `Admin/StatusBadge` description | React target → `ASAK-Admin/src/components/admin/OrderStatusBadge.jsx` |
| `Admin/SalesMetricCard` description | 전용 컴포넌트 파일이 없어 실제 구현 위치인 `ASAK-Admin/src/pages/admin/SalesSummaryPage.jsx` (인라인 KPI 카드)로 기재 |
| Dashboard MainContent | `227:5657`을 `(301,16)` → `(240,0)`으로 이동. 1680×1080이라 이제 1920 캔버스에 정확히 맞음 |

### 추가된 변수 (13개)

Primitive: `Color/Neutral/450 #808080`, `Color/Green/550 #4a7a00`, `Color/Success/700 #077e40`,
`Color/Red/600 #994d4d`, `Color/Orange/500 #f28c0d`, `Color/Blue/300 #6699ff`

Semantic (Default/High Contrast 모두 alias):
`Semantic/Text/Kiosk/Primary` (→Surface/600, HC→Black), `Semantic/Text/Kiosk/Muted` (→Neutral/450, HC→Neutral/800),
`Semantic/Text/Price` (→Green/550), `Semantic/Status/Vegan` (→Success/700), `Semantic/Status/DangerText` (→Red/600),
`Semantic/Status/Pending` (→Orange/500), `Semantic/Status/Done` (→Blue/300)

§9에서 후보로 적었던 `Semantic/Status/Warning`(#fbbf24), `Semantic/Status/Success`(#5da45d),
`Semantic/Status/WarningText`(#92400e)는 **이미 파일에 존재**해서 추가하지 않았다.
`#ebebeb`/`#ededed`/`#f2f2f2`/`#f0f0f0`/`#fafafa`/`#f9fafb` 계열 근사 회색 6종은 값 통합 없이
토큰만 늘리면 오히려 해가 되어 보류 — 어느 값으로 수렴할지 결정 필요.

### 하지 않은 것 / 남은 결정

1. **`page=A`(Admin 소형) 변형은 여전히 Deprecated/Kiosk-CategoryTap Size=s 사용.**
   deprecated description에 적힌 대로 CategoryTab에 size variant가 생기기 전까지 의도된 예외.
2. **`page=K`에 active 탭 2개(둘 다 "샐러드")가 나란히 있다.** 기계적으로 보존했지만
   내용상 중복으로 보임 — 둘째 탭의 라벨/상태 확인 필요.
3. **remote 참조가 보고서 기재보다 훨씬 많다.** `gray/800`·`gray/1600` 외에도
   `Gray/700`·`Gray/1200`, `Green/100`, `palette/lime/vivid`, `Accents/Orange`·`Accents/Blue` 변수와
   `메뉴카드`·`Shadow/xs`·`라임 전체 번짐`·`라임 번짐` 이펙트 스타일이 remote다.
   → **§12에서 일괄 로컬화 완료** (direct 노드 기준; I-prefix 잔여는 §12 표 참고).
4. **자동 생성 이름 프레임 179개** (Kiosk 컴포넌트 페이지 96, Admin 82, Shared 1).
   프레임별 역할 판단이 필요해 별도 작업으로 분리.
   → **§11에서 해소 완료** (2026-07-19).
5. `Kiosk/CategoryTab`의 `state=disabled` 텍스트는 `#999999` 직접 입력(팔레트에 없는 값) — 그대로 둠.

---

## 11. 2026-07-19 자동 생성 프레임 이름 정리

파일 `yHhvn5RKjBd91U8BJUQz7F`의 **컴포넌트 페이지**(Kiosk / Admin / Shared)에서
`/^Frame \d+$/` 자동 생성 이름 프레임을 역할 기반 이름으로 일괄 rename했다.

### 대상 / 범위 / 방법

| 항목 | 내용 |
| --- | --- |
| 대상 | 컴포넌트 페이지 main 노드의 `/^Frame \d+$/` 프레임 |
| 제외 | 인스턴스 내부(I-prefix) — main 반영으로 전파되는 항목 외에는 수정하지 않음 |
| 방법 | 컴포넌트·변형별 children 구조·텍스트·레이아웃 역할로 패턴을 정한 뒤 동일 구조에 일괄 rename |
| 스크린 페이지 | Menu/Payment 등 스크린의 `Frame 1707479461` 등은 **미대상** (§5 참고) |

건너뛴(확신 없는) 프레임: **0개**.

### 페이지별 건수

| 페이지 | 노드 | rename | skipped | 잔여 `/^Frame \d+$/` (main) |
| --- | --- | --- | --- | --- |
| Kiosk | `150:2` | 96 | 0 | **0** |
| Admin | `150:2860` | 82 | 0 | **0** |
| Shared | `145:2` | 1 | 0 | **0** |
| **합계** | | **179** | **0** | **0** |

§10 「남은 결정 4. 자동 생성 이름 프레임 179개」는 본 작업으로 **해소 완료**.

### 대표 rename 표 (옛 이름 → 새 이름)

| 옛 이름 | 새 이름 | 건수 | 컴포넌트 |
| --- | --- | --- | --- |
| `Frame 1707479458` | `method-content` | 6 | PaymentMethodCard |
| (패턴별) | `header-content`, `summary-row`, `menu-count`, `summary-text`, `total-price`, `quantity`, `price`, `options-row`, `option-list`, `option-item` | — | OrderSummaryInfo |
| (패턴별) | `row-content`, `option-info`, `option-name-row`, `nutrition-info`, `nutrition-group`, `gram-row`, `price-row` | — | OrderDetailRow |
| (패턴별) | `loading-content`, `cta-row` | — | BottomCTA |
| (패턴별) | `cardBody`, `productRow`, `productDetails`, `summaryRow` | — | CartItemCard |
| (패턴별) | `cart-item-list`, `footer-content`, `summary-row`, `summary-area`, `order-label` | — | CartFooterBar |
| (패턴별) | `card-content`, `card-wrapper` | — | MenuCard (Kiosk) |
| (패턴별) | `menu-info` | — | MenuDetailSummary |
| (패턴별) | `header-content` | — | Header |
| `Frame 1707479441` | `orderMenuOptionRow` | 23 | OrderCard (OrderMenuCard 옵션 리스트 래퍼) |
| `Frame 1707479441` | `panel-content` | 6 | DetailPanel |
| (패턴별) | `orderDetailMenuList` | 4 | DetailPanel |
| (패턴별) | `card-body`, `card-header`, `menu-btn-row`, `card-footer`, `total-row`, `total-price` | — | OrderCard |
| (패턴별) | `menu-label` | 10 | Navbar |
| (패턴별) | `image-wrapper`, `info-content` | — | MenuCard (Admin) |
| (패턴별) | `checkbox-inner` | — | Checkbox |
| (패턴별) | `calendar-grid` | — | DatePicker |
| (패턴별) | `header-row` | — | DataTableHeader |
| (패턴별) | `row-content`, `group-content`, `ingredient-grid` | — | Ingredient* |
| (패턴별) | `summary-content` | — | OptionGroupSummary |
| `Frame 1` | `text-content` | 1 | EmptyState (`991:104980`) |

### 같은 자동 이름이 서로 다른 역할이었던 케이스

Admin **`Frame 1707479441`** 이 두 역할로 분리됨:

| 새 이름 | 건수 | 역할 / 컴포넌트 |
| --- | --- | --- |
| `orderMenuOptionRow` | 23 | OrderCard — OrderMenuCard 옵션 리스트 래퍼 |
| `panel-content` | 6 | DetailPanel — 패널 본문 래퍼 |

추가로 DetailPanel의 `orderDetailMenuList`(4)도 같은 계열의 자동 이름에서 역할별로 분리했다.

Kiosk OrderDetailRow에서는 중첩 `Frame 2174`를 텍스트(`"0"` / `"g"`) 확인 후
outer=`nutrition-info`, middle=`nutrition-group`, inner=`gram-row`로 분리했다.

### 건너뛴 항목

없음 (0건).

### 잔여 검증 (2026-07-19 MCP 재확인)

`use_figma` 읽기 전용으로 세 페이지를 재스캔했다. **rename은 재실행하지 않음.**

| 페이지 | main 잔여 | I-prefix(인스턴스 내부) 잔여 |
| --- | --- | --- |
| Kiosk `150:2` | **0** | 21 (의도적 미수정) |
| Admin `150:2860` | **0** | 0 |
| Shared `145:2` | **0** | 0 |

main 기준 `/^Frame \d+$/` 잔여 **0** — 작업 완료.

---

## 12. 2026-07-19 remote → local 토큰 마이그레이션

> 참고: §11은 자동 생성 프레임 rename에 이미 사용되어, 본 토큰 마이그레이션은 §12로 기록한다.
> (원래 지시의 “§10 뒤 §11” 슬롯은 프레임 작업이 선점함.)

파일 `yHhvn5RKjBd91U8BJUQz7F`의 Kiosk(`150:2`)·Admin(`150:2860`) 컴포넌트 페이지에서
remote 변수/이펙트 스타일을 로컬 Primitive·Semantic·Effect로 교체했다.
인스턴스 내부(I-prefix)는 수정하지 않았고, main 재바인딩으로 전파되는 항목만 처리했다.
인증: `ringring` / kiosk_asak Full seat.

### 생성한 Primitive (15)

| 이름 | 근거 remote / hex | Variable ID |
| --- | --- | --- |
| `Color/Green/25` | Green/100 `#f9ffe6` | `VariableID:3086:39832` |
| `Color/Green/450` | Green/1000 `#80b200` | `VariableID:3086:39833` |
| `Color/Neutral/150` | Gray/100 `#f3f3f3` | `VariableID:3086:39834` |
| `Color/Neutral/175` | Gray/200 `#e6e6e6` | `VariableID:3086:39835` |
| `Color/Neutral/250` | Gray/300 `#cccccc` | `VariableID:3086:39836` |
| `Color/Neutral/350` | Gray/600 `#8c8c8c` | `VariableID:3086:39837` |
| `Color/Neutral/850` | Gray/1300 `#333333` | `VariableID:3086:39838` |
| `Color/Red/100` | `#ffe6e7` | `VariableID:3086:39839` |
| `Color/Red/250` | `#ff3336` (remote Red/500과 값 일치) | `VariableID:3086:39840` |
| `Color/Red/700` | `#ff0004` | `VariableID:3086:39841` |
| `Color/Red/800` | `#e50004` | `VariableID:3086:39842` |
| `Color/Red/900` | `#cc0003` | `VariableID:3086:39843` |
| `Color/Yellow/200` | remote Yellow/400 `#ffff80` | `VariableID:3086:39844` |
| `Color/Yellow/900` | remote Yellow/1500 `#333300` | `VariableID:3086:39845` |
| `Color/Accent/Blue` | Accents/Blue resolve `#0088ff` (4모드→단일 평탄화) | `VariableID:3086:39846` |

컬렉션: Primitive `VariableCollectionId:148:12746` / mode `148:1`. scopes는 파일 기존 컨벤션 `ALL_SCOPES`.

### 생성한 Semantic (3, Default+HC 모두 Primitive alias)

| Semantic | → Primitive | Variable ID |
| --- | --- | --- |
| `Semantic/Badge/BestBG` | `Color/Red/100` | `VariableID:3086:39847` |
| `Semantic/Badge/BestText` | `Color/Red/700` | `VariableID:3086:39848` |
| `Semantic/Badge/NewBG` | `Color/Yellow/200` | `VariableID:3086:39849` |

배지 노드 재바인딩: `389:44580`→BestBG, `389:44581`→BestText, `389:44582`→NewBG, `389:44583`→`Color/Surface/700`.

### 재바인딩 건수 (fills/strokes, I-prefix 제외)

| 페이지 | fill 재바인딩 | stroke 재바인딩 | 변경 노드 수 |
| --- | --- | --- | --- |
| Kiosk `150:2` | 52 | 35 (+ Red/500→Red/250 2건 포함 경로) | 84 |
| Admin `150:2860` | 4 | 21 | 25 |

정확 일치 기존 Primitive 매핑(A): Gray/1600→Surface/700, Gray/700→Neutral/450, Gray/1200→Neutral/800,
Gray/800→Neutral/600, Green/800→Lime/500, Backgrounds/Primary→White, Gray/400→Neutral/200,
palette/lime/vivid→Green/300, Deep/green→Green/600, Accents/Orange→Orange/400.

Admin/MenuButton 인스턴스 stroke override (`150:436`, `150:562`, `272:11684`)도 Kiosk 스캔에서 함께 재바인딩됨.

### Effect 스타일 교체

로컬 생성 후 remote 스타일 노드를 `setEffectStyleIdAsync`로 교체:

| 로컬 | ← remote | Style ID | direct 사용 수 (Admin 재스캔) |
| --- | --- | --- | --- |
| `Effect/MenuCard` | `메뉴카드` | `S:f8c168a0415515b96edfb5146c3d72a60cd03188,` | 4 (`150:2957`, `3065:63575`, `150:3388`, `3065:63008`) |
| `Effect/Shadow/XS` | `Shadow/xs` | `S:c8545b9044d833a96555a18e9a9aa090ac6cf0b3,` | 35 |
| `Effect/Glow/LimeFull` | `라임 전체 번짐` | `S:3cbefbcbb8ffd234dfe1c68dd2dd0ad70b85ee93,` | 1 (`150:4740`) |
| `Effect/Glow/Lime` | `라임 번짐` | `S:81ed4548264a9590f02e96a60d5f6e136505731a,` | 1 (`150:4865`) |

`Effect/Nav/Selected`는 §10에서 이미 완료 (Admin direct 6곳).

### 검증 (재스캔, 2026-07-19 후속 에이전트)

| 페이지 | direct(non-I) remote fill/stroke | remote effect style |
| --- | --- | --- |
| Kiosk `150:2` | **0** | **0** |
| Admin `150:2860` | **0** | **0** |

배지 semantic 확인: `389:44580`→`Semantic/Badge/BestBG`, `389:44581`→`BestText`,
`389:44582`→`NewBG`, `389:44583`→`Color/Surface/700` (모두 local).

### 보고만 한 mismatch / 이름충돌 / 평탄화

1. **Accents/Blue** 4모드 → `Color/Accent/Blue` 단일값 `#0088ff` 평탄화.
2. Remote **Green/100** ≠ 로컬 `Color/Green/100` → `Color/Green/25` 신규.
3. Remote **Yellow/400** `#ffff80` ≠ 로컬 `Color/Yellow/400`(`#fbbf24`) → `Color/Yellow/200` 신규.
4. Remote **Gray/800** `#737373` → `Color/Neutral/600` 매핑 (이름 혼동 주의).
5. Remote **Red/500** → 값 일치로 `Color/Red/250` 재바인딩 (이름 충돌 회피).

### Instance-only로 남겨둔 remote (I-prefix, 미수정)

main 재바인딩 후에도 인스턴스 내부(중첩 라이브러리 노드 `2:xxxx` 등)에 잔여:

| Remote | 페이지 | instance 건수 | 비고 |
| --- | --- | --- | --- |
| `Gray/300` | Kiosk | 46 | main은 `Color/Neutral/250`으로 교체됨. 인스턴스 내부 잔여 |
| `palette/lime/vivid` | Admin | 110 | main BG는 `Color/Green/300`. 중첩 instance 잔여 |
| `Red/800` | Admin | 28 | main stroke는 `Color/Red/800` |
| `Deep/green` | Admin | 28 | main stroke는 `Color/Green/600` |
| `Accents/Orange` | Admin | 29 | main stroke는 `Color/Orange/400` |
| `Accents/Blue` | Admin | 29 | main stroke는 `Color/Accent/Blue` |
| `Neutral/Foreground/1/Rest` | Admin | 3 | **이 페이지에 direct main 사용 없음** |
| `Green/1400` | Admin | 1 | **이 페이지에 direct main 사용 없음** |

### 남은 후속 작업

1. Accents/Blue 멀티모드가 실제로 필요하면 Semantic에 mode별 alias 분리 검토.
2. Instance-only 잔여(특히 `Neutral/Foreground/1/Rest`, `Green/1400`, 중첩 `2:xxxx` 라이브러리 노드) —
   해당 remote 라이브러리/다른 페이지 main에서 동일 마이그레이션 또는 라이브러리 detach·재게시.
3. §10 잔여 항목(CategoryTab Admin size, 중복 active 탭 등)은 본 마이그레이션 범위 밖.