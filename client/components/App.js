import React from 'react'
import Header from './header-bar'
import Menu from './menu-bar'
import Main from './main'
import Error from './Error'
import axios from 'axios'
import Authentication from './authentication/authentication'
import { browserRoute as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false
        }
        
    }

    changeAuthenticationState = () => {
        this.setState({isAuthenticated: true})
    }

    render() {
        return (
            <div>
            {
                this.state.isAuthenticated ? 
                                     <div>
                                        <Header />
                                        <Main />
                                        <Menu />
                                    </div>
                                    
                                    :
                                    <Authentication callBackParentAuthenticated={() => {this.changeAuthenticationState()}}/>
                                    
            }
            </div>
        )
    }
}

export default App;