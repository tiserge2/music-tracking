import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import '../css/user-action.css'
import {Modal} from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { Link } from 'react-router-dom'


class UserAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isLoggedIn: false
        } 
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onOpenModal = this.onOpenModal.bind(this)
    }

    onCloseModal = () => {
        this.setState({open: false})
    }

    onOpenModal = () => {
        fetch('/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
      
        console.log("opening modal")
        this.setState({open: true})
    }

    render() {
        let { open } = this.state
        
        return(
            <div id='action-container'>
                <FontAwesomeIcon icon={faUser} onClick={this.onOpenModal}/>
                <Modal open={open} onClose={this.onCloseModal}  showCloseIcon={false} center >
                    <Link to='/auth/login'>Login</Link>
                </Modal>
            </div>
        )
    }
}

export default UserAction;