import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App.js'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

ReactDom.render(
        <BrowserRouter >
                <App />
        </BrowserRouter>,
        document.getElementById("root")
)