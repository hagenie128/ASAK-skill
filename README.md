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
| UI 화면 매핑 (Figma↔코드) | [`UI-INDEX.md`](UI-INDEX.md) |
| 중앙 문서 허브 | [`ASAK/docs/README.md`](ASAK/docs/README.md) |
| Figma 토큰 보고서 | [`ASAK/docs/design/FIGMA-TOKEN-REPORT.md`](ASAK/docs/design/FIGMA-TOKEN-REPORT.md) |
| Admin 개선 계획 | [`ASAK-Admin/docs/admin-improvement-plan-2026-07-19.md`](ASAK-Admin/docs/admin-improvement-plan-2026-07-19.md) |
| Bruno API 컬렉션 | [`ASAK-back/api/`](ASAK-back/api/) |

구현 정본은 `ASAK/docs/product_bible/` 입니다. 각 앱의 실행 맥락은 해당 저장소 `README.md`를 보세요.

## Git

상위 `ASAK-workspace`는 `.gitmodules`로 네 프로젝트를 gitlink합니다. **코드 변경은 하위 폴더에서** 커밋·푸시하세요.

```powershell
cd C:\ASAK-workspace\ASAK-Kiosk   # 또는 Admin / back / ASAK
git status
git add .
git commit -m "your message"
git push
```

워크스페이스 메타(README, UI-INDEX, submodule SHA)만 루트에서 커밋합니다.
