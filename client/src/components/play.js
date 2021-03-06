import React from 'react'
import {Modal} from 'react-responsive-modal'
import FaPlay from 'react-icons/lib/fa/play'
import 'react-responsive-modal/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'


class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        } 
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onOpenModal = this.onOpenModal.bind(this)
    }

    onCloseModal = () => {
        this.setState({open: false})
    }

    onOpenModal = () => {
        console.log("opening modal")
        this.setState({open: true})
    }

    render() {
        let { open } = this.state
        
        return(
            <div>
                <FaPlay onClick={this.onOpenModal}/>
                {/* <FontAwesomeIcon font={faPlay} onClick={this.onOpenModal}/> */}
                <Modal open={open} onClose={this.onCloseModal}  showCloseIcon={true} center >
                    <div >
                        <img style={{width:"100%",margin:"25px auto"}} src={this.props.cover_medium} alt="artist"/>
                    </div>
                    <span><strong>{this.props.title}</strong> | </span>  
                    <span><strong>{this.props.artist}</strong> | </span> 
                    <span><strong>{this.props.album}</strong></span>
                    <br/>
                    <audio controls controlsList="nodownload">
                        <source src={this.props.preview} type="audio/mpeg" />
                    </audio>
                    <br/>
                </Modal>
            </div>
        )
    }
}

export default  Play;