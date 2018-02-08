set apiFQDN=%1
set accountFQDN=%2
set webAppFQDN=%3
REM call npm install
call npm test
set "apiFQDN="
set "accountFQDN="
set "webAppFQDN="