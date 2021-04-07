import React from 'react'
import { render } from '../../index'

/**
 * useLayoutEffect
 * 使用场景呢？
 * 签名函数和 useEffect，但是会在所有dom变更之后同步调用 useEffect
 * useEffect 不会阻塞浏览器渲染， useLayoutEffect会
 * useEffect 会在浏览器渲染之后执行 useLayoutEffect则是在 dom 更新完成之后，浏览器绘制之前执行
 *
 * 事件循环
 * 1. 从宏任务队列中取出一个宏任务执行
 * 2. 检查微任务队列，执行并清空微任务队列，如果在微任务的执行中加入了新的微任务，则会继续执行新的微任务
 * 3. 进入更新渲染阶段 判断是否需要渲染,要根据屏幕 刷新率、页面性能、页面是否在后台运行共同决定，通常来说这个渲染间隔是固定的，一般是60桢/s
 * 4. 如果确定要更新，则进入下面阶段，否则本轮循环结束
 *   5. e. 如果窗口大小发生了变化，则执行监听resize事件
 *   6. d. 如果页面发生了滚动，执行scroll事件
 *   7. f. 执行桢动画回调，也就是  requestAnimationFrame 的回调
 *   8. g.  重新渲染用户界面
 * 9. 判断是否宏任务微任务队列为空则判断是否执行 requestAnimationFrame 的回调函数
 */
let memoizedStates = []
let index = 0

function useLayoutEffect (cb, dependencies) {
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
      Promise.resolve().then(()=>{
        cacheState.destroy = cb()
      })
    } else {
      index++
    }
  } else {
    const cacheState = { lastDependencies: dependencies }
    memoizedStates[index++] = cacheState // 直接赋值
    queueMicrotask(() => {
      cacheState.destroy = cb()
    })
  }
}

function Animate () {
  let divRef = React.createRef()
  let style = {
    width: '100px',
    height: '100px',
    background: 'red'
  }
  useLayoutEffect(() => {
    divRef.current.style.transform = 'translate(500px)'
    divRef.current.style.transition = 'all 0.5'
  })

  return <div style={style} ref={divRef}/>
}

export default Animate
