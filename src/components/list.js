import React from 'react'
require('!style-loader!css-loader!../styleSheets/setWindowHeight.css');
require('!style-loader!css-loader!../styleSheets/list.css');

class List extends React.Component {
    render(){
        return (
            <div className='windowPosition home' >
                <h1>
                    List page
                </h1>
            </div>
            
        )
    }
}

export default List;