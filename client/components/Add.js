import React from 'react'
import FaPlus from 'react-icons/lib/fa/plus'
import Modal from 'react-responsive-modal'

class Add extends React.Component{
    state = {
        open: false
    }

    onOpenModal = () => {
        this.setState({open: true});
        console.log(this.state);
    }

    onCloseModal = () => {
        this.setState({open: false});
        console.log(this.state);
    }

    render() {
        const { open } = this.state;
        return(
            <div>
                <FaPlus onClick={this.onOpenModal}/>
                <Modal open={open} onClose={this.onCloseModal} transitionSpeed={100} litte >
                    
                    <div >
                        <img src={this.props.imgUrl} />
                        <br/> <br/>
                        <p style={{color: 'black'}}>Title : <strong>{this.props.title}</strong></p>
                        <p style={{color: 'black'}}>Author: <strong>{this.props.artist}</strong></p>
                        <p style={{color: 'black'}}>Album : <strong>{this.props.album}</strong></p>
                    </div>
                    <br/> <br/>
                    <button>Add to preference</button>
                </Modal>
            </div>
        )
        
    }
}

export default Add;