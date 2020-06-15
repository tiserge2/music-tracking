import React from 'react'
import Title from './track-info'
import SearchLoading from './searchLoading'
import '../css/setWindowHeight.css'
import '../css/home.css'

class Home extends React.Component {
    render () {
        
        return (
            <div className='windowPosition home'>
                <div className='trendsBoard'>
                    <p className='texte1'>
                        Trending board
                    </p>

                    <div className='titleContainer' id='style-2'>
                        {
                            this.props.data[1] === true ? <SearchLoading /> 
                                              :
                                                this.props.data[0].map(function(musicInfos, i){
                                                    return(
                                                        <Title key={i} artist = {musicInfos['artist']} 
                                                                    title = {musicInfos['title']}
                                                                    album = {musicInfos['album']} 
                                                                    cover = {musicInfos['cover']}
                                                                    cover_medium = {musicInfos['cover_medium']}
                                                                    preview = {musicInfos['preview']}
                                                                    parent="home"
                                                        />
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