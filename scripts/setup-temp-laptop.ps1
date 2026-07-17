# ASAK 임시 노트북 1회 설치 스크립트 (2026-07-17 기준)
# 사용법 (PowerShell 관리자 권한 권장):
#   Set-ExecutionPolicy -Scope Process Bypass
#   .\setup-temp-laptop.ps1
#
# 옵션:
#   -SkipClone        Git clone 건너뛰기
#   -SkipExtensions   Cursor/VS Code 확장 설치 건너뛰기
#   -SkipEclipse      Eclipse IDE 설치 건너뛰기
#   -UseForkUrls      fork 저장소 URL 사용 (아래 $ForkOwner 수정)

param(
    [switch]$SkipClone,
    [switch]$SkipExtensions,
    [switch]$SkipEclipse,
    [switch]$UseForkUrls
)

$ErrorActionPreference = "Stop"
$WorkspaceRoot = "C:\ASAK-workspace"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$CursorExtensionsFile = Join-Path $ScriptDir "cursor-extensions.txt"
$ForkOwner = "YOUR_GITHUB_USERNAME"

function Write-Step([string]$Message) {
    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Ensure-Winget {
    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
        throw "winget이 없습니다. Microsoft Store에서 App Installer를 먼저 설치하세요."
    }
}

function Install-WingetPackage([string]$Id, [string]$Name) {
    Write-Host "  - $Name ($Id)"
    winget install --id $Id -e --accept-package-agreements --accept-source-agreements --disable-interactivity | Out-Null
}

function Install-ExtensionsFromFile([string]$CliName, [string]$FilePath) {
    if (-not (Test-Path $FilePath)) {
        Write-Host "  확장 목록 없음: $FilePath" -ForegroundColor Yellow
        return
    }

    $cli = Get-Command $CliName -ErrorAction SilentlyContinue
    if (-not $cli) {
        Write-Host "  $CliName CLI가 PATH에 없습니다." -ForegroundColor Yellow
        return
    }

    Get-Content $FilePath | ForEach-Object {
        $ext = $_.Trim()
        if ($ext) {
            Write-Host "  - [$CliName] $ext"
            & $CliName --install-extension $ext --force 2>$null
        }
    }
}

Write-Step "1/5 기본 프로그램 설치 (winget)"
Ensure-Winget

$packages = @(
    @{ Id = "Git.Git"; Name = "Git" },
    @{ Id = "OpenJS.NodeJS"; Name = "Node.js" },
    @{ Id = "Azul.Zulu.25.JDK"; Name = "Azul Zulu JDK 25" },
    @{ Id = "GitHub.cli"; Name = "GitHub CLI" },
    @{ Id = "Fork.Fork"; Name = "Fork (Git client)" },
    @{ Id = "Oracle.MySQL"; Name = "MySQL 8.x" },
    @{ Id = "Anysphere.Cursor"; Name = "Cursor" },
    @{ Id = "Microsoft.VisualStudioCode"; Name = "Visual Studio Code" }
)

if (-not $SkipEclipse) {
    $packages += @{ Id = "EclipseFoundation.Eclipse.JEE"; Name = "Eclipse IDE (Java/Web)" }
}

foreach ($pkg in $packages) {
    Install-WingetPackage -Id $pkg.Id -Name $pkg.Name
}

Write-Step "2/5 전역 npm 도구 설치 (Claude Code, Codex)"
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "  Node/npm PATH 반영을 위해 PowerShell을 한 번 닫았다가 다시 열고 재실행하세요." -ForegroundColor Yellow
} else {
    $globalNpm = @(
        "pnpm",
        "create-react-app",
        "@anthropic-ai/claude-code",
        "@openai/codex"
    )
    foreach ($pkg in $globalNpm) {
        Write-Host "  - npm install -g $pkg"
        npm install -g $pkg
    }
}

if (-not $SkipClone) {
    Write-Step "3/5 ASAK 프로젝트 clone"
    New-Item -ItemType Directory -Path $WorkspaceRoot -Force | Out-Null
    Set-Location $WorkspaceRoot

    if ($UseForkUrls) {
        if ($ForkOwner -eq "YOUR_GITHUB_USERNAME") {
            throw "fork 사용 시 스크립트 상단 `$ForkOwner`를 본인 GitHub 아이디로 바꿔주세요."
        }
        $repos = @(
            @{ Dir = "ASAK"; Url = "https://github.com/$ForkOwner/ASAK.git" },
            @{ Dir = "ASAK-Kiosk"; Url = "https://github.com/$ForkOwner/ASAK-front.git" },
            @{ Dir = "ASAK-Admin"; Url = "https://github.com/$ForkOwner/ASAK_Admin.git" },
            @{ Dir = "ASAK-back"; Url = "https://github.com/$ForkOwner/ASAK-back.git" }
        )
    } else {
        $repos = @(
            @{ Dir = "ASAK"; Url = "https://github.com/hagenie128/ASAK.git" },
            @{ Dir = "ASAK-Kiosk"; Url = "https://github.com/hagenie128/ASAK-front.git" },
            @{ Dir = "ASAK-Admin"; Url = "https://github.com/hagenie128/ASAK_Admin.git" },
            @{ Dir = "ASAK-back"; Url = "https://github.com/hagenie128/ASAK-back.git" }
        )
    }

    foreach ($repo in $repos) {
        $target = Join-Path $WorkspaceRoot $repo.Dir
        if (Test-Path (Join-Path $target ".git")) {
            Write-Host "  - $($repo.Dir) 이미 있음, pull"
            git -C $target pull
        } else {
            Write-Host "  - clone $($repo.Dir)"
            git clone $repo.Url $target
        }
    }

    Write-Step "4/5 프로젝트 라이브러리 설치"
    foreach ($dir in @("ASAK", "ASAK-Kiosk", "ASAK-Admin")) {
        $pkgJson = Join-Path $WorkspaceRoot "$dir\package.json"
        if (Test-Path $pkgJson) {
            Write-Host "  - npm install in $dir"
            Push-Location (Join-Path $WorkspaceRoot $dir)
            npm install
            Pop-Location
        }
    }

    $backend = Join-Path $WorkspaceRoot "ASAK-back"
    $gradlew = Join-Path $backend "gradlew.bat"
    if (Test-Path $gradlew) {
        Write-Host "  - Gradle wrapper로 백엔드 의존성 다운로드"
        Push-Location $backend
        .\gradlew.bat --no-daemon -q test
        Pop-Location
    } else {
        Write-Host "  - gradlew.bat 없음. ASAK-back에 Gradle Wrapper가 커밋되어 있는지 확인하세요." -ForegroundColor Yellow
    }
} else {
    Write-Host "3~4단계 건너뜀 (-SkipClone)" -ForegroundColor Yellow
}

if (-not $SkipExtensions) {
    Write-Step "5/5 확장 프로그램 설치 (Cursor / VS Code)"
    Install-ExtensionsFromFile -CliName "cursor" -FilePath $CursorExtensionsFile
    Install-ExtensionsFromFile -CliName "code" -FilePath $CursorExtensionsFile
} else {
    Write-Host "5단계 건너뜀 (-SkipExtensions)" -ForegroundColor Yellow
}

Write-Step "완료"
Write-Host @"

다음 확인:
  java -version          # 25 권장
  node -v
  npm -v
  git --version
  gh auth login
  cd C:\ASAK-workspace\ASAK-back
  .\gradlew.bat test
  .\gradlew.bat bootRun

MySQL은 설치 후 root 비밀번호를 설정하고, application.yml과 맞춰주세요.
Gradle 전역 설치는 필요 없습니다. 프로젝트의 gradlew.bat만 사용하면 됩니다.
"@ -ForegroundColor Green
