import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator
import { persistDataManager } from './persistDataManager'
import { mainButton } from './mainButton'
import { SceneManager } from './SceneManager'

@ccclass('GameContinue')
export class GameContinue extends Component {
  start() {
    this.checkContinueButton()
  }
  checkContinueButton() {
    if (persistDataManager.instance.hasSavedGame()) {
      this.node.getComponent(mainButton).isDisabled = false
      this.node.getComponent(mainButton).toggleDisable(false)
    } else {
      this.node.getComponent(mainButton).isDisabled = true
      this.node.getComponent(mainButton).toggleDisable(true)
    }
  }
  buttonClick() {
    if (!this.node.getComponent(mainButton).isDisabled) {
      SceneManager.instance.switchScene('AdventureMap')
    }
  }
}
