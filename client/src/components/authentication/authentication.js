import React from 'react'
import Login from './login'
import Forget from './forget'
import Register from './register'
import Animation from './animation'
import Flash from './faillure'
import { Switch, Route } from 'react-router-dom'

import '../../css/authentication.css'
// require('!style-loader!css-loader!../../css/authentication.css')

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        console.log("Match: ", this.props)
        this.state = {
            serverMessage: ''
        }
    }

    showFaillureMessage = (message) => {
        console.log("showing message to user")
        this.setState({flash: true, serverMessage: message})
        setInterval(() => this.setState({flash: false}), 5000)
    }

    render() {
        return(
            <div className='interface'>
                <Animation />
                {
                    this.state.flash ? <Flash message={this.state.serverMessage} /> : ""
                }
                <Switch>
                    <Route exact path='/auth/login' render={() => <Login callBackParentFaillure={(message) => {this.showFaillureMessage(message)}}
                                                                    {...this.props}
                                                            />} 
                    />
                    <Route exact path='/auth/register' render={() => <Register callBackParentFaillure={(message) => {this.showFaillureMessage(message)}}
                                                            {...this.props}/>}
                                                            />
                    <Route exact path='/auth/forget' render={() => <Forget callBackParentFaillure={(message) => {this.showFaillureMessage(message)}}
                                                            {...this.props}/>}
                                                            />}
                    />
                </Switch>
            </div>
        )
    }
}

export default Authentication