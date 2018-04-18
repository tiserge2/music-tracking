import React from 'react'
import Modal from 'react-responsive-modal'
import FaMinus from 'react-icons/lib/fa/minus'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Remove extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        }

        this.onOpenModal = this.onOpenModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onRemove     = this.onRemove.bind(this)
    }

    onCloseModal = () => {
        this.setState({open: false})
    }

    onOpenModal = () => {
        this.setState({open: true})
    }

    onRemove = () => {
        axios.get('/removeFavorite/' + this.props.id)
            .then((response) => {
                console.log(response.data)
            })
            this.props.callRefresh()
            this.onCloseModal()
    }

    render(){
        let { open } = this.state
        return(
            <div>
                <FaMinus onClick={this.onOpenModal}/>
                <Modal open={open} onClose={this.onCloseModal} little >
                    <p style={{color: "black"}}>Title: {this.props.title} </p>
                    <p style={{color: "black"}}>Artist: {this.props.artist} </p>
                    <p style={{color: "black"}}>Album: {this.props.album} </p>
                <Button onClick={this.onRemove} bsStyle="success">Remove</Button>
                <Button onClick={this.onCloseModal} style={{marginLeft: "10px"}} bsStyle="success">Cancel</Button>
                </Modal>
            </div>
        )
    }
}

export default Remove;