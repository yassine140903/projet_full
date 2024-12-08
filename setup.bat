@echo off
echo Starting project setup...

:: Navigate to the backend folder
cd backend
echo Installing backend dependencies...
npm install

:: Ensure cors and nodemon are installed
echo Installing necessary libraries for backend...
npm install cors
npm install -g nodemon

echo Starting backend server...
npm start

:: Navigate to the frontend folder
cd ../frontend
echo Installing frontend dependencies...
npm install

echo Starting frontend server...
start npm start

:: Open the application in the browser
timeout 5 >nul
start http://localhost:4200

echo Project is running! Close this window if you're done.
pause
