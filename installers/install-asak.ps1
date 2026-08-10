$ErrorActionPreference = 'Stop'

function Copy-NewFiles {
    param([string]$Source, [string]$Destination)

    $sourcePath = (Resolve-Path -LiteralPath $Source).Path.TrimEnd('\\')
    $copied = 0
    $skipped = 0

    Get-ChildItem -LiteralPath $sourcePath -File -Recurse | ForEach-Object {
        $relativePath = $_.FullName.Substring($sourcePath.Length).TrimStart('\\')
        $destinationFile = Join-Path $Destination $relativePath

        if (Test-Path -LiteralPath $destinationFile) {
            $skipped++
            return
        }

        New-Item -ItemType Directory -Force -Path (Split-Path -Parent $destinationFile) | Out-Null
        Copy-Item -LiteralPath $_.FullName -Destination $destinationFile
        $copied++
    }

    return @{ Copied = $copied; Skipped = $skipped }
}

function Copy-RootFileSafely {
    param([string]$Source, [string]$Target, [string]$FallbackName)

    $destination = Join-Path $Target (Split-Path -Leaf $Source)
    if (Test-Path -LiteralPath $destination) {
        $destination = Join-Path $Target $FallbackName
    }

    if (Test-Path -LiteralPath $destination) {
        return @{ Copied = 0; Skipped = 1; Path = $destination }
    }

    Copy-Item -LiteralPath $Source -Destination $destination
    return @{ Copied = 1; Skipped = 0; Path = $destination }
}

$toolkitRoot = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$packages = Join-Path $toolkitRoot 'packages'

Write-Host ''
Write-Host '=========================================='
Write-Host ' ASAK Agent Kit 설치'
Write-Host '=========================================='
Write-Host '1. Codex'
Write-Host '2. Claude Code'
Write-Host '3. Cursor'
Write-Host '4. GitHub Copilot'
Write-Host '5. Antigravity'
Write-Host '6. ChatGPT (수동 안내)'
Write-Host '0. 종료'

$choice = (Read-Host '사용하는 AI 번호').Trim()
if ($choice -eq '0') { exit 0 }

if ($choice -eq '6') {
    Write-Host ''
    Write-Host 'ChatGPT는 파일을 복사하지 않습니다.'
    Write-Host (Join-Path $packages 'chatgpt\프로젝트_지침에_붙여넣기.md')
    Write-Host '파일을 열어 ChatGPT 프로젝트 지침에 붙여넣으세요.'
    Read-Host '종료하려면 Enter'
    exit 0
}

$tool = switch ($choice) {
    '1' { 'codex' }
    '2' { 'claude-code' }
    '3' { 'cursor' }
    '4' { 'github-copilot' }
    '5' { 'antigravity' }
    default { $null }
}

if (-not $tool) {
    Write-Error '올바른 번호를 입력하세요.'
}

$rawTarget = Read-Host '적용할 프로젝트 최상단 폴더 경로'
$target = $rawTarget.Trim().Trim('"')
if (-not (Test-Path -LiteralPath $target -PathType Container)) {
    Write-Error '입력한 프로젝트 폴더를 찾지 못했습니다.'
}
$target = (Resolve-Path -LiteralPath $target).Path

$result = @{ Copied = 0; Skipped = 0 }
switch ($tool) {
    'codex' {
        $result = Copy-NewFiles (Join-Path $packages 'codex\plugin\asak-agent-kit\skills') (Join-Path $target '.agents\skills')
        $guidance = Copy-RootFileSafely (Join-Path $packages 'codex\templates\AGENTS.md') $target 'AGENTS_ASAK_AGENT_KIT.md'
        $result.Copied += $guidance.Copied
        $result.Skipped += $guidance.Skipped
    }
    'claude-code' {
        $result = Copy-NewFiles (Join-Path $packages 'claude-code\.claude') (Join-Path $target '.claude')
        $guidance = Copy-RootFileSafely (Join-Path $packages 'claude-code\CLAUDE.md') $target 'CLAUDE_ASAK_AGENT_KIT.md'
        $result.Copied += $guidance.Copied
        $result.Skipped += $guidance.Skipped
    }
    'cursor' {
        $result = Copy-NewFiles (Join-Path $packages 'cursor\.cursor') (Join-Path $target '.cursor')
    }
    'github-copilot' {
        $result = Copy-NewFiles (Join-Path $packages 'github-copilot\.github') (Join-Path $target '.github')
    }
    'antigravity' {
        $result = Copy-NewFiles (Join-Path $packages 'antigravity\.agent') (Join-Path $target '.agent')
        $agents = Copy-RootFileSafely (Join-Path $packages 'antigravity\AGENTS.md') $target 'AGENTS_ASAK_AGENT_KIT.md'
        $gemini = Copy-RootFileSafely (Join-Path $packages 'antigravity\GEMINI.md') $target 'GEMINI_ASAK_AGENT_KIT.md'
        $result.Copied += $agents.Copied + $gemini.Copied
        $result.Skipped += $agents.Skipped + $gemini.Skipped
    }
}

$commands = Copy-RootFileSafely (Join-Path $packages "$tool\한국어_명령어_표.md") $target 'ASAK_AGENT_KIT_COMMANDS.md'
$result.Copied += $commands.Copied
$result.Skipped += $commands.Skipped

Write-Host ''
Write-Host '설치가 완료되었습니다.'
Write-Host "새 파일: $($result.Copied)개 / 기존 파일 보존: $($result.Skipped)개"
Write-Host 'AI 프로그램을 다시 열어 새 설정과 스킬을 불러오세요.'
Write-Host '기존 지침이 있었다면 *_ASAK_AGENT_KIT.md 파일을 비교해 팀에서 직접 병합하세요.'
Read-Host '종료하려면 Enter'


