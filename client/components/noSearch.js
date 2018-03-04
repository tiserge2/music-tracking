import React from 'react'
import FaSearch from 'react-icons/lib/fa/search'
require('!style-loader!css-loader!../css/noSearch.css');

class NoSearch extends React.Component {
    render() {
        return(
            <div className='noSearch'>
                <FaSearch className='faSearch'/>
            </div>
        )
    }
}

export default NoSearch;