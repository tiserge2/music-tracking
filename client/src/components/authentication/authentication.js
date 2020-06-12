import React from 'react'
import Login from './login'
import Forget from './forget'
import Register from './register'
import Animation from './animation'
import { Switch, Route } from 'react-router-dom'


import '../../css/authentication.css'

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverMessage: ''
        }
    }

    render() {
        return(
            <div className='interface'> 
                <Animation />
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