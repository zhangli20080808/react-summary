import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './kredux'

export const connect = (
  mapStateToProps    = (state) => state,
  mapDispatchToProps = {}
) => (WrapComponent) => {
  return class ConnectComponent extends React.Component {
    // class组件中声明静态 contextTypes 可以获取上下文 context 一定是从上级组件中传递下来的上下文
    static contextTypes = { store: PropTypes.object }

    constructor (props, context) {
      super(props, context)
      this.state = { props: {} }
    }

    componentDidMount () {
      const { store } = this.context
      store.subscribe(() => this.update())
      this.update()
    }

    update () {
      const { store } = this.context
      // state=>({num:state.counter})  mapStateToProps相当于去执行我们前面传进来的这个 把state穿进去了
      const stateProps = mapStateToProps(store.getState())
      // 返回一个action add:()=> ({type:'add'})
      const dispatchProps = bindActionCreators(
        mapDispatchToProps,
        store.dispatch
      )
      this.setState({
        props: { ...this.state.props, ...stateProps, ...dispatchProps },
      })
    }

    render () {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}

//Provider 是我们的父组件  接受一个 store  最后将

const Context = React.createContext('')

export class Provider1 extends React.Component {
  //定义一个上下文 这种方式比较老了
  static childContextTypes = {
    store: PropTypes.object,
  }

  getChildContext () {
    //上下文会把我们的store传进去
    return { store: this.store }
  }

  constructor (props, context) {
    super(props, context)  // this.store 通过上下文 传递下去了 在子组件中就能拿到store了
    this.store = props.store
  }

  render () {
    //把孩子渲染出来  渲染到肚子里面
    return this.props.children
  }
}

export class Provider extends React.Component {
  constructor (props) {
    super(props)  // this.store 通过上下文 传递下去了 在子组件中就能拿到store了
    this.store = props.store
  }

  render () {
    //把孩子渲染出来  渲染到肚子里面
    return <Context.Provider value={this.state}></Context.Provider>
  }
}

