const { app, BrowserWindow, screen, ipcMain, Tray, Menu } = require('electron')
const path = require('path')
let mainWindow

// 你的原始窗口配置（完整保留）
const windowConfig = {
  width: 1920, // 桌宠窗口宽度（匹配你的素材）
  height: 1080, // 桌宠窗口高度
  webPreferences: {
    contextIsolation: true, // 必须开启
    sandbox: false, // 根据需求设置
    preload: path.join(__dirname, 'preload.js') // 指定 preload 脚本路径
  },
  skipTaskbar: true
}

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay()
  const workArea = primaryDisplay.workArea
  mainWindow = new BrowserWindow({
    ...windowConfig
  })

  // 加载 Cocos 打包后的页面（根据你的实际路径调整）
  mainWindow.loadFile(path.join('dist/index.html'))

  // 监听前端发来的退出请求
  ipcMain.on('game-quit', async (event) => {
    mainWindow.close() // 关闭窗口
    app.quit() // 退出应用（确保完全关闭）
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // 调试用：打开开发者工具
  // mainWindow.webContents.openDevTools();
}

// 防止多实例冲突
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
}

// Electron 应用生命周期
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
