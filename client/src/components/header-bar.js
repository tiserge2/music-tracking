import React from 'react'
import FaMusic from 'react-icons/lib/fa/music'
import '../css/header-bar.css'
// require('!style-loader!css-loader!../css/header-bar.css');

class Header extends React.Component {
    render() {
        return(
            <div id='header-bar'>
                <p id='text'>
                    <FaMusic /> Music tracker
                </p>
            </div>
        )
    }
}

export default Header;