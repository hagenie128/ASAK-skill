# ASAK Workspace 안내

이 폴더는 여러 ASAK 프로젝트를 한곳에서 열어 작업하기 위한 **작업공간**입니다. 각 하위 폴더는 독립 Git 저장소와 독립 GitHub 원격 저장소를 가집니다.

| 폴더 | 역할 | 원격 저장소 |
| --- | --- | --- |
| `ASAK` | 프론트 프로젝트 + **중앙 문서** | `hagenie128/ASAK` |
| `ASAK-Kiosk` | 주문 키오스크 | `hagenie128/ASAK-front` |
| `ASAK-Admin` | 관리자 운영 화면 | `hagenie128/ASAK_Admin` |
| `ASAK-back` | 백엔드 | `hagenie128/ASAK-back` |

## 문서 어디서 보나

| 목적 | 경로 |
| --- | --- |
| **루트 폴더가 왜 겹쳐 보이냐** | [`ROOT_FOLDER_MAP.md`](ROOT_FOLDER_MAP.md) ← 먼저 |
| 중앙 문서 허브 | [`ASAK/docs/README.md`](ASAK/docs/README.md) |
| 태그로 찾기 | [`ASAK/docs/DOCUMENT_TAG_INDEX.md`](ASAK/docs/DOCUMENT_TAG_INDEX.md) |
| Product Bible 정본 | [`ASAK/docs/product_bible/`](ASAK/docs/product_bible/) |
| 키오스크/관리자/백엔드 | 각 저장소 `README.md` |

> `ASAK-workspace/docs/`는 포인터만 → [`docs/README.md`](docs/README.md)

## Git 저장소 구조

상위 `ASAK-workspace` 저장소는 각 프로젝트의 특정 커밋을 가리키는 gitlink를 보관합니다. 따라서 이 저장소는 모든 소스 파일을 직접 포함하는 단일 통합 저장소가 아닙니다.

- GitHub에서 폴더 왼쪽에 화살표 아이콘이 보이면, 일반 폴더가 아니라 독립 저장소를 가리키는 항목입니다.
- 각 프로젝트의 실제 소스와 문서는 해당 프로젝트 저장소에서 커밋하고 push합니다.
- 상위 작업공간에서 `git add .`를 실행해도 하위 프로젝트의 파일 변경이 자동으로 커밋되지는 않습니다.
- 현재 작업공간에는 `.gitmodules`가 없으므로, 정식 Git submodule 설정으로 운영하는 구조도 아닙니다.

## 변경사항을 GitHub에 올리는 방법

변경한 파일이 있는 **프로젝트 폴더로 이동한 뒤** 커밋하고 push합니다. 예를 들어 관리자 구현 계획을 변경했다면 다음 명령을 사용합니다.

```powershell
cd C:\ASAK-workspace\ASAK-Admin
git status
git add IMPLEMENTATION_PLAN.md
git commit -m "docs(admin): expand implementation plan"
git push
```

키오스크 문서는 `C:\ASAK-workspace\ASAK-Kiosk`에서 같은 방식으로 처리합니다.

## 흔한 오류

```text
error: src refspec master does not match any
```

이 오류는 현재 브랜치에 아직 커밋이 없을 때 push를 시도하면 발생합니다. 파일이 삭제된 것은 아닙니다. 다만 어느 저장소에 올릴 변경인지 먼저 확인하고, 해당 프로젝트 폴더에서 첫 커밋을 만든 뒤 push해야 합니다.
