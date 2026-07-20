# 학원 PC용 — 지금 Cursor 확장/설정/키바인딩/Power Mode 복구
# 사용:
#   1) ASAK-workspace 를 clone 하거나 USB로 복사
#   2) PowerShell에서:
#        cd c:\ASAK-workspace\scripts\my-cursor-kit
#        .\install.ps1
#   3) Cursor에서 Ctrl+Shift+P → Developer: Reload Window
#
# 옵션:
#   .\install.ps1 -Editor Cursor          # Cursor만
#   .\install.ps1 -SkipExtensions         # 설정만
#   .\install.ps1 -SkipPowerMode          # GIF 설정 생략

param(
    [ValidateSet("Cursor", "Code", "Both")]
    [string]$Editor = "Cursor",
    [switch]$SkipExtensions,
    [switch]$SkipPowerMode,
    [switch]$SkipKeybindings,
    [switch]$SkipSettings
)

$ErrorActionPreference = "Stop"
$kitDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path (Join-Path $kitDir "..\..")
$extFile = Join-Path $kitDir "extensions.txt"
$coreSettings = Join-Path $kitDir "settings.core.json"
$keybindingsSrc = Join-Path $kitDir "keybindings.json"
$powermodeScript = Join-Path $repoRoot "scripts\powermode\setup-powermode.ps1"

function Get-EditorCommand {
    param([string]$Name)
    if ($Name -eq "Cursor") {
        $cmd = Get-Command cursor -ErrorAction SilentlyContinue
        if ($cmd) { return $cmd.Source }
        throw "cursor 명령을 찾을 수 없습니다. Cursor를 설치했는지 PATH를 확인하세요."
    }
    $cmd = Get-Command code -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    throw "code 명령을 찾을 수 없습니다. VS Code를 설치했는지 PATH를 확인하세요."
}

function Get-UserDir {
    param([string]$Name)
    if ($Name -eq "Cursor") {
        return (Join-Path $env:APPDATA "Cursor\User")
    }
    return (Join-Path $env:APPDATA "Code\User")
}

function Merge-JsonSettings {
    param(
        [string]$TargetPath,
        [string]$CorePath
    )

    $core = Get-Content $CorePath -Raw -Encoding UTF8 | ConvertFrom-Json
    if (-not (Test-Path $TargetPath)) {
        $dir = Split-Path -Parent $TargetPath
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
        Set-Content -Path $TargetPath -Value "{}" -Encoding UTF8
    }

    # JSONC(주석) 있을 수 있어 단순 키 치환/삽입
    $content = Get-Content $TargetPath -Raw -Encoding UTF8
    if ([string]::IsNullOrWhiteSpace($content)) { $content = "{}" }

    foreach ($prop in $core.PSObject.Properties) {
        $key = $prop.Name
        $val = $prop.Value
        $escaped = [regex]::Escape($key)

        if ($val -is [bool]) {
            $jsonVal = $val.ToString().ToLower()
            $line = "  `"$key`": $jsonVal"
        } elseif ($null -eq $val) {
            continue
        } elseif ($val -is [int] -or $val -is [long] -or $val -is [double]) {
            $line = "  `"$key`": $val"
            $jsonVal = "$val"
        } elseif ($val -is [string]) {
            $safe = $val -replace '\\', '\\' -replace '"', '\"'
            $line = "  `"$key`": `"$safe`""
            $jsonVal = "`"$safe`""
        } else {
            # object (styles 등)
            $jsonVal = ($val | ConvertTo-Json -Compress -Depth 8)
            $line = "  `"$key`": $jsonVal"
        }

        if ($content -match "`"$escaped`"\s*:") {
            if ($val -is [string] -or $val -is [bool] -or $val -is [int] -or $val -is [long] -or $val -is [double]) {
                $content = [regex]::Replace(
                    $content,
                    "`"$escaped`"\s*:\s*[^,\r\n}]+",
                    "`"$key`": $jsonVal"
                )
            } else {
                # object: replace from key to matching end is hard — remove then insert
                $content = [regex]::Replace(
                    $content,
                    "(?s)\s*`"$escaped`"\s*:\s*\{(?:[^{}]|\{[^{}]*\})*\}\s*,?",
                    ""
                )
                $content = $content -replace "\{\s*", "{`n$line,`n"
            }
        } else {
            $content = $content -replace "\{\s*", "{`n$line,`n"
        }
    }

    $content = $content -replace ',\s*\r?\n}', "`n}"
    Set-Content -Path $TargetPath -Value $content -Encoding UTF8 -NoNewline
}

$targets = @()
if ($Editor -eq "Cursor" -or $Editor -eq "Both") { $targets += "Cursor" }
if ($Editor -eq "Code" -or $Editor -eq "Both") { $targets += "Code" }

Write-Host "=== ASAK my-cursor-kit install ===" -ForegroundColor Cyan
Write-Host "Repo: $repoRoot"
Write-Host "Editors: $($targets -join ', ')"
Write-Host ""

# 1) Extensions
if (-not $SkipExtensions) {
    if (-not (Test-Path $extFile)) { throw "extensions.txt 없음: $extFile" }
    $exts = Get-Content $extFile | Where-Object { $_.Trim() -ne "" }
    foreach ($ed in $targets) {
        $cli = Get-EditorCommand -Name $ed
        Write-Host "[$ed] 확장 설치 ($($exts.Count)개)..." -ForegroundColor Yellow
        foreach ($ext in $exts) {
            Write-Host "  - $ext"
            & $cli --install-extension $ext --force 2>$null | Out-Null
        }
    }
} else {
    Write-Host "Skip extensions"
}

# 2) Settings
if (-not $SkipSettings) {
    if (-not (Test-Path $coreSettings)) { throw "settings.core.json 없음" }
    foreach ($ed in $targets) {
        $userDir = Get-UserDir -Name $ed
        $settingsPath = Join-Path $userDir "settings.json"
        Write-Host "[$ed] settings 병합: $settingsPath" -ForegroundColor Yellow
        Merge-JsonSettings -TargetPath $settingsPath -CorePath $coreSettings
    }
} else {
    Write-Host "Skip settings"
}

# 3) Keybindings
if (-not $SkipKeybindings) {
    foreach ($ed in $targets) {
        $userDir = Get-UserDir -Name $ed
        $dest = Join-Path $userDir "keybindings.json"
        New-Item -ItemType Directory -Force -Path $userDir | Out-Null
        Copy-Item $keybindingsSrc $dest -Force
        Write-Host "[$ed] keybindings 복사: $dest" -ForegroundColor Yellow
    }
} else {
    Write-Host "Skip keybindings"
}

# 4) Power Mode GIFs
if (-not $SkipPowerMode) {
    if (-not (Test-Path $powermodeScript)) {
        Write-Warning "Power Mode 스크립트 없음: $powermodeScript"
    } else {
        Write-Host "Power Mode GIF 설정..." -ForegroundColor Yellow
        & $powermodeScript -User -Editor $Editor
    }
} else {
    Write-Host "Skip Power Mode"
}

Write-Host ""
Write-Host "완료. Cursor에서 Reload Window 하세요." -ForegroundColor Green
Write-Host "  Ctrl+Shift+P → Developer: Reload Window"
