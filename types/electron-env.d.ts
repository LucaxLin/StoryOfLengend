// electron-env.d.ts
declare global {
  interface Window {
    // 声明 Electron 的 process 全局变量
    process?: {
      versions?: {
        electron?: string; // 标记是否为 Electron 环境
      };
    };
    // 声明 preload 脚本暴露的 electronAPI（高版本 Electron 用）
    electronAPI?: {
      quitGame: () => void; // 对应 preload 中暴露的退出方法
    };
    // 声明 require 方法（低版本 Electron 用）
    require?: (module: string) => any;
  }
}

// 必须导出空对象，让 TypeScript 识别为模块
export {};