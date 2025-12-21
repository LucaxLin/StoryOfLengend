import { ArmorDownSlash } from './Skills/ArmorDownSlash'
import { FlameBarrage } from './Skills/FlameBarrage'
import { ShieldUp } from './Skills/ShieldUp'
import { Skill } from './Skills/SkillType'

// 角色数据类型定义
export interface CharacterData {
  id: string // 唯一标识
  name: string // 名称
  hp: number // 生命值
  energy: number // 能量值
  icon: string // 头像资源路径（resources下）
  manaIcon: string // 魔法值图标资源路径（resources下，可选）
  desc: string // 描述
  skills: Skill[] // 技能列表
}

// 示例角色数据
export const CharacterListData: CharacterData[] = [
  {
    id: 'soldier',
    name: '战士',
    hp: 150,
    energy: 2,
    icon: 'UI/Characters/soldier/stand/spriteFrame',
    manaIcon: 'UI/Characters/soldier/mana/spriteFrame',
    desc: '高血量高防御，擅长正面团战',
    skills: [ArmorDownSlash, ShieldUp]
  },
  {
    id: 'witch',
    name: '法师',
    hp: 80,
    energy: 3,
    icon: 'UI/Characters/witch/stand/spriteFrame',
    manaIcon: 'UI/Characters/witch/mana/spriteFrame',
    desc: '高爆发法术伤害，脆皮但输出拉满',
    skills: [FlameBarrage, ShieldUp]
  }
]
