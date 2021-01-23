import React, { Component } from 'react'

/*
 let element = React.createElement('h1', 'null', 'hello') 普通的js对象
 {
    type: 'h1'
    key: null,
    ref:null,
    props:{
      children: 'hello'
    },
    // 内置属性
    '_owner': null,
    '_store': {}
  }
  React.Dom
* */
class JsxDemo extends Component {
  render () {
    // let a = {
    //   type: 'h1',
    //   key: null,
    //   ref: null,
    //   props: {
    //     children: [{
    //       key: null,
    //       props: { children: 'hello' },
    //       ref: null,
    //       type: 'span'
    //     }, 'world'],
    //     className: 'title',
    //     style: { color: 'red' }
    //   },
    //   // 内置属性
    //   '_owner': null,
    //   '_store': {}
    // }
    // let element = React.createElement('h1', 'null', 'hello')
    let element = (
      <h1 className='title' style={{ color: 'red' }}>
        <span>hello</span>
      </h1>
    )
    console.log(element)
    return (
      <div>
        123
      </div>
    )
  }
}

export default JsxDemo