import { _decorator, Component, Node } from 'cc'
import { SceneManager } from './SceneManager'
const { ccclass, property } = _decorator

@ccclass('Common')
export class Common extends Component {
  startNewGame() {
    SceneManager.instance.switchScene('PickHero', () => {
      console.log('场景切换完成！')
    })
  }
}
