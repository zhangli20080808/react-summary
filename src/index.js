// import React from 'react'
// import ReactDOM from 'react-dom'

import React from './kreact'
import ReactDOM from './kreact-dom'
import { updateQueue } from './kreact'
// import React from './kkreact'
// import {render} from './kkreact/ReactDOM'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import JsxDemo from './components/process/JsxDemo'

// import Mobx from './mobx/mobx'

// export function render (Comp) {
//   // ReactDOM.render(<Mobx />, document.getElementById('root'))
//   // ReactDOM.render(<Provider store={store}><App title="ok" /></Provider>, document.getElementById("root"));
//   ReactDOM.render(<Comp/>, document.getElementById('root'))
// }
//
// render(App)

/**
 * 1. 如何绑定事件
 * 2. 如何实现组件更新
 * 3. 如何实现组件异步更新
 */
class ClassCmp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      msg: 'something',
      number: 0
    }
  }

  // componentDidMount () {
  //   this.setState({ msg: 'dong~~~' })
  // }

  handleTop = () => {
    console.log('冒泡测试')
  }

  /**
   * 合成事件
   * 1. 我们的事件对象是一个临时对象 用完就销毁掉了 实现一个共享对象的效果，节约内存 方便回收
   * 2. 为了批量更新  updateQueue
   * event 不是dom原生的 是经过react封装的 事件委托->document 在react17 绑定到根节点了
   */
  handleClick = (event) => {
    // event.persist() // persist 把这个event持久化  事件执行后不销毁
    setTimeout(() => {
      console.log(event)
    }, 1000)
    // updateQueue.isBatchingUpdate = true
    this.setState({ number: this.state.number + 1 })
    console.log(this.state.number) // 0
    this.setState({ number: this.state.number + 1 })
    console.log(this.state.number)  // 0
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 })
      console.log(this.state.number)  // 2
      this.setState({ number: this.state.number + 1 })
      console.log(this.state.number)  // 3
    })
    // updateQueue.batchUpdate()
  }

  render () {
    return (
      <div className='app' onClick={this.handleTop}>
        <p> Hello {this.props.name}</p>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>测试event</button>
      </div>
    )
    //build后
    // return React.createElement(
    //     "div",
    //     {"class": "app"},
    //     "Hello ",
    //     this.props.name
    // );
  }
}

//
function FuncCmp (props) {
  return (
    <div>name: {props.name}</div>
  )
  //build后
  // return React.createElement(
  //     "div",
  //     null,
  //     "name: ",
  //     props.name
  // );
}

const jsx = (
  <div>
    <p>我是内容</p>
    <FuncCmp name="我是function组件"/>
    <ClassCmp name="我是class组件"/>
  </div>
)

// const jsx = React.createElement(
//   'div',
//   null,
//   React.createElement(
//     'p',
//     null, '我是内容'
//   ),
//   React.createElement(FuncCmp, {
//     name: '我是function组件'
//   }),
//   React.createElement(ClassCmp, {
//     name: '我是class组件'
//   })
// )
console.log(jsx, 'jsx')

ReactDOM.render(jsx, document.getElementById('root'))

/*
* 三个大接口  React.createElement() React.Component React.render
* 1.实现createElement并返回vdom
* 2.创建kreact-dom：实现render，能够将kvdom返回的dom追加至container
* 3.区分原始标签和自定义组件
* 4.创建kvdom：实现initVNode，能够将vdom转换为dom
*
* 5.setState  class组件的特点就是 拥有特殊状态并且能通过setState更新状态并重新渲染视图
* setState批量行为：React会合并多次setState操作为一次执行
*
* */