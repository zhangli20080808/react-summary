import React from 'react'
import { render } from '../../index'

// StateDemo 多次渲染 组件执行的时候 我们的状态需要保留  ——> memoizedState
let memoizedStates = []
let index = 0

function useState (initialState) {
  memoizedStates[index] = memoizedStates[index] || initialState
  let currentIndex = index

  function setState (newState) {
    memoizedStates[currentIndex] = typeof newState === 'function' ? newState(memoizedStates[index]) : newState
    // 每次渲染的时候清0  不然会累加
    index = 0
    render()
  }

  // 返回 memoizedStates[index]的结果 index + 1
  return [memoizedStates[index++], setState]
}

// 依赖项 上次是number1 这次也是number1 不执行  多次渲染的时候保持一个变量

function useEffect (cb, dependencies) {
  if (memoizedStates[index]) {
    let { destroy, lastDependencies } = memoizedStates[index]
    // lastDependencies 如果存在 拿到每一个依赖 第一次 -> true
    // 如果这次有 要去遍历现在的每一项和上次的每一项 数组依赖的值 是否相等 都一样 返回true
    const changed = lastDependencies ? !dependencies.every((item, index) => item === lastDependencies[index]) : true
    if (changed) { // 如果依赖改变
      if (destroy) destroy()
      const cacheState = { lastDependencies: dependencies }
      memoizedStates[index++] = cacheState
      // 用宏任务实现 保证 callback 是在本次页面渲染结束之后执行的
      setTimeout(() => {
        cacheState.destroy = cb()
      })
    } else {
      index++
    }
  } else {
    const cacheState = { lastDependencies: dependencies }
    memoizedStates[index++] = cacheState // 直接赋值
    setTimeout(() => {
      cacheState.destroy = cb()
    })
  }
}

function StateDemo () {
  // useState2 就是一个hooks 第一个值是当前的状态 第二个值是改变状态的函数

  /*
  * 第一轮  memoizedStates=['计数器',0]  重置了index
  * 第二轮  memoizedStates=['计数器',1]
  * */
  const [name, setName] = useState('计数器')
  //  多个state
  const [number, setNumber] = useState(0)

  // 但是存在多个 useEffect 就失败了
  useEffect(() => {
    console.log('useEffect1')
  }, [name])
  useEffect(() => {
    console.log('useEffect2')
  }, [number])

  return <div>
    <p>UseStateDemo</p>
    <p>{number}</p>
    <p>{name}</p>
    <button onClick={() => setName('计数器' + Date.now())}>改name</button>
    <button onClick={() => setNumber(number + 1)}>+</button>
  </div>
}

export default StateDemo
