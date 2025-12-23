import { CharacterData } from './../../Types/Character'
import { ArmorDownSlash } from './../Skills/ArmorDownSlash'
import { FlameBarrage } from './../Skills/FlameBarrage'
import { ShieldUp } from './../Skills/ShieldUp'

// 角色数据类型定义

// 示例角色数据
export const CharacterListData: CharacterData[] = [
  {
    id: 'soldier',
    name: '战士',
    maxHp: 150,
    maxEnergy: 2,
    icon: 'UI/Characters/soldier/stand/spriteFrame',
    manaIcon: 'UI/Characters/soldier/mana/spriteFrame',
    desc: '高血量高防御，擅长正面团战',
    skills: [ArmorDownSlash, ShieldUp]
  },
  {
    id: 'witch',
    name: '法师',
    maxHp: 80,
    maxEnergy: 3,
    icon: 'UI/Characters/witch/stand/spriteFrame',
    manaIcon: 'UI/Characters/witch/mana/spriteFrame',
    desc: '高爆发法术伤害，脆皮但输出拉满',
    skills: [FlameBarrage, ShieldUp]
  }
]
