# ASAK 관리자(Admin) 디자인 개선안 계획

- 작성일: 2026-07-19
- 근거: Admin Refs 보드(15 레퍼) · Design Application Top 5 · Screen Bible SCR-009~022 · 0718 Admin Components
- 레퍼 보드: `XWZb9aRfaxFFpFXZd5Samb` → [00 Index](https://www.figma.com/design/XWZb9aRfaxFFpFXZd5Samb/?node-id=30-2) · [11 Design Application](https://www.figma.com/design/XWZb9aRfaxFFpFXZd5Samb/?node-id=30-13)
- Production: `yHhvn5RKjBd91U8BJUQz7F` (**읽기·권고만. 0718 원본 직접 수정 금지**)
- 규칙: Sandbox/Refs → QA → Production. 키오스크 개선과 동일 게이트.

---

## 0. 한 줄 결론

ASAK Admin의 격차는 “화면 유무”가 아니라 **운영 중 개입 속도**다.  
레퍼가 반복해서 보여주는 것은 매출 대시보드가 아니라 **옵션 단독 품절 · 삭제 영향 경고 · KDS 상태/합계 · 기기 라우팅 · 대시보드 상단 운영 알림**이다.

| 실운영에서 반복 | ASAK이 이미 가진 것 | 갭 |
|---|---|---|
| 옵션만 품절 + 시간제(Snooze) | SCR-011 메뉴/재료 품절, SoldOutRow | **옵션 단위·복구 시점·채널 분리 UI 약함** |
| 공통 OptionGroup 수정 → 영향 Confirm | SCR-016/017, ConfirmDialog | **영향 메뉴 수·목록이 Confirm에 안 보임** |
| KDS 신규→접수→조리→완료 + 메뉴별 합계 | SCR-009 OrderCard, 상태 변경 | **상태 머신 라벨 통일 · 합계는 보조 탭 미정** |
| 카테고리/메뉴/옵션 → 스테이션 라우팅 | Device 화면 없음(스펙 공백) | **종이 프린터 용어 금지, KDS 수신 규칙 스펙 필요** |
| Dashboard = 지연·품절·기기끊김 상단 | SCR-022 KPI 4개 초안 | **운영 개입 알림이 매출 KPI보다 아래/없음** |

**전략:** Variant·도메인 유지 + 레퍼에서 **상태 밀도·영향 범위·개입 위계**만 병합.  
외부 Admin 킷 통째 교체·완전 재고 ERP UI는 채택하지 않음 (B급, 축소).

---

## 1. 화면(SCR) 단위 — 레퍼 → ASAK 매핑

### SCR-022 Dashboard `/`
**레퍼:** Deliverect Dashboard (A)  
**AS-IS:** KPI 4개, ActiveOrder·SoldOut 요약 초안. Figma “신규 제작 대상”.  
**TO-BE 반영:**
1. **P1:** 상단 `Ops Alert Strip` — 지연 주문 / 품절·Snooze 재료 / 연결 끊긴 기기 (숫자+딥링크).
2. KPI는 그 아래 유지 (4개 제한 규칙 유지).
3. widget 단위 `partialError` 유지.

### SCR-009 Live Order (KDS) · SCR-010 Detail
**레퍼:** 이노페이 KDS(S), 페이히어 KDS(A), 토스 주방주문서(S)  
**AS-IS:** OrderCard 그리드, Navbar, DetailPanel, 상태 변경, TTS 후보.  
**TO-BE 반영:**
1. **P1:** 상태 라벨 고정 `신규 → 접수 → 처리중 → 완료` (코드/Variant `state=` 소문자 통일과 맞춤).
2. **P1 (결정 필요):** 주문 카드 = 정본 유지. **메뉴별 조리 합계는 보조 탭/사이드** (이노페이 합계) — 카드 화면에 과밀 금지.
3. **P1:** 변경·취소 라인 강조 (토스 변경 주문서 → KDS 카드 내 배지).
4. Detail: 결제 내역·합계는 Drawer/Panel 유지, 서버코드 노출 금지.

### SCR-011 Sold-out `/soldOut`
**레퍼:** 토스 옵션 단독 품절(S), Square Availability(S), Deliverect Snooze(A), 토스 배달 품절(A)  
**AS-IS:** MENU/INGREDIENT, dirty+영향 메뉴 수, SaveBar, saveConfirm.  
**TO-BE 반영 (이번 계획의 P0 코어):**
1. **타겟 타입에 OPTION 추가** (드레싱/베이스/토핑 단독 품절).
2. 상태 모델:
   ```text
   available | sold_out_manual | sold_out_until(datetime) | snooze_until(datetime)
   ```
3. 목록 Pill 즉시 변경 + Modal에서 복구 정책 선택 (Square).
4. **채널 노출은 별도 필드** (키오스크 / POS / QR / 배달) — MVP는 키오스크만 연결해도 스키마는 분리.
5. 완전 재고 입출고 UI는 **보류** (토스 재고 = B, 품절 이력만 최소).

### SCR-016 Menu · SCR-017 Edit · Option Groups
**레퍼:** 페이히어 상품(S), Square Menu/Modifier(S), Lightspeed(A), Foodics(B)  
**AS-IS:** 목록·필터·재료 모달·옵션 연결.  
**TO-BE 반영:**
1. **P0:** OptionGroup 삭제/수정 Confirm에 `영향 메뉴 N개` + 메뉴명 샘플 (ConfirmDialog `targetName` 확장).
2. **P1:** 공통 Group + 메뉴별 Override 배지 (Square) — Override 시작 시 “공통 후속 변경 미적용” 고지.
3. **P1:** 옵션 순서 DnD, 필수/최소·최대 선택 수 UI를 키오스크 OptionGroup Spec과 동일 용어로.
4. **P2:** Modifier 독립 목록(Foodics) — 필요 시 별도 라우트, MVP 필수 아님.
5. 알레르기·주방 지시는 옵션과 **엔티티 분리** (Lightspeed).

### Device / KDS Routing (신규 스펙, SCR 미채번 → 가칭 SCR-0XX)
**레퍼:** 토스 주방주문서·옵션별 출력(S)  
**AS-IS:** 없음.  
**TO-BE:**
```text
KDS 기기
└─ 수신 규칙
   ├─ 카테고리
   ├─ 메뉴
   ├─ 옵션 그룹
   └─ 특정 옵션
```
- 용어: 프린터 → **스테이션/KDS 기기**.
- Week B는 **스펙 문서 + Admin 설정 와이어**만. 구현은 후속.

### SCR-018 Payment Methods · SCR-019~021 Sales
**레퍼:** 보조.  
**반영:** 이번 개선 범위 밖(안정화만). 결제수단 타일 피드백은 키오스크 Payment TO-BE와 용어 맞추기 정도.

---

## 2. P0 ~ P2 우선순위

### P0 — 운영 사고·키오스크 직결
| ID | 항목 | 화면 | 레퍼 |
|---|---|---|---|
| A-P0-1 | 옵션 단독 품절 + 복구 정책(수동/오늘마감/일시) | SCR-011 | 토스·Square |
| A-P0-2 | OptionGroup 변경/삭제 영향 Confirm | SCR-016/017 | 페이히어 |
| A-P0-3 | ConfirmDialog `targetName` Admin 파괴 액션 통일 | Shared | 키오스크와 동일 게이트 |
| A-P0-4 | 품절 → 키오스크 Option `soldOut≠disabled` 즉시 반영 계약 | API-009 + Kiosk | 토스 |

### P1 — 사용자(점주/주방)에게 바로 보이는 개선
| ID | 항목 | 화면 |
|---|---|---|
| A-P1-1 | Live Order 상태 머신 라벨·버튼 위계 | SCR-009 |
| A-P1-2 | 메뉴별 조리 합계 **보조 탭** (정본은 주문 카드) | SCR-009 |
| A-P1-3 | Dashboard Ops Alert Strip | SCR-022 |
| A-P1-4 | 공통 OptionGroup + Override 고지 | SCR-016/017 |
| A-P1-5 | KDS Routing 스펙 + 설정 와이어 (구현 전) | 신규 |
| A-P1-6 | Snooze 남은 시간 표시 | SCR-011 |

### P2 — 품질·확장
| ID | 항목 |
|---|---|
| A-P2-1 | 채널별 노출 매트릭스 UI (키오스크 외 비활성) |
| A-P2-2 | Foodics형 Modifier 독립 목록 |
| A-P2-3 | 품절/Snooze 이력 타임라인 (재고 ERP 아님) |
| A-P2-4 | NavItem/StatusBadge Role 분해 (토큰 §10 잔여) |
| A-P2-5 | UPA 패턴으로 테이블·일괄선택·Modal 시각만 정렬 |

### FAIL (가져오면 망침)
- Untitled Breakpoint Mobile → Admin 터치 타겟 44px 추락
- 완전 재고 입출고 ERP를 SCR-011에 통째 이식
- 종이 프린터 UX 용어를 그대로 KDS에 복붙
- Live Order에 합계·카드·필터를 한 화면에 전부 과밀화
- ConfirmDialog `type`/loading 축 삭제

---

## 3. 2주 로드맵 (디자인 → QA → 구현 핸드오프)

### Week A — Stabilize + 품절·영향 보이기
1. SCR-011 AS-IS/TO-BE Spec 페이지 (옵션 품절 + Snooze + Pill)
2. OptionGroup 영향 Confirm Spec (A-P0-2)
3. 키오스크 Detail Option soldOut 연동 계약 문구 (API/상태)
4. QA Matrix Admin 행 추가 초안

### Week B — KDS 위계 + 라우팅 스펙
1. SCR-009 상태 머신 + (결정 후) 합계 보조 탭 와이어
2. 변경/취소 배지
3. Device/KDS Routing 1페이지 스펙 (수신 규칙 트리)
4. SCR-010 Detail 결제/합계 밀도만 점검

### Week C — Dashboard + 채널 여지
1. SCR-022 Ops Alert Strip TO-BE
2. Snooze 남은 시간 UI
3. 채널 분리 스키마 문서 (UI는 키오스크만 enable)
4. Sandbox → QA → Production 게이트 체크

**키오스크 TO-BE와의 동기:**  
A-P0-4는 키오스크 `ASAK Kiosk TO-BE · SCR-004`의 soldOut 표현과 **같은 상태 모델**을 쓴다.

---

## 4. Figma 산출물 계획 (0718 미수정)

기존 Admin Refs(00~11) 유지. **개선안 Spec/시안은 별도 페이지로 추가** (키오스크 `ASAK 개선안 ·` / `ASAK Kiosk TO-BE ·`와 대칭).

```text
ASAK Admin 개선안 · 00 Overview          ← 본 문서 요약
ASAK Admin 개선안 · 01 Sold-out & Snooze (P0)   SCR-011
ASAK Admin 개선안 · 02 OptionGroup Impact (P0) SCR-016
ASAK Admin 개선안 · 03 Live Order & KDS (P1)   SCR-009
ASAK Admin 개선안 · 04 Dashboard Ops (P1)      SCR-022
ASAK Admin 개선안 · 05 Device Routing Spec (P1)
```

각 페이지 구성: **AS-IS / TO-BE / Spec** (키오스크 개선안과 동일).  
풀스크린 Admin TO-BE는 Spec 확정 후 2차로 (MCP 절약).

---

## 5. 컴포넌트·토큰 체크리스트

| 컴포넌트 | 액션 |
|---|---|
| ConfirmDialog | `targetName` + 영향 목록 슬롯 |
| StatusBadge / OrderStatusBadge | KDS 4상태 라벨·색 위계 재확인 |
| Admin/OrderCard | 변경/취소 배지 prop |
| SoldOutRow | OPTION 타겟 · snoozeUntil · channel flags |
| SalesMetricCard | Dashboard에서 Ops Strip **아래**로 |
| Effect/Nav/Selected 등 | remote 로컬화는 §12 완료분 유지 |

---

## 6. 워크숍 결정 질문 (3개만)

1. **KDS 합계:** 메뉴별 조리 합계를 보조 탭으로 넣을까, 주문 카드만 유지할까?  
2. **라우팅 depth:** 카테고리→메뉴까지 vs 옵션 단위까지?  
3. **품절 기본 모델:** 즉시 비가용 vs 시간제 Snooze를 SCR-011 기본값으로 무엇에 둘까?

---

## 7. 관련 링크

| 구분 | URL |
|---|---|
| Admin Refs Index | https://www.figma.com/design/XWZb9aRfaxFFpFXZd5Samb/?node-id=30-2 |
| Design Application | https://www.figma.com/design/XWZb9aRfaxFFpFXZd5Samb/?node-id=30-13 |
| Kiosk TO-BE Index | https://www.figma.com/design/XWZb9aRfaxFFpFXZd5Samb?node-id=32-426 |
| Production 0718 (읽기만) | fileKey `yHhvn5RKjBd91U8BJUQz7F` |
| Screen Bible | `ASAK/docs/product_bible/07_Screen_Bible/docs/07-screens/` |

---

## 8. 변경 이력

| 버전 | 내용 |
|---|---|
| 2026-07-19 | 초안 — 15 레퍼 + Top5 + SCR 매핑 + 2주 로드맵 |
