import React from 'react';
import { Router } from 'react-router';

import { createHashHistory } from 'history';

let history = createHashHistory();
export default function (props) {
  return <Router history={history} children={props.children}/>;
}
