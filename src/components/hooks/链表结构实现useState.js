import React from 'react'
import { render } from '../../index'

/*
* 链表理解
* 这个对象有两部分 一部分放他的值 另一部分放一个引用地址 指向下一个对象
  let thirdHook = {
    state: null,
    next: secondHook
  }
  let secondHook = {
    state: null,
    next: thirdHook
  }
  let firstHook = {
    state: null,
    next: secondHook
  }
* */

let firstWorkInProcessHook = { memoizedState: null, next: null }
let workInProcessHook = firstWorkInProcessHook

function useState (initialState) {
  // 第一次 useState的时候 我们创建一个新的节点 两部分 initialState 和 next next此时为null
  let currentHook = workInProcessHook.next ? workInProcessHook.next : { memoizedState: initialState, next: null }

  function setState (newState) {
    currentHook.memoizedState = newState
    workInProcessHook = firstWorkInProcessHook
    render()
  }

  if (workInProcessHook.next) {
    // 不是第一次的时候 把值取出来 向后移动一位
    workInProcessHook = workInProcessHook.next

  } else {
    // 第一次的时候 也就是我们的最初的那个节点 firstWorkInProcessHook 我们吧next指向currentHook Link起来了
    workInProcessHook.next = currentHook
    // 接着让我们的指针向后移一位  每次的currentHook都是不一样的 注意
    workInProcessHook = currentHook
    // 当我们重新渲染的时候 我们需要让 workInProcessHook 重新回到第一位firstWorkInProcessHook
  }
  return [currentHook.memoizedState, setState]
}

// 依赖项 上次是number1 这次也是number1 不执行  多次渲染的时候保持一个变量
// 我们将 state和effect的依赖项都放入 memoizedStates 中
function StateDemo () {
  // useState2 就是一个hooks 第一个值是当前的状态 第二个值是改变状态的函数
  const [name, setName] = useState('计数器')
  //  多个state
  const [number, setNumber] = useState(0)
  return <div>
    <p>链表结构实现useState</p>
    <p> {name}: {number}</p>
    <button onClick={() => setName('计数器' + Date.now())}>改name</button>
    <button onClick={() => setNumber(number + 1)}>+</button>
  </div>
}

export default StateDemo