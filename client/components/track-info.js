import React from 'react'
import FaPlus from 'react-icons/lib/fa/plus'
import Add from './Add'
import FaPlay from 'react-icons/lib/fa/play'
import FaDownload from 'react-icons/lib/fa/download'
import FaPlusSquare from 'react-icons/lib/fa/plus-square'
require('!style-loader!css-loader!../css/track-info.css');

class Title extends React.Component {
    render() {
        return (
            <div className='musicField'>
                <div className='titleImage'>
                    <img src={this.props.cover} />
                </div>

                <div >
                    <div className='titleInfos'>
                        <p className='artistName'>
                            {this.props.artist}                       
                        </p>
                        <p className='titleName'>
                            {this.props.title}
                        </p>
                        <p className='albumName'>
                            {this.props.album}
                        </p>
                    </div>
                    
                    <div className='buttonGroup'>
                        <div className='addButton'>
                        <Add artist={this.props.artistFull} 
                             title={this.props.titleFull} 
                             album={this.props.albumFull}  
                             imgUrl={this.props.cover_medium}
                        />
                        </div>

                        <div className='addButton'>
                            <FaDownload />
                        </div>

                        <div className='addButton'>
                            <FaPlay />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Title;