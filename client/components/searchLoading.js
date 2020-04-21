import React from 'react'
import FaSearch from 'react-icons/lib/fa/search'
import Loader from 'react-loader-spinner'
require('!style-loader!css-loader!../css/noSearch.css');

class SearchLoading extends React.Component {
    render() {
        return(
            <div className='searchLoading noSearch'>
                {/* <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner> */}
                <Loader type="Bars" 
                        color="#80bfff" 
                        height={80} 
                        width={80} 
                />
                {/* <p > ... </p> */}
            </div>
        )
    }
}

export default SearchLoading;