import { _decorator, Component, RichText } from 'cc'
import { Skill } from './SkillType'
import { TEXT_COLOR } from '../Constant'
const { ccclass, executeInEditMode } = _decorator
@ccclass('SkillDescription')
@executeInEditMode
export class SkillDescription extends Component {
  init(item: Skill) {
    const desc = item.desc
    const placeholderRegex = /\$\{(\w+)\}/g
    const placeholderKeys: string[] = []
    let match: RegExpExecArray | null
    while ((match = placeholderRegex.exec(desc)) !== null) {
      placeholderKeys.push(match[1])
    }

    const replacedDesc = desc.replace(placeholderRegex, (_, key) => {
      // 若map中无对应key，返回原占位符或空字符串（可自定义）
      return item[key] !== undefined
        ? ` <color=${TEXT_COLOR[key] || TEXT_COLOR.default}>${
            item[key]
          }</color> `
        : _
    })

    this.node.getComponent(RichText).string = replacedDesc
  }

  update(deltaTime: number) {}
}
