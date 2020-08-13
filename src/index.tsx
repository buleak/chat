import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { devtools } from 'stook-devtools'

import './index.css';
import App from './App';

const supportsHistory = 'pushState' in window.history;

if (process.env.NODE_ENV !== 'production') {
  devtools.init()
}

ReactDOM.render(
  // TODO: 为了打包时路径正确, 添加了 basename='./chat', 不一定有用
  // forceRefresh为true时, 导航会刷新整个页面
  <Router forceRefresh={!supportsHistory}>
    <App />
  </Router>,
  document.getElementById('root')
);


