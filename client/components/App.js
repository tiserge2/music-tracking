import React from 'react'
import Header from './header-bar'
import Menu from './menu-bar'
import Main from './main'
import Error from './Error'
import axios from 'axios'
import { browserRoute as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            getFavorite: []
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Main />
                <Menu />
            </div>
        )
    }
}

export default App;