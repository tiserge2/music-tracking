import React from 'react'
import { Alert } from 'react-bootstrap'

class Faillure extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Alert bsStyle='danger' style={{width: '50%', margin: '10px 25%', position: 'absolute'}}>
                <strong >The password or the username is incorrect</strong>
            </Alert>
        )
    }
}

export default Faillure