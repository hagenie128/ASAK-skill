# 현재 PC 환경을 임시 노트북용으로보내기
# USB나 클라우드에 scripts 폴더 전체를 복사하면 됩니다.

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$OutDir = Join-Path $ScriptDir "export"
New-Item -ItemType Directory -Path $OutDir -Force | Out-Null

Write-Host "확장 프로그램 목록 저장..."
cursor --list-extensions 2>$null | Sort-Object -Unique | Out-File -Encoding utf8 (Join-Path $ScriptDir "cursor-extensions.txt")

Write-Host "설치된 프로그램 버전 저장..."
@(
    "node: $(node -v 2>$null)",
    "npm: $(npm -v 2>$null)",
    "java: $(java -version 2>&1 | Select-Object -First 1)",
    "git: $(git --version 2>$null)",
    "gh: $(gh --version 2>$null | Select-Object -First 1)",
    "docker: $(docker --version 2>$null)"
) | Out-File -Encoding utf8 (Join-Path $OutDir "versions.txt")

Write-Host "전역 npm 패키지 저장..."
npm list -g --depth=0 2>$null | Out-File -Encoding utf8 (Join-Path $OutDir "npm-global.txt")

Write-Host "MySQL 버전 저장..."
if (Test-Path "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe") {
    & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" --version 2>&1 | Out-File -Encoding utf8 (Join-Path $OutDir "mysql-version.txt")
}

Write-Host ""
Write-Host "완료. 아래 폴더를 임시 노트북으로 복사하세요:" -ForegroundColor Green
Write-Host "  $ScriptDir"
