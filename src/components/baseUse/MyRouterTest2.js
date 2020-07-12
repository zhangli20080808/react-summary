import React, {Component} from "react";
import {createBrowserHistory} from "history";
import pathToRegexp from "path-to-regexp";
import MyReduxTest from "./MyReduxTest";


//创建一个上下文保存 location history

const RouterContext = React.createContext('')

class BrowserRouter extends Component {
  constructor(props) {
    super(props)
    this.history = createBrowserHistory(this.props)
    this.state = {
      location: this.history.location
    }
    this.unListen = this.history.listen(location => {
      this.setState({location})
    })
  }

  componentWillMount() {
    if (this.unListen) {
      this.unListen()
    }
  }

  render() {
    return <RouterContext.Provider
      value={{
        history: this.history,
        location: this.state.location
      }}
      children={this.props.children}
    />
  }
}
// 实现什么？用户传递进来的配置 解析 展示 比较复杂 还有可能是复杂渲染  有可能指定函数去渲染呢
class Router extends Component {


  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const location = context.location
          const match = matchPath(location.pathname, this.props);
          const props = {...match}
          //三兄弟有了 用户可能会传 render component children 三者竞争关系 children匹配不匹配都执行


          return 'xxx'
        }}
      </RouterContext.Consumer>
    );
  }
}

export default class MyReduxTest2 extends Component {
  render() {
    return (
      <BrowserRouter>
        <route path='/' component={() => <div>123</div>}></route>
        <route path='/bar' component={() => <div>bar</div>}></route>
      </BrowserRouter>
    );
  }

}