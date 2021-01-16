/*
* 在函数组价主体内(这里指react渲染阶段)，改变dom，添加订阅事件，设置定时器，记录日志
* 以及包含其他副作用的操作都是不允许的,因为这可能会产生莫名的bug破坏ui的一致性
*
* 使用 useEffect 完成副作用操作 赋值给 useEffect 的函数会在组件渲染到屏幕之后执行
* 你可以把 effect 看作是react从纯函数世界通往命令式世界的逃生通过
* useEffect 就是一个effect hooks 给函数增加了副作用的能力 跟类组件的 componentDidMount
* componentDidUpdate componentWillMount 相同的用途，只不过合并成了一个API
* */
import React, { Component, useEffect, useState } from 'react'

function EffectDemo () {
  let [state, setState] = useState({ number: 0 })
  // useEffect 会在组件挂载后执行
  useEffect(() => {
    document.title = state.number
  }, [])
  return <div>
    {state.number}
    <button onClick={() => setState({ number: state.number + 1 })}>+</button>
  </div>
}

//优化
function EffectDemo2 () {
  let [state, setState] = useState({ number: 0 })
  // useEffect 会在组件挂载后执行  没有给第二个参数 没戏渲染都会执行调用 同时 会返回一个清理函数 当组件将要卸载的时候 执行清理函数
  useEffect(() => {
    console.log('开启定时器')
    let timer = setInterval(() => {
      setState(x => ({ number: x.number + 2 }))
    }, 1000)
    return () => {
      console.log('销毁定时器')
      clearInterval(timer)
    }
  }, [])
  return <div>
    {state.number}
    <button onClick={() => setState({ number: state.number + 1 })}>+</button>
  </div>
}

function Test () {
  let [visible, setVisible] = useState(true)
  return <div>
    <button onClick={() => setVisible(false)}>hide</button>
    {
      visible && <EffectDemo2/>
    }
  </div>
}

export default Test