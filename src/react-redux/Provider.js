import React from 'react';

import ReactReduxContext from './ReactReduxContext';
import Subscription from './utils/Subscription';
export default function Provider({ store, children }) {
  let subscription = new Subscription();
  let value = { store, subscription };
  return (
    <ReactReduxContext.Provider value={value}>
      {children}
    </ReactReduxContext.Provider>
  );
}
