# 적용 방법

1. 이 ZIP의 `sources`, `metadata`, `scripts` 폴더를 저장소 루트에 덮어씁니다.
2. PowerShell에서 `./scripts/sync-skills.ps1`을 실행합니다.
3. `./scripts/verify-skills.ps1`로 원본과 배포본 일치 여부를 확인합니다.
4. `git status`와 `git diff`를 확인한 뒤 커밋합니다.

권장 커밋 메시지:

```text
스킬 문서 구조와 안전 규칙 개선
```
