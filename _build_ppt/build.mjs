// ASAK 발표 PPT 빌드 — ASAK_PPT_디자인시스템.md 스펙 구현
// 좌표 단위: inch. 캔버스 13.333 × 7.5
import pptxgen from "pptxgenjs";

const OUT = "C:/ASAK-workspace/ASAK_샐러드_스마트키오스크_발표.pptx";

const pres = new pptxgen();
pres.defineLayout({ name: "ASAK", width: 13.333, height: 7.5 });
pres.layout = "ASAK";
pres.author = "TEAM ASAK";
pres.title = "ASAK : 샐러드 스마트 키오스크";

// ─── 컬러 (ASAK 토큰) ───
const LIME = "B5E30F",
  DEEP = "243300",
  INK = "1A1A1A",
  G550 = "4A7A00";
const G500 = "6C9700",
  G50 = "F5FBE0",
  SLATE = "383D42";
const TXT = "111827",
  SUB = "6B7280",
  BD = "E5E7EB",
  MUT = "F7F7F7",
  WHT = "FFFFFF";
const F5 = "F5F5F5",
  ERR = "EF4444",
  ERRBG = "FFF0EB",
  ERRT = "994D4D",
  WARN = "FBBF24";

// ─── 폰트 ───
const FR = "Pretendard"; // Regular / Bold(b:true)
const FS = "Pretendard SemiBold"; // SemiBold (bold 끄고 사용)

const S = pres.ShapeType;
const noline = () => ({ type: "none" });

// ─── 프리미티브 ───
const rect = (s, x, y, w, h, color, opt = {}) =>
  s.addShape(S.rect, {
    x,
    y,
    w,
    h,
    fill: { color, ...(opt.transparency !== undefined ? { transparency: opt.transparency } : {}) },
    line: opt.line || noline(),
  });

const box = (s, x, y, w, h, fillColor, lineColor, lineW = 1) =>
  s.addShape(S.rect, {
    x,
    y,
    w,
    h,
    fill: { color: fillColor },
    line: { color: lineColor, width: lineW },
  });

const seg = (s, x, y, w, h, color, width = 1.5) =>
  s.addShape(S.line, { x, y, w, h, line: { color, width } });

const txt = (s, text, x, y, w, h, o = {}) =>
  s.addText(text, {
    x,
    y,
    w,
    h,
    margin: 0,
    isTextBox: true,
    fontFace: o.f || FR,
    fontSize: o.sz || 13,
    bold: !!o.b,
    color: o.c || TXT,
    align: o.al || "left",
    valign: o.va || "top",
    lineSpacingMultiple: o.ls || 1.2,
    charSpacing: 0,
  });

// ─── 공통 컴포넌트 ───
const SECNAMES = ["프로젝트 개요", "팀 구성", "수행 절차", "수행 경과", "자체 평가"];

function header(s, title, sublabel, idx) {
  txt(s, title, 0.48, 0.36, 9.4, 0.46, { f: FS, sz: 24, c: TXT, ls: 1.3 });
  if (sublabel) txt(s, sublabel, 0.48, 0.92, 9.4, 0.26, { sz: 11, c: SUB });
  rect(s, 0.48, 1.24, 1.6, 0.05, LIME);
  for (let i = 0; i < 5; i++) rect(s, 11.55 + i * 0.17, 0.44, 0.14, 0.14, i === idx ? LIME : BD);
  txt(s, `0${idx + 1}  ${SECNAMES[idx]}`, 10.6, 0.66, 1.77, 0.22, { sz: 9.5, c: SUB, al: "right" });
}

function footer(s, pg) {
  rect(s, 0.48, 7.0, 0.1, 0.1, LIME);
  txt(s, "ASAK 스마트 키오스크 · 그린컴퓨터아카데미 신촌", 0.7, 6.96, 7.0, 0.24, { sz: 9, c: SUB });
  txt(s, pg, 11.8, 6.93, 0.57, 0.28, { f: FS, sz: 11, c: TXT, al: "right" });
}

function newSlide() {
  const s = pres.addSlide();
  s.background = { color: WHT };
  return s;
}

// 카드 본문 — 문단(블록) 단위로 그려 섹션 구분감을 준다
// blocks: [[헤딩|null, '본문\n본문'], ...]
const LH = 0.26; // 11.5pt · 행간 1.6 기준 1줄 높이
const BLOCK_GAP = 0.2; // 문단 사이 간격
function cardBlocks(s, x, yStart, w, blocks) {
  let y = yStart;
  blocks.forEach(([head, body]) => {
    if (head) {
      txt(s, head, x, y, w, 0.22, { f: FS, sz: 11.5, c: G550 });
      y += 0.28;
    }
    const n = body.split("\n").length;
    txt(s, body, x, y, w, n * LH, { sz: 11.5, c: TXT, ls: 1.6 });
    y += n * LH + BLOCK_GAP;
  });
}

// 문단 단위 본문 — '\n\n'로 나눠 문단마다 간격을 준다.
// 한 문단 안(이어지는 문장)은 행간을 좁게, 문단 사이는 넓게 벌려 구분감을 만든다.
function paras(s, text, x, yStart, w, o = {}) {
  const sz = o.sz || 13,
    ls = o.ls || 1.4,
    gap = o.gap || 0.26;
  const lh = (sz * ls) / 72;
  let y = yStart;
  text.split("\n\n").forEach((p) => {
    const n = p.split("\n").length;
    txt(s, p, x, y, w, n * lh + 0.04, { sz, c: o.c || TXT, ls });
    y += n * lh + gap;
  });
  return y - gap;
}

// 화면 캡처 자리표시자
function shot(s, x, y, w, h, label, ratio) {
  box(s, x, y, w, h, WHT, BD, 1);
  txt(s, label, x, y + h / 2 - 0.3, w, 0.26, { sz: 11.5, c: SUB, al: "center" });
  txt(s, ratio, x, y + h / 2 - 0.02, w, 0.24, { sz: 9.5, c: SUB, al: "center" });
}

// ══════════════════════════════════════════════════════════
// 1 · T01 표지
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: INK };
  // 브래킷 ㄱ
  seg(s, 3.95, 2.32, 5.44, 0, WHT, 1.25);
  seg(s, 3.95, 2.32, 0, 0.24, WHT, 1.25);
  seg(s, 9.39, 2.32, 0, 0.24, WHT, 1.25);
  // 브래킷 ㄴ
  seg(s, 3.95, 4.72, 5.44, 0, WHT, 1.25);
  seg(s, 3.95, 4.48, 0, 0.24, WHT, 1.25);
  seg(s, 9.39, 4.48, 0, 0.24, WHT, 1.25);
  // 세로바
  rect(s, 9.33, 0.45, 0.11, 1.58, LIME);
  rect(s, 10.12, 0.0, 0.11, 1.54, LIME, { transparency: 40 });
  rect(s, 3.78, 5.07, 0.11, 1.58, LIME, { transparency: 40 });
  rect(s, 3.17, 5.37, 0.11, 1.58, LIME, { transparency: 70 });

  txt(s, "그린컴퓨터아카데미 신촌 · 키오스크 풀스택 개발자 양성과정", 0, 1.86, 13.333, 0.28, {
    f: FS,
    sz: 11,
    c: LIME,
    al: "center",
  });
  txt(s, "ASAK : 샐러드 스마트 키오스크", 0, 2.88, 13.333, 0.8, {
    sz: 48,
    b: true,
    c: WHT,
    al: "center",
    ls: 1.2,
  });
  txt(
    s,
    "옵션 선택이 많은 샐러드 주문을 고객 키오스크와 관리자 운영 화면으로 연결한다",
    0,
    3.86,
    13.333,
    0.34,
    { sz: 15, c: BD, al: "center" },
  );

  rect(s, 4.17, 5.3, 5.0, 0.76, SLATE);
  txt(s, "TEAM 다비치", 4.17, 5.42, 5.0, 0.26, { f: FS, sz: 12, c: LIME, al: "center" });
  txt(s, "이하진 · 김나연   |   멘토 남상규", 4.17, 5.7, 5.0, 0.24, {
    sz: 10.5,
    c: WHT,
    al: "center",
  });
  txt(
    s,
    "결과보고서_다비치(ASAK 샐러드 스마트 키오스크)  ·  2026.06.29 ~ 2026.08.07",
    0,
    6.88,
    13.333,
    0.26,
    { sz: 9, c: SUB, al: "center" },
  );
  s.addNotes(
    "표지. 팀명 다비치, 팀원 이하진·김나연. 멘토(선생님) 이름만 확인해 채운다. 기간은 회의록 2026-W27~W32 기준.",
  );
}

// ══════════════════════════════════════════════════════════
// 2 · T02 목차
// ══════════════════════════════════════════════════════════
{
  const s = newSlide();
  txt(s, "목차", 0.48, 0.8, 6.0, 0.6, { sz: 32, b: true, c: TXT, ls: 1.2 });
  rect(s, 0.48, 1.54, 1.6, 0.05, LIME);
  const items = [
    ["프로젝트 개요", "주제 · 배경 · 범위 · 기대 효과"],
    ["프로젝트 팀 구성 및 역할", "담당 화면 · API · 산출물"],
    ["프로젝트 수행 절차 및 방법", "기획 → 설계 → 개발 → 통합 → QA"],
    ["프로젝트 수행 경과", "기술 · 구조 · ERD · 화면 · 결과물"],
    ["자체 평가 의견", "잘한 점 · 보완할 점 · 배운 점"],
  ];
  items.forEach(([label, sub], i) => {
    const y = 2.18 + i * 0.86;
    rect(s, 0.48, y, 0.7, 0.7, LIME);
    txt(s, `0${i + 1}`, 0.48, y + 0.18, 0.7, 0.36, { sz: 20, b: true, c: DEEP, al: "center" });
    txt(s, label, 1.42, y + 0.18, 6.5, 0.34, { f: FS, sz: 16, c: TXT });
    txt(s, sub, 8.2, y + 0.24, 4.17, 0.28, { sz: 10, c: SUB, al: "right" });
    rect(s, 1.42, y + 0.7, 10.95, 0.01, BD);
  });
  s.addNotes("목차. 5개 섹션은 결과보고서 표준 구성을 따른다.");
}

// ══════════════════════════════════════════════════════════
// 3 · T03 프로젝트 개요
// ══════════════════════════════════════════════════════════
{
  const s = newSlide();
  header(s, "프로젝트 개요", null, 0);
  footer(s, "03");
  txt(
    s,
    "옵션 선택이 많은 샐러드 주문을 고객 키오스크와 관리자 운영 화면으로 연결한다.  ·  2인 팀 · 6주 · 저장소 4개",
    0.48,
    1.6,
    12.373,
    0.32,
    { sz: 13, c: SUB },
  );
  const cards = [
    [
      "01",
      "주제 및\n선정 배경",
      [
        [
          null,
          "샐러드 주문은 메뉴 외에도\n옵션 선택, 재료 제외,\n수량 변경처럼\n확인할 항목이 많다.",
        ],
        [null, "주문 과정을 쉽게\n이해할 수 있는 흐름을\n만들고자 했다."],
      ],
    ],
    [
      "02",
      "특화 포인트 ·\n차별화 내용",
      [
        [
          null,
          "단순 메뉴 주문이 아니라\n옵션 정책, 제외 재료,\n품절 여부, 수량 제한을\n주문 흐름에 반영한다.",
        ],
        [null, "주문 결과는 관리자\n화면에서 확인한다."],
      ],
    ],
    [
      "03",
      "프로젝트 내용",
      [
        ["Kiosk", "Home · 메뉴 목록\n메뉴 상세 · 장바구니\n결제"],
        ["Admin", "Live 주문 · 주문 관리\n메뉴 관리 · 품절"],
        ["Backend", "메뉴 · 옵션 · 주문\n데이터 검증"],
      ],
    ],
    [
      "04",
      "활용 장비 및\n자료",
      [
        ["프론트엔드", "React · React Router\nZustand · Axios · Vite"],
        ["백엔드 · DB", "Spring Boot · Java\nMyBatis · MySQL"],
        ["협업 · 문서", "Figma · Bruno · GitHub\nProduct Bible · WBS"],
      ],
    ],
    [
      "05",
      "활용 방안 및\n기대 효과",
      [
        [null, "고객은 복잡한 옵션을\n화면 흐름에 따라\n선택할 수 있다."],
        [null, "운영자는 주문과 메뉴를\n관리자 화면에서\n확인할 수 있다."],
        [null, "주문 입력 오류를\n줄이는 것이 목표다."],
      ],
    ],
  ];
  cards.forEach(([no, title, blocks], i) => {
    const x = 0.48 + i * 2.555;
    const accent = i === 2;
    box(s, x, 2.06, 2.315, 4.6, accent ? G50 : WHT, accent ? LIME : BD, 1);
    rect(s, x, 2.06, 2.315, 0.06, LIME);
    txt(s, no, x + 0.18, 2.24, 1.8, 0.22, { f: FS, sz: 11, c: G550 });
    txt(s, title, x + 0.18, 2.56, 1.96, 0.6, { f: FS, sz: 15, c: TXT, ls: 1.35 });
    cardBlocks(s, x + 0.18, 3.16, 1.99, blocks);
  });
  s.addNotes(
    "개요. 실제로 구현하지 않은 결제 수단·AI 추천·하드웨어 제어는 쓰지 않는다. 기대 효과는 수치 없이 목표로만 서술한다.",
  );
}

// ══════════════════════════════════════════════════════════
// 4 · T04 팀 구성 및 역할
// ══════════════════════════════════════════════════════════
{
  const s = newSlide();
  header(s, "프로젝트 팀 구성 및 역할", null, 1);
  footer(s, "04");
  txt(
    s,
    "2인 팀으로 저장소 4개(문서 · Kiosk · Admin · Backend)를 나누어 맡고, WBS 85건을 증거 기준으로 관리했다.",
    0.48,
    1.6,
    12.373,
    0.32,
    { sz: 13, c: SUB },
  );
  const team = [
    [
      "이하진",
      "기획 · 문서 · 관리자",
      "WBS 26건",
      [
        "프로젝트 문서·WBS·ERD·API 명세 정본 관리",
        "Figma 디자인 토큰 · 공통 컴포넌트 · 화면 매핑",
        "Admin 전 화면 구현 — Live 주문 · 주문 관리 · 상태 전환",
        "품절 · 메뉴 · 결제수단 · 매출 · 대시보드 화면",
        "관리자 실서버 API 연동, DB 스키마 반영",
      ].join("\n"),
    ],
    [
      "김나연",
      "키오스크 · 백엔드",
      "WBS 15건",
      [
        "관리자 화면 Figma 초기 설계 (로그인 · 주문 현황 · 매출)",
        "Kiosk 전 화면 구현 — 라우트 · 메뉴 목록 · 상세 · 옵션",
        "필수·선택 옵션 활성 조건, 알레르기 조건부 표시",
        "수량 제한(메뉴 9개 · 장바구니 30개) 및 초과 안내",
        "결제 · 주문 완료 · 타임아웃 화면, Kiosk 실서버 API 연동",
      ].join("\n"),
    ],
  ];
  team.forEach(([name, role, wbs, work], i) => {
    const x = 0.48 + i * 6.3;
    box(s, x, 2.06, 6.08, 3.4, WHT, BD, 1);
    // ── 헤더 행: 이니셜 / 이름 · 역할칩 / WBS  — 좌우 카드 동일 좌표 ──
    box(s, x + 0.28, 2.32, 0.76, 0.76, G50, LIME, 1.5);
    txt(s, name.charAt(0), x + 0.28, 2.52, 0.76, 0.38, { f: FS, sz: 20, c: G550, al: "center" });
    txt(s, name, x + 1.22, 2.34, 2.6, 0.32, { f: FS, sz: 18, c: TXT });
    txt(s, wbs, x + 4.2, 2.4, 1.6, 0.24, { f: FS, sz: 11, c: G550, al: "right" });
    rect(s, x + 1.22, 2.76, 2.6, 0.28, DEEP);
    txt(s, role, x + 1.22, 2.82, 2.6, 0.2, { f: FS, sz: 10, c: LIME, al: "center" });
    // ── 구분선 + 담당 업무 목록 (항목형이므로 행간을 넓게) ──
    rect(s, x + 0.28, 3.28, 5.52, 0.01, BD);
    txt(s, work, x + 0.28, 3.48, 5.52, 1.6, { sz: 11.5, c: TXT, ls: 1.9 });
  });
  rect(s, 0.48, 5.8, 12.373, 0.62, MUT);
  txt(
    s,
    "멘토 남상규  ·  주차별 선생님 피드백으로 API 계약 · 상태 관리 · 수직 슬라이스 구현 순서를 조정했다.",
    0.7,
    5.96,
    11.9,
    0.3,
    { sz: 12, c: SUB },
  );
  s.addNotes(
    "팀 구성. WBS 담당 건수와 워크로그 entries 기준으로 작성했다. 이하진 26건 · 김나연 15건.",
  );
}

// ══════════════════════════════════════════════════════════
// 5 · T05 수행 절차 및 방법
// ══════════════════════════════════════════════════════════
{
  const s = newSlide();
  header(s, "프로젝트 수행 절차 및 방법", null, 2);
  footer(s, "05");
  txt(
    s,
    "주차별 회의록과 WBS를 근거로 8단계를 진행했다. 7단계 실서버 연동과 8단계 통합 검증은 현재 진행 중이다.",
    0.48,
    1.6,
    12.373,
    0.32,
    { sz: 13, c: SUB },
  );
  rect(s, 0.9, 3.54, 11.55, 0.02, BD);
  const steps = [
    ["기획 · 요구사항", "W27  6/29~7/5"],
    ["화면 · DB 설계", "W28  7/6~7/12"],
    ["Figma UI 확정", "W29  7/13~7/19"],
    ["Kiosk 화면 구현", "W29~W30"],
    ["Admin 화면 구현", "W30  7/20~7/26"],
    ["API 계약 · 백엔드", "W30~W31"],
    ["실서버 연동", "W31~W32"],
    ["통합 검증 · 문서화", "W32  8/3~8/7"],
  ];
  steps.forEach(([name, sub], i) => {
    const cx = 0.98 + i * 1.62;
    const done = i < 6;
    if (done) rect(s, cx - 0.2, 3.35, 0.4, 0.4, LIME);
    else box(s, cx - 0.2, 3.35, 0.4, 0.4, WHT, G500, 1.5);
    txt(s, `0${i + 1}`, cx - 0.2, 3.43, 0.4, 0.24, {
      sz: 14,
      b: true,
      c: done ? DEEP : G550,
      al: "center",
    });
    const above = i % 2 === 0;
    rect(s, cx - 0.005, above ? 3.21 : 3.75, 0.01, 0.14, BD);
    txt(s, name, cx - 0.75, above ? 2.62 : 3.9, 1.5, 0.26, { f: FS, sz: 14, c: TXT, al: "center" });
    txt(s, sub, cx - 0.75, above ? 2.94 : 4.22, 1.5, 0.22, { sz: 9.5, c: SUB, al: "center" });
  });
  rect(s, 0.48, 5.3, 12.373, 0.56, SLATE);
  txt(s, "총 개발기간", 0.8, 5.46, 2.0, 0.24, { f: FS, sz: 11, c: LIME });
  txt(s, "2026.06.29  ~  2026.08.07   (6주 · ISO W27~W32)", 6.0, 5.42, 6.05, 0.32, {
    f: FS,
    sz: 16,
    c: WHT,
    al: "right",
  });
  // 근거 각주는 사용자 편집본에서 삭제됨 — 유지하지 않는다
  s.addNotes(
    "수행 절차. 1~6단계 완료, 7 실서버 연동·8 통합 검증은 진행 중이다. current-status-baseline.md 기준.",
  );
}

// ══════════════════════════════════════════════════════════
// 6 · T03 재사용 — 수행 경과 요약
// ══════════════════════════════════════════════════════════
{
  const s = newSlide();
  header(s, "프로젝트 수행 경과 요약", null, 3);
  footer(s, "06");
  txt(
    s,
    "기술 · 화면 · 프로세스 · 피드백 · 결과물 다섯 축으로 수행 경과를 정리했다.",
    0.48,
    1.6,
    12.373,
    0.32,
    { sz: 13, c: SUB },
  );
  const cards = [
    [
      "01",
      "활용 기술 및\n구현 방법",
      "React 기반 Kiosk /\nAdmin 화면과\nSpring Boot · MyBatis ·\nMySQL 기반 API 구조를\n사용했다.",
    ],
    [
      "02",
      "핵심 기능 및\n구현 화면",
      "메뉴 · 옵션 ·\n제외 재료 · 수량 선택,\n장바구니,\n관리자 주문 · 메뉴\n관리 화면을 구성했다.",
    ],
    [
      "03",
      "수행 프로세스",
      "요구사항 분석부터\nUI/DB 설계, 화면 · API\n개발, 통합, QA,\n시연 준비까지\n단계별로 진행했다.",
    ],
    [
      "04",
      "피드백 및\n반영 내용",
      "검토에서 확인된\n화면 흐름 · 주문 검증 ·\n데이터 구조 사항을\n보완했다.",
    ],
    [
      "05",
      "결과물\n첨부 자료",
      "Kiosk, Admin, ERD,\nAPI 테스트,\nFigma · WBS 자료를\n결과물로 정리했다.",
    ],
  ];
  cards.forEach(([no, title, body], i) => {
    const x = 0.48 + i * 2.555;
    box(s, x, 2.06, 2.315, 3.6, WHT, BD, 1);
    rect(s, x, 2.06, 2.315, 0.06, LIME);
    txt(s, no, x + 0.18, 2.24, 1.8, 0.22, { f: FS, sz: 11, c: G550 });
    txt(s, title, x + 0.18, 2.56, 1.96, 0.6, { f: FS, sz: 15, c: TXT, ls: 1.35 });
    txt(s, body, x + 0.18, 3.24, 1.99, 2.2, { sz: 11.5, c: TXT, ls: 1.6 });
  });
  s.addNotes("수행 경과 요약. 이후 7~20쪽에서 각 항목을 상세히 다룬다.");
}

// ══════════════════════════════════════════════════════════
// 7 · T06 활용 기술 및 구현 방법
// ══════════════════════════════════════════════════════════
{
  const s = newSlide();
  header(s, "활용 기술 및 구현 방법", "활용 기술 및 구현 방법", 3);
  footer(s, "07");
  const colw = [2.2, 3.6, 6.573];
  const rows = [
    ["계층", "활용 기술", "구현 내용"],
    [
      "Kiosk 프론트엔드",
      "React · React Router · Zustand · Axios · Vite",
      "Home, 메뉴 목록 · 상세, 장바구니, 결제 관련 화면 및 주문 상태 관리",
    ],
    [
      "Admin 프론트엔드",
      "React · React Router · Zustand · Axios · Vite",
      "Live 주문, 주문 관리, 메뉴 관리, 품절 · 판매 관련 화면",
    ],
    [
      "백엔드",
      "Spring Boot · Java · MyBatis",
      "키오스크 · 관리자 API, 메뉴 · 옵션 · 주문 검증 및 상태 처리",
    ],
    [
      "데이터베이스",
      "MySQL",
      "24개 테이블 — 메뉴 · 재료 · 옵션 정책 · 주문 · 결제, 상태값은 공통코드로 관리",
    ],
    [
      "협업 · 검증",
      "GitHub · Figma · Bruno · WBS",
      "형상 관리, 화면 설계, API 테스트, 작업 상태 관리",
    ],
  ];
  const ty0 = 1.8;
  rows.forEach((row, r) => {
    const rh = r === 0 ? 0.38 : 0.56;
    const ry = r === 0 ? ty0 : ty0 + 0.38 + (r - 1) * 0.56;
    let cx = 0.48;
    row.forEach((cell, c) => {
      let fill;
      if (r === 0) fill = DEEP;
      else if (c === 0) fill = G50;
      else fill = r % 2 === 0 ? MUT : WHT;
      rect(s, cx, ry, colw[c], rh, fill);
      const o =
        r === 0
          ? { f: FS, sz: 12, c: WHT }
          : c === 0
            ? { f: FS, sz: 11.5, c: G550 }
            : { sz: 11.5, c: TXT };
      txt(s, cell, cx + 0.14, ry + (r === 0 ? 0.1 : 0.19), colw[c] - 0.28, 0.24, o);
      cx += colw[c];
    });
    if (r > 0) rect(s, 0.48, ry + rh, 12.373, 0.01, BD);
  });
  box(s, 0.48, 5.3, 12.373, 1.2, G50, LIME, 1);
  txt(s, "구현 방법 요약", 0.7, 5.46, 11.9, 0.26, { f: FS, sz: 14, c: G550 });
  txt(
    s,
    "Kiosk와 Admin은 역할별로 독립된 React 애플리케이션으로 구성하고, Spring Boot API를 통해 메뉴 · 옵션 · 주문 데이터를 조회 · 검증한다.\nMyBatis Mapper는 메뉴 구성과 주문 저장에 필요한 테이블 관계를 연결한다.",
    0.7,
    5.8,
    11.9,
    0.6,
    { sz: 12.5, c: TXT, ls: 1.5 },
  );
  s.addNotes("활용 기술. 표에 적은 기술은 실제 저장소에서 사용 중인 것만 기재한다.");
}

// ══════════════════════════════════════════════════════════
// 8 · T07 프로젝트 전체 구조
// ══════════════════════════════════════════════════════════
{
  const s = newSlide();
  header(s, "프로젝트 전체 구조", "시스템 구조", 3);
  footer(s, "08");
  // Kiosk
  box(s, 0.9, 1.9, 4.2, 1.3, G50, LIME, 1.5);
  txt(s, "Kiosk (React)", 1.12, 2.06, 3.8, 0.26, { f: FS, sz: 14, c: DEEP });
  txt(
    s,
    "Home · Menu · Detail · Cart · Payment\nReact Router · Zustand · Axios",
    1.12,
    2.46,
    3.8,
    0.56,
    { sz: 9.5, c: DEEP, ls: 1.5 },
  );
  // Admin
  box(s, 8.24, 1.9, 4.2, 1.3, F5, SLATE, 1.5);
  txt(s, "Admin (React)", 8.46, 2.06, 3.8, 0.26, { f: FS, sz: 14, c: INK });
  txt(s, "Live 주문 · 주문 관리 · 메뉴 관리\n품절 · 결제수단 · 매출", 8.46, 2.46, 3.8, 0.56, {
    sz: 9.5,
    c: INK,
    ls: 1.5,
  });
  // 연결선 (REST 라벨 좌우에서 끊음)
  seg(s, 3.0, 3.2, 0, 0.34, SUB, 1.5);
  seg(s, 3.0, 3.54, 2.95, 0, SUB, 1.5);
  seg(s, 10.34, 3.2, 0, 0.34, SUB, 1.5);
  seg(s, 7.4, 3.54, 2.94, 0, SUB, 1.5);
  box(s, 5.95, 3.4, 1.45, 0.28, WHT, LIME, 1);
  txt(s, "REST API", 5.95, 3.45, 1.45, 0.2, { sz: 9.5, c: G550, al: "center" });
  seg(s, 6.67, 3.68, 0, 0.22, SUB, 1.5);
  // Backend
  rect(s, 3.6, 3.9, 6.13, 1.3, DEEP);
  txt(s, "Spring Boot Backend", 3.82, 4.06, 5.7, 0.26, { f: FS, sz: 14, c: LIME });
  txt(
    s,
    "Kiosk Controller · Admin Controller · Service · Validation\nMyBatis Mapper",
    3.82,
    4.46,
    5.7,
    0.56,
    { sz: 9.5, c: WHT, ls: 1.5 },
  );
  seg(s, 6.67, 5.2, 0, 0.3, SUB, 1.5);
  // DB
  rect(s, 4.36, 5.5, 4.61, 0.86, G550);
  txt(s, "MySQL", 4.58, 5.62, 4.2, 0.26, { f: FS, sz: 14, c: WHT });
  txt(
    s,
    "24개 테이블 · menu · ing · opt_policy · orders · payment · common_code",
    4.58,
    5.98,
    4.2,
    0.24,
    { sz: 9.5, c: WHT },
  );
  s.addNotes("전체 구조. RTOS·임베디드·카드리더기·프린터는 구현 범위가 아니므로 넣지 않았다.");
}

// ══════════════════════════════════════════════════════════
// ERD 공통
// ══════════════════════════════════════════════════════════
function erdHeader(s, title, pg, idxLabel) {
  txt(s, title, 0.3, 0.3, 9.4, 0.4, { f: FS, sz: 20, c: TXT });
  rect(s, 0.3, 0.86, 1.2, 0.05, LIME);
  for (let i = 0; i < 5; i++) rect(s, 11.85 + i * 0.17, 0.36, 0.14, 0.14, i === 3 ? LIME : BD);
  txt(s, idxLabel, 10.9, 0.58, 2.09, 0.22, { sz: 9.5, c: SUB, al: "right" });
  rect(s, 0.3, 7.0, 0.1, 0.1, LIME);
  txt(s, "ASAK 스마트 키오스크 · 그린컴퓨터아카데미 신촌", 0.52, 6.96, 7.0, 0.24, {
    sz: 9,
    c: SUB,
  });
  txt(s, pg, 12.1, 6.93, 0.57, 0.28, { f: FS, sz: 11, c: TXT, al: "right" });
}
function entity(s, x, y, w, name, fields) {
  const h = 0.3 + fields.length * 0.24;
  box(s, x, y, w, h, WHT, BD, 1);
  rect(s, x, y, w, 0.3, DEEP);
  txt(s, name, x + 0.1, y + 0.07, w - 0.2, 0.22, { f: FS, sz: 11, c: WHT });
  fields.forEach((f, k) =>
    txt(s, f, x + 0.1, y + 0.3 + k * 0.24 + 0.05, w - 0.2, 0.2, { sz: 9.5, c: TXT }),
  );
  return h;
}

// 9 · ERD-A — 메뉴 · 재료 · 옵션 (정본 스키마 기준)
{
  const s = newSlide();
  erdHeader(s, "ERD — 메뉴 · 재료 · 옵션 구조", "09", "04 수행 경과 · ERD 1/2");
  // Row 1
  entity(s, 0.35, 1.2, 1.85, "category", ["id  PK", "name", "sort_no", "active"]);
  entity(s, 2.55, 1.2, 2.25, "menu", [
    "id  PK",
    "cat_id  FK",
    "name",
    "price",
    "sold_out",
    "image_url",
  ]);
  entity(s, 5.15, 1.2, 2.35, "menu_opt_policy", [
    "id  PK",
    "menu_id  FK",
    "policy_id  FK",
    "priority",
    "required",
  ]);
  entity(s, 7.85, 1.2, 2.3, "opt_policy", [
    "id  PK",
    "opt_group_id  FK",
    "policy_key",
    "name",
    "min_select",
    "max_select",
  ]);
  entity(s, 10.5, 1.2, 2.1, "opt_group", [
    "id  PK",
    "group_type_id  FK",
    "name",
    "min_select",
    "max_select",
  ]);
  // Row 2
  entity(s, 0.35, 3.6, 1.85, "ing", [
    "id  PK",
    "name",
    "type_id  FK",
    "kcal",
    "protein_g",
    "sold_out",
  ]);
  entity(s, 2.55, 3.6, 2.25, "menu_ing", [
    "id  PK",
    "menu_id  FK",
    "ing_id  FK",
    "role_id  FK",
    "is_default",
    "can_remove",
    "quantity",
  ]);
  entity(s, 7.85, 3.6, 2.3, "opt_policy_item", [
    "id  PK",
    "policy_id  FK",
    "opt_item_id  FK",
    "is_default",
    "recommended",
    "active",
  ]);
  entity(s, 10.5, 3.6, 2.1, "opt_item", [
    "id  PK",
    "opt_group_id  FK",
    "ing_id  FK",
    "name",
    "add_price",
    "sold_out",
  ]);
  // 관계선
  seg(s, 2.2, 1.62, 0.35, 0, SUB, 1.25); // category → menu
  seg(s, 4.8, 1.62, 0.35, 0, SUB, 1.25); // menu → menu_opt_policy
  seg(s, 7.5, 1.62, 0.35, 0, SUB, 1.25); // menu_opt_policy → opt_policy
  seg(s, 9.0, 2.94, 0, 0.66, SUB, 1.25); // opt_policy → opt_policy_item
  seg(s, 10.15, 4.02, 0.35, 0, SUB, 1.25); // opt_policy_item → opt_item
  seg(s, 11.55, 2.7, 0, 0.9, SUB, 1.25); // opt_group → opt_item
  seg(s, 3.6, 2.94, 0, 0.66, SUB, 1.25); // menu → menu_ing
  seg(s, 2.2, 4.02, 0.35, 0, SUB, 1.25); // ing → menu_ing
  // ing → opt_item (엔터티 아래로 우회)
  seg(s, 1.2, 5.34, 0, 0.52, SUB, 1.25);
  seg(s, 1.2, 5.86, 10.35, 0, SUB, 1.25);
  seg(s, 11.55, 5.34, 0, 0.52, SUB, 1.25);
  txt(
    s,
    "메뉴는 카테고리 · 기본 재료(menu_ing) · 옵션 정책(menu_opt_policy)으로 구성하며, 옵션 선택 조건(min/max_select)과 제외 가능 재료(can_remove)를 주문 화면에 제공한다.",
    0.3,
    6.22,
    12.733,
    0.26,
    { sz: 11.5, c: SUB, al: "center" },
  );
  txt(
    s,
    "부가 테이블 — tag · menu_tag · allergen · ing_allergen · menu_nutr · opt_item_comp · menu_opt_override (전체 24개 테이블 중 핵심 9개만 표시)",
    0.3,
    6.54,
    12.733,
    0.24,
    { sz: 9.5, c: SUB, al: "center" },
  );
  s.addNotes(
    "ERD 1/2. 아삭_mysql.sql 정본 기준. 전체 24개 테이블 중 메뉴·옵션 핵심 9개만 표시했고 부가 테이블은 하단에 이름으로 남겼다.",
  );
}

// 10 · ERD-B — 주문 · 결제 · 공통코드 (정본 스키마 기준)
{
  const s = newSlide();
  erdHeader(s, "ERD — 주문 · 결제 · 공통코드 구조", "10", "04 수행 경과 · ERD 2/2");
  // Row 1
  entity(s, 0.35, 1.2, 1.85, "code_group", ["id  PK", "group_code", "name"]);
  entity(s, 2.55, 1.2, 2.25, "common_code", [
    "id  PK",
    "code_grp_id  FK",
    "code",
    "name",
    "sort_no",
    "active",
  ]);
  entity(s, 5.15, 1.2, 2.35, "orders", [
    "id  PK",
    "order_no",
    "order_type_id  FK",
    "status_id  FK",
    "total_price",
    "created_at",
  ]);
  entity(s, 7.85, 1.2, 2.3, "order_item", [
    "id  PK",
    "order_id  FK",
    "menu_id  FK",
    "quantity",
    "price",
  ]);
  entity(s, 10.5, 1.2, 2.1, "menu", ["id  PK", "name", "price"]);
  // Row 2
  entity(s, 2.55, 3.3, 2.25, "pay_method_cfg", ["id  PK", "method_id  FK", "name", "active"]);
  entity(s, 5.15, 3.3, 2.35, "payment", [
    "id  PK",
    "order_id  FK",
    "method_id  FK",
    "status_id  FK",
    "amount",
    "paid_at",
  ]);
  entity(s, 7.85, 3.3, 2.3, "order_item_option", [
    "id  PK",
    "order_item_id  FK",
    "opt_item_id  FK",
    "quantity",
    "price",
  ]);
  entity(s, 10.5, 3.3, 2.1, "opt_item", ["id  PK", "name", "add_price"]);
  // Row 3
  entity(s, 7.85, 5.2, 2.3, "item_exclusion", ["id  PK", "order_item_id  FK", "ing_id  FK"]);
  entity(s, 10.5, 5.2, 2.1, "ing", ["id  PK", "name"]);
  // 관계선
  seg(s, 2.2, 1.62, 0.35, 0, SUB, 1.25); // code_group → common_code
  seg(s, 4.8, 1.62, 0.35, 0, SUB, 1.25); // common_code → orders
  seg(s, 7.5, 1.62, 0.35, 0, SUB, 1.25); // orders → order_item
  seg(s, 10.15, 1.62, 0.35, 0, SUB, 1.25); // order_item → menu
  seg(s, 3.6, 2.94, 0, 0.36, SUB, 1.25); // common_code → pay_method_cfg
  seg(s, 6.0, 2.94, 0, 0.36, SUB, 1.25); // orders → payment
  seg(s, 9.0, 2.7, 0, 0.6, SUB, 1.25); // order_item → order_item_option
  seg(s, 10.15, 3.72, 0.35, 0, SUB, 1.25); // order_item_option → opt_item
  seg(s, 10.15, 5.62, 0.35, 0, SUB, 1.25); // item_exclusion → ing
  // order_item → item_exclusion (payment 오른쪽으로 우회)
  seg(s, 7.62, 2.3, 0.23, 0, SUB, 1.25);
  seg(s, 7.62, 2.3, 0, 3.32, SUB, 1.25);
  seg(s, 7.62, 5.62, 0.23, 0, SUB, 1.25);
  txt(
    s,
    "주문은 메뉴 단위의 주문 항목으로 저장하고, 선택 옵션(order_item_option)과 제외 재료(item_exclusion)를 주문 항목에 연결해 주문 내용을 보존한다.",
    0.3,
    6.4,
    12.733,
    0.26,
    { sz: 11.5, c: SUB, al: "center" },
  );
  s.addNotes(
    "ERD 2/2. 주문 상태·주문 유형·결제 수단·결제 상태는 모두 common_code를 참조하는 공통코드 구조다. code_group → common_code → orders/payment/pay_method_cfg 경로를 설명한다.",
  );
}

// ══════════════════════════════════════════════════════════
// 11 · T09 화면설계서
// ══════════════════════════════════════════════════════════
{
  const s = newSlide();
  header(s, "화면설계서 — 키오스크 주문 흐름", "화면설계서", 3);
  footer(s, "11");
  txt(s, "카테고리 선택에서 장바구니까지", 0.48, 1.8, 3.98, 0.3, { f: FS, sz: 16, c: TXT });
  rect(s, 0.48, 2.22, 0.9, 0.05, LIME);
  paras(
    s,
    "고객은 카테고리별 메뉴를 조회하고,\n상세 화면에서 옵션 · 제외 재료 ·\n수량을 선택합니다.\n\n선택 결과는 장바구니에 반영되어\n주문 금액을 확인할 수 있습니다.",
    0.48,
    2.48,
    3.98,
    { sz: 12.5, ls: 1.45, gap: 0.3 },
  );
  ["메뉴 목록", "메뉴 상세", "장바구니"].forEach((c, i) => {
    const y = 4.4 + i * 0.4;
    box(s, 0.48, y, 1.3, 0.28, G50, LIME, 1);
    txt(s, c, 0.48, y + 0.05, 1.3, 0.2, { f: FS, sz: 10, c: G550, al: "center" });
  });
  rect(s, 4.68, 1.66, 8.18, 4.9, MUT);
  ["메뉴 목록", "메뉴 상세 · 옵션", "장바구니"].forEach((label, i) => {
    const x = 5.15 + i * 2.52;
    shot(s, x, 2.14, 2.2, 3.92, label, "1080 × 1920");
    if (i < 2) rect(s, x + 2.2, 4.07, 0.32, 0.06, LIME);
  });
  txt(
    s,
    "Figma 화면 흐름 — 카테고리 선택 → 메뉴 선택 → 옵션 · 제외 재료 · 수량 → 장바구니",
    4.68,
    6.12,
    8.18,
    0.26,
    { sz: 9.5, c: SUB, al: "center" },
  );
  rect(s, 0.48, 6.48, 12.373, 0.4, MUT);
  txt(
    s,
    "화면 상태(기본 · 품절 · 선택 불가)는 Screen Bible 기준으로 정의했습니다.",
    0.7,
    6.56,
    11.9,
    0.26,
    { sz: 12, c: SUB },
  );
  s.addNotes("화면설계서. Figma 화면 흐름 캡처를 확보하면 3개 자리표시자를 교체한다.");
}

// ══════════════════════════════════════════════════════════
// T10-K · 키오스크 핵심 기능 (12~14)
// ══════════════════════════════════════════════════════════
function slideKiosk(pg, title, lines, point, shots, caption, bottom, notes) {
  const s = newSlide();
  header(s, title, "핵심 기능 및 구현 화면", 3);
  footer(s, pg);
  txt(s, title, 0.48, 1.8, 6.08, 0.3, { f: FS, sz: 16, c: TXT });
  rect(s, 0.48, 2.22, 0.9, 0.05, LIME);
  paras(s, lines, 0.48, 2.48, 6.08, { sz: 13, ls: 1.45, gap: 0.3 });
  box(s, 0.48, 4.5, 6.08, 0.86, G50, LIME, 1);
  txt(s, point, 0.7, 4.66, 5.64, 0.56, { sz: 12, c: TXT, ls: 1.45 });
  rect(s, 6.78, 1.66, 6.08, 4.4, MUT);
  if (shots.length === 2) {
    shot(s, 7.45, 1.9, 2.2, 3.92, shots[0], "1080 × 1920");
    shot(s, 9.99, 1.9, 2.2, 3.92, shots[1], "1080 × 1920");
  } else {
    shot(s, 8.58, 1.81, 2.48, 4.1, shots[0], "1080 × 1920");
  }
  txt(s, caption, 6.78, 6.12, 6.08, 0.26, { sz: 9.5, c: SUB, al: "center" });
  rect(s, 0.48, 6.48, 12.373, 0.4, MUT);
  txt(s, bottom, 0.7, 6.56, 11.9, 0.26, { sz: 12, c: SUB });
  s.addNotes(notes);
}

slideKiosk(
  "12",
  "메뉴 목록 및 카테고리 선택",
  "카테고리별로 메뉴를 조회하고, 각 메뉴의\n이름 · 가격 · 이미지 · 품절 여부를 확인합니다.\n\n고객은 원하는 메뉴를 선택해\n상세 화면으로 이동합니다.",
  "메뉴 목록은 샐러드 주문 흐름의 시작점이며,\n품절 메뉴는 선택하지 못하도록 안내합니다.",
  ["메뉴 목록", "카테고리 전환"],
  "메뉴 목록 · 카테고리 선택 · 품절 표시",
  "메뉴 조회 API(GET /api/kiosk/categories · menuList)는 구현되어 있고, 실 DB 응답 검증이 남아 있습니다.",
  "메뉴 목록 화면. Kiosk 캡처 2장(기본 목록 / 카테고리 전환 또는 품절 상태)을 넣는다.",
);

slideKiosk(
  "13",
  "메뉴 상세 및 옵션 선택",
  "메뉴 기본 정보와 가격을 확인한 뒤 옵션 정책에\n따라 필수 · 선택 항목을 고릅니다.\n\n기본 재료 중 제외 가능한 재료를 선택하고,\n주문 수량을 변경할 수 있습니다.",
  "옵션 선택 조건 · 품절 여부 · 수량 제한은\n주문 생성 전 서버에서 다시 검증합니다.",
  ["메뉴 상세", "옵션 선택"],
  "메뉴 상세 · 옵션 선택 · 제외 재료 · 수량 변경",
  "장바구니 검증 API(POST /api/kiosk/cart/validate)가 서버에서 총액을 재계산합니다.",
  "메뉴 상세 화면. 옵션 정책(min_select·max_select)과 제외 가능 재료(can_remove)가 화면에 반영되는 지점이다.",
);

slideKiosk(
  "14",
  "장바구니 및 결제 이동",
  "장바구니에서 선택한 메뉴, 옵션, 제외 재료,\n수량, 주문 금액을 확인합니다.\n\n고객은 주문 내용을 검토한 뒤\n결제 화면으로 이동합니다.",
  "결제 완료 처리 범위는 팀 확인 후 확정합니다.\n현재는 결제 화면 이동까지 표현합니다.",
  ["장바구니", "결제 화면"],
  "장바구니 · 주문 금액 확인 · 결제 화면 이동",
  "주문 생성 API와 결제 승인 연동은 현재 구현 중이며, 완료 처리 결과는 아직 시연 범위가 아닙니다.",
  '장바구니 화면. 결제 API 연결 전이면 "결제 화면으로 이동"까지만 말하고 결제 성공 결과는 언급하지 않는다.',
);

// ══════════════════════════════════════════════════════════
// T10-A / T10-AR · 관리자 (15~16)
// ══════════════════════════════════════════════════════════
function slideAdmin(pg, title, lines, point, caption, bottom, notes, flip) {
  const s = newSlide();
  header(s, title, "핵심 기능 및 구현 화면", 3);
  footer(s, pg);
  const tx = flip ? 8.86 : 0.48;
  const sx = flip ? 0.48 : 4.68;
  txt(s, title, tx, 1.8, 3.98, 0.3, { f: FS, sz: 16, c: TXT });
  rect(s, tx, 2.22, 0.9, 0.05, LIME);
  paras(s, lines, tx, 2.48, 3.98, { sz: 13, ls: 1.45, gap: 0.3 });
  box(s, tx, 4.64, 3.98, 0.86, G50, LIME, 1);
  txt(s, point, tx + 0.22, 4.8, 3.54, 0.56, { sz: 12, c: TXT, ls: 1.5 });
  rect(s, sx, 1.66, 8.18, 4.4, MUT);
  shot(s, sx + 0.39, 1.78, 7.4, 4.16, "Admin 화면 캡처", "1920 × 1080");
  txt(s, caption, sx, 6.12, 8.18, 0.26, { sz: 9.5, c: SUB, al: "center" });
  rect(s, 0.48, 6.48, 12.373, 0.4, MUT);
  txt(s, bottom, 0.7, 6.56, 11.9, 0.26, { sz: 12, c: SUB });
  s.addNotes(notes);
}

slideAdmin(
  "15",
  "관리자 주문 관리",
  "관리자는 Live 주문과 주문 목록에서\n주문 번호, 주문 메뉴, 주문 상태를 확인합니다.\n\n주문 상세에서는 선택 옵션과\n제외 재료 정보를 확인합니다.",
  "주문 상태는 접수 · 준비 · 완료\n흐름에 맞춰 관리합니다.",
  "Live 주문 · 주문 관리 · 주문 상세",
  "주문 조회 · Live · 상태 변경 API 경로는 구현되어 있으며, 통합 테스트가 진행 중입니다.",
  "관리자 주문 관리. Live 주문 또는 주문 관리 화면 캡처를 넣는다.",
  false,
);

slideAdmin(
  "16",
  "관리자 메뉴 관리",
  "관리자는 메뉴 목록 · 상세 · 카테고리\n정보를 조회합니다.\n\n메뉴의 기본 정보와 옵션 정책은\n고객 주문 화면에 제공되는 데이터의 기준이 됩니다.",
  "등록 · 수정 · 삭제 가능 범위는\n팀 확인 후 제목과 본문을 조정합니다.",
  "메뉴 목록 · 메뉴 상세 · 품절 관리",
  "메뉴 조회는 API 연동, 등록 · 수정 · 삭제는 mock 제거 작업이 진행 중입니다.",
  '관리자 메뉴 관리. 조회만 구현했다면 제목을 "메뉴 정보 조회"로 바꾼다.',
  true,
);

// ══════════════════════════════════════════════════════════
// 17 · T11 수행 프로세스
// ══════════════════════════════════════════════════════════
{
  const s = newSlide();
  header(s, "수행 프로세스", null, 3);
  footer(s, "17");
  const steps = [
    ["요구사항 분석", "Product Bible"],
    ["UI/DB 설계", "Figma · ERD"],
    ["키오스크 개발", "React 화면"],
    ["관리자 개발", "React 화면"],
    ["백엔드 개발", "Spring API"],
    ["1차 통합", "주문 · 메뉴 API"],
    ["DB 연동", "MyBatis · MySQL"],
    ["테스트 QA", "Bruno · 브라우저"],
    ["발표 시연", "자료 정리"],
  ];
  // 블록 1.90 × 1.30 · pitch 2.12 · 2행(5+4), 2행은 1.06 오른쪽으로 밀어 지그재그
  const BW = 1.9,
    BH = 1.3,
    PITCH = 2.12,
    ROWOFF = 1.06;
  steps.forEach(([name, sub], i) => {
    const row = Math.floor(i / 5),
      col = i - row * 5;
    const x = 0.48 + col * PITCH + row * ROWOFF;
    const y = 1.85 + row * 1.7;
    const hi = i === 5;
    box(s, x, y, BW, BH, hi ? G50 : WHT, hi ? LIME : BD, hi ? 1.5 : 1);
    txt(s, `0${i + 1}`, x + 0.2, y + 0.16, 1.3, 0.32, { sz: 20, b: true, c: G550 });
    txt(s, name, x + 0.2, y + 0.64, 1.5, 0.26, { f: FS, sz: 13, c: TXT });
    txt(s, sub, x + 0.2, y + 0.94, 1.5, 0.22, { sz: 10, c: SUB });
    if (col < 4 && i !== 8) rect(s, x + BW, y + BH / 2 - 0.03, 0.22, 0.06, LIME);
  });
  rect(s, 0.48, 5.6, 12.373, 0.62, SLATE);
  txt(
    s,
    "요구사항 분석  →  UI/DB 설계  →  키오스크 · 관리자 · 백엔드 개발  →  1차 통합  →  DB 연동  →  테스트 QA  →  발표 시연",
    0.48,
    5.78,
    12.373,
    0.3,
    { sz: 12.5, c: WHT, al: "center" },
  );
  s.addNotes(
    "수행 프로세스. 06 1차 통합을 현재 단계로 강조했다. 실제 진행 단계에 맞춰 강조 위치를 옮긴다.",
  );
}

// ══════════════════════════════════════════════════════════
// 18 · T12 피드백 및 반영 내용
// ══════════════════════════════════════════════════════════
{
  const s = newSlide();
  header(s, "피드백 및 반영 내용", null, 3);
  footer(s, "18");
  const fb = [
    [
      "07.14",
      "API path 형식과 camelCase / snake_case가\n통일되어 있지 않다. 전역 상태도 과다하다",
      "API 경로 · 네이밍 규칙을 명세로 통일하고,\n전역 상태를 주문 세션 하나로 축소",
    ],
    [
      "07.23",
      "DTO와 Mapper 구조를 정리하고\n수직 슬라이스 한 경로로 완성하라",
      "dto/request · dto/response 분리,\nMyBatis 인터페이스 Mapper로 전환",
    ],
    [
      "07.24",
      "문서의 테이블 정의와 실제 MySQL 스키마가\n일치하는지 비교가 필요하다",
      "ERD · API 명세를 실제 스키마와 대조해\n24개 테이블 · FK 39건 기준으로 정리",
    ],
    [
      "08.04",
      "장바구니에서 주문 생성 API까지\n실연결하고 DB로 검증하라",
      "장바구니 검증 API 서버 재계산 구현,\n주문 생성 · 결제 승인 연동은 진행 중",
    ],
  ];
  fb.forEach(([when, before, after], i) => {
    const y = 1.7 + i * 1.22;
    rect(s, 0.48, y, 1.3, 1.06, DEEP);
    txt(s, when, 0.48, y + 0.42, 1.3, 0.24, { f: FS, sz: 12, c: LIME, al: "center" });
    box(s, 1.98, y, 5.2, 1.06, ERRBG, ERR, 1);
    txt(s, "BEFORE", 2.16, y + 0.12, 4.8, 0.2, { f: FS, sz: 10, c: ERRT });
    txt(s, before, 2.16, y + 0.4, 4.84, 0.56, { sz: 12, c: TXT, ls: 1.4 });
    rect(s, 7.33, y + 0.5, 0.3, 0.06, LIME);
    box(s, 7.78, y, 5.2, 1.06, G50, LIME, 1);
    txt(s, "AFTER", 7.96, y + 0.12, 4.8, 0.2, { f: FS, sz: 10, c: G550 });
    txt(s, after, 7.96, y + 0.4, 4.84, 0.56, { sz: 12, c: TXT, ls: 1.4 });
  });
  txt(s, "근거 — 회의록 2026-W29 · W30 · W32 「선생님 피드백」 항목", 0.48, 6.56, 12.373, 0.28, {
    sz: 9.5,
    c: SUB,
  });
  s.addNotes(
    "피드백. 4건 모두 회의록에 날짜와 함께 기록된 실제 선생님 피드백이다. 8/4 항목의 주문 생성·결제 연동은 아직 진행 중임을 밝힌다.",
  );
}

// ══════════════════════════════════════════════════════════
// 19~20 · T13 결과물
// ══════════════════════════════════════════════════════════
function slideResult(
  pg,
  title,
  cells,
  leftTitle,
  leftBody,
  leftNote,
  rightTitle,
  rightBody,
  notes,
) {
  const s = newSlide();
  header(s, title, "결과물 첨부 자료", 3);
  footer(s, pg);
  cells.forEach(([kind, caption], i) => {
    const x = 0.48 + i * 3.13;
    rect(s, x, 1.7, 2.92, 3.1, MUT);
    if (kind === "V") shot(s, x + 0.59, 1.7, 1.74, 3.1, "화면 캡처", "9 : 16");
    else shot(s, x, 2.43, 2.92, 1.64, "화면 캡처", "16 : 9");
    txt(s, caption, x, 4.86, 2.92, 0.26, { sz: 9.5, c: SUB, al: "center" });
  });
  rect(s, 0.48, 5.2, 6.08, 1.56, SLATE);
  txt(s, leftTitle, 0.7, 5.36, 5.64, 0.24, { f: FS, sz: 11, c: LIME });
  txt(s, leftBody, 0.7, 5.7, 5.64, 0.56, { sz: 12, c: WHT, ls: 1.5 });
  txt(s, leftNote, 0.7, 6.34, 5.64, 0.24, { sz: 9.5, c: BD });
  box(s, 6.78, 5.2, 6.08, 1.56, WHT, BD, 1);
  txt(s, rightTitle, 7.0, 5.36, 5.64, 0.24, { f: FS, sz: 11, c: TXT });
  txt(s, rightBody, 7.0, 5.7, 5.64, 0.9, { sz: 12, c: TXT, ls: 1.5 });
  s.addNotes(notes);
}

slideResult(
  "19",
  "결과물 첨부 자료 — 화면 결과",
  [
    ["V", "메뉴 목록 및 카테고리 선택"],
    ["V", "옵션 · 제외 재료 · 수량 선택"],
    ["H", "관리자 주문 관리"],
    ["H", "관리자 메뉴 관리"],
  ],
  "대표 시연 흐름",
  "메뉴 선택 → 옵션 · 제외 재료 · 수량 선택 →\n장바구니 확인 → 주문 생성 → 관리자 주문 확인",
  "[시연 영상 제출 시 파일명 또는 링크 입력]",
  "기타 참고 자료",
  "Product Bible · Screen Bible · API 명세\nERD · WBS · Bruno API 테스트 자료\nFigma 화면 흐름 · GitHub 저장소",
  "결과물 1/2. 캡처 칸 크기는 동일하게 두고 이미지 비율은 유지한다. 늘려 맞추지 않는다.",
);

slideResult(
  "20",
  "결과물 첨부 자료 — 설계 · 검증 산출물",
  [
    ["V", "Figma 키오스크 화면 설계"],
    ["H", "메뉴 · 옵션 데이터 모델"],
    ["H", "주문 · 결제 데이터 모델"],
    ["H", "Bruno API · DB 확인 자료"],
  ],
  "검증 범위",
  "화면 설계, 데이터 모델, API 테스트 자료를 함께\n관리해 구현 화면과 데이터 흐름을 추적했습니다.",
  "[검증 결과 요약 입력]",
  "산출물 목록",
  "Figma 화면 흐름 · Screen Bible\n메뉴 · 옵션 ERD · 주문 · 결제 ERD\nBruno 컬렉션 · MySQL 조회 결과",
  "결과물 2/2. 설계·검증 산출물. 실제 확보한 자료만 남기고 나머지 칸은 삭제한다.",
);

// ══════════════════════════════════════════════════════════
// 21 · T14 자체 평가 의견
// ══════════════════════════════════════════════════════════
{
  const s = newSlide();
  header(s, "자체 평가 의견", null, 4);
  footer(s, "21");
  rect(s, 0.48, 1.7, 3.98, 4.9, SLATE);
  txt(s, "현재 단계", 0.7, 1.9, 3.54, 0.24, { f: FS, sz: 11, c: LIME });
  txt(s, "실서버 연동\n진행 중", 0.7, 2.24, 3.54, 1.0, { sz: 26, b: true, c: WHT, ls: 1.2 });
  rect(s, 0.7, 3.44, 3.54, 0.02, SUB);
  [
    ["85", "WBS 항목"],
    ["24", "DB 테이블"],
    ["4", "저장소"],
  ].forEach(([n, l], i) => {
    const y = 3.72 + i * 0.92;
    txt(s, n, 0.7, y, 1.2, 0.5, { sz: 28, b: true, c: LIME });
    txt(s, l, 1.9, y + 0.18, 2.34, 0.24, { sz: 9.5, c: BD });
  });
  txt(s, "근거 — wbs.md · 아삭_mysql.sql · 저장소 baseline", 0.7, 6.2, 3.54, 0.24, {
    sz: 9.5,
    c: BD,
  });
  const ev = [
    [
      "잘한 점",
      "2인 팀이 문서 · Kiosk · Admin · Backend를 저장소로 분리하고, 옵션 정책과\n제외 재료까지 반영한 24개 테이블 데이터 모델을 설계했습니다.",
      "accent",
    ],
    [
      "보완할 점",
      "키오스크 주문 생성과 결제 승인 API가 미완성이고, 관리자 화면 다수가 아직\nmock 연결 단계입니다. QA 테스트 케이스도 실행 증거가 없어 검증이 남아 있습니다.",
      "warn",
    ],
    [
      "프로젝트를 통해 배운 점",
      "화면 · API · DB를 따로 확인하는 것만으로는 부족했습니다. 선생님 피드백대로\nController → Service → Mapper → DB를 한 경로로 완성하는 순서가 중요했습니다.",
      "lime",
    ],
  ];
  ev.forEach(([title, body, kind], i) => {
    const y = 1.7 + i * 1.68;
    if (kind === "accent") {
      box(s, 4.68, y, 8.18, 1.52, G50, LIME, 1);
      txt(s, title, 4.9, y + 0.18, 7.74, 0.26, { f: FS, sz: 14, c: G550 });
    } else {
      box(s, 4.68, y, 8.18, 1.52, WHT, BD, 1);
      rect(s, 4.68, y, 0.05, 1.52, kind === "warn" ? WARN : LIME);
      txt(s, title, 4.9, y + 0.18, 7.74, 0.26, { f: FS, sz: 14, c: TXT });
    }
    txt(s, body, 4.9, y + 0.58, 7.8, 0.66, { sz: 12.5, c: TXT, ls: 1.5 });
  });
  s.addNotes(
    "자체 평가. current-status-baseline.md의 「mock 1차 연결은 DONE이 아니다」 원칙을 그대로 따라 보완할 점을 서술했다. 점수는 넣지 않았다.",
  );
}

// ══════════════════════════════════════════════════════════
// 22 · T15 마무리
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: DEEP };
  rect(s, 1.2, 0.6, 0.11, 1.58, LIME);
  rect(s, 2.1, 5.1, 0.11, 1.58, LIME, { transparency: 40 });
  rect(s, 11.4, 0.9, 0.11, 1.58, LIME, { transparency: 40 });
  rect(s, 12.2, 4.9, 0.11, 1.58, LIME, { transparency: 70 });
  txt(s, "ASAK 샐러드 스마트 키오스크", 0, 2.5, 13.333, 0.66, {
    sz: 34,
    b: true,
    c: LIME,
    al: "center",
    ls: 1.2,
  });
  txt(s, "메뉴 선택 → 옵션 · 제외 재료 · 수량 선택 → 장바구니 → 주문 관리", 0, 3.4, 13.333, 0.32, {
    sz: 14,
    c: BD,
    al: "center",
  });
  rect(s, 5.87, 4.06, 1.6, 0.05, LIME);
  txt(s, "감사합니다", 0, 4.5, 13.333, 0.5, { sz: 26, b: true, c: WHT, al: "center" });
  s.addNotes("마무리. 질의응답으로 이어진다.");
}

await pres.writeFile({ fileName: OUT });
console.log("built:", OUT);
