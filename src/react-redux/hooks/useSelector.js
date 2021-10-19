import { useContext, useLayoutEffect, useReducer } from 'react';

import ReactReduxContext from '../ReactReduxContext';
const equality = (a, b) => a === b; //可以自定义比较
function useSelectorWithState(selector, equality, store, subscription) {
  let storeState = store.getState();
  let selectedState = selector(storeState);
  const [, forceRender] = useReducer((x) => x + 1, 0); //更新状态，使用setState需要传参数，不方便
  useLayoutEffect(() => {
    subscription.subscribe(forceRender);
  });
  return selectedState;
}
const useSelector = (selector) => {
  const { store, subscription } = useContext(ReactReduxContext);
  const selectedState = useSelectorWithState(
    selector,
    equality,
    store,
    subscription
  );
  return selectedState;
};
export default useSelector;
