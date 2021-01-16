import React from 'react'
import { render } from '../../index'

/*
* 1. 区别  useReducer 是 useState 的内部实现 ->  useState是靠useReducer实现的
* 2. 使用场景  改变状态的逻辑比较复杂的时候 或者 下一个状态依赖前一个状态的时候可以使用 useReducer
* */

// 自定义 useReducer

let memoizedState

function useReducer (reducer, initialArg, init) {
  let initialState = void 0  // // void 跟上任意表达式返回的都是 undefined

  if (typeof init !== 'undefined') {
    initialState = init(initialArg)
  } else {
    initialState = initialArg
  }

  function dispatch (action) {
    memoizedState = reducer(memoizedState, action)
    render()
  }

  memoizedState = memoizedState || initialState

  return [memoizedState, dispatch]

}

function useState (initialState) {
  return useReducer((oldState, newState) => newState, initialState)
}

function StateDemo () {
  // useReducer 三个参数 reducer initialArg init  如果init存在 将 initialArg 传入返回新的值
  // init 函数返回的结果 才是我们 useReducer 的 state  ->{number:0}

  const [number, setNumber] = useState(0)

  return <div>
    <p>useReducer实现useState</p>
    <p>{number}</p>
    <button onClick={() => setNumber(number + 1)}>+</button>
  </div>
}

export default StateDemo