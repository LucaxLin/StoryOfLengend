import { HPBarController } from './../HPBarController'
import {
  _decorator,
  Component,
  Node,
  Sprite,
  resources,
  EventTouch,
  SpriteFrame
} from 'cc'
import { CharacterData } from './CharacterData'
const { ccclass, property, requireComponent } = _decorator

@ccclass('CharacterItem')
@requireComponent(Sprite) // 确保有Sprite组件（可选）
export class CharacterItem extends Component {
  @property(Node)
  public maskNode: Node = null! // 绑定蒙版节点
  @property(Node)
  public IconNode: Node = null! // 绑定蒙版节点
  @property(Node)
  public HpBar: Node = null! // 绑定血条节点

  private characterData: CharacterData | null = null // 当前角色数据
  private onSelectCallback: ((characterData: CharacterData) => void) | null =
    null // 选中回调

  // 初始化角色项
  init(
    characterData: CharacterData,
    onSelect: (characterData: CharacterData) => void
  ) {
    this.characterData = characterData
    this.onSelectCallback = onSelect

    // 加载角色头像
    resources.load<SpriteFrame>(characterData.icon, (err, frame) => {
      if (!err && frame) {
        this.IconNode.getComponent(Sprite).spriteFrame = frame
      } else {
        console.log(`load icon error:`, err)
      }
    })
    const HPBar = this.HpBar.getComponent(HPBarController)
    HPBar.maxHp = characterData.maxHp
    HPBar.updateHPBar(characterData.maxHp)

    // // 默认显示蒙版
    this.setMaskVisible(true)
  }

  // 设置蒙版显示/隐藏
  setMaskVisible(visible: boolean) {
    this.maskNode.active = visible
  }

  // 绑定到按钮/节点的点击事件（编辑器中绑定）
  onCharacterClick(event: EventTouch) {
    if (this.characterData && this.onSelectCallback) {
      this.onSelectCallback(this.characterData) // 通知管理器选中当前角色
    }
  }
}
