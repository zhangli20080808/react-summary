import React, { useState, useCallback, useRef, memo, useMemo, useReducer } from 'react'

//解决的问题
//将组件间相互关联的部分拆分成更小的函数
//hook使我们在无须修改组件结构的情况下复用状态逻辑

//注意 1、只能在最外层调用hook 不要再循环 条件或者子函数中调用

//函数式更新
function count () {
  let [num, setNum] = useState({ num: 0 })

  let numberRef = useRef(num)
  numberRef.current = num

  function alertNumber () {
    setTimeout(() => {
      alert(numberRef.current)
    }, 2000)
  }

  function lazyFunc () {
    setTimeout(() => {
      // 如果新的状态 需要使用先前的状态计算出来
      setNum(state => ({ num: state.num + 2 }))
    }, 2000)
  }

  return <div>
    <div>{num.num}</div>
    <button onClick={lazyFunc}>lazyFunc</button>
    <button onClick={alertNumber}>alertNumber</button>
  </div>
}

//每次渲染都是独立的闭包
//每一次渲染都有他自己的props和state 每一次渲染都有他自己的事件处理函数
// 我们的组件函数每次渲染都会被调用 但是每一次调用中number值都是常量 并且他被赋予了当前渲染中的状态值
// 在单次渲染的范围内 props和stat始终保持不变
// alert 会捕捉我点击按钮时候的状态

function count2 () {
  let [num, setNum] = useState(0)

  function alertNumber () {
    setTimeout(() => {
      // 2s之后弹出的num是当时的状态num 不是2s后的num
      alert(num)
    }, 2000)
  }

  return <div>
    <div>{num}</div>
    <button onClick={() => setNum(num + 1)}>+</button>
    <button onClick={alertNumber}>alertNumber</button>
  </div>
}

// initialState 之会在组件初始渲染的时候被调用 后续渲染会被忽略  惰性初始state
// 跟类组件的setState不同 这里的状态不会自动合并,更新的时候要传入完整的值
function count1 () {
  let [state, setNum] = useState(() => {
    console.log('初始状态')
    return { num: 0, name: 'zl' }
  })
  return <div>
    <div>{state.num}:{state.name}</div>
    <button onClick={() => setNum({ ...state, num: state.num + 1 })}>lazyFunc</button>
  </div>
}

// 性能优化

// react使用Object.is比较算法   调用State Hook 的更新函数并传入当前的state时候，react将跳过子组件的渲染以及effect的执行
function count5 () {
  let [state, setState] = useState(() => {
    return { num: 0, name: 'zl' }
  })
  console.log('count5 render')
  return <div>
    <div>{state.num}:{state.name}</div>
    <button onClick={() => setState({ ...state, num: state.num + 1 })}>lazyFunc</button>
    {/*setState的时候 如果发现来的state和新的state一样 就不会去更新了*/}
    <button onClick={() => setState(state)}>lazyFunc</button>
  </div>
}

// 减少渲染次数  useCallback
let lastAddClick
let lastChangName

function count6 () {
  let [num, setNumber] = useState(0)
  let [name, setName] = useState('zl')
  //  会在每次渲染的时候都生成 性能很低  只有在依赖的变量发生变化的时候 才会重新生成
  const addClick = useCallback(() => setNumber(num + 1), [num])
  // 使用 useCallback 第一次比较 false  后续都是true  不使用 都是false  说明每次都会生成一个新的
  console.log(lastAddClick === addClick)
  lastAddClick = addClick

  const changeName = useCallback(() => setName(name + 1), [name])
  // 使用 useCallback 第一次比较 false  后续都是true  不使用 都是false  说明每次都会生成一个新的
  console.log(lastChangName === changeName)
  lastChangName = changeName
  return <div>
    <div>{num}:{name}</div>
    <button onClick={addClick}>changeNum</button>
    <button onClick={changeName}>changeName</button>
  </div>
}

function Child (props) {
  console.log('child render')
  return <div>
    <button onClick={props.addClick}>{props.data.num}</button>
  </div>
}

// 就让函数拥有了记忆的功能 只有当前组件发生变更的时候才会刷新 负责不刷新
Child = memo(Child)
let lastFlag
let lastData

function demo7 () {
  let [num, setNum] = useState(0)
  let [name, setName] = useState('zl')

  // 如果这样每次都会重新创建一个 addClick 重新生成一个变量 每次 addClick 都不一样
  // deps 表示此函数依赖的变量 如果变量变了 会重新生成函数
  const addClick = useCallback(() => setNum(x => x + 2), [num])
  // console.log(lastFlag === addClick, 'flag')
  lastFlag = addClick
  // 每一次执行的时候 都会生成一个 data 所以永远是false  使用 useMemo 这样我们的data就缓存下来了
  const data = useMemo(() => ({ num }), [num])
  console.log(lastData === data, 'data', lastData, data)
  lastData = data
  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)}/>
      <Child addClick={addClick} data={data}/>
    </div>
  )
}

function useState2 (initialState) {
  //借助 useReducer
  const reducer = useCallback((state = {}, action) => action.payload)
  let [state, dispatch] = useReducer(reducer, initialState)

  function setState (payload) {
    console.log(payload, 'payload')  //{number: 2} "payload
    dispatch({ payload })
  }

  return [state, setState]
}

// useState 是依赖于 useReducer的
let initialState = { number: 0 }
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

function reducers (state, action) {
  switch (action.type) {
    case INCREASE:
      return { number: state.number + 1 }
    case DECREASE:
      return { number: state.number - 1 }
    default:
      return state
  }
}

function demo8 () {
  let [state, xxx] = useState2(initialState)
  console.log(state, 'state')

  // let [state, dispatch] = useReducer(reducers, initialState)
  return <div>
    {state.number}
    {/*<button onClick={() => dispatch({ type: INCREASE })}>+</button>*/}
    {/*<button onClick={() => dispatch({ type: DECREASE })}>-</button>*/}

    <button onClick={() => xxx({ number: state.number + 1 })}>+</button>
    <button onClick={() => xxx({ number: state.number - 1 })}>-</button>

  </div>
}

export default demo8