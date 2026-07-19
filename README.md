# ASAK Workspace 안내

이 폴더는 여러 ASAK 프로젝트를 한곳에서 열어 작업하기 위한 **작업공간**입니다. 각 하위 폴더는 독립 Git 저장소와 독립 GitHub 원격 저장소를 가집니다.

UI 작업을 시작한다면 **[UI-INDEX.md](UI-INDEX.md)** 를 먼저 보세요. 화면명 → Figma 노드 → 코드 파일 → 에셋 → 스크린샷 → 미구현 기능이 한 표에 정리되어 있습니다.

| 폴더 | 역할 | 원격 저장소 |
| --- | --- | --- |
| `ASAK` | 프론트 프로젝트 | `hagenie128/ASAK` |
| `ASAK-Kiosk` | 주문 키오스크 | `hagenie128/ASAK-Kiosk` |
| `ASAK-Admin` | 관리자 운영 화면 | `hagenie128/ASAK_Admin` |
| `ASAK-back` | 백엔드 | `hagenie128/ASAK-back` |

## Git 저장소 구조

상위 `ASAK-workspace` 저장소는 `.gitmodules`와 gitlink로 네 프로젝트를 가리킵니다. 소스 파일은 각 하위 저장소에만 있습니다.

- GitHub에서 폴더 왼쪽에 화살표 아이콘이 보이면 submodule(gitlink)입니다.
- 각 프로젝트의 실제 소스와 문서는 해당 프로젝트 폴더에서 커밋하고 push합니다.
- 상위 작업공간에서 `git add .`를 실행해도 하위 프로젝트의 파일 변경이 자동으로 커밋되지는 않습니다. 상위 저장소에는 가리키는 커밋 SHA만 갱신됩니다.

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
