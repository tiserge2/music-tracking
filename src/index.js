import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App.js'
import { HashRouter, hashHistory } from 'react-router-dom'

ReactDom.render(
        <HashRouter history={hashHistory}>
                <App />
        </HashRouter>,
        document.getElementById("app")
)