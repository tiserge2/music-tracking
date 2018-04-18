import React from 'react'
import Title from './track-info'
import axios from 'axios'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
require('!style-loader!css-loader!../css/setWindowHeight.css');
require('!style-loader!css-loader!../css/home.css');


class Home extends React.Component {
    constructor(props) {
            super(props);
            
        }

    render () {
        
        return (
            <div className='windowPosition home'>
                <div className='trendsBoard'>
                    <h1 className='texte1'>
                        Music Trends
                    </h1>

                    <div className='titleContainer' id='style-2'>
                        
                        {
                            this.props.data.map(function(musicInfos, i){
                                return(
                                    <ReactCSSTransitionGroup transitionName="example"
                                            transitionEnterTimeout={1500}
                                            transitionLeaveTimeout={1300}
                                            key={i}
                                    >
                                    <Title key={i} artist = {musicInfos['artist']} 
                                                   title = {musicInfos['title']}
                                                   album = {musicInfos['album']} 
                                                   cover = {musicInfos['cover']}
                                                   cover_medium = {musicInfos['cover_medium']}
                                                   preview = {musicInfos['preview']}
                                                   parent="home"
                                    />
                                    </ReactCSSTransitionGroup>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Home;