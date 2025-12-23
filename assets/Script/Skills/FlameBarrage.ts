import { Skill } from './../../Types/Skill';
export const FlameBarrage: Skill = {
  name: '火焰弹幕',
  desc: '对3个随机敌人造成${damage}点魔法伤害，给目标添加${debuff}效果，持续2回合。',
  cost: 1,
  damage: 15,
  debuff: '灼烧'
}
