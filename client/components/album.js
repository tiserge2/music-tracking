import React from 'react'

require('!style-loader!css-loader!../css/track-info.css');

class Album extends React.Component {
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
                            {this.props.nb_title} + track(s)
                        </p>
                        <p className='albumName'>
                            {this.props.album}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Album;