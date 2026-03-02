// preload.js (和 main.js 同目录)
const { contextBridge, ipcRenderer } = require('electron');

// 向渲染进程暴露安全的 API
contextBridge.exposeInMainWorld('electronAPI', {
  quitGame: () => ipcRenderer.send('game-quit') // 暴露退出游戏的方法
});