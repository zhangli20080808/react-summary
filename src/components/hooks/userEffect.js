/*
* 在函数组价主体内(这里指react渲染阶段)，改变dom，添加订阅事件，设置定时器，记录日志
* 以及包含其他副作用的操作都是不允许的,因为这可能会产生莫名的bug破坏ui的一致性
*
* 使用 useEffect 完成副作用操作 赋值给 useEffect 的函数会在组件渲染到屏幕之后执行
* 你可以把 effect 看作是react从纯函数世界通往命令式世界的逃生通过
*
* useEffect 就是一个effect hooks 给函数增加了副作用的能力 跟类组件的 componentDidMount
* componentDidUpdate componentWillMount 相同的用途，只不过合并成了一个API
*
* 当组件初次渲染完成之后 或者组件更新的时候 执行
*
* 1. 会在每次 render 的时候必定执行一次。
* 2. 如果返回了函数，那么在下一次 render 之前或组件 unmount 之前必定会运行一次返回函数的代码。
* 3. 如果指定了依赖数组，且不为空，则当数组里的每个元素发生变化时，都会重新运行一次。
* 4. 如果数组为空，则只在第一次 render 时执行一次，如果有返回值，则同 2
* 5. 如果在 useEffect 中更新了 state，且没有指定依赖数组，或 state 存在于依赖数组中，就会造成死循环
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