import React from 'react'
require('!style-loader!css-loader!../css/setWindowHeight.css');
require('!style-loader!css-loader!../css/list.css');

class List extends React.Component {
    render(){
        return (
            <div className='windowPosition home'>
                <div className='listPreferenceBoard'>
                    <h1 className='texte1'>
                        Preferences
                    </h1>
                </div>
            </div>
        )
    }
}

export default List;