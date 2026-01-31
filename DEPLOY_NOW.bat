@echo off
echo ========================================
echo   DEPLOIEMENT AUTOMATIQUE API
echo ========================================
echo.

echo Etape 1: Initialisation Git...
git init
if errorlevel 1 (
    echo ERREUR: Git n'est pas installe correctement
    echo Installez Git depuis https://git-scm.com
    pause
    exit
)

echo.
echo Etape 2: Ajout des fichiers...
git add .
git commit -m "Initial API setup - Gestion Bar Remote Management"

echo.
echo Etape 3: Configuration du remote...
echo Veuillez entrer votre pseudo GitHub:
set /p github_user="Votre pseudo GitHub: "

git remote add origin https://github.com/%github_user%/gestion-bar-api.git
git branch -M main

echo.
echo Etape 4: Push vers GitHub...
git push -u origin main
if errorlevel 1 (
    echo ERREUR: Impossible de push vers GitHub
    echo Verifiez:
    echo 1. Votre pseudo GitHub est correct
    echo 2. Le repository existe sur GitHub
    echo 3. Vous etes connecte a GitHub
    pause
    exit
)

echo.
echo ========================================
echo   PUSH REUSSI SUR GITHUB!
echo ========================================
echo.
echo Prochaines etapes:
echo 1. Allez sur https://render.com
echo 2. Connectez-vous avec GitHub
echo 3. New Web Service
echo 4. Selectionnez gestion-bar-api
echo 5. Runtime: Node
echo 6. Build: npm install
echo 7. Start: npm start
echo 8. Instance: Free
echo 9. Advanced Settings:
echo    NODE_ENV = production
echo    PORT = 10000
echo    JWT_SECRET = votre_secret_123456
echo.
echo Votre URL sera: https://gestion-bar-api.onrender.com
echo.
pause
