import {
  _decorator,
  Component,
  Node,
  director,
  Animation,
  Prefab,
  instantiate,
  find,
  resources
} from 'cc'
const { ccclass, property } = _decorator

// 全局场景管理类（单例模式）
@ccclass('SceneManager')
export class SceneManager extends Component {
  // 单例实例
  private static _instance: SceneManager
  public static get instance(): SceneManager {
    if (!this._instance) {
      // 创建全局节点挂载管理器
      const managerNode = new Node('SceneManager')
      this._instance = managerNode.addComponent(SceneManager)
      // 设置为常驻节点（跨场景不销毁）
      director.addPersistRootNode(managerNode)
    }
    return this._instance
  }

  // 过渡动画节点（常驻）
  private transitionNode: Node | null = null
  // 过渡动画组件
  private transitionAnim: Animation | null = null
  // 动画时长（需和动画剪辑时长一致，单位：秒）
  private readonly animDuration = 0.5

  onLoad() {}

  // 初始化过渡动画节点（加载预制体并设为常驻）
  private async initTransitionNode() {
    return new Promise<void>((resolve, reject) => {
      if (this.transitionNode) {
        return resolve()
      }
      resources.load<Prefab>('Prefabs/SceneTransition', (err, data) => {
        if (err) {
          reject(`过渡动画预制体加载失败！${err}`)
        } else if (data) {
          this.transitionNode = instantiate(data)
          this.node.addChild(this.transitionNode)
          this.transitionAnim = this.transitionNode.getComponent(Animation)
          resolve()
          if (!this.transitionAnim) {
            reject('过渡动画节点缺少 Animation 组件！')
          }
        }
      })
    })
  }

  /**
   * 全局场景切换方法（对外暴露）
   * @param sceneName 目标场景名称
   * @param onLoadComplete 场景加载完成后的回调（可选）
   */
  public async switchScene(sceneName: string, onLoadComplete?: () => void) {
    // 1. 确保过渡动画初始化完成
    await this.initTransitionNode()
    if (!this.transitionAnim) {
      return
    }

    try {
      // 2. 播放动画（隐藏当前场景）
      this.transitionAnim.play('SceneIn')
      // 3. 等待动画结束（避免动画和加载同时执行）
      await new Promise((resolve) =>
        setTimeout(resolve, this.animDuration * 1000)
      )

      // 4. 加载新场景（隐藏旧场景）
      director.loadScene(sceneName, () => {
        // 5. 反向播放「动画」（显示新场景）
        this.transitionAnim.play('SceneOut')
        // 6. 动画结束后执行回调
        setTimeout(() => {
          onLoadComplete && onLoadComplete()
        }, this.animDuration * 1000)
      })
    } catch (error) {
      console.error(`切换场景 ${sceneName} 失败：`, error)
    }
  }
}
