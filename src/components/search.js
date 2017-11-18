import React from 'react'
require('!style-loader!css-loader!../styleSheets/setWindowHeight.css');
require('!style-loader!css-loader!../styleSheets/search.css');

class Search extends React.Component {
    render(){
        return (
            <div className='home windowPosition'>
                <h1>
                    You are in the search page
                </h1>
            </div>
        )
    }
}

export default Search;