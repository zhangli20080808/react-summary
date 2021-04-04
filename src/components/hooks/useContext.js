import React, { useContext, useReducer } from 'react'
import ReactDOM from 'react-dom';
/**
 * 1. 接受一个 context 的值(React.createContext()的返回值)，并返回该context的当前值
 * 2. 当前context值由上层组件中距离当前组件最近的<MyContent.Provider>的value props决定
 * 3. 当组件上层最近的 <MyContent.Provider> 更新的，会触发hook重渲染，并使用最新传递给 MyContent.Provider的 context 的value值
 * 4. useContext(MyContent)相当于类组件中的 static contentType = MyContent 或者 <MyContent.Provider>
 * 5. useContext(MyContent) 只是让我们能够读取context的值以及订阅context值得变化 仍然需要在上层组件中使用 MyContent.Provider
 *    来为下层组件提供 context
 */

let AppContext = React.createContext();
//AppContext Provider

function useContext(context){
  return context._currentValue;  // 外部如果传入 context react内部会将值赋给_currentValue
}
function Counter(){
  let {state,setState} = useContext(AppContext);
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={()=>setState({number:state.number+1})}>+</button>
    </div>
  )
}
function App(){
  let [state,setState]= useState({number:0});
  return (
    <AppContext.Provider value={{state,setState}}>
      <div>
        <div>
          <Counter/>
        </div>
      </div>
    </AppContext.Provider>
  )
}
function render(){
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );
}
render();
