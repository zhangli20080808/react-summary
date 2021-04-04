
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
/**
 * 1. FuncEffectDemo2 render
 * 2. 开启定时器
 *
 * 3. FuncEffectDemo2 render
 * 4. 销毁定时器
 * 5. 开启定时器
 *
 * 6. FuncEffectDemo2 render
 * 7. 销毁定时器
 * 8.  开启定时器
 */
function EffectDemo2 () {
  // console.log('FuncEffectDemo2 render')
  let [state, setState] = useState({ number: 0 })
  // useEffect 会在组件挂载后执行  没有给第二个参数 没戏渲染都会执行调用 同时 会返回一个清理函数 当组件将要卸载的时候 执行清理函数
  // render 添加 useEffect 函数
  // re-render 替换 useEffect 函数  内部的函数也会重新定义
  useEffect(() => {
    console.log('开启定时器')
    let timer = setInterval(() => {
      setState(x => ({ number: x.number + 2 }))
    }, 1000)
    return () => {
      // 每次渲染的时候 如果有清理函数 都会先执行 只有render之后才知道有哪些销毁函数
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
