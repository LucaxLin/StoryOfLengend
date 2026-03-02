import {
  _decorator,
  Color,
  Component,
  director,
  Label,
  Node,
  ProgressBar,
  Sprite,
  tween
} from 'cc'
import { PersistData } from '../Types/PersistData'
const { ccclass, property, executeInEditMode } = _decorator

@ccclass('HPBarController')
export class HPBarController extends Component {
  @property(Node)
  hpBarLabel: Node = null
  @property(Node)
  hpBar: Node = null

  public maxHp: number = 100
  public currentHp: number = 100
  protected onLoad(): void {
    this.updateHPBar(this.currentHp)
    director.on('PersistDataUpdate', (data: PersistData) => {
      console.log('Received PersistDataUpdate event in HPBarController', [
        data.maxHp,
        data.curHp
      ])
      this.maxHp = data.maxHp
      this.updateHPBar(data.curHp)
    })
  }
  public updateHPBar(num: number) {
    if (num === this.maxHp) {
      this.hpBar.active = false
      this.node.getComponent(Sprite).color = new Color(255, 0, 0)
    } else {
      this.hpBar.active = true
      this.node.getComponent(Sprite).color = new Color(255, 255, 255)
    }
    this.currentHp = num
    this.hpBarLabel.getComponent(Label).string =
      this.currentHp + '/' + this.maxHp
    this.updateTween(this.currentHp / this.maxHp)
  }
  protected onDestroy(): void {
    director.off('PersistDataUpdate')
  }
  updateTween(targetProgress: number) {
    // 更新血条动画
    const progressBar = this.node.getComponent(ProgressBar)
    if (progressBar) {
      tween(progressBar).to(0.5, { progress: targetProgress }).start()
    }
  }
}
