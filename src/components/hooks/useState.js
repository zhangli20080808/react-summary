import React from 'react'
import { render } from '../../index'

// StateDemo 多次渲染 组件执行的时候 我们的状态需要保留  ——> memoizedState
let memoizedStates = []
let index = 0

function useState (initialState) {
  memoizedStates[index] = memoizedStates[index] || initialState
  let currentIndex = index

  function setState (newState) {
    memoizedStates[currentIndex] = newState
    index = 0
    render()
  }

  // 返回 memoizedStates[index]的结果 index + 1
  return [memoizedStates[index++], setState]
}

// 依赖项 上次是number1 这次也是number1 不执行  多次渲染的时候保持一个变量
// 我们将 state和effect的依赖项都放入 memoizedStates 中
function useEffect (cb, dependencies) {
  if (!dependencies) {
    index++
    return cb()
  }
  let lastDependencies = memoizedStates[index]
  const changed = lastDependencies ? !dependencies.every((item, index) => item === lastDependencies[index]) : true
  if (changed) {
    cb()
    memoizedStates[index] = dependencies
  }
  index++
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
    console.log('useEffect1 name')
  }, [name])
  useEffect(() => {
    console.log('useEffect2 number')
  }, [number])

  return <div>
    <p>UseStateDemo</p>
    {name}: {number}
    <button onClick={() => setName('计数器' + Date.now())}>改name</button>
    <button onClick={() => setNumber(number + 1)}>+</button>
  </div>
}

/*
*
* */

export default StateDemo