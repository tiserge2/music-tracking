import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App.js'
import { HashRouter, hashHistory } from 'react-router-dom'
require('!style-loader!css-loader!bootstrap/dist/css/bootstrap.css');

ReactDom.render(
        <HashRouter history={hashHistory}>
                <App />
        </HashRouter>,
        document.getElementById("app")
)