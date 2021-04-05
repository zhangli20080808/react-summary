import React, { useEffect } from 'react'
import { render } from '../../index'

/**
 * 如果和获取最新的值
 * useRef 会返回一个可变的ref对象 {current}
 * ref对象在组件的整个生命周期内保持不变
 *
 * 注意区分 React.createRef 和 useRef
 * 为什么需要转发? React.forwardRef() 因为函数组件没有实例 不能使用ref
 */
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

function useRef (current) {
  memoizedStates[index] = memoizedStates[index] || { current }
  return memoizedStates[index++]
}

function forwardRef(Comp){
  return class extends React.Component{
   render () {
     console.log(this,'this')
     // ref 属性很特殊 是一个内部保护的变量
     return Comp(this.props,this.props.ref2)
   }
  }
}

/**
 * 经过之后会拿到两个参数
 * @param props
 * @param ref
 */
function FuncChild (props, ref) {
  // 当这个虚拟input组件在挂载到页面之后会给ref.current=真实dom赋值
  return <input ref={ref}/>
}

const ForwardFuncChild = forwardRef(FuncChild)

function Index () {
  const [num, setNum] = useState(0)
  let numberRef = useRef()  //  useRef 后续自定义实现
  let funChildRef = useRef()

  function updateNumber () {
    setNum(num + 1)
  }

  function lazyFunc () {
    setTimeout(() => {
      alert(numberRef.current)
    }, 2000)
  }

  // 在每次渲染结束之后，这个时候 num 值是最新的
  useEffect(() => {
    numberRef.current = num
  })

  return <div>
    <ForwardFuncChild ref2={funChildRef}/>
    <div>{num}</div>
    <div>ref: {numberRef.current}</div>
    <button onClick={lazyFunc}>lazyFunc</button>
    <button onClick={updateNumber}>+</button>
    <button onClick={() => funChildRef.current.focus()}>获取焦点</button>
  </div>
}

export default Index
