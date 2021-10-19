class Subscription {
  constructor(store) {
    this.listeners = [];
    // 订阅仓库变化事件，当仓库状态发生变化的时候执行监听函数
    store.subscribe(this.notify);
  }
  subscribe = (listener) => {
    this.listeners.push(listener);
  };
  notify = () => {
    this.listeners.forEach((k) => k());
  };
}
export default Subscription;
