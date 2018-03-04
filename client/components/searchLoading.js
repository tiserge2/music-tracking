import React from 'react'
import FaSearch from 'react-icons/lib/fa/search'
require('!style-loader!css-loader!../css/noSearch.css');

class SearchLoading extends React.Component {
    render() {
        return(
            <div className='noSearch '>
                <FaSearch className='faSearch searchLoading'/>
                <p className='loadingText'>
                    Search is being loading...
                </p>
            </div>
        )
    }
}

export default SearchLoading;