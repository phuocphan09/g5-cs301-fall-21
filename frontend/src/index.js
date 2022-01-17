import React, {useLayoutEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import history from './history'
import CustomRouter from "./CustomRouter";
// import './fonts/sf-ui-display-bold-58646a511e3d9.woff'
// import './fonts/sf-ui-display-medium-58646be638f96.woff'

ReactDOM.render(
  <CustomRouter history={history}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CustomRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
