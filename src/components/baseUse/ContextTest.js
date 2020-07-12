import React from 'react'

// 1.创建上下文
const Context = React.createContext()

// 2.获取Provider和Consumer
const Provider = Context.Provider
const Consumer = Context.Consumer

// withConsumer高阶组件，它根据配置返回一个高阶组件
function withConsumer (Consumer) {
  // Consumer 接受一个函数
  return (Comp) => (props) => {
    return <Consumer>{(value) => <Comp {...value} />}</Consumer>
  }
}

//  我希望在 挂载的时候输出一些日志
const withLog = (Comp) => {
  return class extends React.Component {
    componentDidMount () {
      console.log('did mounted')
    }

    render () {
      return <Comp {...this.props}></Comp>
    }
  }
}
// 经过withConsumer(Consumer)返回的高阶组件包装，Child获得了上下文中的值
const Child = withLog(
  withConsumer(Consumer)(function (props) {
    return <div onClick={() => props.add()}>{props.counter}</div>
  })
)

export default class ContextTest extends React.Component {
  state = {
    counter: 0,
  }

  add = () => {
    this.setState({ counter: this.state.counter + 1 })
  }

  render () {
    return (
      <Provider value={{ counter: this.state.counter, add: this.add }}>
        <Child/>
        <Child/>
        <Child/>
      </Provider>
    )
  }
}
