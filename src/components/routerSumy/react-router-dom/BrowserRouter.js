import React from 'react';
import { Router } from 'react-router';

import { createBrowserHistory } from 'history';

let history = createBrowserHistory();
export default function (props) {
  return <Router history={history} children={props.children} />;
}
