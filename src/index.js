import React, { Component, createContext } from 'react'
import ReactDOM from 'react-dom'

// import React, { Component, createContext } from './kreact'
// import ReactDOM from './kreact-dom'
import { updateQueue } from './kreact'
// import React from './kkreact'
// import {render} from './kkreact/ReactDOM'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

// import Mobx from './mobx/mobx'

export function render (Comp) {
  // ReactDOM.render(<Mobx />, document.getElementById('root'))
  ReactDOM.render(<Provider store={store}><Comp title="ok" /></Provider>, document.getElementById("root"));
  // ReactDOM.render(<Comp/>, document.getElementById('root'))
}

render(App)
// ReactDOM.render(<Provider store={store}><App title="ok" /></Provider>, document.getElementById("root"));



// class ChildCounter extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       number: 0
//     }
//   }
//
//   static getDerivedStateFromProps (nextProps, prevState) {
//     let { count } = nextProps
//     if (count % 2 === 0) {
//       return { number: count * 2 }
//     } else {
//       return { number: count * 3 }
//     }
//   }
//
//   componentWillMount () {
//     // 此时可以访问状态和属性，可进行api调用等
//     console.log('子组件 1. componentWillMount ')
//   }
//
//   componentDidMount () {
//     // 组件已挂载，可进行状态更新操作
//     console.log('子组件 3. componentDidMount ')
//   }
//
//   componentWillReceiveProps (nextProps, nextState) {
//     // console.log(nextProps,'nextProps')
//     // 父组件传递的属性有变化，做相应响应
//     console.log('子组件 4.将要接收属性传递 componentWillReceiveProps')
//   }
//
//   componentWillUpdate () {
//     // 组件将要更新，可做更新统计
//     console.log('子组件 6.组件将要更新 componentWillUpdate')
//   }
//
//   componentDidUpdate () {
//     // 组件更新
//     console.log('子组件 7.组件已更新 componentDidUpdate')
//   }
//
//   componentWillUnmount () {
//     // 组件将要卸载, 可做清理工作
//     console.log('8.组件将要卸载 componentWillUnmount')
//   }
//
//   render () {
//     console.log('子组件 2. render ')
//     return (
//       <div id='child-counter'>
//         <p>{this.props.count}</p>
//         <p>{this.state.number}</p>
//       </div>
//     )
//   }
// }

/**
 * 1. 如何绑定事件
 * 2. 如何实现组件更新
 * 3. 如何实现组件异步更新
 */

function FuncCmp (props) {
  return (
    <div>name: {props.name}</div>
  )
  // build后
  return React.createElement(
    'div',
    null,
    'name: ',
    props.name
  )
}

// 函数组件更新过程
class Counter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      number: 0
    }
  }

  render () {
    // ["counter:", 0]
    let element = <div id='counter'>
      {/*<p>counter:{this.state.number}</p>*/}
      <button onClick={() => this.setState({ number: this.state.number + 1 })}>
        +
      </button>
      {/*<ChildCounter1 number={this.state.number}/>*/}
    </div>

    return element
  }
}

function ChildCounter1 (props) {
  return <div id="child">{props.number}</div>
}

// const element = (
//   <h1 className='title' id='demo' style={{ color: 'red' }}>
//     <span>hello</span>
//   </h1>
// )

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
//   React.createElement(Counter, {
//     name: '我是class组件'
//   }),
// )

// ReactDOM.render(element, document.getElementById('root'))
// ReactDOM.render(<Counter/>, document.getElementById('root'))

/*
* 三个大接口  React.createElement() React.Component React.render
*
* 1.实现createElement并返回vdom
* 2.创建kreact-dom：实现render，能够将kvdom返回的dom追加至container
* 3.区分原始标签和自定义组件
* 4.创建kvdom：实现initVNode，能够将vdom转换为dom
*
* 5.setState  class组件的特点就是 拥有特殊状态并且能通过setState更新状态并重新渲染视图
* setState批量行为：React会合并多次setState操作为一次执行
*
* */
