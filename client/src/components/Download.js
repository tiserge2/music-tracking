import React from 'react'
import Modal from 'react-responsive-modal'
import FaDownload from 'react-icons/lib/fa/download'
import { Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import { toast } from 'react-toastify'
import download from 'downloadjs'
import socketIOClient from 'socket.io-client'

let socket 
class Download extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            downloading: false,
            endpoint: 'https://localhost:5000'
        }
        // socket = socketIOClient(this.state.endpoint)
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
        this.setState({ downloading: true })
        fetch('/checkToken')
            .then(res => {
                if (res.status === 200) {
                    let filename
                    fetch("/downloadMusic/", {
                        method: "POST",
                        body: JSON.stringify({artist: this.props.artist, title: this.props.title}),
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        }
                        })
                        .then(response => {
                            console.log(response)
                            if (response.status === 200) {
                                filename = response.headers.get("content-disposition");
                                filename = filename.match(/(?<=")(?:\\.|[^"\\])*(?=")/)[0];
                                return response.blob();
                            } else {
                                toast("Error downloading", {position: toast.POSITION.TOP_CENTER,
                                    type: toast.TYPE.ERROR})
                                this.setState({ downloading: false })
                            }
                        })
                        .then(body => {
                            download(body, filename, "application/octet-stream");
                            this.setState({ downloading: false })
                                toast("Download successfully", {position: toast.POSITION.TOP_CENTER,
                                    type: toast.TYPE.SUCCESS})
                        });
                
                } else {
                    toast("You need to login first", {position: toast.POSITION.TOP_CENTER,
                                                      type: toast.TYPE.ERROR})
                    this.setState({ downloading: false })
                }
            })
            .catch(err => {
                console.error(err);
                this.props.history.push('/home/list');
                this.setState({ downloading: false })
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
                    <Button bsStyle="info" onClick={this.download}>
                    {
                        this.state.downloading ? <Loader type="Circles" 
                                                        color="#80bfff" 
                                                        height={20} 
                                                        width={20} 
                                            />  : null
                    } Download
                    </Button>
                </Modal>
            </div>
        )
    }
}

export default Download;