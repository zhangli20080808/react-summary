import initVNode from './kdom'
import { isFunc } from './util'

/**
 * 什么时候用对象 什么时候用类
 * 单例 对象就够了 需要很多对象的时候用类
 * 定义更新队列
 */
export let updateQueue = {
  updaters: [], // 更新器数组
  isBatchingUpdate: false, // 是否处于批量更新模式 默认 非批量更新
  add (updater) {  // 增加一个更细器
    this.updaters.push(updater)
  },
  batchUpdate () { // 强制批量更新组件更新
    this.updaters.forEach(update => update.updateComponent)
    this.isBatchingUpdate = false
  }
}

// 更新器会有多个 不断去创建实例

class Updater {
  constructor (classInstance) {
    this.classInstance = classInstance  // 类组件的实例
    this.pendingStates = []  //等待更新的状态
  }

  addState (partialState) {
    // 先将这个分状态添加到 pendingStates 数组中去
    this.pendingStates.push(partialState)
    // 如果当前处于批量更新模式，也就是异步更新模式 把当前实例放到 updateQueue 里
    // 如果是非批量更新 也就是同步更新 则调用 updateComponent 直接更新
    updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent()
  }

  updateComponent () {
    const { classInstance, pendingStates } = this
    if (pendingStates.length > 0) {
      // 拿到组件的老状态和数组中的新状态数组进行合并
      classInstance.state = this.getState()
      // 让组件强制更新
      classInstance.forceUpdate()
    }
  }

  /**
   * 根据老状态和等待生效的新状态，得到最后新状态
   * @returns { state } 获取最新state
   */
  getState () {
    const { classInstance, pendingStates } = this
    let state = classInstance.state // 组件XXX.state
    // 需要更新   拿到组件的老状态和数组中的新状态数组进行合并
    if (pendingStates.length > 0) {
      pendingStates.forEach(newState => {
        if (isFunc(newState)) { // 如果势函数
          newState = newState(state)
        }
        state = { ...state, ...newState } // 新状态覆盖老状态
      })
      pendingStates.length = 0 //清空
    }
    return state
  }
}

/**
 *
 * @param type 元素的类型 可能是一个字符串(原生组件)，也可能是函数
 * @param props 配置的对象,一般来说是属性对象
 * @param children 第一个儿子
 * @returns {{vType: number, type, props}} 虚拟dom，也就是我们的react元素
 */
export function createElement (type, props, ...children) {
  // console.log(arguments,children) // 虚拟dom的创建是由内向外的
  // 返回虚拟DOM
  // if (arguments.length > 3) {
  //   children = Array.prototype.slice.call(arguments, 2)
  // }
  // children 可能是数组(多于一个儿子) 也有可能是字符串、数子 或者 null 也可能是个react元素
  props.children = children
  // 能够区分组件类型：  因为后续的dom操作要根据类型去做
  // vType: 1-原生标签；2-函数组件；3-类组件
  let vType
  if (typeof type === 'function') {
    // class组件
    if (type.isReactComponent) {
      vType = 3
    } else {
      // 函数组件
      vType = 2
    }
  } else if (typeof type === 'string') {
    //原始标签
    vType = 1
  }

  return {
    vType,
    type,
    props
  }
}

// 每个类组件都会实现自己的render方法 约定 实例化的时候去调用生成vnode
class Component {
  //标识符 区分class和函数组件
  static isReactComponent = true

  constructor (props) {
    this.props = props
    this.state = {}
    //  我们为每一个组件实例 配一个 updater实例
    this.updater = new Updater(this)
  }

  /**
   * 同步更新逻辑
   * @param partialState
   */
  setState (partialState) {
    // this.state = { ...this.state, ...partialState }
    // let renderVNode = this.render() // 重新调用render方法得到虚拟dom
    // updateClassInstance(this, renderVNode)

    // 我们的组件不再直接负责更新了
    this.updater.addState(partialState)
  }

  forceUpdate () {
    let renderVNode = this.render()
    updateClassComponent(this, renderVNode)
  }
}

function updateClassComponent (classInstance, renderVNode) {
  // 机械替换 后续换成diff
  let oldDom = classInstance.dom
  let newDom = initVNode(renderVNode)  // 真实dom
  oldDom.parentNode.replaceChild(newDom, oldDom)
  classInstance.dom = newDom
}

export default { createElement, Component }