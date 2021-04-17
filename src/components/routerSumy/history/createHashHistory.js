/**
action: "POP"
block: ƒ block(prompt)
createHref: ƒ createHref(location)
go: ƒ go(n)
goBack: ƒ goBack()
goForward: ƒ goForward()
length: 41
listen: ƒ listen(listener)
location: {pathname: "/user", search: "", hash: "#/", state: undefined}
push: ƒ push(path, state)
replace: ƒ replace(path, state)
 */

function createBrowserHistory() {
  const globalHistory = window.history;
  // 有时候需要监听路由变化
  const listener = [];

  function listen(listener) {
    listener.push(listener);
  }

  function setState(nextState) {
    Object.assign(history, nextState);
    listener.forEach((listen) => listen());
  }

  window.addEventListener('hashchange', () => {
    let pathname = window.location.hash.slice(1);
    setState({ action: 'POP', pathname });
  });

  function push(path) {
    // 字符串和对象
    const action = 'PUSH';
    let pathname, state;
    if (typeof path === 'string') {
      pathname = path;
    } else if (typeof path === 'object') {
      pathname = path.pahtname;
      state = path.state;
    }
    const location = { pathname, state };
    window.location.hash = pathname; // 改变hash值 hash改变，调用 setState 执行监听函数
    setState({ action, location });
  }


  let history = {
    length: globalHistory.length,
    action: 'POP',
    location: {
      pahtname: window.location.pathname,
      state: globalHistory.history,
    },
    push,
    listen
  };

  return history;
}

export default createBrowserHistory;
