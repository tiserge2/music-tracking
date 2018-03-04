import React from 'react'
import FaMusic from 'react-icons/lib/fa/music'
require('!style-loader!css-loader!../css/header-bar.css');

class Header extends React.Component {
    render() {
        return(
            <div id='header-bar'>
                <h1>
                    <FaMusic /> Music tracker
                </h1>
            </div>
        )
    }
}

export default Header;