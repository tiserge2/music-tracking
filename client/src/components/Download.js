import React from 'react'
import Modal from 'react-responsive-modal'
import FaDownload from 'react-icons/lib/fa/download'
import { Button } from 'react-bootstrap'
import axios from 'axios' 
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Download extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.onOpenModal = this.onOpenModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.download     = this.download.bind(this)
    }

    onCloseModal = () => {
        this.setState({open: false})
    }

    onOpenModal = () => {
        this.setState({open: true})
    } 

    download = () => {
        fetch('/checkToken')
            .then(res => {
                if (res.status === 200) {
                    axios.get('/downloadMusic/' + this.props.artist + '&' + this.props.title)
                        .then((response) => {
                            console.log(response)
                        })
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