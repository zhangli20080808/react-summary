class Updater {
  constructor () {
    this.state = { number: 0, name: 'zl' }
    this.queues = []
  }

  setState (newState) {
    this.queues.push(newState)
  }

  // react会帮我们包装一层事件 当调用完事件的时候，再去调用flush
  flush () {
    this.queues.forEach(update => {
      if (typeof update === 'function') {
        // 将上次的状态传入
        this.state = { ...this.state, ...update(this.state) }
      } else {
        this.state = { ...this.state, ...update }
      }
    })
  }
}

let updater = new Updater()

updater.setState({ number: 1 })
updater.setState({ number: 2 })
updater.setState({ number: 3 })
updater.setState((prevState) => ({ number: prevState.number + 1 }))
updater.flush()
console.log(updater.state) //{ number: 4 }

