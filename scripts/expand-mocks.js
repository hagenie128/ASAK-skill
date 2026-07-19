const fs = require("fs");

// ========== KIOSK ==========
const kPath = "ASAK-Kiosk/public/mocks/kiosk.json";
const k = JSON.parse(fs.readFileSync(kPath, "utf8"));

function ok(data, code, message, status = 200) {
  return { success: true, status, code, message, data };
}
function fail(code, message, status = 400, data = null) {
  return { success: false, status, code, message, data };
}
function card(p) {
  return {
    baseKcal: 400,
    isSoldOut: false,
    hasSoldOutIngredient: false,
    soldOutReason: null,
    soldOutBadges: [],
    imageUrl: `/assets/menu/${p.menuId}.png`,
    ...p,
  };
}

const NAMES = {
  236: [
    ["BLT 클래식", 7800, 510],
    ["터키 아보카도", 8900, 480],
    ["치킨 바질페스토", 9200, 530],
    ["참치 멜트", 8500, 560],
    ["햄치즈 토스트", 6500, 470],
    ["쉬림프 오픈", 9800, 440],
    ["스테이크 샌드", 12500, 620],
    ["베지 후무스", 7200, 390],
    ["스파이시 치킨", 9100, 540],
    ["연어 크림치즈", 11200, 500],
    ["카프레제", 8200, 410],
    ["풀드포크", 10500, 590],
    ["치킨커틀릿 샌드", 9900, 580],
    ["에그아보 오픈", 8700, 460],
    ["로스트비프", 13200, 610],
    ["모짜렐라 토마토", 8400, 430],
    ["칠리콘카네 샌드", 9500, 550],
    ["바질 쉬림프", 10800, 470],
  ],
  233: [
    ["그릭 페타 샐러드", 9800, 360],
    ["퀴노아 슈퍼푸드", 11500, 420],
    ["참치 니수아즈", 10800, 450],
    ["불고기 라이스볼", 11900, 520],
    ["새우 망고 살사", 13200, 430],
    ["치킨 시저 볼", 10200, 480],
    ["두부 테리아키", 8900, 350],
    ["우삼겹 포케", 12900, 510],
    ["그린 갓", 7800, 280],
    ["바질 페스토 파스타볼", 9800, 540],
    ["커리 치킨 볼", 11100, 490],
    ["트러플 머쉬룸", 13800, 470],
    ["비트 염소치즈", 10500, 390],
    ["훈제오리 샐러드", 14500, 460],
    ["멕시칸 치킨볼", 11800, 500],
    ["연어 아보 포케", 14800, 490],
    ["케이준 쉬림프볼", 13600, 470],
    ["소고기 타코볼", 12500, 530],
    ["렌틸 비건볼", 9200, 340],
    ["치킨 마요 덮밥볼", 10900, 560],
    ["참치마요 샐러디", 9800, 450],
    ["콥 샐러드", 11200, 480],
    ["시저 파마산", 9900, 420],
    ["오리엔탈 치킨", 10500, 440],
  ],
  235: [
    ["치킨 시저랩", 7600, 490],
    ["터키 클럽랩", 8200, 510],
    ["베지 그릴랩", 7200, 380],
    ["불고기랩", 8900, 520],
    ["새우 아보랩", 9500, 470],
    ["스파이시 튜나랩", 8600, 500],
    ["햄에그랩", 6900, 450],
    ["바질 치킨랩", 8400, 480],
    ["홀그레인 베지", 7100, 360],
    ["BBQ 치킨랩", 8800, 510],
    ["크림치즈 연어랩", 10200, 490],
    ["스파이시 비프랩", 9600, 530],
    ["아보카도 에그랩", 7800, 420],
    ["페스토 모짜랩", 8500, 460],
  ],
  234: [
    ["닭가슴살 플레인", 9900, 320],
    ["연어 프로틴볼", 13900, 410],
    ["계란흰자 볼", 8500, 280],
    ["소고기 프로틴", 14900, 450],
    ["두부와 퀴노아", 9200, 340],
    ["참치 프로틴", 10800, 380],
    ["치킨 브로콜리", 11200, 360],
    ["슈림프 프로틴", 12800, 390],
    ["터키 프로틴", 10500, 350],
    ["저지방 시저", 9800, 330],
    ["단백질 파워볼", 11900, 400],
    ["라이트 튜나", 9500, 310],
  ],
  231: [
    ["트러플 에그", 12800, 520],
    ["와사비 연어", 15200, 480],
    ["허니버터 치킨", 11800, 550],
    ["블랙페퍼 우삼", 13500, 530],
    ["레몬딜 쉬림프", 14200, 460],
    ["갈릭 스테이크볼", 15800, 580],
    ["바질 모짜렐라", 10900, 440],
    ["치폴레 치킨", 12100, 510],
    ["트uffle 감자볼", 9900, 500],
    ["매운갈비 샐러디", 12900, 540],
    ["크림빠네 치킨", 11500, 560],
    ["유자드레싱 연어", 14800, 470],
  ],
};
NAMES[231][8][0] = "트러플 감자볼";

let nextId = 2000;
function genMenus(categoryId, list, { soldOutEvery = 7, ingredientEvery = 11 } = {}) {
  return list.map((row, i) => {
    const menuId = nextId++;
    const [name, price, kcal] = row;
    const isSoldOut = (i + 1) % soldOutEvery === 0;
    const hasSoldOutIngredient = !isSoldOut && (i + 1) % ingredientEvery === 0;
    return card({
      menuId,
      categoryId,
      name,
      price,
      baseKcal: kcal,
      isSoldOut,
      hasSoldOutIngredient,
      soldOutReason: isSoldOut ? "MENU" : hasSoldOutIngredient ? "INGREDIENT" : null,
      soldOutBadges: isSoldOut ? ["품절"] : hasSoldOutIngredient ? ["재료 품절"] : [],
    });
  });
}

const existing231 = k.menusByCategory["231"].data;
const gen231 = genMenus(231, NAMES[231]);
k.menusByCategory["231"] = ok(
  [...existing231, ...gen231.filter((m) => !existing231.some((e) => e.name === m.name))],
  "MENU_LIST_SUCCESS",
  "메뉴 목록 조회 성공"
);

for (const catId of ["236", "233", "235", "234"]) {
  const existing = k.menusByCategory[catId]?.data || [];
  const generated = genMenus(Number(catId), NAMES[catId]);
  const names = new Set(existing.map((m) => m.name));
  const merged = [...existing, ...generated.filter((m) => !names.has(m.name))];
  k.menusByCategory[catId] = ok(merged, "MENU_LIST_SUCCESS", "메뉴 목록 조회 성공");
}

k.menusByCategory["232"] = ok([], "MENU_LIST_SUCCESS", "메뉴 목록 조회 성공");

if (!k.categories.data.find((c) => c.categoryId === 239)) {
  k.categories.data.push({ categoryId: 239, name: "시즌오프", sortOrder: 9 });
}
k.menusByCategory["239"] = ok(
  Array.from({ length: 12 }, (_, i) =>
    card({
      menuId: 9901 + i,
      categoryId: 239,
      name: `시즌 종료 메뉴 ${i + 1}`,
      price: 3500 + i * 500,
      isSoldOut: true,
      soldOutReason: "MENU",
      soldOutBadges: ["품절"],
    })
  ),
  "MENU_LIST_SUCCESS",
  "메뉴 목록 조회 성공"
);

if (!k.categories.data.find((c) => c.categoryId === 240)) {
  k.categories.data.push({ categoryId: 240, name: "사이드·음료", sortOrder: 10 });
}
k.menusByCategory["240"] = ok(
  [
    ["콜라", 2000, 140],
    ["제로콜라", 2000, 0],
    ["스프라이트", 2000, 140],
    ["아메리카노", 2500, 5],
    ["아이스티", 2300, 60],
    ["수프", 3000, 120],
    ["쿠키", 1500, 180],
    ["감자칩", 1800, 200],
    ["프로틴바", 2800, 220],
    ["요거트", 2500, 110],
    ["탄산수", 1500, 0],
    ["핫초코", 2700, 190],
  ].map(([name, price, kcal], i) =>
    card({
      menuId: 9800 + i,
      categoryId: 240,
      name,
      price,
      baseKcal: kcal,
      isSoldOut: i === 5,
      soldOutReason: i === 5 ? "MENU" : null,
      soldOutBadges: i === 5 ? ["품절"] : [],
    })
  ),
  "MENU_LIST_SUCCESS",
  "메뉴 목록 조회 성공"
);

function baseGroup(opts = {}) {
  const items = [
    ["양배추라이스", 9101, 0, 40, true],
    ["현미밥", 9102, 0, 55, false],
    ["곤약라이스", 9103, 0, 70, false],
    ["퀴노아", 9104, 500, 85, false],
    ["샐러드믹스", 9105, 0, 100, false],
    ["통밀또띠아", 9106, 0, 115, false],
    ["비빔면", 9107, 0, 130, false],
    ["우동면", 9108, 300, 145, false],
  ].map(([name, id, extra, kcal, isDef], i) => ({
    optionItemId: id,
    ingredientId: id,
    name,
    extraPrice: extra,
    originalPrice: null,
    extraKcal: kcal,
    servingAmount: 50,
    servingUnit: "g",
    proteinG: i % 3,
    iconUrl: null,
    colorHex: null,
    isRecommended: isDef,
    isDefault: opts.noDefault ? false : isDef,
    isSoldOut: (opts.soldOutIds || []).includes(id),
  }));
  return {
    optionGroupId: 9001,
    name: "베이스",
    groupType: "BASE",
    selectType: "SINGLE",
    minSelect: 1,
    maxSelect: 1,
    sortOrder: 0,
    isRequired: true,
    items,
  };
}
function dressingGroup(opts = {}) {
  const defs = [
    ["크리미칠리", 269, 105, 235, true],
    ["(저당) 들기름소이", 247, 219, 40, false],
    ["발사믹", 248, 220, 80, false],
    ["시저", 249, 221, 180, false],
    ["오리엔탈", 250, 222, 90, false],
    ["렌치", 251, 223, 160, false],
    ["스위트칠리", 252, 224, 120, false],
    ["드레싱 없음", 253, 225, 0, false],
  ];
  return {
    optionGroupId: 240,
    name: "드레싱 선택",
    groupType: "DRESSING",
    selectType: "SINGLE",
    minSelect: 1,
    maxSelect: 1,
    sortOrder: 1,
    isRequired: true,
    items: defs.map(([name, oid, iid, kcal, isDef]) => ({
      optionItemId: oid,
      ingredientId: iid,
      name,
      extraPrice: 0,
      originalPrice: null,
      extraKcal: kcal,
      servingAmount: 50,
      servingUnit: "g",
      proteinG: 0,
      iconUrl: null,
      colorHex: null,
      isRecommended: isDef,
      isDefault: opts.noDefault ? false : isDef,
      isSoldOut: (opts.soldOutIds || []).includes(oid),
    })),
  };
}
function toppingGroup(opts = {}) {
  const tops = [
    ["아보카도", 9201, 1500, 40],
    ["훈제연어", 9202, 2500, 55],
    ["반숙달걀", 9203, 800, 70],
    ["크루통", 9204, 500, 85],
    ["올리브", 9205, 700, 100],
    ["파마산칩", 9206, 900, 115],
    ["베이컨", 9207, 1200, 90],
    ["옥수수", 9208, 600, 60],
    ["견과", 9209, 1000, 110],
    ["할라피뇨", 9210, 400, 20],
    ["체다치즈", 9211, 800, 95],
    ["구운버섯", 9212, 900, 50],
  ];
  return {
    optionGroupId: 9002,
    name: "토핑",
    groupType: "TOPPING",
    selectType: "MULTI",
    minSelect: opts.minSelect ?? 0,
    maxSelect: opts.maxSelect ?? 5,
    sortOrder: 2,
    isRequired: (opts.minSelect ?? 0) > 0,
    items: tops.map(([name, id, price, kcal], i) => ({
      optionItemId: id,
      ingredientId: id,
      name,
      extraPrice: price,
      originalPrice: null,
      extraKcal: kcal,
      servingAmount: 50,
      servingUnit: "g",
      proteinG: i % 4,
      iconUrl: null,
      colorHex: null,
      isRecommended: i < 2,
      isDefault: false,
      isSoldOut: (opts.soldOutIds || []).includes(id),
    })),
  };
}
function setGroup(opts = {}) {
  const sets = [
    ["콜라", 9301, 2000, false],
    ["수프", 9302, 2500, true],
    ["쿠키", 9303, 1500, false],
    ["감자칩", 9304, 1800, false],
    ["아메리카노", 9305, 2200, false],
    ["제로콜라", 9306, 2000, false],
  ];
  return {
    optionGroupId: 9003,
    name: "세트 추가",
    groupType: "SET",
    selectType: "MULTI",
    minSelect: 0,
    maxSelect: 3,
    sortOrder: 3,
    isRequired: false,
    items: sets.map(([name, id, price, sold]) => ({
      optionItemId: id,
      ingredientId: id,
      name,
      extraPrice: price,
      originalPrice: null,
      extraKcal: 100,
      servingAmount: 1,
      servingUnit: "개",
      proteinG: 0,
      iconUrl: null,
      colorHex: null,
      isRecommended: false,
      isDefault: false,
      isSoldOut: sold || (opts.soldOutIds || []).includes(id),
    })),
  };
}
function excludeGroup() {
  return {
    optionGroupId: 9004,
    name: "제외 재료",
    groupType: "EXCLUDE",
    selectType: "MULTI",
    minSelect: 0,
    maxSelect: 6,
    sortOrder: 4,
    isRequired: false,
    items: ["양파", "토마토", "오이", "피망", "당근", "옥수수"].map((name, i) => ({
      optionItemId: 9401 + i,
      ingredientId: 9401 + i,
      name,
      extraPrice: 0,
      originalPrice: null,
      extraKcal: 0,
      servingAmount: 0,
      servingUnit: "g",
      proteinG: 0,
      iconUrl: null,
      colorHex: null,
      isRecommended: false,
      isDefault: false,
      isSoldOut: false,
    })),
  };
}

const ALLERGEN_SETS = [
  ["땅콩", "대두", "밀"],
  ["우유", "달걀"],
  ["생선", "갑각류"],
  ["닭고기", "밀"],
  ["호두", "아몬드"],
  [],
  ["대두", "참깨"],
  ["돼지고기", "밀"],
];

function makeDetail(menu, idx) {
  const allergens = ALLERGEN_SETS[idx % ALLERGEN_SETS.length];
  const isSoldOut = !!menu.isSoldOut;
  const hasIng = !!menu.hasSoldOutIngredient;
  return ok(
    {
      menuId: menu.menuId,
      categoryId: menu.categoryId,
      name: menu.name,
      price: menu.price,
      imageUrl: menu.imageUrl,
      description: `${menu.name} · mock 상세 #${menu.menuId}`,
      baseKcal: menu.baseKcal,
      ingredients: [
        { ingredientId: 1000 + (menu.menuId % 100), name: "메인재료", canRemove: false, isSoldOut: false },
        { ingredientId: 2000 + (menu.menuId % 100), name: "서브재료", canRemove: true, isSoldOut: hasIng },
        { ingredientId: 3000 + (menu.menuId % 100), name: "토핑재료", canRemove: true, isSoldOut: false },
      ],
      allergens,
      allergyText: allergens.length ? `${allergens.join(", ")} 함유` : "",
      isSoldOut,
      hasSoldOutIngredient: hasIng,
      isOrderable: !isSoldOut && !hasIng,
      soldOutReason: menu.soldOutReason,
      soldOutBadges: menu.soldOutBadges,
      badges: idx % 5 === 0 ? ["BEST"] : idx % 5 === 1 ? ["NEW"] : [],
    },
    "MENU_DETAIL_SUCCESS",
    "메뉴 상세 조회 성공"
  );
}

function makeOptions(idx) {
  const variant = idx % 6;
  if (variant === 0) return ok([baseGroup(), dressingGroup(), toppingGroup(), setGroup(), excludeGroup()], "MENU_OPTIONS_SUCCESS", "메뉴 옵션 조회 성공");
  if (variant === 1) return ok([baseGroup({ soldOutIds: [9102, 9107] }), dressingGroup({ soldOutIds: [249] }), toppingGroup({ soldOutIds: [9201, 9209] }), setGroup()], "MENU_OPTIONS_SUCCESS", "메뉴 옵션 조회 성공");
  if (variant === 2) return ok([baseGroup({ noDefault: true }), dressingGroup({ noDefault: true }), toppingGroup({ minSelect: 1, maxSelect: 3 })], "MENU_OPTIONS_SUCCESS", "메뉴 옵션 조회 성공");
  if (variant === 3) return ok([baseGroup(), dressingGroup(), toppingGroup({ maxSelect: 2 }), excludeGroup()], "MENU_OPTIONS_SUCCESS", "메뉴 옵션 조회 성공");
  if (variant === 4) return ok([baseGroup(), dressingGroup(), setGroup({ soldOutIds: [9301, 9305] })], "MENU_OPTIONS_SUCCESS", "메뉴 옵션 조회 성공");
  return ok([baseGroup(), dressingGroup(), toppingGroup(), setGroup(), excludeGroup()], "MENU_OPTIONS_SUCCESS", "메뉴 옵션 조회 성공");
}

let di = 0;
for (const envelope of Object.values(k.menusByCategory)) {
  for (const menu of envelope.data) {
    const id = String(menu.menuId);
    k.menuDetail[id] = makeDetail(menu, di);
    k.menuOptions[id] = makeOptions(di);
    di++;
  }
}

k.paymentMethods = ok(
  [
    { methodId: "card", name: "카드/삼성페이", description: "신용·체크카드", isActive: true, isMaintenance: false, sortOrder: 1 },
    { methodId: "kakao", name: "카카오페이", description: "모바일 간편결제", isActive: true, isMaintenance: false, sortOrder: 2 },
    { methodId: "naver", name: "네이버페이", description: "간편결제", isActive: true, isMaintenance: false, sortOrder: 3 },
    { methodId: "toss", name: "토스페이", description: "간편결제", isActive: true, isMaintenance: false, sortOrder: 4 },
    { methodId: "payco", name: "페이코", description: "점검 중", isActive: true, isMaintenance: true, sortOrder: 5 },
    { methodId: "apple", name: "애플페이", description: "준비 중", isActive: false, isMaintenance: false, sortOrder: 6 },
    { methodId: "cash", name: "현금", description: "카운터 결제", isActive: false, isMaintenance: false, sortOrder: 7 },
    { methodId: "zero", name: "제로페이", description: "비활성", isActive: false, isMaintenance: true, sortOrder: 8 },
  ],
  "PAYMENT_METHOD_LIST_SUCCESS",
  "결제수단 목록 조회 성공"
);

k.paymentScenarios = {
  approve: ok({ paymentId: 9001, orderId: 1, orderNo: "ASAK-20260720-001", amount: 8900, paymentStatus: "APPROVED", paidAt: "2026-07-20T12:00:00" }, "PAYMENT_APPROVED", "가상 결제가 승인되었습니다."),
  approveHigh: ok({ paymentId: 9002, orderId: 2, orderNo: "ASAK-20260720-099", amount: 128800, paymentStatus: "APPROVED", paidAt: "2026-07-20T12:05:00" }, "PAYMENT_APPROVED", "가상 결제가 승인되었습니다."),
  declined: fail("PAYMENT_DECLINED", "카드사에서 결제를 거절했습니다.", 402, { paymentStatus: "FAILED", reason: "DECLINED" }),
  insufficient: fail("PAYMENT_INSUFFICIENT_FUNDS", "잔액이 부족합니다.", 402, { paymentStatus: "FAILED", reason: "INSUFFICIENT" }),
  network: fail("PAYMENT_NETWORK_ERROR", "결제 서버에 연결할 수 없습니다.", 503, { paymentStatus: "FAILED", reason: "NETWORK" }),
  timeout: fail("PAYMENT_TIMEOUT", "결제 응답 시간이 초과되었습니다.", 504, { paymentStatus: "FAILED", reason: "TIMEOUT" }),
  duplicate: fail("PAYMENT_DUPLICATE", "이미 처리 중인 결제가 있습니다.", 409, { paymentStatus: "FAILED", reason: "DUPLICATE" }),
  methodDisabled: fail("PAYMENT_METHOD_DISABLED", "선택할 수 없는 결제수단입니다.", 400, { paymentStatus: "FAILED", reason: "METHOD_DISABLED" }),
};

k.orderCompleteSamples = Array.from({ length: 20 }, (_, i) => ({
  orderNo: `ASAK-20260720-${String(i + 1).padStart(3, "0")}`,
  totalPrice: 1500 + i * 3700,
  waitingCount: i % 8,
  orderType: i % 2 === 0 ? "EAT_IN" : "TAKE_OUT",
}));

k.errorSamples = {
  menuList: fail("MENU_LIST_ERROR", "메뉴 목록을 불러오지 못했습니다.", 500),
  menuDetail: fail("MENU_DETAIL_ERROR", "메뉴 상세를 불러오지 못했습니다.", 500),
  menuNotFound: fail("MENU_NOT_FOUND", "메뉴를 찾을 수 없습니다.", 404),
  categoryEmpty: ok([], "MENU_LIST_SUCCESS", "메뉴 목록 조회 성공"),
};

k.scenarios = {
  description: "프론트 테스트용 대량 mock 인덱스",
  counts: {
    categories: k.categories.data.length,
    menus: Object.values(k.menusByCategory).reduce((s, e) => s + e.data.length, 0),
    details: Object.keys(k.menuDetail).length,
  },
  menuList: {
    emptyCategory: 232,
    allSoldOutCategory: 239,
    sideCategory: 240,
    soldOutMenus: Object.values(k.menusByCategory).flatMap((e) => e.data.filter((m) => m.isSoldOut).map((m) => m.menuId)),
    ingredientSoldOutMenus: Object.values(k.menusByCategory).flatMap((e) => e.data.filter((m) => m.hasSoldOutIngredient).map((m) => m.menuId)),
  },
  payment: Object.keys(k.paymentScenarios),
};

fs.writeFileSync(kPath, JSON.stringify(k, null, 2));
console.log("KIOSK", k.scenarios.counts);

// ========== ADMIN ==========
const aPath = "ASAK-Admin/public/mocks/asak-admin-data.json";
const a = JSON.parse(fs.readFileSync(aPath, "utf8"));

const STATUSES = ["RECEIVED", "PREPARING", "COMPLETED", "CANCELLED"];
const PAY = ["PAID", "READY", "FAILED", "REFUNDED"];
const TYPES = ["EAT_IN", "TAKE_OUT"];
const METHODS = ["CARD", "KAKAO", "NAVER", "TOSS", null];
const MENU_POOL = [
  [364, "스파이시 쉬림프 샌드위치", 8900],
  [3664, "로스트닭다리살 샐러드", 12800],
  [1167, "클래식 시저 샐러드", 9800],
  [701, "시저치킨 랩", 7600],
  [2254, "멕시칸 랩", 8400],
  [4056, "연어 포케볼", 14500],
  [1833, "베이컨 아보카도 샐러드", 9800],
  [4581, "리코타 치즈 샐러드", 10800],
  [801, "고단백 치킨 볼", 11900],
  [901, "피넛 치킨 크런치", 10500],
  [2820, "단호박 무스 샐러드", 8500],
  [3388, "두부 소보로 샐러드", 9200],
];

function pad(n) {
  return String(n).padStart(2, "0");
}
function makeOrder(i) {
  const orderId = 2000 + i;
  const day = 1 + (i % 20);
  const hour = 9 + (i % 10);
  const min = (i * 7) % 60;
  const status = STATUSES[i % STATUSES.length];
  let paymentStatus = PAY[i % PAY.length];
  if (status === "CANCELLED") paymentStatus = i % 2 === 0 ? "REFUNDED" : "FAILED";
  if (status === "COMPLETED") paymentStatus = "PAID";
  const orderType = TYPES[i % 2];
  const itemCount = 1 + (i % 4);
  const items = [];
  let total = 0;
  for (let j = 0; j < itemCount; j++) {
    const [menuId, menuName, unitPrice] = MENU_POOL[(i + j) % MENU_POOL.length];
    const qty = 1 + ((i + j) % 3);
    total += unitPrice * qty;
    items.push({
      menuId,
      menuName,
      quantity: qty,
      unitPrice,
      optionItems:
        j % 2 === 0
          ? [{ optionItemId: 269, name: "크리미칠리", quantity: 1 }]
          : [
              { optionItemId: 9101, name: "양배추라이스", quantity: 1 },
              { optionItemId: 9201, name: "아보카도", quantity: 1 },
            ],
      excludedIngredients:
        j % 3 === 0
          ? [{ ingredientId: 169, name: "양파" }]
          : j % 3 === 1
            ? [
                { ingredientId: 170, name: "토마토" },
                { ingredientId: 171, name: "오이" },
              ]
            : [],
    });
  }
  const notes = [null, "수저 빼주세요", "소스 따로", "영수증 2장", "요청사항 없음", "덜 맵게", "포장 꼼꼼히", "단무지 추가", "얼음 적게"];
  return {
    orderId,
    orderNo: `ASAK-202607${pad(day)}-${String(i + 1).padStart(3, "0")}`,
    orderType,
    totalPrice: total,
    orderStatus: status,
    paymentStatus,
    paymentMethod: METHODS[i % METHODS.length],
    createdAt: `2026-07-${pad(day)}T${pad(hour)}:${pad(min)}:${pad((i * 3) % 60)}`,
    itemCount,
    menuSummary: items.length === 1 ? items[0].menuName : `${items[0].menuName} 외 ${items.length - 1}`,
    items,
    requestNote: notes[i % notes.length],
  };
}

const manyOrders = [];
for (let i = 0; i < 160; i++) manyOrders.push(makeOrder(i));
const curated = a.orders?.data?.content || [];
const byId = new Map();
[...curated, ...manyOrders].forEach((o) => byId.set(o.orderId, o));
const allOrders = [...byId.values()].sort((x, y) => y.createdAt.localeCompare(x.createdAt));

a.orders.data.content = allOrders;
a.orders.data.totalElements = allOrders.length;

const live = [];
for (let i = 0; i < 40; i++) {
  const o = manyOrders[i];
  if (!["RECEIVED", "PREPARING"].includes(o.orderStatus)) continue;
  live.push({
    orderId: o.orderId,
    orderNo: `#${1300 + i}`,
    displayNo: String(1300 + i),
    orderType: o.orderType,
    orderTypeLabel: o.orderType === "EAT_IN" ? "매장" : "포장",
    totalPrice: o.totalPrice,
    orderStatus: o.orderStatus,
    createdAt: o.createdAt,
    elapsedSec: 30 + i * 45,
    wide: o.itemCount > 2 || i % 5 === 0,
    menus: o.items.map((it) => ({
      menuName: it.menuName,
      quantity: it.quantity,
      base: it.optionItems.find((x) => x.name.includes("라이스") || x.name.includes("밥"))?.name || "추천",
      dressing: it.optionItems.find((x) => x.name.includes("칠리") || x.name.includes("시저"))?.name || "발사믹",
      options: [
        ...(it.excludedIngredients || []).map((e) => ({ label: `${e.name} 제외`, tone: "exclude" })),
        ...it.optionItems.filter((x) => x.name === "아보카도").map(() => ({ label: "아보카도", tone: "plus" })),
        ...(i % 4 === 0 ? [{ label: "콜라", tone: "drink" }] : []),
        ...(i % 6 === 0 ? [{ label: "수프", tone: "side" }] : []),
      ],
    })),
  });
}
a.liveOrders.data.content = live;

a.dashboard.data.recentOrders = allOrders.slice(0, 20).map((o) => ({
  orderNo: o.orderNo.replace("ASAK-", "A-").slice(0, 14),
  orderType: o.orderType,
  menuSummary: o.menuSummary,
  totalPrice: o.totalPrice,
  orderStatus: o.orderStatus,
  createdAtLabel: o.createdAt.slice(11, 16),
}));
a.dashboard.data.statusSummary = [
  { label: "대기", count: allOrders.filter((o) => o.orderStatus === "RECEIVED").length, tone: "waiting" },
  { label: "조리중", count: allOrders.filter((o) => o.orderStatus === "PREPARING").length, tone: "preparing" },
  { label: "완료", count: allOrders.filter((o) => o.orderStatus === "COMPLETED").length, tone: "complete" },
  { label: "취소", count: allOrders.filter((o) => o.orderStatus === "CANCELLED").length, tone: "cancelled" },
];

const soldAvail = [];
const soldOut = [];
for (const [menuId, name, price] of MENU_POOL) {
  soldAvail.push({ targetType: "MENU", targetId: menuId, name, category: "메뉴", isSoldOut: false, imageKey: "chicken", price });
}
[
  "아보카도",
  "반숙달걀",
  "훈제연어",
  "베이컨",
  "크루통",
  "올리브",
  "파마산칩",
  "견과",
  "할라피뇨",
  "체다치즈",
  "구운버섯",
  "옥수수",
  "양파",
  "토마토",
  "오이",
  "피망",
  "당근",
  "양상추",
  "로켓",
  "파슬리",
].forEach((name, i) => {
  const row = { targetType: "INGREDIENT", targetId: 9200 + i, name, category: "재료", isSoldOut: false, imageKey: "tomato" };
  if (i % 4 === 0) soldOut.push({ ...row, isSoldOut: true });
  else soldAvail.push(row);
});
["콜라", "수프", "쿠키", "감자칩", "아메리카노", "제로콜라", "아이스티", "프로틴바"].forEach((name, i) => {
  const row = { targetType: "OPTION", targetId: 9300 + i, name, category: "세트", isSoldOut: false, imageKey: "pasta" };
  if (i % 3 === 0) soldOut.push({ ...row, isSoldOut: true });
  else soldAvail.push(row);
});
for (let i = 0; i < 30; i++) {
  soldOut.push({
    targetType: "MENU",
    targetId: 5000 + i,
    name: `품절메뉴 ${i + 1}`,
    category: "시즌",
    isSoldOut: true,
    imageKey: "salmon",
  });
}
a.soldOut.data.available = soldAvail;
a.soldOut.data.soldOut = soldOut;

const adminMenus = [];
for (const [catId, env] of Object.entries(k.menusByCategory)) {
  const catName = k.categories.data.find((c) => String(c.categoryId) === catId)?.name || "기타";
  for (const m of env.data) {
    adminMenus.push({
      menuId: m.menuId,
      categoryId: Number(catId),
      categoryName: catName,
      name: m.name,
      price: m.price,
      isSoldOut: !!m.isSoldOut,
      isActive: m.menuId % 17 !== 0,
    });
  }
}
a.menus.data.content = adminMenus;
a.menus.data.totalElements = adminMenus.length;
a.paymentMethods.data = k.paymentMethods.data.map((m) => ({ ...m }));

const dailyRows = [];
for (let d = 1; d <= 31; d++) {
  const orderCount = 20 + ((d * 3) % 25);
  const avg = 10000 + (d % 15) * 120;
  dailyRows.push({
    date: `2026-07-${pad(d)}`,
    orderCount,
    totalAmount: orderCount * avg,
    avgAmount: avg,
  });
}
a.sales.daily.data = {
  from: "2026-07-01",
  to: "2026-07-31",
  rows: dailyRows,
  totals: {
    orderCount: dailyRows.reduce((s, r) => s + r.orderCount, 0),
    totalAmount: dailyRows.reduce((s, r) => s + r.totalAmount, 0),
    avgAmount: 0,
  },
};
a.sales.daily.data.totals.avgAmount = Math.round(
  a.sales.daily.data.totals.totalAmount / a.sales.daily.data.totals.orderCount
);

const monthlyRows = [];
for (let m = 1; m <= 12; m++) {
  const orderCount = 450 + m * 20 + (m % 3) * 40;
  const avg = 10400 + m * 30;
  monthlyRows.push({
    month: `2026-${pad(m)}`,
    orderCount,
    totalAmount: orderCount * avg,
    avgAmount: avg,
  });
}
a.sales.monthly.data = {
  year: 2026,
  rows: monthlyRows,
  totals: {
    orderCount: monthlyRows.reduce((s, r) => s + r.orderCount, 0),
    totalAmount: monthlyRows.reduce((s, r) => s + r.totalAmount, 0),
    avgAmount: 0,
  },
};
a.sales.monthly.data.totals.avgAmount = Math.round(
  a.sales.monthly.data.totals.totalAmount / a.sales.monthly.data.totals.orderCount
);

a.sales.summary.data.periods.empty = {
  label: "데이터 없음",
  dateRange: "2026.01.01 ~ 2026.01.01",
  kpis: [
    { label: "총매출", value: 0, display: "0원", delta: 0, deltaLabel: "—" },
    { label: "주문 수", value: 0, display: "0건", delta: 0, deltaLabel: "—" },
    { label: "평균 객단가", value: 0, display: "0원", delta: 0, deltaLabel: "—" },
  ],
  chartBars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  paymentShare: [
    { label: "카드", percent: 0, fill: 0 },
    { label: "카카오페이", percent: 0, fill: 0 },
    { label: "현금", percent: 0, fill: 0 },
  ],
  orderShare: [
    { label: "매장", percent: 0, fill: 0 },
    { label: "포장", percent: 0, fill: 0 },
    { label: "배달", percent: 0, fill: 0 },
  ],
  ranking: [],
};
a.sales.summary.data.periods.partial = {
  label: "부분 데이터",
  dateRange: "2026.07.18 ~ 2026.07.20",
  kpis: [
    { label: "총매출", value: 1237300, display: "1,237,300원", delta: 4.2, deltaLabel: "직전 3일" },
    { label: "주문 수", value: 112, display: "112건", delta: 2.0, deltaLabel: "직전 3일" },
    { label: "평균 객단가", value: 11047, display: "11,047원", delta: 1.1, deltaLabel: "직전 3일" },
  ],
  chartBars: [10, 12, 18, 40, 55, 48, 30, 20, 14, 8, 4, 2],
  paymentShare: [
    { label: "카드", percent: 80, fill: 320 },
    { label: "카카오페이", percent: 20, fill: 80 },
    { label: "현금", percent: 0, fill: 0 },
  ],
  orderShare: [
    { label: "매장", percent: 50, fill: 200 },
    { label: "포장", percent: 50, fill: 200 },
    { label: "배달", percent: 0, fill: 0 },
  ],
  ranking: [
    { rank: 1, name: "로스트닭다리살 샐러드", count: 18, amount: 230400 },
    { rank: 2, name: "시저치킨 랩", count: 14, amount: 106400 },
  ],
};

a.auth = {
  users: [
    { username: "admin", password: "admin123", displayName: "하진", role: "ADMIN" },
    { username: "kitchen", password: "kitchen1", displayName: "주방", role: "KITCHEN" },
    { username: "viewer", password: "viewonly", displayName: "조회만", role: "VIEWER" },
  ],
  invalidUser: { username: "nope", password: "wrong" },
};

a.scenarios = {
  orders: { count: allOrders.length, statuses: STATUSES, payments: PAY },
  live: { count: live.length },
  menus: { count: adminMenus.length },
  soldOut: { available: soldAvail.length, soldOut: soldOut.length },
  sales: {
    dailyDays: 31,
    monthlyMonths: 12,
    periods: Object.keys(a.sales.summary.data.periods),
  },
};

fs.writeFileSync(aPath, JSON.stringify(a, null, 2));
console.log("ADMIN", a.scenarios);
console.log("sizesKB", {
  kiosk: Math.round(fs.statSync(kPath).size / 1024),
  admin: Math.round(fs.statSync(aPath).size / 1024),
});
