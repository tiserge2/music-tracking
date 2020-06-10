import React from 'react'
import axios from 'axios'
import { Form, FormGroup, ControlLabel, Button, FormControl, Col, Checkbox } from 'react-bootstrap'
import '../../css/register.css'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
let queryString = require('querystring')

// require('!style-loader!css-loader!../../css/register.css')
 

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registering: false
        }
        this.submitForm = this.submitForm.bind(this)
    }

    verifyEmail = (email) => {

    }

    verifyPassword = (password1, password2) => {
        return password1 === password2;
    }

    submitForm = () => {
        this.setState({registering: true})
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
                        if(response.data.message === "saved") {
                            this.props.history.push('/auth/login');
                            // this.props.callBackParentFaillure(response.data.message)
                            toast(username + "'s account created, you can login!", {position: toast.POSITION.TOP_CENTER,
                                type: toast.TYPE.SUCCESS})
                        } else {
                            this.setState({registering: false})
                            console.log("message du server apres registration:", response)
                            // this.props.callBackParentFaillure(response.data.message)
                            toast(response.data.message, {position: toast.POSITION.TOP_CENTER,
                                type: toast.TYPE.ERROR})
                        }
                    }
                ).catch((err) => {
                    console.log(err)
                })
            } else {
                this.setState({registering: false})
                console.log("Password arent the same")
                // this.props.callBackParentFaillure("Password aren't the same")
                toast("Password aren't the same", {position: toast.POSITION.TOP_CENTER,
                    type: toast.TYPE.ERROR})
            }
        } else {
            this.setState({registering: false})
            console.log("No empty field allowed")
            // this.props.callBackParentFaillure("No empty field allowed")
            toast("No empty field allowed", {position: toast.POSITION.TOP_CENTER,
                type: toast.TYPE.ERROR})
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
                        <Button id='registerButton' type="submit" onClick={this.submitForm}>
                        {
                                this.state.registering ? <Loader type="Circles" 
                                                                color="#80bfff" 
                                                                height={20} 
                                                                width={20} 
                                                        />  : null
                        } Get Registered
                        </Button>
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