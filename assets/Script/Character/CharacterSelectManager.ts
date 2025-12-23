import {
  _decorator,
  Component,
  Node,
  Label,
  instantiate,
  Prefab,
  resources,
  SpriteFrame,
  Sprite,
  UITransform
} from 'cc'
import { CharacterData } from './../../Types/Character'
import { CharacterItem } from './CharacterItem'
import { CharacterListData } from './CharacterData'
import { SkillManager } from '../Skills/SkillManager'
import { SceneManager } from '../SceneManager'
import { createDefaultData } from '../persistData'
import { persistDataManager } from '../persistDataManager'
const { ccclass, property } = _decorator

@ccclass('CharacterSelectManager')
export class CharacterSelectManager extends Component {
  @property(Prefab)
  public characterItemPrefab: Prefab = null! // 角色项预制体（

  @property(Node)
  public characterListNode: Node = null! // 绑定CharacterList节点

  @property(Node)
  public skillListNode: Node = null! // 绑定SkillList节点

  @property(Node)
  public nameLabel: Node = null! // 绑定NameLabel

  @property(Node)
  public ManaNode: Node = null! // 绑定ManaIcon父节点

  @property(Node)
  public StartAdventureButton: Node = null! // 绑定开始冒险按钮

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
    this.StartAdventureButton.active = true
  }
  private SkillsNode: Node = null!
  // 更新介绍区
  updateInfoPanel(characterData: CharacterData) {
    this.nameLabel.active = true

    // 赋值
    this.nameLabel.getComponent(Label).string = characterData.name
    if (!this.ManaNode) {
      this.ManaNode = new Node('ManaIcon') // 创建ManaIcon节点
      this.ManaNode.parent = this.node.getChildByName('CharacterInfoPanel')
    } else {
      this.ManaNode.removeAllChildren()
    }
    resources.load<SpriteFrame>(characterData.manaIcon, (err, frame) => {
      if (!err && frame) {
        const StartX =
          this.nameLabel.getPosition().x +
          this.nameLabel.getComponent(UITransform).width +
          50
        for (let i = 0; i < characterData.maxEnergy; i++) {
          const mana = new Node(`ManaIcon_${i}`)
          mana.parent = this.ManaNode
          const sprite = mana.addComponent(Sprite)
          sprite.spriteFrame = frame
          mana.getComponent(UITransform).setContentSize(60, 60)
          mana.setPosition(StartX + i * 70, 194, 0)
        }
      } else {
        console.log('err', err)
      }
    })
    this.skillListNode.getComponent(SkillManager).init(characterData) // 初始化技能列表
  }
  resetInfoPanel() {
    this.nameLabel.active = false
  }
  startAdventure() {
    const persistData = createDefaultData(this.currentSelectedCharacter!)
    persistDataManager.instance.initPersistData(persistData)
    SceneManager.instance.switchScene('AdventureMap')
  }
}
