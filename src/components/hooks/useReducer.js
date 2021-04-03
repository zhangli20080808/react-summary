import React from 'react'
import { render } from '../../index'

// StateDemo 多次渲染 组件执行的时候 我们的状态需要保留  ——> memoizedState
let initialArg = 0
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

function reducer (state, action) {
  switch (action.type) {
    case INCREASE:
      return { number: state.number + 1 }
    case DECREASE:
      return { number: state.number - 1 }
    default:
      return state
  }
}

function init (initialArg) {
  return { number: initialArg }
}

/*
* useState的替代方案 ，接受一个 形如 (state,action)=>newState 的 reducer,并返回当前state以及配套的dispatch方法
* 1. 区别  useReducer 是 useState 的内部实现 ->  useState是靠useReducer实现的
* 2. 使用场景  改变状态的逻辑比较复杂的时候 或者 下一个状态依赖前一个状态的时候可以使用 useReducer
* */

// 自定义实现 useReducer
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

function StateDemo () {
  // useReducer 三个参数 reducer initialArg init  如果init存在 将 initialArg 传入返回新的值
  // init 函数返回的结果 才是我们 useReducer 的 state  ->{number:0}
  let [state, dispatch] = useReducer(reducer, initialArg, init)
  // useEffect 会在组件挂载后执行

  return <div>
    <p>UseReducerDemo</p>
    {state.number}
    <button onClick={() => dispatch({ type: INCREASE })}>+</button>
    <button onClick={() => dispatch({ type: DECREASE })}>-</button>
  </div>
}

export default StateDemo
