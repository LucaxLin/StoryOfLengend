import { _decorator, Component, Node } from 'cc'
import { SceneManager } from './SceneManager'
import { persistDataManager } from './persistDataManager'
const { ccclass, property } = _decorator

@ccclass('Common')
export class Common extends Component {
  changeToScene(sceneName: string) {
    SceneManager.instance.switchScene(sceneName)
  }

  startNewGame() {
    persistDataManager.instance.resetPersistData()
    this.changeToScene('PickHero')
  }

  exitGame() {
    if (window.electronAPI) {
      window.electronAPI.quitGame()
    }
    // 非 Electron 环境（比如网页测试）
    else {
      console.log('非 Electron 环境，仅模拟退出')
    }
  }
}
