import React from 'react'
import { browserRoute as Router, Link, Route} from 'react-router-dom'
import FaHome from 'react-icons/lib/fa/home'
import FaList from 'react-icons/lib/fa/list'
import FaPlus from 'react-icons/lib/fa/plus'
import FaSearch from 'react-icons/lib/fa/search'
import FaListOl from 'react-icons/lib/fa/list-ol'
import FaPlusSquare from 'react-icons/lib/fa/plus-square'
require('!style-loader!css-loader!../css/menu-bar.css');
//import '../styleSheets/menu-bar.css'


class Menu extends React.Component {
    constructor(props){
        super(props);
    }
    
    

    render(){
        return(
            <div id='menu-bar'>
                <div id='menu-bar-item'>
                    <div className='menu-item'>
                        <Link to='/' >
                            <FaHome className='faSize'/> 
                        </Link>
                    </div>

                    <div className='menu-item'>
                        <Link to='/search'>  
                            <FaSearch className='faSize'/> 
                        </Link>
                    </div>

                    <div className='menu-item'>
                        <Link to='/list'>
                            <FaListOl className='faSize'/> 
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;