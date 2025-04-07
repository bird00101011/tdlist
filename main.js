const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { waitForDebugger } = require('inspector');
const path = require('path');

const gotTheLock = app.requestSingleInstanceLock();
let win; // 👈 提前定义，确保全局作用域能访问

if (!gotTheLock) {
  // ❌ 如果已经有实例在运行，直接退出当前这个实例
  app.quit();
} else {
  app.on('second-instance', () => {
    // 🧠 如果用户试图打开第二个实例，聚焦现有窗口
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
  const w = 230
  const h = 200

  win = new BrowserWindow({
    width: w,
    height: h,
    x: screenWidth - w,                       // ⬅️ 靠右贴边
    y: Math.floor((screenHeight - h) / 2),
    resizable: false,        // ❌ 禁止缩放大小
    maximizable: false,      // ❌ 禁止最大化
    minimizable: false,       // ✅ 可最小化（可选）
    fullscreenable: false,   // ❌ 禁止全屏
    alwaysOnTop: true,
    autoHideMenuBar: true,
    // frame: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, 'dist/index.html')}`;
  win.loadURL(startUrl);

  ipcMain.handle('get-app-path', async () => {
    return app.getAppPath();
  });
}

app.whenReady().then(createWindow);
