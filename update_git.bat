@echo off
title Cap nhat website mkgvn
cd /d "%~dp0"
echo Dang quet thay doi trong folder mkgvn ...

:: 1. Cau hinh URL voi Token cua ban cho repo PM
git remote set-url origin https://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@github.com/quy281/mkgvn2.git

:: 2. Loai bo cac file rac neu co
git rm -r --cached node_modules 2>nul
git rm -r --cached dist 2>nul

:: 3. Thuc hien commit va push
git add .
git commit -m "Cap nhat website mkgvn %date% %time%"

:: 4. Push len nhanh main (Dung -f de tranh loi 'fetch first' nhu luc nay)
git push origin main -f

echo.
echo === DA XONG! Repo PM da duoc cap nhat ===
pause