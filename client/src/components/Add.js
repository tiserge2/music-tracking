import React from 'react'
import  {Button}  from 'react-bootstrap'
import FaPlus from 'react-icons/lib/fa/plus'
import Modal from 'react-responsive-modal'
import axios from 'axios'
import Cookies from 'universal-cookie'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const cookies = new Cookies();
let querystring = require('querystring');

class Add extends React.Component{
    constructor(){
        super();
        this.state = {
            username: cookies.get('username'),
            open: false,
            confirm: false,
            messageFromServer: ''
        }
        this.addFavorite = this.addFavorite.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onOpenModal  = this.onOpenModal.bind(this)
        this.openConfirm  = this.openConfirm.bind(this)
        this.closeConfirm = this.closeConfirm.bind(this)
        this.serverResponse = ""
    }

    setServerResponse = (a) => {
        this.serverResponse = a
    }

    getServerResponse = () => {
        return this.serverResponse;
    }

    onOpenModal = () => {
        console.log(this._reactInternalInstance)
        this.setState({open: true});
        console.log(this.state);
    }

    onCloseModal = () => {
        this.setState({open: false});
        console.log(this.state);
    }

    closeConfirm = () => {
        setTimeout(() => {
                console.log("in set interval function...")
                this.onCloseModal()
        }, 2000)
    }

     addFavorite =  () => {
        fetch('/checkToken')
            .then(res => {
                if (res.status === 200) {
                    axios.post('/addFavorite', querystring.stringify({
                        username: this.state.username,
                        artist: this.props.artist,
                        title: this.props.title,
                        album: this.props.album,
                        cover: this.props.cover,
                        cover_medium: this.props.cover_medium
                    }),
                    {
                        headers: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    }).then( function(response){
                        toast("Music added successfully", {position: toast.POSITION.TOP_CENTER,
                            type: toast.TYPE.SUCCESS})
                    });
                    this.closeConfirm();
                } else {
                    toast("You need to login first", {position: toast.POSITION.TOP_CENTER,
                                                      type: toast.TYPE.ERROR})
                }
            })
            .catch(err => {
                console.error(err);
                this.props.history.push('/home/list');
            });
    }

    openConfirm = () => {
        this.setState({confirm: true})
    }

    

    render() {
        let  open  = this.state.open;
        return(
            <div>
                <FaPlus onClick={this.onOpenModal}/>
                <Modal open={open} onClose={this.onCloseModal}  showCloseIcon={false} little >
                    <div >
                        <img src={this.props.cover_medium} alt="cover"/>
                        <br/> <br/>
                        <p style={{color: 'black'}}>Title : <strong>{this.props.title}</strong></p>
                        <p style={{color: 'black'}}>Author: <strong>{this.props.artist}</strong></p>
                        <p style={{color: 'black'}}>Album : <strong>{this.props.album}</strong></p>
                    </div>
                    <br/> <br/>
                    <Button onClick={this.addFavorite} bsStyle="primary">Add to preference</Button>
                    <Button style={{marginLeft: "10px"}} onClick={this.onCloseModal} bsStyle="primary">Close</Button>                    
                </Modal>
                {
                    (this.state.confirm === true) ? <Modal open={this.state.confirm} onClose={this.closeConfirm} >
                                                        <p style={{color: 'black'}}> {this.getServerResponse}</p>
                                                    </Modal>
                                                :
                                                   ""
                }
            </div>
        )
        
    }
}

export default Add;