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
  // 负责就是要给react元素
  let { vType } = vnode
  if (!vType || !vnode) {
    //文本节点
    return document.createTextNode(vnode)
  }
  // vType: 1-原生标签；2-函数组件；3-类组件
  if (vType === 1) {
    //原生标签
    return createNativeElement(vnode)
  } else if (vType === 2) {
    //函数组件
    return createFuncComp(vnode)
  } else {
    //类组件
    return createClassComp(vnode)
  }
}

function createNativeElement (vnode) {
  const { type, props, ref } = vnode
  //'div'  {id:'demo',children:[],key,ref，style: { color: 'red' }}
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
    ReactDom.render(props.children, node)
    // 如果儿子是一个数组，说明有多个节点
  } else if (typeof Array.isArray(props.children)) {
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
function createFuncComp (vnode) {
  const { type, props } = vnode
  // function   此处type是一个函数 newVNode 可能是一个原生虚拟dom，也可能是一个组件虚拟dom
  const newVNode = type(props)
  return initVNode(newVNode)
}

/**
 *
 * @param
 * @returns {string|Text|any|Text|string}
 * 1. vnode 我们的vnode也可能是一个 类(组件)
 * 2. 在定义组件元素的时候，会把jsx所有的属性封装成一个props传递给组件
 * 3. 组件的名称一定要首字母大写 react是通过首字母来区分是原生还是自定义组件
 * 4. 先定义，再使用
 * 5. 组件要返回只能返回一个react根元素
 *
 * 类组件是如何渲染的？
 * 1. 定义一个类组件元素
 * 2. render
 *    1> 先创建类组件的实例，new XXX(props) this.props = props
 *    2> 调动实例的render方法(想想我们平常写的render方法和return)得到一个react元素
 *    3> 把返回的虚拟dom转成真实dom，插入到页面中去
 */
function createClassComp (vnode) {
  const { type, props } = vnode
  // class xxx  此处type是一个class
  const comp = new type(props) // new Welcome({name:'zl'})
  // 注意 componentWillMount 这些生命周期函数 是实例的属性 不是类的属性
  if (comp.componentWillMount) {
    comp.componentWillMount()
  }
  //vNode 如何得到？ 调用组件自身的 render方法
  const newVNode = comp.render()
  //一定要记住 要转化成真实节点 让类组件实例上挂载一个dom，指向类组件的真实dom ->  组件更新的时候会用到
  const dom = initVNode(newVNode)
  comp.dom = dom
  if (comp.componentDidMount) {
    comp.componentDidMount()
  }
  return dom
}
