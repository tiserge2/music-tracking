import React from 'react'
import { browserRoute as Router, Link, Route, useParams, useRouteMatch} from 'react-router-dom'
import FaHome from 'react-icons/lib/fa/home'
import FaList from 'react-icons/lib/fa/list'
import FaPlus from 'react-icons/lib/fa/plus'
import FaSearch from 'react-icons/lib/fa/search'
import FaListOl from 'react-icons/lib/fa/list-ol'
import FaPlusSquare from 'react-icons/lib/fa/plus-square'
import '../css/menu-bar.css'
// require('!style-loader!css-loader!../css/menu-bar.css');
//import '../styleSheets/menu-bar.css'

 
class Menu extends React.Component {
    constructor(props){
        super(props);
        console.log("[Menu] match: ", this.props.match)
    }
    
    

    render(){
        let match = this.props.match

        return(
            <div id='menu-bar'>
                <div id='menu-bar-item'>
                    <div className='menu-item'>
                        <Link to={`${match.url}/`} >
                            <FaHome className='faSize'/> 
                        </Link>
                    </div>

                    <div className='menu-item'>
                        <Link to={`${match.url}/search`}>  
                            <FaSearch className='faSize'/> 
                        </Link>
                    </div>

                    <div className='menu-item'>
                        <Link to={`${match.url}/list`}>
                            <FaListOl className='faSize'/> 
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;