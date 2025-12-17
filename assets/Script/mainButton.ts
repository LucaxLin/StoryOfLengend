import {
  _decorator,
  Button,
  Color,
  Component,
  game,
  Label,
  math,
  Node,
  UITransform
} from 'cc'
const { ccclass, property, executeInEditMode } = _decorator

@ccclass('mainButton')
@executeInEditMode
export class mainButton extends Component {
  @property({ type: Label, tooltip: '文本标签' })
  public label: Label = null
  @property({ type: Boolean, tooltip: '禁用按钮' })
  public isDisabled: Boolean = false
  protected onLoad(): void {
    this.updateStyle()
    if (this.isDisabled) {
      console.log(`output->111`, 111)
      this.node.getChildByName('Label')!.getComponent(Label).color =
        math.color('#414141')
    }
    this.node.on(Node.EventType.MOUSE_DOWN, this.onClick, this)
    this.node.on(Node.EventType.MOUSE_ENTER, this.onHover, this)
    this.node.on(Node.EventType.MOUSE_LEAVE, this.onLeave, this)
  }
  protected onEnable(): void {
    if (this.label) {
      this.label.node.on('size-changed', this.updateStyle, this)
    } else {
      console.log('label is null')
    }
  }
  protected onDisable(): void {
    if (this.label) {
      this.label.node.off('size-changed', this.updateStyle, this)
    } else {
      console.log('label is null')
    }
  }
  updateStyle() {
    if (!this.label) {
      console.log('label is null')
      return
    }
    const labelSize = this.label.getComponent(UITransform)!.contentSize
    console.log(`output->labelSize`, labelSize)
    this.node
      .getComponent(UITransform)!
      .setContentSize(labelSize.width, labelSize.height)
  }
  onHover() {
    if (this.isDisabled) {
      game.canvas.style.cursor = 'not-allowed'
    } else {
      this.node.getChildByName('Label')!.getComponent(Label).color =
        math.color('#FF0D57')
      game.canvas.style.cursor = 'pointer'
    }
  }
  setText(text: string) {
    if (!this.label) {
      console.log('label is null')
      return
    }
    this.label.string = text
    this.updateStyle() // 文本变化后更新样式
  }
  onLeave() {
    if (this.isDisabled) {
      return
    }
    this.node.getChildByName('Label')!.getComponent(Label).color =
      math.color('#000')
    game.canvas.style.cursor = 'default'
  }
  onClick() {
    console.log(`output->1111`, 1111)
  }
  protected onDestroy(): void {
    this.node.off('click', this.onClick, this)
    this.node.off('hover', this.onHover, this)
    this.node.off('leave', this.onLeave, this)
  }
}
