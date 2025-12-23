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
}
