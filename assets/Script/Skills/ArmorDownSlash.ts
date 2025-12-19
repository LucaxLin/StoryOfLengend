import { Skill } from './SkillType'
export const ArmorDownSlash: Skill = {
  name: '破甲斩',
  desc: '对单个敌人造成${damage}点物理伤害，给目标添加${debuff}效果，持续2回合。',
  cost: 1,
  damage: 20,
  debuff: 'armorDown'
}
