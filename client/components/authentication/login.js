import React from 'react'
import axios from 'axios'
let queryString = require('querystring')
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
                    '\n' +  this.password.value + " " + this.email.value )
        if(this.password.value !== "" && this.email.value !== "") {
            axios.post('/login', queryString.stringify(
                {
                    email: this.email.value,
                    password: this.password.value
                }
            ), {
                headers: {
                    "content-type" : "application/x-www-form-urlencoded"
                }
            } ).then(
                (response) => {
                    console.table(response.data)
                    setInterval(() => this.props.callBackParentLogin(), 2000)
                }
            )
            console.log("username & password are correct")
            
            //this.props.callBackParentFaillureLogin("correct")
        } else {
            this.props.callBackParentFaillureLogin("Password or Email cannot be empty!")
        }
    }

    render() {
        return(
            <div className='login-control'>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={10}>
                        <FormControl name="email" 
                                     type="text" 
                                     inputRef={input => this.email = input} 
                                     placeholder="Email" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
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
                        <a href='#' onClick={this.props.callBackParentForget}>
                            Forget your password?
                        </a>
                    </p>
            </div>
        )
    }
}

export default Login