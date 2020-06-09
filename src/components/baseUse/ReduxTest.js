import React, {Component} from "react";
// import store from '../store';
import {connect} from "react-redux";
import {add, minus, asyncAdd} from "../../store/counter";

// 参数1：mapStateToProps = (state) => {return {num: state}}
// 参数2：mapDispatchToProps = dispatch => {return {add:()=>dispatch({type:'add'})}}
// connect两个任务：
// 1.自动渲染
// 2.状态值映射到组件属性
@connect(
  state => ({num: state.counter}),
  {
	// 理解为vuex中的action
	add,
	// adds: (num) => ({type: 'add', payload: num}), // 同步返回对象
	minus,
	asyncAdd,
	// thunk去处理的 我们 异步的action
	// asyncAdds: () => (dispatch, getState) => (dispatch) => {
	//   // 异步调用在这里
	//   setTimeout(() => {
	// 	dispatch({type: 'add'});
	//   }, 1000);
	// }
  }
)
class ReduxTest extends Component {
  // componentDidMount() {
  //     // 订阅状态变更
  //     store.subscribe(() => {
  //         this.forceUpdate();
  //     })
  // }
  render() {
	return (
	  <div>
		{/* {store.getState()} */}
		{this.props.num}
		<div>
		  <button onClick={() => this.props.add(2)}>+</button>
		  <button onClick={this.props.minus}>-</button>
		  <button onClick={this.props.asyncAdd}>+</button>
		</div>
	  </div>
	);
  }
}

export default ReduxTest;
