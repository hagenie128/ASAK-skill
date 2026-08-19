# 수동 설치 가이드

자동 설치기가 실행되지 않을 때만 사용합니다. 기존 설정 파일은 먼저 백업하고, 같은 이름의 파일을 덮어쓰지 마세요.

## Codex

`packages/codex/plugin/asak-agent-kit/skills`를 프로젝트의 `.agents/skills`에 복사합니다. 기존 `AGENTS.md`가 없을 때만 `packages/codex/templates/AGENTS.md`를 프로젝트 루트에 복사합니다.

## Claude Code

`packages/claude-code/.claude/skills`를 프로젝트의 `.claude/skills`에 복사합니다. 기존 `CLAUDE.md`가 없을 때만 함께 복사합니다.

## Cursor

`packages/cursor/.cursor`를 프로젝트의 `.cursor`에 복사합니다. 이미 같은 이름의 규칙이나 명령이 있으면 비교 후 팀원이 직접 병합합니다.

## GitHub Copilot

`packages/github-copilot/.github`를 프로젝트의 `.github`에 복사합니다. `prompts`, `instructions`, `agents` 폴더가 생성되는지 확인합니다.

## Antigravity

`packages/antigravity/.agent`를 프로젝트의 `.agent`에 복사합니다. `AGENTS.md`와 `GEMINI.md`는 기존 파일이 없을 때만 프로젝트 루트에 복사합니다.

## ChatGPT

`packages/chatgpt/프로젝트-지침에-붙여넣기.md` 내용을 ChatGPT 프로젝트 지침에 붙여넣습니다. 필요하면 `채팅에서-쓸-명령어.md`도 프로젝트 자료로 추가합니다.
