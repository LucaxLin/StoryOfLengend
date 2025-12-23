import { Skill } from './Skill'

export interface CharacterData {
  id: string // 唯一标识
  name: string // 名称
  maxHp: number // 生命值
  maxEnergy: number // 能量值
  icon: string // 头像资源路径（resources下）
  manaIcon: string // 魔法值图标资源路径（resources下，可选）
  desc: string // 描述
  skills: Skill[] // 技能列表
}
