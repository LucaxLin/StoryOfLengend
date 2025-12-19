import { _decorator, Component, Node, Label, instantiate, Prefab } from 'cc'
import { CharacterItem } from './CharacterItem'
import { CharacterData, CharacterListData } from './CharacterData'
const { ccclass, property } = _decorator

@ccclass('CharacterSelectManager')
export class CharacterSelectManager extends Component {
  @property(Prefab)
  public characterItemPrefab: Prefab = null! // 角色项预制体（

  @property(Node)
  public characterListNode: Node = null! // 绑定CharacterList节点

  @property(Node)
  public nameLabel: Node = null! // 绑定NameLabel

  @property(Node)
  public descLabel: Node = null! // 绑定DescLabel

  private currentSelectedCharacter: CharacterData | null = null // 当前选中角色
  private characterItems: Map<string, CharacterItem> = new Map() // 存储所有角色项，方便控制蒙版
  private CharacterSize: number = 500 // 角色尺寸
  onLoad() {
    this.initCharacterList() // 初始化角色列表
    this.resetInfoPanel() // 重置介绍区为默认提示
  }

  // 初始化所有角色项
  initCharacterList() {
    CharacterListData.forEach((characterData, idx) => {
      // 实例化角色项预制体
      const characterItemNode = instantiate(this.characterItemPrefab)
      characterItemNode.parent = this.characterListNode

      // 获取CharacterItem组件并初始化
      const characterItem = characterItemNode.getComponent(CharacterItem)
      characterItemNode.setPosition(idx * this.CharacterSize, 250, 0)
      characterItemNode.name = `CharacterItem_${characterData.id}`
      if (characterItem) {
        characterItem.init(characterData, this.onCharacterSelected.bind(this)) // 绑定选中回调

        this.characterItems.set(characterData.id, characterItem) // 存入Map
      }
    })
  }

  // 选中角色后的回调
  onCharacterSelected(characterData: CharacterData) {
    // 1. 如果有之前选中的角色，显示其蒙版
    if (this.currentSelectedCharacter) {
      const prevItem = this.characterItems.get(this.currentSelectedCharacter.id)
      if (prevItem) prevItem.setMaskVisible(true)
    }

    // 2. 更新当前选中角色，隐藏其蒙版
    this.currentSelectedCharacter = characterData
    const currentItem = this.characterItems.get(characterData.id)
    if (currentItem) currentItem.setMaskVisible(false)

    // 3. 更新介绍区内容
    this.updateInfoPanel(characterData)
  }

  // 更新介绍区
  updateInfoPanel(characterData: CharacterData) {
    this.nameLabel.active = true
    this.descLabel.active = true

    // 赋值
    this.nameLabel.getComponent(Label).string = characterData.name
    this.descLabel.getComponent(Label).string = characterData.desc
  }

  // 重置介绍区为默认提示
  resetInfoPanel() {
    this.nameLabel.active = false
    this.descLabel.active = false
  }
}
