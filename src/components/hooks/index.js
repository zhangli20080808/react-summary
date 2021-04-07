import React from 'react'
import { render } from '../../index'

/**
 * 自定义hooks
 * 1. 有时候我们想要在组件之间重用一些逻辑 并不是状态 状态在每个hook中都是独立的
 * 2. 可以让我们在不增加组件的情况下达到同样的目的
 * 3. hook 是一种复用状态逻辑的方式，不复用state本身
 * 4. 事实上hook的每次调用都有一个完全独立的state
 * 5. 自定义hook更像是一种约定，而不是一种功能。注意 如果函数以use开头，并且调用了其他的hook，则
 * 统一称为一个hook
 */
// 实现一个每秒+1的定时器
function Index () {
  let style = {
    width: '100px',
    height: '100px',
    background: 'red'
  }
  return <div style={style}/>
}
export default Index
