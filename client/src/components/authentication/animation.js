import React from 'react'
import FaMusic from 'react-icons/lib/fa/music'
import MdMusicNote from 'react-icons/lib/md/music-note'
import '../../css/animation.css'
// require('!style-loader!css-loader!../../css/animation.css')

class Animation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className='animation'>
                <FaMusic className='famusic1'/>
                <FaMusic className='famusic2'/>
                <MdMusicNote  className='fanote1'/>
                <MdMusicNote  className='fanote2'/>
                <FaMusic className='famusic3'/>
                <MdMusicNote  className='fanote3'/>
            </div>
        )
    }
}

export default Animation