import { updateQueue } from './kreact'

/**
 * 给哪个dom元素绑定哪种类型的事件
 * @param dom 给哪个dom元素绑定事件 button 真实dom元素
 * @param eventType 事件类型 onClick
 * @param listener 事件处理函数 fn
 */
export function addEvent (dom, eventType, listener) {
  // 给dom增加一个store属性，值是一个空对象
  let store = dom.store || (dom.store = {})
  store[eventType] = listener  // store.onclick = handleClick

  if (!document[eventType]) { // 有可能会覆盖用户的赋值操作 也有可能会被用户赋值覆盖掉
    document[eventType] = dispatchEvent// document.onclick = dispatchEvent
  }
}

let syntheticEvents = {}

/**
 * 为什么需要合成事件 作用是什么
 * 1. 可以实现批量更新
 * 2. 可以实现事件对象的缓存和回收
 * @param event
 */
function dispatchEvent (event) { // event是原生事件DOM对象
  let { target, type } = event  // type-> click target-> 事件源 button
  let eventType = `on${type}`  // onclick
  // 异步更新
  updateQueue.isBatchingUpdate = true
  let { store } = target
  // 调用事件 store存储过了
  let listener = store && store[eventType]
  // 包装事件 绑定了事件我们再去执行 不然点击没有绑定的区域会有问题
  if (listener) {
    let syntheticEvent = createSyntheticEvent(event)
    listener.call(target, syntheticEvent)
    for (const key in syntheticEvent) {
      syntheticEvents[key] = null
    }
    updateQueue.batchUpdate()
  }
}

function createSyntheticEvent (nativeEvent) {
  for (const key in nativeEvent) {
    syntheticEvents[key] = nativeEvent[key]
  }
  return syntheticEvents
}