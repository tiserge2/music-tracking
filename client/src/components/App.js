import React from 'react'
import Header from './header-bar'
import Menu from './menu-bar'
import Main from './main'
import Cockpit from './Cockpit'
import Error from './Error'
import axios from 'axios'
import Authentication from './authentication/authentication'
import { Switch, Route, Router, Redirect } from 'react-router-dom'
import withAuth from '../utils/withAuth'


 

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route  path='/home'  render={(props) =>  <Cockpit {...props}/>} />  
                    <Route  path='/login'  render={(props) =>  <Authentication {...props}/>} />
                    <Route path='/' component={() => <Redirect to='/home' />} />
                </Switch>
            </div>
        )
    }
}

export default App;