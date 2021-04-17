/**
 * 路由的实现
 * 1. react-router  路由的核心库，于dom无关，可以与ReactNative，Canvas Dom 配合使用
 * 2. histroy 不同的历史对象 有不同的实现对应不同的平台
 * 3. react-router-dom Dom或者浏览器环境下的实例
 *
 * Router的工作
 * 1. 收集当前pathname，然后通过上下文向下层组件传递，获取pathname，如何获取pathname？histroy.location.pathname
 * 如果是hash路由 #锚点# 后面的字符串
 * 如果是browser路由，histroy.location.pathname
 * 2. 监听路由变化，当路径发生变化的时候，修改pathname，重新渲染组件，让下面的Route重新匹配
 */
import React from 'react';
import { BrowserRouter as Router,Redirect, Route, Switch  } from './react-router-dom';
// import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import history from './history'
console.log('====================================');
console.log(history);
console.log('====================================');
// path 匹配pathname 的时候默认匹配的是前缀
//  最外层需要包裹一个 Router 容器
function Index() {
  return (
    <Router>
      <div>
        {/* <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li> 
            <Link to="/user">User</Link>
          </li>
        </ul> */}
        <Switch>
          <Route path="/home" component={Home} exact />
          <Route path="/user" component={User} />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  );
}

export default Index;
