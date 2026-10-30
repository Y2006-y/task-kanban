@echo off
chcp 65001 >nul
cd /d E:\shixun\smart_campus\task-kanban
echo ==========================================
echo   任务管理看板 - Vite 开发服务器
echo   访问地址: http://localhost:8085
echo   关闭此窗口即停止服务
echo ==========================================
npx vite --host 0.0.0.0 --port 8085
pause