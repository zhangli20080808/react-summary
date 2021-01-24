import initVNode from './kdom'

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
  }

  /**
   * 同步更新逻辑
   * @param partialState
   */
  setState (partialState) {
    this.state = { ...this.state, ...partialState }
    let renderVNode = this.render() // 重新调用render方法得到虚拟dom
    updateClassInstance(this, renderVNode)
  }

  forceUpdate () {
  }
}

function updateClassInstance (classInstance, renderVNode) {
  // 机械替换 后续换成diff
  let oldDom = classInstance.dom
  console.log(oldDom.parentNode)

  let newDom = initVNode(renderVNode)  // 真实dom
  oldDom.parentNode.replaceChild(newDom, oldDom)
  classInstance.dom = newDom

}

export default { createElement, Component }