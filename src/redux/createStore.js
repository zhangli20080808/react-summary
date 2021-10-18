function createStore(reducer, enhancer) {
  // 如果存在enhancer  enhancer实现中间件机制的核心 高阶函数
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  // 保存状态
  let currentState = undefined;
  const currentListeners = []; // 回调函数数组

  function getState() {
    return currentState;
  }
  // 更新状态
  function dispatch(action) {
    // 修改,传入老状态和action，计算出新的状态，更新新状态
    currentState = reducer(currentState, action);
    // 变更通知
    currentListeners.forEach((v) => v());
    return action;
  }
  // subscribe 我们的render函数，有 dispatch 动作，我们就执行
  function subscribe(cb) {
    currentListeners.push(cb);
    return function () {
      let index = currentListeners.indexOf(cb);
      currentListeners.splice(index, 1);
      // currentListeners = currentListeners.filter((item) => item !== cb);
    };
  }

  // 派发一个默认动作，为了给我们的 currentState 初始值
  dispatch({ type: '@IMOOC/KKB-REDUX' });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
export default createStore;
