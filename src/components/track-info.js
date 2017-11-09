import React from 'react'
import FaPlus from 'react-icons/lib/fa/plus'
require('!style-loader!css-loader!../styleSheets/track-info.css');

class Title extends React.Component {
    render() {
        return (
            <div className='musicField'>
                <div className='titleImage'>
                </div>

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

                <div className='addButton'>
                    <FaPlus />
                </div>
            </div>
        )
    }
}

export default Title;