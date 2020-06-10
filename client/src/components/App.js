import React from 'react'
import Header from './header-bar'
import Menu from './menu-bar'
import Main from './main'
import Cockpit from './Cockpit'
import Error from './Error'
import Authentication from './authentication/authentication'
import { Switch, Route, Router, Redirect } from 'react-router-dom'
import {isFirstTime} from '../utils/visitor'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/app.css'
 

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: ''
        }
    }

    componentDidMount = () => {
        if(isFirstTime()) {
          console.log("Send +1 visit to server")
          this.updateVisit() 
        } else {
          console.log("Dont send +1 visit to server")
        }
      }
    
      updateVisit = () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch('https://tiserge2-visit.herokuapp.com/api/addVisit', {
          method: 'POST',
          mode: "no-cors",
          cache: "no-cache", 
          credentials: "same-origin",
          headers: {
            'Accept': 'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
          },
          redirect: "follow", 
          referrer: "no-referrer", 
          body: 'websiteId=5ed2ee7a7c213e044cc035a8'
        }).then(res => {
          console.log(res)
        }).catch(err => {
          // throw new Error(err)
        })
      }
    render() {
        return (
            <div>
                <ToastContainer />

                <Switch>
                    <Route  path='/home'  render={(props) =>  <Cockpit {...props}/>} />  
                    <Route  path='/auth'  render={(props) =>  <Authentication {...props}/>} />
                    <Route path='/' component={() => <Redirect to='/home' />} />
                </Switch>
            </div>
        )
    }
}

export default App;