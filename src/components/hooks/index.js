import React, { useEffect, useRef, useState } from 'react'

function Index () {
  const [num, setNum] = useState(0)
  let numberRef = useRef()  //  useRef 后续自定义实现

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
    <div>{num}</div>
    <div>ref: {numberRef.current}</div>
    <button onClick={lazyFunc}>lazyFunc</button>
    <button onClick={updateNumber}>+</button>
  </div>
}

export default Index
