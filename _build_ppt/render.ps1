param([string]$Deck = "C:\ASAK-workspace\ASAK_샐러드_스마트키오스크_발표.pptx",
      [string]$OutDir = "C:\ASAK-workspace\_build_ppt\render")

if (Test-Path $OutDir) { Remove-Item "$OutDir\*" -Force -ErrorAction SilentlyContinue }
else { New-Item -ItemType Directory -Force $OutDir | Out-Null }

$app = New-Object -ComObject PowerPoint.Application
$pres = $app.Presentations.Open($Deck, $true, $false, $false)   # ReadOnly, no window
try {
  for ($i = 1; $i -le $pres.Slides.Count; $i++) {
    $n = "{0:D2}" -f $i
    $pres.Slides.Item($i).Export("$OutDir\slide-$n.png", "PNG", 1400, 788)
  }
  "exported: $($pres.Slides.Count) slides"
}
finally {
  $pres.Close()
  $app.Quit()
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($app) | Out-Null
}
