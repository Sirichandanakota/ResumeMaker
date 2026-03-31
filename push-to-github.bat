@echo off
REM ResumeMaker GitHub Push Script
REM This script helps you authenticate and push to GitHub

echo.
echo ========================================
echo ResumeMaker - GitHub Push Helper
echo ========================================
echo.
echo This script will help you push your code to GitHub.
echo.
echo Option 1: GitHub CLI (Recommended)
echo   - Requires: GitHub CLI installed (https://cli.github.com/)
echo   - Command: gh auth login
echo   - Then run this script again
echo.
echo Option 2: Personal Access Token (PAT)
echo   - Create token at: https://github.com/settings/tokens
echo   - Scopes: repo (full control of private repositories)
echo.
echo Option 3: SSH Keys
echo   - Generate SSH key: ssh-keygen -t ed25519
echo   - Add to GitHub: https://github.com/settings/ssh
echo.
echo ========================================
echo.

REM Check if GitHub CLI is available
where gh >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo GitHub CLI detected. Authenticating...
    call gh auth login
    cd "c:\RESUME MAKER"
    git push -u origin main
    echo.
    echo ✓ Push successful!
    pause
    exit /b 0
)

REM Check for git credential manager
echo.
echo Attempting to push with standard git credentials...
cd "c:\RESUME MAKER"
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ Push successful!
    echo.
    echo Your code is now on GitHub: https://github.com/Sirichandanakota/resume-maker
    pause
    exit /b 0
) else (
    echo.
    echo ✗ Push failed. Try these options:
    echo.
    echo 1. Install GitHub CLI: https://cli.github.com/
    echo    Then run: gh auth login
    echo.
    echo 2. Create Personal Access Token:
    echo    https://github.com/settings/tokens
    echo    Create token with 'repo' scope
    echo    Then use: git push -u origin main
    echo.
    echo 3. Setup SSH:
    echo    ssh-keygen -t ed25519
    echo    Add key to: https://github.com/settings/ssh
    echo    Update remote: git remote set-url origin git@github.com:Sirichandanakota/resume-maker.git
    echo.
    pause
    exit /b 1
)
