import React, {Component} from "react";
import {BrowserRouter, Link, Route, Switch, Redirect} from "react-router-dom";
/*
* react-router中奉行一切皆组件的思想，路由器-Router、链接-Link、路由-Route、独占-Switch、重定向-
Redirect都以组件形式存在
*
* 动态路由  使用:id的形式定义动态路由
*
* 嵌套 Route组件嵌套在其他页面组件中就产生了嵌套关系
*
* 404页面 设定一个没有path的路由在路由列表最后面，表示一定匹配
*
* 路由守卫  创建PrivateRoute组件包装Route使其具有权限判断功能
*
* */

function ProductList(props) {
  return (
    <div>
      <h3>ProductList</h3>
      <Link to="/detail/web">web全栈</Link>
    </div>
  );
}

function Detail({match, history, location}) {
  // 提供三个值 就是通过上下文传递过来的 通过 route 去初始化组建的时候 ，会转成组件的属性传给他
  // console.log(match, history, location);
  return (
    <div>
      <h3>Detail</h3>
      {match.params.name}
      <button onClick={history.goBack}>后退</button>
    </div>
  );
}

function ProductMgt(props) {
  return (
    <div>
      <h3>ProductMgt</h3>
      <Link to="add">新增</Link>
      <Link to="search">搜索</Link>
      <Route path="/management/add" component={() => <div>add</div>}/>
      <Route path="/management/search" component={() => <div>search</div>}/>
      <Redirect to="/management/add"/>
    </div>
  );
}

// 路由守卫：定义一个PrivateRoute组件 通过高阶组件包装一下 没登录 那就去登录
// 为其扩展一个用户状态检查功能
function PrivateRoute({component: Component, isLogin, ...rest}) {
  // 条件渲染的时候 使用 render 官方提供的 render rest注意传递给Route
  // 单独解构出component和isLogin
  // component为渲染目标组件，isLogin通常来自Redux
  // rest为传递给Route的属性
  console.log(rest)
  return (
    <Route
      {...rest}
      render={
        // 理解 props === ({ match, history, location })
        // props包含match等信息直接传给目标组件
        props =>
          isLogin ? (
            <Component/>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {redirect: props.location.pathname}
              }}
            />
          )
      }
    />
  );
}

function Login({location, isLogin, login}) {
  const redirect = location.state.redirect || "/";
  // 重定向地址
  if (isLogin) return <Redirect to={redirect}/>;
  return (<div><p>用户登录</p>
    <hr/>
    <button onClick={login}>登录</button>
  </div>);
}

export default class RouterTest extends Component {
  componentDidMount () {
    console.log('父组件')
  }


  render() {
    console.log('父组件render')
    return (
      <BrowserRouter>
        <nav>
          <Link to="/">商品列表</Link>
          <Link to="/management">商品管理</Link>
        </nav>

        {/* 路由配置 */}
        {/* react-router匹配不是独占的  exact精确匹配 management 就不会和我们的 / 去匹配*/}
        <Switch>
          <Route exact path="/" component={ProductList}/>
          <Route path="/detail/:name" component={Detail}/>
          <PrivateRoute path="/management" component={ProductMgt} isLogin={false}/>
          <Route path="/login" component={Login}/>
          {/*<Route component={() => <h3>页面不存在</h3>} />*/}
        </Switch>
      </BrowserRouter>
    );
  }
}
