import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App.js'
import { HashRouter, hashHistory, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
var history = require("history").createBrowserHistory

// require('!style-loader!css-loader!bootstrap/dist/css/bootstrap.css');

ReactDom.render(
        <BrowserRouter >
                <App />
        </BrowserRouter>,
        document.getElementById("root")
)