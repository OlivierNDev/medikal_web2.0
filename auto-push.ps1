# Auto-push script for Medikal project
# This script watches for file changes and automatically commits and pushes to GitHub

param(
    [switch]$Watch = $false,
    [string]$CommitMessage = "Auto-commit: Update files"
)

$RepoPath = "d:\0x\ZeroX\Medikal Project\Medikal\Medikal1.0"
$RemoteRepo = "https://github.com/OlivierNDev/medikal_web2.0.git"

# Function to commit and push
function Push-Changes {
    param([string]$Message)
    
    Set-Location $RepoPath
    
    # Check if there are changes
    $status = git status --porcelain
    if ($status) {
        Write-Host "Changes detected. Committing and pushing..." -ForegroundColor Yellow
        
        # Add all changes
        git add .
        
        # Commit
        git commit -m $Message
        
        # Push to remote
        git push origin main
        
        Write-Host "Successfully pushed to $RemoteRepo" -ForegroundColor Green
    } else {
        Write-Host "No changes to commit." -ForegroundColor Gray
    }
}

# Immediate push if not in watch mode
if (-not $Watch) {
    Push-Changes -Message $CommitMessage
    exit
}

# Watch mode - monitor file changes
Write-Host "Watching for file changes. Press Ctrl+C to stop." -ForegroundColor Cyan
Write-Host "Repository: $RemoteRepo" -ForegroundColor Cyan

$lastCommit = Get-Date

while ($true) {
    Start-Sleep -Seconds 5
    
    # Check for changes every 5 seconds
    Set-Location $RepoPath
    $status = git status --porcelain
    
    if ($status) {
        $timeSinceLastCommit = (Get-Date) - $lastCommit
        
        # Only commit if it's been at least 10 seconds since last commit (debounce)
        if ($timeSinceLastCommit.TotalSeconds -gt 10) {
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            $message = "$CommitMessage - $timestamp"
            Push-Changes -Message $message
            $lastCommit = Get-Date
        }
    }
}
