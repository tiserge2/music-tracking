import React from 'react'
import Login from './login'
import Register from './register'
import Animation from './animation'
import Faillure from './faillure'
require('!style-loader!css-loader!../../css/authentication.css')

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notRegister: false,
            faillure: false
        }
    }

    onChildChangeRegister = () => {
        this.setState({notRegister: !this.state.notRegister})
    }

    onChildChangeLogin = () => {
        this.props.callBackParentAuthenticated()
    }

    LoginFaillure = () => {
        <Alert bsStyle='warning'>
            <strong>Sorry the username or password is incorrect</strong>
        </Alert>
    }

    showFaillureMessage = () => {
        this.setState({faillure: true})
        setInterval(() => this.setState({faillure: false}), 5000)
    }

    render() {
        return(
            <div className='interface'>
                <Animation />
                {
                    this.state.faillure ? <Faillure /> : ""
                }
                {
                    this.state.notRegister ? 
                                        <Register registerState={this.state.notRegister}
                                                  callBackParent={() => {this.onChildChangeRegister()}}
                                        />
                                        :
                                        <Login registerState={this.state.notRegister}
                                                callBackParentRegister={() => {this.onChildChangeRegister()}}
                                                callBackParentLogin={() => {this.onChildChangeLogin()}}
                                                callBackParentFaillureLogin={() => {this.showFaillureMessage()}}
                                        />
                }
            </div>
        )
    }
}

export default Authentication