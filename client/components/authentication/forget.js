import React from 'react'
import { Form, FormGroup, ControlLabel, Button, FormControl, Col, Checkbox } from 'react-bootstrap'
require('!style-loader!css-loader!../../css/forget.css')

class Forget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isForgeted: this.props.forgetState
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
                        <Button type='submit' id='button-forget-send'>Retrieve Password</Button><br/>
                        <a href='#' onClick={this.props.callBackParentForget} id='return-button'>Return</a>
                        </Col>
                        
                    </FormGroup>
            </div>
        )
    }
}

export default Forget