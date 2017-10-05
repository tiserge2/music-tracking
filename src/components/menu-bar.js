import React from 'react'
import FaHome from 'react-icons/lib/fa/home'
import FaList from 'react-icons/lib/fa/list'
import FaPlusSquare from 'react-icons/lib/fa/plus-square'
require('!style-loader!css-loader!../styleSheets/menu-bar.css');
//import '../styleSheets/menu-bar.css'


class Menu extends React.Component {
    render(){
        return(
            <div id='menu-bar'>
                <div id='menu-bar-item'>
                    <div className='menu-item'>
                    <FaHome />
                    Home
                    </div>

                    <div className='menu-item'>
                    <FaPlusSquare />
                    Add
                    </div>

                    <div className='menu-item'>
                    <FaList />
                    List
                </div>
                </div>
            </div>
        )
    }
}

export default Menu;