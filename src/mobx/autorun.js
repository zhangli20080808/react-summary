import Reaction from './reaction'

let autorun = (handle) => {
  Reaction.start(handle)  // 先保存了这个函数
  handle() // 调用这个方法会触发 get 属性操作
  Reaction.end()
}

export default autorun