import React from 'react'
import Login from './login'
import Forget from './forget'
import Register from './register'
import Animation from './animation'
import Flash from './faillure'
import '../../css/authentication.css'
// require('!style-loader!css-loader!../../css/authentication.css')

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        console.log("Match: ", this.props)
        this.state = {
            notRegister: false,
            forget: false,
            flash: false,
            serverMessage: ''
        }
    }

    onChildChangeRegister = () => { 
        this.setState({
            notRegister: !this.state.notRegister,
        })
    }

    onChildChangeForget = () => {
        this.setState({
            forget: !this.state.forget
        })
    }

    onChildChangeLogin = () => {
        this.props.callBackParentAuthenticated()
    }

    showFaillureMessage = (message) => {
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
                {
                    this.state.notRegister ? 
                                        <Register registerState={this.state.notRegister}
                                            callBackParent={() => {this.onChildChangeRegister()}}
                                        />
                                        :
                                        this.state.forget ?
                                            <Forget 
                                                forgetState={this.state.forget}
                                                callBackParentForget={() => this.onChildChangeForget()}
                                            />
                                            :
                                            <Login registerState={this.state.notRegister}
                                                    callBackParentRegister={() => {this.onChildChangeRegister()}}
                                                    callBackParentLogin={() => {this.onChildChangeLogin()}}
                                                    callBackParentForget={() => {this.onChildChangeForget()}}
                                                    callBackParentFaillureLogin={(message) => {this.showFaillureMessage(message)}}
                                                    {...this.props}
                                            />
                }
            </div>
        )
    }
}

export default Authentication