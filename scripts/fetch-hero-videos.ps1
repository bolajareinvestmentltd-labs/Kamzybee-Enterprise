# Download sample hero videos into public/videos
$dest = Join-Path $PSScriptRoot "..\public\videos"
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }

$files = @(
    @{ url = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'; out = 'hero.webm' },
    @{ url = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'; out = 'hero.mp4' }
)

foreach ($f in $files) {
    $outPath = Join-Path $dest $f.out
    Write-Host "Downloading $($f.url) -> $outPath"
    try {
        Invoke-WebRequest -Uri $f.url -OutFile $outPath -UseBasicParsing -ErrorAction Stop
        Write-Host "Saved: $outPath"
    } catch {
        Write-Host "Failed to download $($f.url): $_" -ForegroundColor Yellow
    }
}

Write-Host "Done. Make sure files are present in public/videos and restart dev server if needed."