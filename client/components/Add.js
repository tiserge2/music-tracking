import React from 'react'
import  {Button}  from 'react-bootstrap'
import FaPlus from 'react-icons/lib/fa/plus'
import Modal from 'react-responsive-modal'
import axios from 'axios'
import { Link } from 'react-router-dom'
let querystring = require('querystring');

class Add extends React.Component{
    constructor(){
        super();
        this.state = {
            open: false,
            confirm: false,
            messageFromServer: ''
        }
        this.addFavorite = this.addFavorite.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onOpenModal  = this.onOpenModal.bind(this)
        this.openConfirm  = this.openConfirm.bind(this)
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


    addFavorite = () => {
        console.log("add favorite button has been clicked...")
        console.log(this.props.title, this.props.artist, new Date())
        axios.post('/addFavorite', querystring.stringify({
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
            
            console.log("Reponse du server:" + response.data)
            this.setServerResponse(response.data)
            this.setState({messageFromServer: response.data})
            console.log(this.state)
        });
        console.log(serverResponse)
        this.onCloseModal();
        this.openConfirm();
        this.closeConfirm();
    }

    openConfirm = () => {
        this.setState({confirm: true})
    }

    closeConfirm = () => {
        setTimeout(() => {
            this.setState({confirm: false})
        }, 7000)
    }

    render() {
        let  open  = this.state.open;
        return(
            <div>
                <FaPlus onClick={this.onOpenModal}/>
                <Modal open={open} onClose={this.onCloseModal}  showCloseIcon={false} little >
                    <div >
                        <img src={this.props.cover_medium} />
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