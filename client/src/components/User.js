import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import '../css/user-action.css'

class UserAction extends React.Component {
    render() {
        return(
            <div id='action-container'>
                <FontAwesomeIcon icon={faUser} />
            </div>
        )
    }
}

export default UserAction;