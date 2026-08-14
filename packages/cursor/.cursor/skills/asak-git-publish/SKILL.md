---
name: asak-git-publish
description: "ASAK 깃반영. Use when the user says 깃반영, 깃 반영, 커밋·푸시·머지, git publish, or asks for approved branch creation, Korean commits, remote push, origin/main merge, and branch cleanup."
---

# 깃반영

ASAK의 각 독립 저장소에서 기능별·레포별 작업 브랜치를 생성하고, 승인된 변경만 안전하게 GitHub 원격 `main`까지 반영한다.

브랜치 생성, 파일 검토, 한글 커밋, 작업 브랜치 푸시, `main` 병합·푸시, 로컬·원격 작업 브랜치 정리까지 정해진 순서로 수행한다.

## 핵심 원칙

`/asak-git-publish` 호출만으로 원격 상태를 변경하지 않는다.

작업 시작 전 다음 항목을 확인한다.

- 대상 독립 저장소
- 포함할 파일 또는 전체 작업 트리 허용 여부
- 작업 브랜치 이름
- 한글 커밋 제목
- 작업 브랜치 원격 푸시 여부
- 원격 `main` 반영 여부
- 작업 브랜치 유지 여부

사용자가 원격 `main` 반영까지 승인한 경우, 병합과 원격 `main` 푸시가 정상적으로 검증되면 해당 작업 브랜치의 로컬 및 원격 삭제까지 같은 승인 범위에 포함된 것으로 간주한다.

> 원격 `main` 반영 승인은 병합 완료 후 로컬·원격 작업 브랜치 정리까지 포함한다.

사용자가 명시적으로 다음과 같이 요청한 경우에만 작업 브랜치를 유지한다.

- 브랜치를 유지해
- 브랜치를 삭제하지 마
- 원격 브랜치를 남겨둬
- 나중에 추가 작업할 예정이야

별도 유지 요청이 없다면 원격 `main` 반영 후 로컬·원격 작업 브랜치를 반드시 정리한다.

## 저장소 경계 확인

ASAK 각 프로젝트는 독립 Git 저장소일 수 있으므로 작업 전에 반드시 현재 저장소의 최상위 경로와 원격 URL을 확인한다.

```bash
git rev-parse --show-toplevel
git remote -v
git status
git branch --show-current
```

명령 결과가 사용자가 지정한 대상 저장소와 일치하지 않으면 작업을 중단하고 보고한다.

상위 작업공간 저장소에서 하위 독립 저장소의 작업을 대신 수행하지 않는다.

예를 들어 백엔드 작업은 실제 백엔드 저장소 내부에서 수행한다.

```text
C:\ASAK-workspace\ASAK-back
```

다음과 같은 상위 작업공간 저장소에서 백엔드 브랜치 작업을 수행하지 않는다.

```text
C:\ASAK-workspace
```

대상 저장소와 원격 URL이 일치하지 않으면 브랜치 생성, 커밋, 푸시, 병합, 삭제를 실행하지 않는다.

## 시작 상태별 처리

이 스킬은 다음 시작 상태를 구분한다.

### A. 변경 전 게시 준비 모드

작업 트리가 깨끗하고 현재 브랜치가 `main`인 경우:

1. `git fetch origin --prune`
2. `git switch main`
3. `git pull --ff-only origin main`
4. 승인된 작업 브랜치를 생성한다.
5. 이후 변경·검토·커밋 절차를 수행한다.

### B. 이미 수정된 작업 반영 모드

사용자가 이미 코드를 수정한 상태에서 호출한 경우, 승인된 변경만 존재하고 현재 저장소가 정확한 것이 확인되면 stash, reset, restore를 사용하지 않고 현재 HEAD에서 작업 브랜치를 먼저 생성할 수 있다.

```bash
git switch -c <branch>
```

브랜치 생성은 작업 파일 내용을 바꾸지 않는다.

이후 승인된 파일만 검토, stage, commit한다.

커밋 후 작업 트리가 깨끗해지면 `main`으로 이동하고 `git pull --ff-only origin main`을 수행한 뒤 작업 브랜치를 병합한다.

다음 경우에는 자동으로 브랜치를 만들지 않고 중단한다.

- 현재 브랜치가 `main`도 아니고 사용자가 승인한 기존 작업 브랜치도 아님
- detached HEAD 상태
- merge 또는 rebase 진행 중
- 승인되지 않은 변경이 섞여 있음
- 대상 변경이 다른 저장소 파일을 포함함
- 상위 작업공간 저장소에서 실행 중임

### C. Detached HEAD 상태

detached HEAD에서는 바로 게시 절차를 진행하지 않는다.

현재 커밋과 작업 트리를 보존해야 하면 사용자의 명시적 승인을 받은 뒤 새 브랜치를 만든다.

```bash
git switch -c <branch>
```

사용자 승인 없이 rescue 브랜치를 만들거나 기존 브랜치로 이동하지 않는다.

## 브랜치 이름 규칙

브랜치 이름에는 `agent/` 접두어를 사용하지 않는다.

작업 성격에 따라 다음 접두어 중 하나를 사용한다.

- `feat/`: 기능 추가
- `fix/`: 오류 수정
- `docs/`: 문서 변경
- `chore/`: 설정, 구조, 정리 작업

접두어 뒤에는 소문자 영문과 하이픈으로 작업 내용을 작성한다.

예:

```text
feat/admin-order-list
fix/kiosk-category-mock-contract
docs/api-order-contract
chore/backend-project-settings
```

한글, 공백, 대문자, 의미 없는 숫자만으로 구성된 브랜치 이름은 사용하지 않는다.

작업 브랜치를 생성하기 전에 같은 이름의 로컬·원격 브랜치가 있는지 확인한다.

```bash
git fetch origin --prune
git branch --list <branch>
git branch -r --list origin/<branch>
git ls-remote --heads origin refs/heads/<branch>
```

로컬 또는 원격에 같은 이름이 있으면 새로 생성하거나 덮어쓰지 않는다.

현재 브랜치 상태와 기존 브랜치의 커밋을 보고하고 사용자 확인을 받는다.

## 커밋 규칙

커밋 메시지는 에이전트나 AI가 작업했다는 표현 없이 실제 변경 내용을 한글로 작성한다.

형식:

```text
<type>: <한글 작업 내용>
```

예:

```text
feat: 관리자 주문목록 조회 구현
fix: 주문번호 일별 순번 생성 오류 수정
docs: 주문 API 명세 보완
chore: 백엔드 프로젝트 설정 정리
```

다음과 같은 표현은 사용하지 않는다.

```text
AI가 수정
에이전트 작업
자동 생성
Claude 수정
Gemini 수정
Codex 작업
```

## 금지 사항

별도 승인 없이는 다음 작업을 수행하지 않는다.

- force push
- `git push --force`
- `git push --force-with-lease`
- rebase
- reset
- stash
- 기존 커밋 수정
- amend
- 충돌 자동 해결
- `main`에서 작업 파일을 직접 stage
- `main`에서 기능 커밋 생성
- 승인되지 않은 파일 stage
- 다른 독립 저장소 변경 포함
- 현재 브랜치 강제 삭제
- 보호 브랜치 삭제
- `git branch -D`
- 로컬 변경사항 폐기
- 서브모듈 커밋 참조 변경
- 상위 작업공간 저장소 변경

승인된 작업 브랜치를 `main`에 병합하면서 생성되는 merge commit은 `main` 직접 기능 커밋 금지의 예외다.

작업 트리가 안전하지 않거나 현재 `main`을 안전하게 최신화할 수 없으면 stash, reset, rebase로 우회하지 않는다.

중단 사유와 현재 상태를 사용자에게 보고한다.

## 전체 작업 순서

### 1. 대상 저장소 확인

대상 독립 저장소에서 다음을 실행한다.

```bash
git rev-parse --show-toplevel
git remote -v
git status
git branch --show-current
```

다음을 확인한다.

- 저장소 최상위 경로가 대상 프로젝트와 일치하는지
- `origin` URL이 예상 GitHub 저장소와 일치하는지
- 현재 브랜치
- 수정 파일과 미추적 파일
- merge 또는 rebase 진행 여부
- detached HEAD 여부

대상 저장소가 불명확하거나 원격 URL이 예상과 다르면 중단한다.

### 2. 작업 트리와 승인 범위 확인

```bash
git status --short
git diff
git diff --cached
```

사용자가 전체 작업 트리 반영을 승인하지 않은 경우 포함할 파일을 명시적으로 확인한다.

승인되지 않은 파일을 자동으로 포함하지 않는다.

이미 수정된 작업 반영 모드에서는 승인된 변경만 존재하는지 확인한 뒤 작업 브랜치를 생성한다.

### 3. 원격 상태 갱신

```bash
git fetch origin --prune
```

원격 조회 실패 시 로컬 정보만으로 원격 브랜치 존재 여부를 단정하지 않는다.

### 4. `main` 최신화 또는 작업 브랜치 선생성

#### 작업 트리가 깨끗한 경우

```bash
git switch main
git pull --ff-only origin main
```

#### `main`에서 이미 승인된 변경이 있는 경우

먼저 승인된 작업 브랜치를 생성한다.

```bash
git switch -c <branch>
```

브랜치 생성 후 변경 파일이 그대로 유지되는지 확인한다.

```bash
git branch --show-current
git status --short
```

`git pull --ff-only`가 실패하면 merge, rebase, reset으로 자동 해결하지 않는다.

### 5. 작업 브랜치 생성 확인

현재 브랜치가 아직 승인된 작업 브랜치가 아니면 생성한다.

```bash
git switch -c <branch>
```

생성 후 확인한다.

```bash
git branch --show-current
git status
```

현재 브랜치가 승인된 작업 브랜치와 정확히 일치해야 한다.

### 6. 변경 검토

승인된 파일만 검토한다.

```bash
git diff -- <approved-files>
git diff --check
```

전체 작업 트리가 승인된 경우:

```bash
git diff
git diff --check
git status --short
```

다음을 점검한다.

- 승인되지 않은 파일
- 디버깅 코드
- 비밀키, 토큰, 비밀번호
- 불필요한 빌드 결과물
- 줄 끝 공백
- 충돌 마커
- 자동 생성 파일의 불필요한 대량 변경

`git diff --check`가 실패하면 커밋하지 않는다.

### 7. 빌드 또는 테스트

프로젝트에 맞는 검증을 실행한다.

Spring/Gradle 예:

```bash
./gradlew test
```

Windows PowerShell 예:

```powershell
.\gradlew.bat test
```

Frontend 예:

```bash
npm run build
```

또는:

```bash
npm test
```

실행할 수 없거나 프로젝트에 명령이 없으면 성공했다고 보고하지 않고 이유를 기록한다.

### 8. 승인된 파일 stage

승인된 파일을 명시적으로 stage한다.

```bash
git add <approved-file-1> <approved-file-2>
```

전체 작업 트리 반영을 사용자가 명시적으로 승인한 경우에만 다음을 사용할 수 있다.

```bash
git add -A
```

stage 후 확인한다.

```bash
git diff --cached
git diff --cached --check
git status --short
```

승인되지 않은 파일이 stage되었으면 커밋하지 않는다.

### 9. 한글 커밋 생성

```bash
git commit -m "<한글 커밋 제목>"
```

커밋 후 확인한다.

```bash
git log -1 --oneline
git status
```

커밋 해시와 제목을 기록한다.

### 10. 작업 브랜치 원격 푸시

사용자가 작업 브랜치 원격 푸시를 승인한 경우 실행한다.

```bash
git push -u origin <branch>
```

푸시 후 확인한다.

```bash
git status
git branch -vv
git rev-parse HEAD
git rev-parse origin/<branch>
git ls-remote --heads origin refs/heads/<branch>
```

다음을 검증한다.

- 로컬 작업 브랜치가 `origin/<branch>`를 추적하는지
- 로컬 `HEAD`와 `origin/<branch>` 커밋 해시가 같은지
- 실제 원격 브랜치가 존재하는지

원격 푸시가 실패하면 `main` 병합으로 진행하지 않는다.

### 11. 원격 `main` 반영 전 재확인

사용자가 원격 `main` 반영까지 승인한 경우에만 진행한다.

작업 브랜치 커밋 후 작업 트리가 깨끗한지 확인한다.

```bash
git status --short
```

깨끗한 경우에만:

```bash
git switch main
git pull --ff-only origin main
```

실패하면 자동 merge, rebase, reset을 수행하지 않는다.

### 12. 작업 브랜치 병합

```bash
git merge --no-ff <branch>
```

작업 브랜치의 병합 이력이 `main`에 남도록 `--no-ff`를 사용한다.

사용하지 않는 방식:

- squash merge
- rebase merge
- 강제 fast-forward 조작
- 충돌 자동 해결

충돌이 발생하면 파일을 임의로 수정하지 않는다.

```bash
git status
```

현재 충돌 상태를 보고하고 중단한다.

### 13. 병합 결과 검증

```bash
git status
git log --oneline --decorate -5
git merge-base --is-ancestor <branch> main
```

프로젝트에 맞는 빌드 또는 테스트를 다시 실행한다.

병합 후 검증이 실패하면 원격 `main`에 푸시하지 않는다.

### 14. 원격 `main` 푸시

```bash
git push origin main
git fetch origin
```

다음을 확인한다.

```bash
git rev-parse HEAD
git rev-parse origin/main
git status
git branch -r --contains <commit-hash>
```

반드시 다음 조건을 만족해야 한다.

```text
HEAD == origin/main
```

작업 커밋이 `origin/main`에 포함되어 있어야 한다.

원격 `main` 반영 검증이 완료되기 전에는 작업 브랜치를 삭제하지 않는다.

### 15. 로컬 작업 브랜치 삭제

사용자가 브랜치 유지를 요청하지 않았고 원격 `main` 반영 검증이 성공했다면 로컬 작업 브랜치를 반드시 삭제한다.

현재 브랜치 확인:

```bash
git branch --show-current
```

현재 브랜치가 `main`일 때만:

```bash
git branch -d <branch>
```

삭제하지 않는 브랜치:

- `main`
- 현재 체크아웃된 브랜치
- 보호 브랜치
- `rescue/` 브랜치
- 사용자가 유지 요청한 브랜치
- 아직 `main`에 병합되지 않은 브랜치

`git branch -d`가 실패하면 `git branch -D`를 사용하지 않는다.

로컬 삭제 확인:

```bash
git branch --list <branch>
```

아무 결과도 나오지 않아야 한다.

### 16. GitHub 원격 작업 브랜치 삭제

사용자가 브랜치 유지를 요청하지 않았고 원격 `main` 반영 검증이 성공했다면 원격 작업 브랜치를 반드시 삭제한다.

삭제 전 실제 원격 존재를 확인한다.

```bash
git ls-remote --heads origin refs/heads/<branch>
```

결과가 존재하면:

```bash
git push origin --delete <branch>
```

결과가 이미 비어 있으면 원격 브랜치가 이미 삭제된 것으로 판단하고 삭제 명령 실패를 전체 실패로 처리하지 않는다.

삭제 또는 기존 삭제 확인 후:

```bash
git fetch origin --prune
```

다음 세 명령으로 검증한다.

```bash
git branch --list <branch>
git branch -r --list origin/<branch>
git ls-remote --heads origin refs/heads/<branch>
```

세 명령 모두 해당 브랜치를 반환하지 않아야 한다.

실제 원격은 없지만 원격 추적 참조만 남아 있으면 다음을 사용할 수 있다.

```bash
git branch -dr origin/<branch>
git fetch origin --prune
```

단, `git ls-remote --heads origin refs/heads/<branch>` 결과가 비어 있어 실제 원격 브랜치가 없음을 확인한 경우에만 사용한다.

### 17. 최종 상태 확인

```bash
git status
git branch --show-current
git branch -vv
git branch -r
git rev-parse HEAD
git rev-parse origin/main
```

최종 상태:

- 현재 브랜치는 `main`
- 작업 트리는 깨끗함
- 로컬 `HEAD`와 `origin/main`이 동일함
- 작업 커밋이 `origin/main`에 포함됨
- 유지 요청 없는 로컬 작업 브랜치가 없음
- 유지 요청 없는 원격 작업 브랜치가 없음
- 오래된 `origin/<branch>` 원격 추적 참조가 없음

## 승인 범위별 동작

### 작업 브랜치 생성과 커밋만 승인

다음까지만 수행한다.

1. 대상 저장소 확인
2. 시작 상태 확인
3. 작업 브랜치 생성
4. 변경 검토
5. 빌드 또는 테스트
6. 승인된 파일 stage
7. 한글 커밋

원격 푸시, `main` 병합, 브랜치 삭제는 수행하지 않는다.

### 작업 브랜치 원격 푸시까지 승인

다음까지 수행한다.

1. 작업 브랜치 생성
2. 검토 및 검증
3. 한글 커밋
4. 작업 브랜치 원격 푸시
5. 원격 브랜치와 커밋 해시 검증

`main` 병합과 브랜치 삭제는 수행하지 않는다.

### 원격 `main` 반영까지 승인

다음 전체 과정을 수행한다.

1. 작업 브랜치 생성
2. 승인된 변경 검토
3. 빌드 또는 테스트
4. 한글 커밋
5. 작업 브랜치 원격 푸시
6. `main` 재최신화
7. `--no-ff` 병합
8. 병합 후 검증
9. 원격 `main` 푸시
10. `HEAD == origin/main` 확인
11. 로컬 작업 브랜치 삭제
12. 원격 작업 브랜치 삭제 또는 이미 삭제됨 확인
13. `git fetch origin --prune`
14. 로컬·원격 브랜치 삭제 검증

원격 `main` 반영 승인은 브랜치 정리까지 포함한다.

## 기존에 남은 작업 브랜치 정리

사용자가 이미 병합된 브랜치 정리만 요청한 경우 먼저 원격 정보를 갱신한다.

```bash
git fetch origin --prune
```

로컬 브랜치가 있으면:

```bash
git merge-base --is-ancestor <branch> origin/main
```

원격 추적 브랜치만 있으면:

```bash
git rev-parse origin/<branch>
git merge-base --is-ancestor origin/<branch> origin/main
```

원격 브랜치가 실제로 있는지도 확인한다.

```bash
git ls-remote --heads origin refs/heads/<branch>
```

`origin/main` 포함 여부가 확인된 경우에만 삭제한다.

```bash
git switch main
git branch -d <branch>
git push origin --delete <branch>
git fetch origin --prune
```

원격 브랜치가 이미 없으면 `git push origin --delete`를 생략하고 prune만 수행한다.

삭제 후 검증:

```bash
git branch --list <branch>
git branch -r --list origin/<branch>
git ls-remote --heads origin refs/heads/<branch>
```

병합 여부가 확인되지 않은 브랜치는 삭제하지 않는다.

## 중단 조건

다음 상황에서는 자동으로 우회하지 않고 중단한다.

- 대상 저장소가 불명확함
- 원격 URL이 예상과 다름
- 상위 작업공간 저장소에서 실행 중임
- 승인되지 않은 변경 파일 존재
- merge 또는 rebase 진행 중
- detached HEAD인데 브랜치 생성 승인이 없음
- `main` 최신화 실패
- 작업 브랜치 이름 충돌
- `git diff --check` 실패
- 빌드 또는 테스트 실패
- 원격 작업 브랜치 푸시 실패
- 병합 충돌
- 병합 후 검증 실패
- 원격 `main` 푸시 실패
- `HEAD`와 `origin/main` 불일치
- 작업 커밋이 `origin/main`에 포함되지 않음
- 로컬 브랜치 안전 삭제 실패
- 실제 원격 브랜치가 남아 있는데 삭제 실패

중단 시 강제 명령으로 해결하지 않는다.

현재 상태, 실패 명령, 원인, 사용자 확인이 필요한 항목을 보고한다.

## 최종 보고 형식

```text
대상 저장소:
원격 URL:
저장소 최상위 경로:

시작 상태:
작업 브랜치:
현재 브랜치:
커밋 해시:
한글 커밋 제목:

stage 파일:
제외한 파일:

git diff --check:
빌드/테스트:

작업 브랜치 원격 푸시:
원격 작업 브랜치 확인:
원격 main 반영:
HEAD:
origin/main:
HEAD == origin/main:
대상 커밋의 origin/main 포함 여부:

로컬 작업 브랜치 삭제:
원격 작업 브랜치 삭제 또는 이미 삭제됨:
git fetch origin --prune:
남아 있는 로컬 작업 브랜치:
남아 있는 원격 작업 브랜치:

중단 또는 미수행 항목:
다음 작업:
```

브랜치 유지 요청이 없는데 작업 브랜치가 남아 있으면 완료로 보고하지 않는다.

로컬·원격 작업 브랜치 삭제와 원격 추적 참조 정리까지 검증한 후에만 전체 작업 완료로 보고한다.
