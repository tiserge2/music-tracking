import React from 'react'
import { Link} from 'react-router-dom'
import FaHome from 'react-icons/lib/fa/home'
import FaSearch from 'react-icons/lib/fa/search'
import FaListOl from 'react-icons/lib/fa/list-ol'
import '../css/menu-bar.css'
 
class Menu extends React.Component {
    render(){
        return(
            <div id='menu-bar'>
                <div id='menu-bar-item'>
                    <div className='menu-item'>
                        <Link to='/home' >
                            <FaHome className='faSize'/> 
                        </Link>
                    </div>

                    <div className='menu-item'>
                        <Link to='/home/search'>  
                            <FaSearch className='faSize'/> 
                        </Link>
                    </div>

                    <div className='menu-item'>
                        <Link to='/home/list'>
                            <FaListOl className='faSize'/> 
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;