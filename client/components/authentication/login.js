import React from 'react'
require('!style-loader!css-loader!../../css/login.css')
import { Form, FormGroup, ControlLabel, Button, FormControl, Col, Checkbox } from 'react-bootstrap'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: this.props.registerState
        }
        this.submitForm = this.submitForm.bind(this)
    }

    submitForm = () => {
        let user="sergio"
        let password="sergio"
        console.log('we are in the submit form fnction...' +
                    '\n' +  this.password.value + " " + this.username.value )
        if(this.username.value === user && this.password.value === password) {
            console.log("username & password are correct")
            setInterval(() => this.props.callBackParentLogin(), 2000)
        } else {
            console.log("They are not correct")
            this.props.callBackParentFaillureLogin()
        }
    }

    render() {
        return(
            <div className='login-control'>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                        Username
                        </Col>
                        <Col sm={10}>
                        <FormControl name="username" 
                                     type="text" 
                                     inputRef={input => this.username = input} 
                                     placeholder="Username" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                        Password
                        </Col>
                        <Col sm={10}>
                        <FormControl name="password" 
                                     type="password" 
                                     inputRef={input => this.password = input}  
                                     placeholder="Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                        <Checkbox> Remember me</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                        <Button type="submit" onClick={this.submitForm}>Sign in</Button>
                        </Col>
                    </FormGroup>
                    <p>
                        <a href='#' onClick={this.props.callBackParentRegister}>
                            Don't have an account? 
                        </a>
                        <span> | </span>
                        <a href='#'>
                            Forget your password?
                        </a>
                    </p>
            </div>
        )
    }
}

export default Login