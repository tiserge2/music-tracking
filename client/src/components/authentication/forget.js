import React from 'react'
import {Link} from 'react-router-dom'
import { Form, FormGroup, ControlLabel, Button, FormControl, Col, Checkbox } from 'react-bootstrap'
import '../../css/forget.css'
import Loader from 'react-loader-spinner'

class Forget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            retrieving: false
        }
    }

    render() {
        return(
            <div className="forget-control">
                <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2} id='label-forget'>
                        </Col>
                        <Col sm={10}>
                        <FormControl name="email" 
                                     type="text" 
                                     inputRef={input => this.email = input} 
                                     placeholder="Email" />
                        <Button type='submit' id='button-forget-send'>
                        {
                                this.state.retrieving ? <Loader type="Circles" 
                                                                color="#80bfff" 
                                                                height={20} 
                                                                width={20} 
                                                        />  : null
                        } Retrieve Password
                        </Button><br/>
                        <Link to='/auth/login'>Return</Link>
                        </Col>
                        
                    </FormGroup>
            </div>
        )
    }
}

export default Forget