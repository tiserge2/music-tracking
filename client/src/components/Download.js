import React from 'react'
import Modal from 'react-responsive-modal'
import FaDownload from 'react-icons/lib/fa/download'
import { Button } from 'react-bootstrap'
import axios from 'axios'

class Download extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.onOpenModal = this.onOpenModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.download     = this.download.bind(this)
        //this.onRemove     = this.onRemove.bind(this)
    }

    onCloseModal = () => {
        this.setState({open: false})
    }

    onOpenModal = () => {
        this.setState({open: true})
    } 

    download = () => {
        axios.get('/downloadMusic/' + this.props.artist + '&' + this.props.title)
            .then((response) => {
                console.log(response)
            })
    } 

    render(){
        let { open } = this.state
        return(
            <div>
                <FaDownload onClick={this.onOpenModal}/>
                <Modal open={open} onClose={this.onCloseModal} showCloseIcon={false} little>
                    <p style={{color: "black"}}>{this.props.title}</p>
                    <p style={{color: "black"}}>{this.props.artist}</p>
                    <p style={{color: "black"}}>{this.props.album}</p>
                    <Button bsStyle="info" onClick={this.download}>Download</Button>
                </Modal>
            </div>
        )
    }
}

export default Download;