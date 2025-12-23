import {
  _decorator,
  Component,
  EventMouse,
  Label,
  Node,
  tween,
  UIOpacity,
  Vec3
} from 'cc'
import { Skill } from './../../Types/Skill'
import { SkillDescription } from './SkillDescription'
const { ccclass, property } = _decorator

@ccclass('SkillItem')
export class SkillItem extends Component {
  @property(Node)
  public descriptionNode: Node = null! // 技能详情节点
  private skillInfo: Skill = null! // 技能信息
  init(skillInfo: Skill) {
    this.skillInfo = skillInfo
    this.node.getComponent(Label).string = `【${this.skillInfo.name}】`
    this.descriptionNode.getComponent(SkillDescription).init(this.skillInfo)
  }
  protected onLoad(): void {
    this.node.on(Node.EventType.MOUSE_ENTER, this.showDescription, this)
    this.node.on(Node.EventType.MOUSE_MOVE, this.changeDescriptionPos, this)
    this.node.on(Node.EventType.MOUSE_LEAVE, this.hideDescription, this)
  }
  showDescription() {
    this.descriptionNode.active = true
    tween(this.descriptionNode.getComponent(UIOpacity)!)
      .to(0.2, { opacity: 255 })
      .start()
  }
  hideDescription() {
    tween(this.descriptionNode.getComponent(UIOpacity)!)
      .to(0.2, { opacity: 0 })
      .start()
    setTimeout(() => {
      this.descriptionNode.active = false
    }, 200)
  }
  changeDescriptionPos(event: EventMouse) {
    const uiCanvasPos = event.getUILocation()
    const worldPos = new Vec3(uiCanvasPos.x, uiCanvasPos.y, 0)
    const compPos = this.node.getWorldPosition()
    const mousePos = new Vec3(worldPos.x - compPos.x, 100, 0)
    this.descriptionNode.setPosition(mousePos)
  }
  protected onDestroy(): void {
    this.node.off(Node.EventType.MOUSE_ENTER, this.showDescription, this)
    this.node.off(Node.EventType.MOUSE_MOVE, this.changeDescriptionPos, this)
    this.node.off(Node.EventType.MOUSE_LEAVE, this.hideDescription, this)
  }
}
