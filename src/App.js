import React, { useState, useEffect, Component } from 'react'
// import BaseUse from './components/baseUse';
// import Codemirror from './components/codemirror';
// import AdvancedUse from './components/advancedUse'
// import ReduxUse from './components/reduxUse'
// import TodoList from './components/TodoLIst';
// import Lifecycle from './components/baseUse/lifecycle';
// import JsxTest from "./components/JsxTest";
// import StateMgt from "./components/StateMgt";
// import EventHandle from "./components/EventHandle";
// import ContextTest from "./components/baseUse/ContextTest";
// import HocTest from "./components/HocTest.js";
// import Composition from "./components/baseUse/Composition";
// import HooksTest from "./components/baseUse/HooksTest";
// import WrappedNormalLoginForm from "./components/FormTest";
// import WrappedNormalLoginForm2 from "./components/baseUse/KFormTest2";

// import Button from 'antd/lib/button'
// import "antd/dist/antd.css"

// import {Button} from 'antd';
// import KFormTest from './components/baseUse/KFormTest';
// import Dialog, { Dialog2 } from './components/baseUse/Dialog';
// import Tree from './components/Tree';
// import CommentList from './components/CommentList';
// import ReduxTest from './components/baseUse/ReduxTest';
// import MyReduxTest from './components/baseUse/MyReduxTest';
// import RouterTest from './components/baseUse/RouterTest';
// import MyRouterTest from './components/MyRouterTest';

// import TestHook from './components/hooks';
// import EffectHook from './components/hooks/effect';
// import UseStateDemo from './components/hooks/useState';
// import UseReducerDemo from './components/hooks/useReducer';

// import CustomerUseReducerDemo from './components/hooks/useReducer实现useState';
// import CustomerUseStateLink from './components/hooks/链表结构实现useState';
import JsxDemo from './components/process/JsxDemo'
import PhotoPreview from './components/Carousel3'

const atlasImgList = [
  {
    url: 'http://dummyimage.com/200x100/ff3838&text=Hello',
    bigUrl: 'http://dummyimage.com/800x400/ff3838&text=Hello',
    alt: 'Hello',
  },
  {
    url: 'http://dummyimage.com/200x100/ff9f1a&text=Photo',
    bigUrl: 'http://dummyimage.com/800x400/ff9f1a&text=Photo',
    alt: 'Photo',
  },
  {
    url: 'http://dummyimage.com/200x100/c56cf0&text=Preview',
    bigUrl: 'http://dummyimage.com/800x400/c56cf0&text=Preview',
    alt: 'Preview',
  },
  {
    url: 'http://dummyimage.com/100x100/3ae374&text=!',
    bigUrl: 'http://dummyimage.com/400x400/3ae374&text=!',
    alt: '！',
  },
]
const Test = () => {
  return (
    <>
      {atlasImgList.slice(0, 1).map((item, index) => {
        return (
          <PhotoPreview
            key={index}
            imgIndex={index}
            imgs={atlasImgList}
            url={item.url}
            bigUrl={item.bigUrl}
            alt={item.alt}
            // tool={{ turnLeft: false, turnRight: false }}
          />
        )
      })}
    </>
  )
}

function App () {
  const [time, setTime] = useState('test')
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime('')
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div>
      <Test/>
      {/*<JsxDemo/>*/}
      {/*<UseStateDemo/>*/}
      {/*<UseReducerDemo/>*/}
      {/*<CustomerUseReducerDemo/>*/}
      {/*<CustomerUseStateLink/>*/}
      {/*<TestHook/>*/}
      {/*<EffectHook/>*/}
      {/*<BaseUse />*/}
      {/*<Codemirror/>*/}
      {/* <AdvancedUse/> */}
      {/* <ReduxUse/> */}
      {/* <TodoList /> */}
      {/* <JsxTest /> */}
      {/* 状态管理 */}
      {/* <StateMgt /> */}
      {/* 事件处理 */}
      {/* <EventHandle /> */}
      {/* 上下文 */}
      {/* <ContextTest /> */}
      {/* Hoc */}
      {/* <HocTest /> */}
      {/* 组件复合 */}
      {/* <Composition /> */}
      {/* Hooks */}
      {/* <HooksTest /> */}
      {/* <Button>mua~</Button> */}
      {/* <WrappedNormalLoginForm></WrappedNormalLoginForm>*/}
      {/* <WrappedNormalLoginForm2></WrappedNormalLoginForm2> */}
      {/*-------  KFormTest ----*/}
      {/*<KFormTest></KFormTest>*/}
      {/* <Dialog>somthing!!!!</Dialog>
      <Dialog2>
        {{
          def: (
            <>
              <h1>h1</h1>
              <div>132</div>
            </>
          ),
          footer: <button>确定</button>
        }}
      </Dialog2> */}
      {/* <Tree></Tree> */}
      {/* <CommentList></CommentList> */}
      {/* <ReduxTest></ReduxTest>*/}
      {/*<MyReduxTest></MyReduxTest>*/}
      {/* <RouterTest></RouterTest>*/}
      {/* <MyRouterTest></MyRouterTest> */}
      {/* {time && <Lifecycle time={time} />} */}
    </div>
  )
}

export default App
