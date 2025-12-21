/**
 * 为指定关键词添加HTML颜色样式
 * @param text 原始文本
 * @returns 带颜色高亮的HTML富文本
 */
function addKeywordColorToHTML(text) {
  // 定义关键词-颜色映射（支持十六进制/RGB/颜色名称）
  const keywordColorMap = {
    damage: '#e74c3c', // 红色（伤害类）
    heal: '#2ecc71', // 绿色（治疗类）
    normal: '#95a5a6', // 灰色（普通/常规类）
    debuff: '#9b59b6', // 紫色（负面效果）
    buff: '#f39c12' // 橙色（增益效果）
  }

  // 遍历映射，逐个替换关键词（正则全局匹配，不区分大小写可添加i标志）
  let coloredText = text
  Object.entries(keywordColorMap).forEach(([keyword, color]) => {
    // 正则匹配独立关键词（避免被其他单词包含，如避免"damages"被误匹配）
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g')
    // 包裹<span>标签添加颜色样式
    coloredText = coloredText.replace(
      regex,
      `<span style="color: ${color}; font-weight: 500;">$1</span>`
    )
  })

  return coloredText
}

// 测试使用
const originalText =
  '该技能造成${damage}点伤害，同时为自身添加${buff}，为敌人附加${debuff}，普通攻击为${normal}类型，击杀后可${heal}生命值。'
const htmlColoredText = addKeywordColorToHTML(originalText)
console.log('HTML富文本结果：', htmlColoredText)
// 输出结果中，damage/buff等关键词会被带颜色的span标签包裹，在浏览器中可直接渲染高亮
