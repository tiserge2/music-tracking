import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import '../css/user-action.css'
import {Modal} from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies(); 


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

    componentDidMount = () => {
        
        console.log("[User.js] user: ", cookies.get("username"))
        console.log("[User.js] logged in: ", this.state.isLoggedIn)
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

    logoutUser = () => {
        console.log("logging out user...")
    }

    render() {
        let { open } = this.state
        let login
        if(cookies.get("username")) {
            login = <a href='#' onClick={this.logoutUser}>Logout</a>
        } else {
            login = <Link to='/auth/login'>Login</Link>
        }
        return(
            <div id='action-container'>
                <FontAwesomeIcon icon={faUser} onClick={this.onOpenModal}/>
                <Modal open={open} onClose={this.onCloseModal}  showCloseIcon={false} center >
                    {login}
                </Modal>
            </div>
        )
    }
}

export default UserAction;