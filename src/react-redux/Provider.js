import React from 'react';

import ReactReduxContext from './ReactReduxContext';

export default function Provider(props) {
  return (
    <ReactReduxContext.Provider value={props.store}>
      {props.children}
    </ReactReduxContext.Provider>
  );
}
