import { _decorator, Component, director, Node } from 'cc'
import { PersistData } from '../Types/PersistData'
import { persistDataManager } from './persistDataManager'
const { ccclass, property } = _decorator

@ccclass('BattleController')
export class BattleController extends Component {
  private persisteData: PersistData = null!
  start() {
    this.persisteData = persistDataManager.instance.persistData
    console.log('当前持久化数据：', this.persisteData)
    director.emit('PersistDataUpdate', this.persisteData)
  }
  updateHp() {
    persistDataManager.instance.updatePersistData((data) => {
      data.curHp -= 10
    })
  }

  update(deltaTime: number) {}
}
