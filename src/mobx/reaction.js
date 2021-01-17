let nowFn = null  //nowFn 当前的 autorun方法
let counter = 0

class Reaction {
  constructor () {
    // 每个代理对象 实例化的唯一标识
    this.id = ++counter
    this.store = {}  // 存储当前 可观察对象对应的nowFn {id:[]}
  }

  static start (handle) {
    nowFn = handle
  }

  run () {
    if (this.store[this.id]) {
      this.store[this.id].forEach(item => item())
    }
  }

  // id和函数之间的关系
  collect () {
    // 当前有需要绑定函数 才需要绑定 没有的话 先不管
    if (nowFn) {
      this.store[this.id] = this.store[this.id] || []
      this.store[this.id].push(nowFn)
    }

  }

  static end () {
    nowFn = null
  }
}

export default Reaction