import React from 'react'
import { Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faListOl } from '@fortawesome/free-solid-svg-icons'
import '../css/menu-bar.css'
 
class Menu extends React.Component {
    render(){
        return(
            <div id='menu-bar'>
                <div id='menu-bar-item'>
                    <div className='menu-item'>
                        <Link to='/home' >
                            <FontAwesomeIcon icon={faHome} className='faSize'/>
                        </Link>
                    </div>

                    <div className='menu-item'>
                        <Link to='/home/search'>
                            <FontAwesomeIcon icon={faSearch} className='faSize'/>
                        </Link>
                    </div>

                    <div className='menu-item'>
                        <Link to='/home/list'>
                            <FontAwesomeIcon icon={faListOl} className='faSize'/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;