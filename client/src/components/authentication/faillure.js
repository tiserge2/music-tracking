import React from 'react'
import { Alert } from 'react-bootstrap'

class Flash extends React.Component {
    constructor(props) {
        super(props);
    }
 
    render() {
        return(
            <Alert bsStyle='danger' style={{width: '50%', margin: '10px 25%', position: 'absolute'}}>
                <strong style={{margin:'auto'}}>{this.props.message}</strong>
            </Alert>
        )
    }
}

export default Flash;