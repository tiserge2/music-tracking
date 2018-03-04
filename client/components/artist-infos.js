import React from 'react'
import FaPlus from 'react-icons/lib/fa/plus'
import FaPlay from 'react-icons/lib/fa/play'
import FaDownload from 'react-icons/lib/fa/download'
import FaPlusSquare from 'react-icons/lib/fa/plus-square'
require('!style-loader!css-loader!../css/track-info.css');

class Artist extends React.Component {
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
                            <a href="#" onClick={}>
                                {this.props.title}
                            </a>
                        </p>
                        <p className='albumName'>
                            <a href="#" onClick={}>
                                {this.props.album}
                            </a>
                        </p>
                    </div>
                    
                    {/*<div className='buttonGroup'>
                        <div className='addButton'>
                        <FaPlusSquare />
                        </div>

                        <div className='addButton'>
                            <FaDownload />
                        </div>

                        <div className='addButton'>
                            <FaPlay />
                        </div>
                    </div>*/}
                </div>
            </div>
        )
    }
}

export default Artist;