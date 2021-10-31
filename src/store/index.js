import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { counterReducer } from './counter';

const store = createStore(
  combineReducers({ counter: counterReducer }),
  applyMiddleware(logger, thunk)
);
let oldDispatch = store.dispatch;
store.dispatch = function (action) {
  console.log('prev', store.getState());
  oldDispatch(action);
  console.log('next', store.getState());
};

export default store;
