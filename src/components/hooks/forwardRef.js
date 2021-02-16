/**
 ref和forwardRef结合使用
 1. 通过forwardRef可以将ref转发到子组件
 2. 子组件拿到父组件中创建的ref，绑定到自己的某一个元素中

 现在通过ref和forwardRef，可以在父组件中随意改变元素。
 但是我们可能只希望父组件只能对子组件进行有限操作，也就是限制父组件的自由度。
 1. 直接暴露给父组件带来的问题是某些情况的不可控
 2. 父组件可以拿到DOM后进行任意的操作
 3. 我们只是希望父组件可以操作的focus，其他并不希望它随意操作其他方法

 可以只暴露特定的操作 useImperativeHandle
 to -> useImperativeHandle
 */

import React, { useRef, forwardRef } from 'react'

const HYInput = forwardRef((props, ref) => {
  return <input ref={ref} type="text"/>
})
export default function ForwardRefDemo () {
  const inputRef = useRef()
  return (
    <div>
      <HYInput ref={inputRef}/>
      <button onClick={e => inputRef.current.focus()}>聚焦</button>
    </div>
  )
}