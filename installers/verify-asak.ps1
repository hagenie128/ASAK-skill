$ErrorActionPreference = 'Stop'

$target = (Read-Host '확인할 프로젝트 최상단 폴더 경로').Trim().Trim('"')
if (-not (Test-Path -LiteralPath $target -PathType Container)) {
    Write-Error '입력한 프로젝트 폴더를 찾지 못했습니다.'
}
$target = (Resolve-Path -LiteralPath $target).Path

$checks = @(
    @{ Name = 'Codex 스킬'; Path = '.agents\skills' },
    @{ Name = 'Claude Code 스킬'; Path = '.claude\skills' },
    @{ Name = 'Cursor 규칙'; Path = '.cursor\rules' },
    @{ Name = 'GitHub Copilot 지침'; Path = '.github\instructions' },
    @{ Name = 'Antigravity 스킬'; Path = '.agent\skills' }
)

Write-Host ''
foreach ($check in $checks) {
    if (Test-Path -LiteralPath (Join-Path $target $check.Path)) {
        Write-Host "[확인] $($check.Name)"
    }
}
Write-Host ''
Write-Host '표시되지 않은 도구는 아직 설치하지 않았거나 다른 프로젝트에 설치했을 수 있습니다.'
Read-Host '종료하려면 Enter'


