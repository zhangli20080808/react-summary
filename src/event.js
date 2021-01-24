/**
 * 给哪个dom元素绑定哪种类型的事件
 * @param dom 给哪个dom元素绑定事件 button 真实dom元素
 * @param eventType 事件类型
 * @param listener 事件处理函数
 */
export function addEvent (dom, eventType, listener) {
  // 给dom增加一个store属性，值是一个空数组
  let store = dom.store || (dom.store = {})
  store[eventType] = listener

  if (!document[eventType]) {
    document[eventType] = dispatchEvent// document.onclick = dispatchEvent
  }
  console.log(document[eventType])
}

function dispatchEvent () {
  console.log(12312321)
}