export interface Skill {
  name: string // 技能名称
  desc: string // 技能描述
  cost: number // 消耗能量值
  damage?: number // 伤害值（可选）
  shield?: number // 护盾值（可选）
  heal?: number // 治疗值（可选）
  buff?: string // 增益效果描述（可选）
  debuff?: string // 减益效果描述（可选）
}
