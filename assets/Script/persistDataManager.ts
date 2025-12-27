import { PersistData } from './../Types/PersistData'
import { _decorator, Component, director, Node, sys } from 'cc'
const { ccclass, property } = _decorator
import { Common } from './Common'

const commonFuncs = new Common()
const HERO_DATA_STORAGE_KEY = 'game_hero_data_v1'

@ccclass('persistDataManager')
export class persistDataManager extends Component {
  private static _instance: persistDataManager | null = null
  public static get instance(): persistDataManager {
    if (!this._instance) {
      // 若实例不存在，创建全局节点并挂载管理器（确保切换场景不销毁）
      const managerNode = new Node('persistDataManager')
      this._instance = managerNode.addComponent(persistDataManager)
      // 关键：设置节点为全局持久化节点，切换场景不销毁
      director.addPersistRootNode(managerNode)
    }
    return this._instance
  }
  private _persistData: PersistData | null = null
  public get persistData(): PersistData {
    this._persistData = this.loadPersistDataFromLocal()
    return this._persistData
  }
  public set persistData(value: PersistData) {
    this._persistData = value
    this.savePersistDataToLocal()
  }

  onLoad() {
    // 确保单例唯一性，防止重复创建
    if (persistDataManager._instance && persistDataManager._instance !== this) {
      this.node.destroy()
      return
    }
    persistDataManager._instance = this
    // 挂载为全局持久化节点
    director.addPersistRootNode(this.node)
  }
  // 从本地存储加载持久化数据
  private loadPersistDataFromLocal(): PersistData | null {
    try {
      // 从本地存储读取JSON字符串
      const storedData = sys.localStorage.getItem(HERO_DATA_STORAGE_KEY)
      if (!storedData) return null
      // 解析为PersistData对象（需验证数据有效性）
      const parsedData = JSON.parse(storedData) as PersistData
      // 简单数据校验（避免本地数据损坏导致报错）
      if (parsedData.id && parsedData.level !== undefined) {
        return parsedData
      }
      return null
    } catch (error) {
      console.error('加载英雄数据失败：', error)
      return null
    }
  }
  public initPersistData(data: PersistData): void {
    this._persistData = data
    this.savePersistDataToLocal()
  }
  /** 保存英雄数据到本地存储（数据变化时调用） */
  public savePersistDataToLocal(): void {
    if (!this._persistData) {
      sys.localStorage.setItem(HERO_DATA_STORAGE_KEY, null)
      return
    }
    try {
      // 更新最后修改时间
      this._persistData.updateTime = Date.now()
      // 转换为JSON字符串并保存
      const jsonStr = JSON.stringify(this._persistData)
      sys.localStorage.setItem(HERO_DATA_STORAGE_KEY, jsonStr)
      console.log('英雄数据已保存到本地')
    } catch (error) {
      console.error('保存英雄数据失败：', error)
    }
  }
  /** 更新英雄数据（示例：升级、回血等操作） */
  public updatePersistData(
    updater: (data: PersistData) => void,
    saveLocal: boolean = false
  ): void {
    if (!this._persistData) {
      commonFuncs.changeToScene('PickHero')
      this._persistData = null as PersistData
    }
    // 执行数据更新逻辑
    updater(this._persistData)
    // 同步保存到本地
    if (saveLocal) {
      this.savePersistDataToLocal()
    }
    director.emit('PersistDataUpdate', this._persistData)
  }
  /** 重置英雄数据（重新开始游戏时使用） */
  public resetPersistData(): void {
    this._persistData = null as PersistData
    this.savePersistDataToLocal()
  }
  /** 获取是否有已保存的游戏数据（用于判断是否显示「继续游戏」按钮） */
  public hasSavedGame(): boolean {
    return Boolean(
      JSON.parse(sys.localStorage.getItem(HERO_DATA_STORAGE_KEY) || 'null')
    )
  }
}
