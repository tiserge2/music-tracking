import React from 'react'
import Title from './track-info'
require('!style-loader!css-loader!../styleSheets/setWindowHeight.css');
require('!style-loader!css-loader!../styleSheets/home.css');


class Home extends React.Component {
    render () {
        return (
            <div className='windowPosition home'>
                <div className='trendsBoard'>
                    <h1>
                        Music Trends
                    </h1>

                    <div className=''>
                        <Title />
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Home;