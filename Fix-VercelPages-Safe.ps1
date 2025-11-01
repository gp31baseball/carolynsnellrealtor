Write-Host ""
Write-Host "Starting Vercel page-router prep (plain mode)..."

$projectRoot = Get-Location
$srcPath     = Join-Path $projectRoot "src"
$pagesSrc    = Join-Path $srcPath "pages"
$pagesDest   = Join-Path $projectRoot "pages"
$appPath     = Join-Path $srcPath "app"
$backupDir   = Join-Path $projectRoot "backup_before_vercel_fix_safe"

# --- Backup ---
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
    Copy-Item -Path $srcPath -Destination $backupDir -Recurse -Force
    Write-Host "Backup created at $backupDir"
} else {
    Write-Host "Backup already exists, skipping..."
}

# --- Move pages ---
if (Test-Path $pagesSrc) {
    Move-Item -Path $pagesSrc -Destination $pagesDest -Force
    Write-Host "Moved /src/pages -> /pages"
}

# --- Move favicon ---
$icon = Join-Path $appPath "favicon.ico"
if (Test-Path $icon) {
    Move-Item $icon ".\public\" -Force
    Write-Host "Moved favicon.ico to /public"
}

# --- Remove app folder (safe) ---
if (Test-Path $appPath) {
    Remove-Item -Recurse -Force $appPath
    Write-Host "Removed /src/app (CSS untouched)"
}

# --- Update next.config.js ---
$configPath = Join-Path $projectRoot "next.config.js"
if (Test-Path $configPath) {
    $cfg = Get-Content $configPath -Raw
    if ($cfg -notmatch "appDir") {
        $insert = '  reactStrictMode: true,' + [Environment]::NewLine +
                  '  experimental: {' + [Environment]::NewLine +
                  '    appDir: false,' + [Environment]::NewLine +
                  '  },' + [Environment]::NewLine
        $cfg = $cfg -replace '(?<=const nextConfig = {)', $insert
        Set-Content $configPath $cfg
        Write-Host "next.config.js updated with appDir:false"
    } else {
        Write-Host "next.config.js already configured"
    }
}

Write-Host ""
Write-Host "Done. Ready to redeploy to Vercel. Run Restore-VercelFix.ps1 to undo."
