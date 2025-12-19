import {
  _decorator,
  Button,
  CCBoolean,
  Color,
  Component,
  game,
  Label,
  math,
  Node,
  tween,
  UITransform
} from 'cc'
const { ccclass, property, executeInEditMode } = _decorator

@ccclass('mainButton')
@executeInEditMode
export class mainButton extends Component {
  @property({ type: Label, tooltip: '文本标签' })
  public label: Label = null
  @property({ tooltip: '禁用按钮' })
  public isDisabled: Boolean = false
  @property({ tooltip: '默认颜色' })
  public defaultColor = new Color('#000000')
  @property({ tooltip: '悬浮颜色' })
  public hoverColor = new Color('#FF0D57')
  @property({ tooltip: '禁用颜色' })
  public disabledColor = new Color('#414141')

  protected onLoad(): void {
    this.updateStyle()
    if (this.isDisabled) {
      this.node.getChildByName('Label')!.getComponent(Label).color =
        this.disabledColor
    }
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
    this.node
      .getComponent(UITransform)!
      .setContentSize(labelSize.width, labelSize.height)
  }
  onHover() {
    if (this.isDisabled) {
      game.canvas.style.cursor = 'not-allowed'
    } else {
      tween(this.label).to(0.1, { color: this.hoverColor }).start()
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
    game.canvas.style.cursor = 'default'
    if (this.isDisabled) {
      return
    }
    tween(this.label).to(0.1, { color: this.defaultColor }).start()
  }

  protected onDestroy(): void {
    this.node.off('hover', this.onHover, this)
    this.node.off('leave', this.onLeave, this)
  }
}
