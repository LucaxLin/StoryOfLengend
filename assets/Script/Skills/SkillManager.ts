import { CharacterData } from './../Character/CharacterData'
import {
  _decorator,
  Component,
  instantiate,
  Label,
  Node,
  Prefab,
  UI,
  UITransform,
  Vec3
} from 'cc'
import { SkillItem } from './SkillItem'

const { ccclass, property } = _decorator

@ccclass('SkillManager')
export class SkillManager extends Component {
  @property(Prefab)
  public SkillItemPrefab: Prefab = null! // 技能项预制体

  public Character: CharacterData = null! // 绑定Character节点

  init(characterData: CharacterData) {
    this.node.removeAllChildren()
    this.Character = characterData
    const { skills } = this.Character
    const curPos = new Vec3(0, 0, 0)
    for (const skill of skills) {
      const skillNode = instantiate(this.SkillItemPrefab)
      const skillItem = skillNode.getComponent(SkillItem)
      skillItem.init(skill)
      this.node.addChild(skillNode)
      skillNode.getComponent(Label).updateRenderData()
      const compSize = skillNode.getComponent(UITransform).contentSize
      skillNode.setPosition(curPos)
      curPos.x += compSize.width + 10
    }
  }
}
