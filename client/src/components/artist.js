import React from 'react'
import '../css/track-info.css'

// require('!style-loader!css-loader!../css/track-info.css');

class Artist extends React.Component {
    render() {
        return(
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
                            See all his titles
                        </p>
                        <p className='albumName'>
                            {this.props.nb_album} + album(s)
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Artist;