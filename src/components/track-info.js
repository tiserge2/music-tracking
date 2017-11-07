import React from 'react'
require('!style-loader!css-loader!../styleSheets/track-info.css');

class Title extends React.Component {
    render() {
        return (
            <div className='musicField'>
                <div className='titleImage'>
                </div>

                <div className='titleInfos'>
                </div>

                <div className='addButton'>
                </div>
            </div>
        )
    }
}

export default Title;