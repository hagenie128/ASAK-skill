param([string]$Root = (Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference = 'Stop'
$source = Join-Path $Root 'sources\skills'
$targets = @(
  (Join-Path $Root 'packages\codex\plugin\asak-agent-kit\skills'),
  (Join-Path $Root 'packages\claude-code\.claude\skills'),
  (Join-Path $Root 'packages\antigravity\.agent\skills')
)
foreach ($target in $targets) {
  New-Item -ItemType Directory -Force -Path $target | Out-Null
  Get-ChildItem -LiteralPath $source -Directory | ForEach-Object {
    $dest = Join-Path $target $_.Name
    New-Item -ItemType Directory -Force -Path $dest | Out-Null
    Copy-Item -LiteralPath (Join-Path $_.FullName 'SKILL.md') -Destination (Join-Path $dest 'SKILL.md') -Force
  }
}
Write-Host '스킬 원본을 Codex, Claude Code, Antigravity 패키지에 동기화했습니다.'
