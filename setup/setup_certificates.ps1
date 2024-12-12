$certExamplePath = "./cert-example"
$certPath = "../cert"

if (-Not (Test-Path -Path $certPath)) {
    Write-Host "setting up certificates..."

    Copy-item -Force -Recurse -Verbose $certExamplePath -Destination $certPath
}
else {
    Write-Host "certificate folder already exists"
}