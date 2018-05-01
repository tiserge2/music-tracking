import React from 'react'
import axios from 'axios'
let queryString = require('querystring')
import { Form, FormGroup, ControlLabel, Button, FormControl, Col, Checkbox } from 'react-bootstrap'
require('!style-loader!css-loader!../../css/register.css')


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: this.props.registerState
        }
        this.submitForm = this.submitForm.bind(this)
    }

    submitForm = () => {
        console.log("we are in the submit form")
        let lastname    = this.lastname.value,
            firstname   = this.firstname.value,
            email       = this.email.value,
            password1   = this.password1.value,
            password2   = this.password2.value,
            question    = this.selectInputQuestion.value,
            answer      = this.textInputAnswer.value
            //sending the data to the db to be analyze
            axios.post('/submitForm',queryString.stringify({
                lastname : lastname,
                firstname: firstname,
                email : email,
                password : password1,
                question : question,
                answer : answer
            }), {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            }).then(
                (response) => {
                    console.log("message du server apres registration:" + response.data)
                    this.props.callBackParent()
                }
            )
            alert( lastname + "\n" + firstname+ "\n" + password1+ "\n" + password2+ "\n" + question+ "\n" + answer)
    }
    render() {
        return(
            <div className='register-control'>
                    <FormGroup controlId="formControlName" >
                        <Col componentClass={ControlLabel} sm={2}>
                        Lastname
                        </Col>
                        <Col sm={10}>
                        <FormControl type="text" 
                                     placeholder="Lastname"
                                     inputRef={value => this.lastname = value} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlName" ref="firstname">
                        <Col componentClass={ControlLabel} sm={2}>
                        Firstname
                        </Col>
                        <Col sm={10}>
                        <FormControl type="text" 
                                     placeholder="Firstname"
                                     inputRef={value => this.firstname = value} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlEmail" ref="email">
                        <Col componentClass={ControlLabel} sm={2}>
                        Email
                        </Col>
                        <Col sm={10}>
                        <FormControl type="text" 
                                     placeholder="Email"
                                     inputRef={value => this.email = value} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword" ref="lastname">
                        <Col componentClass={ControlLabel} sm={2}>
                        Password
                        </Col>
                        <Col sm={10}>
                        <FormControl type="password" 
                                     placeholder="password1"
                                     inputRef={value => this.password1 = value} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword2" ref="password2">
                        <Col componentClass={ControlLabel} sm={2}>
                        Password again
                        </Col>
                        <Col sm={10}>
                        <FormControl type="password" 
                                     placeholder="Password"
                                     inputRef={value => this.password2 = value} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsSelect" ref="selectInputQuestion"  className='form-group2'>
                        <FormControl  inputRef={input => this.selectInputQuestion = input} componentClass="select" placeholder="select">
                            <option value="1" selected>Question 1</option>
                            <option value="2">Question 2</option>
                            <option value="3">Question 3</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId="formControlName" ref="answer">
                        <Col componentClass={ControlLabel} sm={2}>
                        Answer
                        </Col>
                        <Col sm={10}>
                        <FormControl type="text" 
                                     placeholder="Answer question"
                                     inputRef={input => this.textInputAnswer = input} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                        <Button type="submit" onClick={this.submitForm}>Get Registered</Button>
                        </Col>
                    </FormGroup>
                    <p>
                        <a href='#' onClick={this.props.callBackParent}>
                            Already have an Account?
                        </a>
                    </p>
            </div>
        )
    }
}

export default Register