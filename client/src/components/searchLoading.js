import React from 'react'
import FaSearch from 'react-icons/lib/fa/search'
import Loader from 'react-loader-spinner'
import '../css/noSearch.css'
// require('!style-loader!css-loader!../css/noSearch.css');

class SearchLoading extends React.Component {
    render() {
        return(
            <div className='searchLoading noSearch'>
                <Loader type="Bars" 
                        color="#80bfff" 
                        height={80} 
                        width={80} 
                />
            </div>
        )
    }
}

export default SearchLoading;