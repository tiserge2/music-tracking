import React from 'react'
import axios from 'axios'
import { Form, FormGroup, ControlLabel, Button, FormControl, Col, Checkbox } from 'react-bootstrap'
import '../../css/register.css'
import {Link} from 'react-router-dom'
let queryString = require('querystring')

// require('!style-loader!css-loader!../../css/register.css')
 

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: this.props.registerState
        }
        this.submitForm = this.submitForm.bind(this)
    }

    verifyEmail = (email) => {

    }

    verifyPassword = (password1, password2) => {
        return password1 === password2;
    }

    submitForm = () => {
        console.log("we are in the submit form")
        let username    = this.username.value,
            password1   = this.password1.value,
            password2   = this.password2.value
            //sending the data to the db to be analyze
        if(this.username.value !== "" && this.password1.value !== "" && this.password2 !== "") {
            if(this.verifyPassword(password1, password2)) {
                axios.post('/register',queryString.stringify({
                    username: username,
                    password : password1,
                }), {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    }
                }).then((response) => {
                        if(response.status === 200) {
                            this.props.history.push('/auth/login');
                        } 
                        console.log("message du server apres registration:", response)
                        this.props.callBackParentFaillure(response.data.message)
                    }
                ).catch((err) => {
                    console.log(err)
                })
                // alert( username + "\n" + password1+ "\n" + password2)
            } else {
                console.log("Password arent the same")
                this.props.callBackParentFaillure("Password aren't the same")
            }
        } else {
            console.log("No empty field allowed")
            this.props.callBackParentFaillure("No empty field allowed")
        }
    }
    render() {
        return(
            <div className='register-control'>
                    <FormGroup controlId="formControlUsername" ref="username">
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={10}>
                        <FormControl type="text" 
                                     placeholder="Usermane"
                                     inputRef={value => this.username = value} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword" ref="lastname">
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={10}>
                        <FormControl type="password" 
                                     placeholder="password"
                                     inputRef={value => this.password1 = value} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword2" ref="password2">
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={10}>
                        <FormControl type="password" 
                                     placeholder="Retype password"
                                     inputRef={value => this.password2 = value} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                        <Button type="submit" onClick={this.submitForm}>Get Registered</Button>
                        </Col>
                    </FormGroup>
                    <p>
                        <Link to='/auth/login'>Already have an Account?</Link>
                    </p>
            </div>
        )
    }
}

export default Register