import React from 'react'
import axios from 'axios'
import '../../css/login.css'
// require('!style-loader!css-loader!../../css/login.css')
import { Form, FormGroup, ControlLabel, Button, FormControl, Col, Checkbox } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom';
let queryString = require('querystring')


class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log("[Login] props: ", this.props)
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
        if(this.password.value !== "" && this.username.value !== "") {
            axios.post('/login', queryString.stringify(
                {
                    username: this.username.value,
                    password: this.password.value
                }
            ), {
                headers: {
                    "content-type" : "application/x-www-form-urlencoded"
                }
            } ).then(
                (response) => {
                    console.log("checking status... ", response.status)
                    if(response.status === 200) {
                        console.log("user connected successfully")
                        this.props.history.push('/home/list');
                    } else {
                        this.props.callBackParentFaillure(response.error)
                        const error = new Error(response.error)
                        throw error;
                    }
                }
            ).catch(err => {
                this.props.callBackParentFaillure('Internal server error.')
                console.error(err);
              });
        } else {
            this.props.callBackParentFaillure("Password or username cannot be empty!")
        }
    }

    render() {
        return(
            <div className='login-control'>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
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
                        <Link to='/auth/register'>Don't have an account? </Link>
                        <span> | </span>
                        <Link to='/auth/forget'>Forget your password?</Link>
                    </p>
            </div>
        )
    }
}

export default Login