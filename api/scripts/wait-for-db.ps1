param(
    [int]$TimeoutSeconds = 60,
    [string]$ServiceName = "api-db-1",
    [string]$User = "root",
    [string]$Password = "root"
)

Write-Host "Waiting for database container '$ServiceName' to be ready (timeout ${TimeoutSeconds}s)..."
$start = Get-Date
while (($Duration = (New-TimeSpan -Start $start -End (Get-Date)).TotalSeconds) -lt $TimeoutSeconds) {
    try {
        docker exec $ServiceName mysqladmin ping -u $User -p$Password --silent > $null 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Database is ready (elapsed ${Duration}s)."
            exit 0
        }
    } catch {
        # ignore and continue
    }
    Start-Sleep -Seconds 1
}

Write-Error "Timeout waiting for database container '$ServiceName' to be ready after ${TimeoutSeconds} seconds."
exit 1
