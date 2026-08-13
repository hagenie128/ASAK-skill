# 신메뉴 태그 노출 설계 & 옵션 도메인 분리 계획

날짜: 2026-08-13
주제: NEW 태그 기반 "신메뉴" 가상 탭 구현 방법 + AdminMenuMapper/Service 비대화 대응(옵션 도메인 분리)

소스코드·DB·원격 Git·Figma 수정: **없음** (본 문서만 신규 작성, 설계 논의 결과 기록)

---

## 1. 배경

- 신메뉴를 실제 카테고리(`cat_id`)로 만들면 기존 음식 카테고리에서 사라지는 문제가 있어, **카테고리는 그대로 두고 NEW 태그 기준으로 신메뉴 탭에 중복 노출**하는 방식으로 결정.
- 이 작업을 계기로 `AdminMenuMapper`/`AdminMenuService`가 메뉴·카테고리·재료·옵션·태그를 전부 떠안고 있는 문제가 확인되어, 태그가 아니라 **옵션(Option) 도메인을 먼저 분리**하기로 결정.

---

## 2. 신메뉴(NEW 태그) 노출 방식

### 2.1 원칙

- `menu.cat_id`는 변경하지 않는다 (실제 분류 유지).
- `menu_tag` + `tag.code = 'NEW'` 여부를 응답에 `tagCodes` 배열로 내려주고, Kiosk에서 고정 식별자(`NEW_TAB_ID`)를 가진 **가상 탭**으로 필터링한다.
- 만료 방식: **수동 해제만** 지원 (운영자가 Admin에서 NEW 태그를 직접 뗀다). `tag`/`menu_tag` 테이블에 노출 기간 컬럼이 없어 자동 만료를 하려면 스키마 마이그레이션이 별도로 필요함.

### 2.2 백엔드 변경 포인트

**`ASAK-back/src/main/resources/mappers/UserMenuMapper.xml`** — `selectMenuList`에 태그 조인 추가

```xml
<select id="selectMenuList" resultType="menuList">
    SELECT
        m.id AS menuId,
        m.cat_id AS categoryId,
        m.name,
        m.price,
        mn.kcal,
        ma.url AS imageUrl,
        m.sold_out AS isSoldOut,
        GROUP_CONCAT(DISTINCT t.code ORDER BY t.code) AS tagCodesCsv
    FROM menu m
    JOIN menu_nutr mn ON mn.menu_id = m.id
    LEFT JOIN media_asset ma ON ma.id = m.image_asset_id AND ma.deleted_at IS NULL
    LEFT JOIN menu_tag mt ON mt.menu_id = m.id
    LEFT JOIN tag t ON t.id = mt.tag_id AND t.active = true
    WHERE m.deleted_at IS NULL
    GROUP BY m.id
    ORDER BY m.cat_id ASC, m.id ASC
</select>
```

> `GROUP BY m.id`만으로 충분한 이유: `m.id`가 PK라 나머지 `menu` 컬럼이 함수적으로 종속되어 MySQL `ONLY_FULL_GROUP_BY`에 걸리지 않음.

**`ASAK-back/src/main/java/com/asak/user/dto/menu/MenuListItemResponse.java`** — CSV를 배열로 노출

```java
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Alias("menuList")
public class MenuListItemResponse {

  private Long menuId;
  private Long categoryId;
  private String name;
  private Integer price;
  private String imageUrl;
  private Double kcal;
  private Boolean isSoldOut;
  private Boolean isOrderable;

  @JsonIgnore
  private String tagCodesCsv; // MyBatis가 GROUP_CONCAT 결과를 이 필드에 매핑

  public List<String> getTagCodes() {
    return (tagCodesCsv == null || tagCodesCsv.isBlank())
        ? List.of()
        : Arrays.asList(tagCodesCsv.split(","));
  }
}
```

`tagCodesCsv`는 `@JsonIgnore`로 응답에서 숨기고, `getTagCodes()`가 실제 JSON 필드 `tagCodes`(배열)로 직렬화된다.

### 2.3 프런트(Kiosk) 변경 포인트

**`ASAK-Kiosk/src/pages/kiosk/MenuListPage.jsx`**

```jsx
const NEW_TAB_ID = -1; // 실제 category.id(BIGINT, 양수)와 겹치지 않는 값

// fetchCategories 안, setCategories 부분
const categoryData = await getCategories();
setCategories([{ categoryId: NEW_TAB_ID, categoryName: "신메뉴" }, ...categoryData]);
```

```jsx
// fetchMenus 안, 필터 부분
setMenus(
  selectedCategoryId === NEW_TAB_ID
    ? menuList.filter((menu) => menu.tagCodes?.includes("NEW"))
    : menuList.filter((menu) => menu.categoryId === selectedCategoryId),
);
```

- `CategoryTabs.jsx`는 `categoryId`/`categoryName`만 순회하므로 수정 불필요.
- `selectedCategoryId` 산출 로직(`categories.some(...)`)도 `NEW_TAB_ID`가 배열에 포함되면 그대로 동작.
- 정렬 기준: `menu_tag`에 timestamp가 없으므로 신메뉴 탭 정렬은 `menu.created_at DESC` 사용.

---

## 3. 도메인 분리: Tag는 유지, Option은 분리

### 3.1 현황 조사 결과

- `AdminMenuMapper` 인터페이스: 20개 메서드. 메뉴 CRUD + 카테고리 조회 + 재료 조회 + **옵션그룹/옵션정책 CRUD** + 태그 CRUD + 공통코드/미디어 조회가 한 파일에 혼재.
- `AdminMenuService`: `insertOptionGroups`, `resolveRecommendedOptionItemId`, `insertRecommendedOverrides` 등 옵션 전용 비즈니스 로직이 약 100줄 포함.
- 스키마 비교:
  - Tag: `menu_tag` 조인 테이블 1개뿐.
  - Option: `opt_group`, `opt_item`, `opt_policy`, `opt_policy_item`, `menu_opt_policy`, `menu_opt_override`, `opt_item_comp` — 총 7개 테이블짜리 독자 도메인.

**결론**: 태그는 지금 분리하면 파일만 늘어나는 과설계. 옵션은 이미 규모·복잡도가 커서 분리 실익이 명확함.

### 3.2 분리 계획 (기존 패키지 컨벤션 유지: `admin.controller` / `admin.service` / `admin.mapper`에 flat하게 신규 클래스 추가)

**1) `AdminOptionMapper.java` 신규** — `AdminMenuMapper`에서 옵션 전용 메서드 이동

```java
package com.asak.admin.mapper;

public interface AdminOptionMapper {
  List<AdminOptionGroupResponse> getOptionGroups();                    // 신규: 목록 조회
  AdminOptionGroupResponse getOptionGroupDetail(Long optionGroupId);   // 기존 existence-check(Object)를 DTO로 승격
  Long findOptPolicyId(@Param("optionGroupId") Long optionGroupId);
  List<Long> findOptItemIdsByPolicyId(@Param("policyId") Long policyId);
  int insertMenuOptPolicy(Map<String, Object> map);
  int upsertMenuOptOverride(Map<String, Object> map);
  int deleteMenuOptOverrides(Long menuId);
  int deleteMenuOptionGroups(Long menuId);
}
```

대응하는 `<select>`/`<insert>`/`<delete>`는 `AdminMenuMapper.xml`에서 신규 `AdminOptionMapper.xml`로 이동.

**2) `AdminOptionService.java` 신규** — `AdminMenuService`의 옵션 관련 로직 이동

```java
@Service
public class AdminOptionService {
  private final AdminOptionMapper adminOptionMapper;

  public List<AdminOptionGroupResponse> getOptionGroups() { ... }
  public boolean existsOptionGroup(Long optionGroupId) { ... } // 기존 getOptionGroupDetail(boolean 용도)

  @Transactional
  public void replaceMenuOptionGroups(Long menuId, List<CreateMenuOptionGroupRequest> optionGroups) {
    adminOptionMapper.deleteMenuOptOverrides(menuId);
    adminOptionMapper.deleteMenuOptionGroups(menuId);
    insertOptionGroups(menuId, optionGroups); // 기존 로직 그대로 이동
  }

  void insertOptionGroups(Long menuId, List<CreateMenuOptionGroupRequest> optionGroups) { ... }
  private Long resolveRecommendedOptionItemId(...) { ... }
  private void insertRecommendedOverrides(...) { ... }
}
```

**3) `AdminMenuService`는 옵션 로직을 직접 만지지 않고 위임만 하도록 축소**

```java
private final AdminOptionService adminOptionService;

// createMenu() 안
adminOptionService.insertOptionGroups(menuId, request.getOptionGroups());

// updateMenu() 안, 기존 117~121행 대체
if (request.getOptionGroups() != null) {
  adminOptionService.replaceMenuOptionGroups(menuId, request.getOptionGroups());
}

// createMenu() 검증부(기존 93~100행)도 위임
if (!adminOptionService.existsOptionGroup(group.getOptionGroupId())) { ... }
```

**4) `AdminOptionController.java` 신규** — 최상위 리소스로 분리 (category/ingredient와 다른 이유는 아래 참고)

```java
@RestController
@RequestMapping("/api/admin/option-groups")
public class AdminOptionController {
  @GetMapping
  public ApiResponse<List<AdminOptionGroupResponse>> getOptionGroups() { ... }

  @GetMapping("/{optionGroupId}")
  public ApiResponse<AdminOptionGroupResponse> getOptionGroupDetail(@PathVariable Long optionGroupId) { ... }
}
```

### 3.3 category/ingredient는 왜 그대로 두는가

- `/api/admin/menus/categories`, `/api/admin/menus/ingredients`는 메뉴 등록 시 참조되는 단순 lookup이라 지금처럼 `AdminMenuController` 하위에 있어도 무방.
- 옵션그룹은 여러 메뉴가 공유하는 별도 마스터 데이터(정책·아이템·조합까지 있음)이며 자체 관리 화면이 생길 가능성이 높아 최상위 리소스(`/api/admin/option-groups`)로 분리하는 것이 맞음.
- Tag(`findTagId`/`insertMenuTag`/`deleteMenuTags` 3개 메서드)는 규모가 작아 `AdminMenuMapper`/`AdminMenuService`에 그대로 남긴다.

---

## 4. 다음 단계 (미착수)

- [ ] 위 백엔드/프런트 변경 실제 적용 (구현은 사용자 측에서 진행 예정)
- [ ] 신메뉴 탭 Empty/Loading/Error 상태 문구 확정 (SCR-003 Figma 기준 미정)
- [ ] 옵션그룹 관리 화면(Admin) 필요 여부 확정 후 `AdminOptionController` 엔드포인트 범위 확정
