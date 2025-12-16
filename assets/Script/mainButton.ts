import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('mainButton')
export class mainButton extends Component {
  @property(Node)
  mainButton: Node = null
  start() {
    this.mainButton.on(Node.EventType.MOUSE_ENTER, () => {
      console.log(`output->111`, 111)
    })
  }

  update(deltaTime: number) {}
}
