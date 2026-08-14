---
name: asak-doc-sync
description: "ASAK 문서 동기화. Use when the user says 문서 동기화, 문서 갱신, doc sync, or asks to update Product/Screen Bible, API specs, guides, tests, or README from current code after comparing evidence."
---

# ASAK 현재 코드 기준 문서 동기화

현재 Git 코드와 검증 결과를 근거로 ASAK 문서를 갱신한다.

이 스킬은 승인된 문서와 결과 근거 보고서만 수정한다. 소스코드, DB, Figma, DevCopilot 원격 데이터, Git 원격 상태는 수정하지 않는다.

## 사실 종류별 정본 원칙

확인하려는 사실의 종류에 따라 기준을 구분한다.

- 현재 구현 사실: 현재 코드 → 실제 실행·테스트 → Git 이력
- 사용자 경험과 업무 규칙의 의도: Product Bible → Screen Bible → 승인된 결정 기록
- API 계약: 승인된 API 명세 → 실제 Controller·DTO·응답 → 클라이언트 사용 코드
- 화면 디자인: 승인된 Figma Frame/Node → Screen Bible → 현재 UI 구현
- DB 구조와 상태: 실제 DB 조회·DDL·검증된 schema 기록
- DevCopilot, Notion 내보내기, 오래된 문서 복사본: 비교용 보조 자료

코드와 기획 정본이 다르면 코드에 맞춰 문서를 조용히 변경하지 않는다.

다음 중 하나로 명시한다.

- `구현 불일치`
- `계약 불일치`
- `디자인 불일치`
- `결정 필요`
- `미검증`

## 시작 전 범위 확정

1. 대상 코드 저장소와 갱신 후보 문서를 확인한다.
2. 문서 경로가 없으면 Product Bible, Screen Bible, API 명세, 구현 가이드, 테스트 문서, README 중 관련 후보를 먼저 제시한다.
3. `AGENTS.md`, 각 저장소의 Git 상태, 최근 커밋, 실제 변경 파일을 읽는다.
4. 학습 대상과 직접 관련된 자료만 읽는다.
   - 화면: Screen ID, Screen Bible, Figma Frame/Node, 상태별 UI
   - API: method, path, 인증, request, response, error
   - Backend: Controller, Service, Mapper/Repository, DTO
   - DB: 테이블, 필드, 제약조건, 상태값, 실제 검증 기록
5. 사용자가 문서 갱신을 요청한 범위만 수정한다.
6. 범위가 넓거나 모호하면 변경 후보, 영향 문서, 새로 생성될 결과 보고서를 먼저 제시하고 승인받는다.
7. 기존 사용자 변경이나 다른 팀원의 변경을 덮어쓰지 않는다.

## 증거와 불일치 처리

- 코드로 직접 확인한 구현 사실은 문서에 반영할 수 있다.
- 파일 경로, 함수명, 화면 상태, API method/path, DTO 필드, 상태값, 검증 결과를 추정하지 않는다.
- 코드가 Product Bible 또는 Screen Bible의 사용자 경험·업무 규칙과 충돌하면 `결정 필요`로 기록한다.
- 승인된 API 명세와 실제 구현이 다르면 어느 한쪽을 자동 정답 처리하지 않는다.
- Mock 화면, 실제 API 연결, DB 반영, 결제 승인, 결제 취소, 결제 환불은 서로 다른 검증 상태로 표기한다.
- Git 커밋 존재는 기능 완료, 테스트 통과, 배포 완료의 증거가 아니다.
- SQL 또는 DDL 파일 변경은 실제 DB 반영의 증거가 아니다.

다음 계약 용어는 현재 대상 기능의 실제 코드 또는 승인된 명세에서 확인된 경우에만 사용한다.

- `totalAmount`
- `approvedAmount`
- `approvedAt`
- `waitingOrderCount`
- `CANCELED`
- `APPROVED`

관련 없는 기능에 특정 필드명이나 상태값을 강제로 적용하지 않는다.

레거시 이름은 실제 adapter, mapper, compatibility layer 또는 Mock 경계가 확인된 경우에만 그렇게 표기한다.

## 보조 스킬 선택

범위에 맞는 기존 ASAK 스킬을 함께 사용할 수 있다.

| 범위 | 보조 스킬 | 확인할 내용 |
|---|---|---|
| API 명세 | `asak-api` | 요청·응답·오류·클라이언트 계약 |
| React 화면 | `asak-react-review` | Screen ID, 상태, 컴포넌트·Hook 흐름 |
| Spring/Mapper | `asak-backend-review` | Controller·Service·Mapper·DTO |
| DB 문서 | `asak-db` | 테이블·필드·상태 전이·DTO 매핑 |
| Figma/Screen Bible | `asak-figma-review` | Frame/Node, 문구, 화면 상태 |
| 테스트 문서 | `asak-test-plan` | Default·Loading·Empty·Error·Disabled 검증 |

보조 스킬의 분석 결과도 실제 파일과 실행 근거로 다시 확인한 뒤 문서에 반영한다.

보조 스킬이 현재 세션에 없으면 없는 기능을 사용한 것처럼 표현하지 않는다.

## 문서 갱신 절차

1. 문서별로 다음을 정리한다.
   - 현재 문장
   - 코드 또는 실행 근거
   - 변경 제안
   - 영향 화면·API·DB
   - 상태
2. 구현 사실과 명세 의도를 분리해 다음 상태 중 알맞은 것을 붙인다.
   - `구현됨`
   - `Mock`
   - `미연결`
   - `미검증`
   - `구현 불일치`
   - `계약 불일치`
   - `결정 필요`
3. 승인된 문서만 최소 범위로 수정한다.
4. 관련 없는 기존 문구, 링크, 팀원 변경, 날짜 기록은 보존한다.
5. API 문서에는 실제 확인된 범위에서 다음을 명시한다.
   - method
   - path
   - 인증
   - 요청 필드
   - 응답 필드
   - 상태값
   - 오류
6. 화면 문서에는 실제 확인된 범위에서 다음을 명시한다.
   - Screen ID
   - 상태
   - 이동
   - 문구
   - 데이터 필드
   - 재사용 컴포넌트
   - Figma Frame/Node
7. DB 문서에는 실제 확인된 범위에서 다음을 명시한다.
   - 테이블
   - 컬럼
   - 타입
   - 제약조건
   - 상태 전이
   - DTO·Mapper 매핑
   - 실제 DB 반영 여부
8. 추정이 필요한 내용은 본문에 사실처럼 쓰지 않고 `결정 필요` 또는 `미확인`으로 분리한다.

## 결과 근거 보고서

이 스킬 호출은 승인된 문서 수정 외에 결과 근거 보고서 1개를 생성하거나 갱신하는 것까지 포함한다.

기본 경로:

```text
docs/ai-reports/YYYY-MM-DD/asak-doc-sync-<짧은-주제>.md
```

보고서에는 다음을 적는다.

1. 대상 저장소와 기준 커밋
2. 확인한 코드·문서·Figma·테스트
3. 갱신한 문서
4. 변경 근거
5. 실행 또는 검증 결과
6. 남은 불일치
7. 결정 필요 사항
8. 수정하지 않은 범위

기존 파일이 있으면 덮어쓰기 전에 읽고 기존 기록을 보존한다.

같은 주제의 연속 작업이면 기존 보고서에 날짜 또는 작업 구간을 구분해 추가한다.

별도 주제이면 새 파일을 만든다.

새 보고서 파일도 최종 변경 파일 목록에 별도로 표시한다.

## 검증과 마무리

1. 갱신 문서를 다시 읽어 코드 근거와 method/path/필드/상태값이 일치하는지 확인한다.
2. 수정한 문서와 결과 보고서에 대해 `git diff --check`를 실행한다.
3. 수정한 상대 링크의 대상 존재 여부를 확인한다.
4. 실행 검증을 했으면 실제 명령과 실제 결과만 기록한다.
5. 실행하지 않은 항목을 통과로 쓰지 않는다.
6. 자동 commit, push, branch, merge 작업은 하지 않는다.
7. 소스코드, DB, Figma, 원격 문서는 수정하지 않는다.
8. 사용자에게는 갱신 문서, 결과 보고서, 남은 결정 필요 사항만 짧게 전달한다.
