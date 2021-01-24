// import React from 'react'
import React from './kreact'
// import ReactDOM from 'react-dom'
import ReactDOM from './kreact-dom'

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
      msg: 'something'
    }
  }

  // componentDidMount () {
  //   this.setState({ msg: 'dong~~~' })
  // }

  onClick = () => {
    console.log('1')
    this.setState({ msg: 'mua~~~' })
  }

  render () {
    return (
      <div className='app' onClick={this.onClick}>
        Hello {this.props.name}
        {this.state.msg}
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
//
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
console.log(jsx)

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