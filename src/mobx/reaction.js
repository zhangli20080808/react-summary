let nowFn = null  //nowFn 当前的 autorun方法
let counter = 0

class Reaction {
  constructor () {
    this.id = ++counter
    this.store = {}
  }

  static start (handle) {
    nowFn = handle
  }

  run () {
    if (this.store[this.id]) {
      this.store[this.id].forEach(item => item())
    }
  }

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