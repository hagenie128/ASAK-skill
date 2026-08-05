param([string]$Root = (Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference = 'Stop'
$source = Join-Path $Root 'sources\skills'
$targets = @(
  (Join-Path $Root 'packages\codex\plugin\asak-agent-kit\skills'),
  (Join-Path $Root 'packages\claude-code\.claude\skills'),
  (Join-Path $Root 'packages\antigravity\.agent\skills')
)
$failed = $false
Get-ChildItem -LiteralPath $source -Directory | ForEach-Object {
  $name=$_.Name
  $src=Join-Path $_.FullName 'SKILL.md'
  $srcHash=(Get-FileHash -LiteralPath $src -Algorithm SHA256).Hash
  foreach($target in $targets){
    $dst=Join-Path (Join-Path $target $name) 'SKILL.md'
    if(-not (Test-Path -LiteralPath $dst)) { Write-Host "누락: $dst"; $failed=$true; continue }
    $dstHash=(Get-FileHash -LiteralPath $dst -Algorithm SHA256).Hash
    if($srcHash -ne $dstHash){ Write-Host "불일치: $dst"; $failed=$true }
  }
}
if($failed){ throw '스킬 원본과 패키지 복제본이 일치하지 않습니다.' }
Write-Host '모든 스킬 복제본이 원본과 일치합니다.'
