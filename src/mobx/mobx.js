/*
* 对比redux
* 1. 开发难度低 2. 开发代码量少 3. 渲染性能好
*
* 核心思想
* 状态改变引起的副作用应该被自动触发
*
* 应用逻辑只需要修改数据即可，mobx会自动渲染UI，无须人工干预
* 数据变化只会渲染对应的组件
* mobx提供机制来存储和更新应用状态提供给react使用
* 通过提供机制把应用状态转换为可渲染组件树 并对其进行渲染
* */

import { observable, autorun, computed } from 'mobx'
import React from 'react'
import ReactDom from 'react-dom'
import { observer } from 'mobx-react'

// import { observable, autorun } from './index'

// observable 把普通数据变成可观察数据  Object.defineProperty proxy

// let o = observable({ name: 'zl', city: { name: 13 } })
// // 思路  autorun 先收集依赖 再去执行
// autorun(()=>{
//   // 自动运行 会先执行一次
//   console.log(o.city.name,'changed')  //  这里我们调用get 所以调用的时候我们存储起来
// })
// o.city.name ='zhangLi'

class Store {
  @observable num = 1
  add = () => {
    console.log('add')
    this.num += 1
    console.log(this.num)
  }

  get type () {
    return this.num % 2 ? '奇数' : '偶数'
  }
}

let store = new Store()

@observer
class CommonTest extends React.Component {
  render () {
    const { store } = this.props
    console.log(store)
    return <div>
      <div>{store.num}</div>
      <button onClick={() => store.add()}>+</button>
      {
        store.type
      }
    </div>
  }
}

// let my = new CommonTest
// autorun(() => {
//   console.log(my.allName)
// })
// my.name = 'xiaoHua'

// 装饰器 一般使用方式
// 1. 原型上的方法修饰器
// class Person {
//   // 我们希望在say方法之前之后do something
//   @say
//   say () {
//     console.log('哈哈')
//   }
// }
//
// function say (target, key, descriptor) {
//   console.log(descriptor)  //descriptor -> value 对应我们的say方法 会默认return descriptor 方法
//   let oldSay = descriptor.value
//   descriptor.value = function () {
//     console.log('before')
//     oldSay()
//     console.log('after')
//   }
// }
//
// let p = new Person()
// p.say()
// 2. 属性修饰
// class Circle {
//   @readonly PI = 3.14
// }
// function readonly(target,key,descriptor){
//  // target -> 类 Circle   key->PI descriptor 描述
//   console.log(descriptor)
//   // initializer key对应的值
// }

// 3. 类装饰
// @add
// class My {
// }
// function add(target){ // 修饰类的时候 target 指代的就是类
//  target.flag = 'ok'
// }

// console.log(My.flag)

ReactDom.render(<CommonTest store={store}/>, document.getElementById('root'))
export default CommonTest