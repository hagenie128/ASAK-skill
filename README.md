<div align="center">

# 🤖 ASAK Agent Kit

**ASAK 팀을 위한 AI 작업 가이드 · 재사용 스킬 · 설치 패키지**

![Cursor](https://img.shields.io/badge/Cursor-Supported-111827?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-Supported-111827?style=flat-square&logo=openai&logoColor=white)
![Claude](https://img.shields.io/badge/Claude_Code-Supported-D97757?style=flat-square)
![Windows](https://img.shields.io/badge/Windows-Installer-0078D4?style=flat-square&logo=windows&logoColor=white)

[설치](#-팀원-설치-방법) · [구조](#-폴더-구조) · [동기화](#-스킬-동기화) · [업데이트](#-업데이트)

</div>

---

지원 도구: **Codex · Claude Code · Cursor · GitHub Copilot · Antigravity · ChatGPT**

## 📦 팀원 설치 방법

Git을 설치하거나 `git clone`할 필요는 없습니다.

1. GitHub의 **Releases**에서 ZIP 파일을 다운로드합니다.
2. 압축을 풉니다.
3. `installers/install-asak.cmd`를 더블클릭합니다.
4. 사용하는 AI 도구와 적용할 프로젝트 폴더를 고릅니다.

설치기는 기존 파일을 덮어쓰지 않습니다. 이미 `AGENTS.md`, `CLAUDE.md`, `.cursor`, `.github` 등이 있으면 새 ASAK 파일만 추가하거나 별도 안내 파일로 보관합니다.

## 🗂️ 폴더 구조

- `packages/`: AI 도구별 설치 패키지
- `sources/`: 공통 스킬 원본
- `installers/`: Windows 설치·검증 도구
- `docs/`: 설치와 명령어 안내
- `metadata/`: 툴킷 매니페스트
- `scripts/`: 스킬 동기화·검증 스크립트

## 🔄 스킬 동기화

원본(`sources/skills`)을 Codex / Claude Code / Antigravity 패키지에 반영:

```powershell
cd C:\ASAK-workspace\ASAK-skill
.\scripts\sync-skills.ps1
.\scripts\verify-skills.ps1
```

## 🧠 Codex

Codex용 패키지는 일반 프로젝트 설치용 스킬과 플러그인 배포 구조를 함께 제공합니다. 프로젝트에 직접 설치할 때는 `.agents/skills`를 사용합니다.

## ⬆️ 업데이트

새 버전이 나오면 GitHub Releases에서 최신 ZIP을 내려받아 같은 설치기를 실행합니다. 기존 파일은 자동으로 덮어쓰지 않으므로, 변경된 지침은 안내 파일을 비교해 팀에서 직접 병합합니다.

## 🔐 라이선스와 배포 전 확인

외부 공개 전에는 팀의 라이선스, 로고·이미지 사용 권한, 프로젝트 내부 정보 포함 여부를 확인하세요.
