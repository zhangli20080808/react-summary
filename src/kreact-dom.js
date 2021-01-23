import initVNode from './kdom'

/**
 * 虚拟Dom转换为真实Dom,并插入到容器里
 * @param vNode 虚拟dom
 * @param container 插入的容器
 */
function render (vNode, container) {
  // container.innerHTML = `<pre>${JSON.stringify(vNode, null, 2)}</pre>`
  const dom = initVNode(vNode)
  container.appendChild(dom)
}

export default { render }