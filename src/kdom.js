/**
 * 把虚拟dom变成真实dom
 * @param vnode null 数字 字符串 react元素 不能是数组
 * @returns {Text|any}
 */
import ReactDom from './kreact-dom'
import { addEvent } from './event'

export default function initVNode (vnode) {
  if (!vnode) {
    return document.createTextNode(vnode)
  }
  // 如果vnode是一个字符串或者数字的话，创建一个文本的节点返回
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(vnode)
  }
  // console.log(vnode, 'vnode')
  //  vnode  ->  type,props,vType,ref
  // 负责就是要给react元素
  let { vType } = vnode
  if (!vType) {
    //文本节点
    return document.createTextNode(vnode)
  }
  // vType: 1-原生标签；2-函数组件；3-类组件
  if (vType === 1) {
    //原生标签
    return createNativeElement(vnode)
  } else if (vType === 2) {
    //函数组件
    return updateFuncComp(vnode)
  } else {
    //类组件
    return updateClassComp(vnode)
  }
}

function createNativeElement (vnode) {
  const { type, props, ref } = vnode
  //'div' props=> {id:'demo',children:[],key,ref，style: { color: 'red' }}
  const node = document.createElement(type) // span div
  updateProps(node, props) // 更新属性 把虚拟Dom上的属性设置到真实Dom上
  // 处理子节点 如果子节点就是一个单节点 并且是字符串或者数字
  if (
    typeof props.children === 'string' ||
    typeof props.children === 'number'
  ) {
    node.textContent = props.children // node.textContent = 'hello'
    // 说明是一个单 react 元素
  } else if (
    typeof props.children === 'object' &&
    props.children &&
    props.children.type
  ) {
    ReactDom.render(props.children, node) // 递归
    // 如果儿子是一个数组，说明有多个子节点
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, node)
  } else {
    // 如果出现其他的以为情况 null 就是空串
    node.textContent = props.children ? props.children.toString() : ''
  }
  if (ref) ref.current = node
  return node
}

/**
 * 把虚拟Dom对象中的属性设置到真实Dom元素上
 * @param node dom元素
 * @param props 属性对象
 */
function updateProps (node, props) {
  const { key, children, ...rest } = props
  Object.keys(rest).forEach((item) => {
    // 需特殊处理的htmlFor，className,style
    if (item === 'className') {
      node.setAttribute('class', rest[item])
    } else if (item === 'htmlFor') {
      node.setAttribute('for', rest[item])
    } else if (item === 'style') {
      const styleObj = rest[item]
      Object.keys(styleObj).forEach((cur) => {
        node.style[cur] = styleObj[cur] // node.style.color = 'red'
      })
      // 点击事件 onClick
    } else if (item.startsWith('on')) {
      // node.onclick = onclick函数
      // node[item.toLocaleLowerCase()] = props[item]
      addEvent(node, item.toLocaleLowerCase(), rest[item])
    } else {
      node.setAttribute(item, rest[item])
    }
  })
}

/**
 * 把子节点从虚拟dom全部转成真实Dom并且插入到父节点去
 * @param children 子节点的虚拟Dom数组
 * @param parentNode 父节点的真实Dom
 */
function reconcileChildren (children, parentNode) {
  //递归子元素Node
  if (children) {
    children.forEach((childrenVNode) => {
      ReactDom.render(childrenVNode, parentNode)
    })
  }
}

/**
 * 函数组件的渲染过程
 * @param vnode
 * @returns {string|Text|any|string}
 * 1. 定义一个React元素，也就是虚拟dom，他的type 是函数 比如 Welcome
 * 2. render方法会执行这个 Welcome 函数，并传入props对象，返回虚拟dom
 * 3. 把返回的虚拟dom转成真实dom，插入到页面中去
 * function Welcome(props) { return <h1>{hello, props.name}</h1> }
 * vnode {type: Welcome ,props: { name :'zl'}}
 * newVNode { type: 'h1', props :{ children: { hello,zl }} }
 */
function updateFuncComp (vnode) {
  const { type, props } = vnode
  // function   此处type是一个函数 newVNode 可能是一个原生虚拟dom，也可能是一个组件虚拟dom
  // 再返回一个函数组件也没关系 initVNode递归
  const newVNode = type(props)
  return initVNode(newVNode)
}

/**
 * @param
 * @returns {string|Text|any|Text|string}
 * 1. react元素可能是一个字符串(原生dom类型)，也可能是一个函数，也可能是一个 类(类组件)
 * 2. 在定义组件元素的时候，会把jsx所有的属性封装成一个props传递给组件->this.props
 * 3. 组件的名称一定要首字母大写 react是通过首字母来区分是原生还是自定义组件
 * 4. 组件要先定义，再使用
 * 5. 组件要返回只能返回一个react根元素
 *
 * 类组件是如何渲染的？
 * 1. 定义一个类组件元素
 * 2. render
 *    1> 先创建类组件的实例，new XXX(props) this.props = props
 *    2> 调动实例的render方法(想想我们平常写的render方法和return)得到一个react元素
 *    3> 把返回的虚拟dom转成真实dom，插入到页面中去
 */
function updateClassComp (vnode) {
  const { type, props } = vnode
  // class xxx  此处type是一个class
  const comp = new type(props) // new Welcome({name:'zl'})
  // 注意 componentWillMount 这些生命周期函数 是实例的属性 不是类的属性
  // 让虚拟dom的实例=类组件的实例
  vnode.classInstance = comp
  if (comp.componentWillMount) {
    comp.componentWillMount()
  }
  //vNode 如何得到？ 调用组件自身的 render方法  得到一个虚拟dom或者说react元素
  const newVNode = comp.render()  // <div class='app'>p childCounter button</div>
  //一定要记住 要转化成真实节点
  const dom = initVNode(newVNode)
  // 让类组件实例上挂载一个dom，指向类组件的真实dom ->  组件更新的时候会用到
  // 让类虚拟dom的dom属性和render方法返回的虚拟dom的dom属性都指向真实dom 记录真实dom
  // vnode.dom与 newVNode.dom的区别？  vnode -> {type: Welcome } newVNode-> {type:'div'}
  vnode.dom = newVNode.dom = dom
  // 让组件实例的老的VDom属性指向本次render出来的渲染
  comp.oldVdom = newVNode
  comp.dom = dom  // div
  if (comp.componentDidMount) {
    comp.componentDidMount()
  }
  return dom
}

/**
 * 找到老的虚拟dom和新的虚拟dom之间的差异，将相应的差异更新到真实dom上
 * @param parentNode 父的Dom节点
 * @param oldVDom 老的虚拟Dom
 * @param newVDom 新的虚拟Dom
 */
export function compareTwoVDom (parentNode, oldVDom, newVDom) {
  if (oldVDom === null && newVDom === null) {
    return null
  }
  if (oldVDom && newVDom === null) {
    let currentDom = oldVDom.dom // span
    parentNode.removeChild(currentDom)
    // 如果是个组件 执行卸载周期
    if (oldVDom.classInstance && oldVDom.classInstance.componentWillMount) {
      oldVDom.classInstance.componentWillMount()
    }
  } else if (oldVDom === null && newVDom) {
    let newDom = initVNode(newVDom) //
    newVDom.dom = newVDom
    parentNode.appendChild(newDom)
    return newDom
  } else if (oldVDom && newVDom) {
    domDiff(oldVDom, newVDom)
    return newVDom
  }
}

/**
 * 深度比较
 * dom diff 的一些规则约定 为了优化性能 有些假定条件
 * 1. 不考虑跨层级移动 只考虑一层 同一层级比较
 * 2.
 * @param oldVDom
 * @param newVDom
 */
function domDiff (oldVDom, newVDom) {
  let currentDom = newVDom.dom = oldVDom.dom  // 获取老的真实dom
  newVDom.classInstance = oldVDom.classInstance
  if (typeof oldVDom.type === 'string') {
    updateProps(currentDom, oldVDom.props, newVDom.props)
    updateChildren(currentDom, oldVDom.props.children, newVDom.props.children)
  } else if (typeof oldVDom.type === 'function') {
    updateClassInstance(oldVDom, newVDom)
  }
}

function updateChildren (parentNode, oldVDom, newVDom) {

}

function updateClassInstance (oldVDom, newVDom) {

}
