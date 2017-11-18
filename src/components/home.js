import React from 'react'
import Title from './track-info'
import axios from 'axios'
require('!style-loader!css-loader!../styleSheets/setWindowHeight.css');
require('!style-loader!css-loader!../styleSheets/home.css');


class Home extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                values : Array(
                    "artist" : "",
                    "title" : "",
                    "album" : "",
                    "cover" : ""
                )
            };
        }

        componentWillMount(){
            axios.get('https://api.deezer.com/chart').then(res => {
                const values = [];
                
                res.data.tracks.data.map((infos) => {
                    var object = {
                    "artist" : "",
                    "title" : "",
                    "album" : "",
                    "cover" : ""
                }
                    object["artist"] = infos.artist.name;
                    object["title"] = infos.title;
                    object["album"] = infos.album.title;
                    object["cover"] = infos.album.cover_small;

                    values.push(object);
                });

                this.setState({ values });
                console.log(res.data.tracks.data);
                console.log(values);
            });
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
                            this.state.values.map(function(musicInfos, i){
                                return(
                                    <Title key={i} artist = {musicInfos['artist']} 
                                                   title = {musicInfos['title']}
                                                   album = {musicInfos['album']} 
                                                   cover = {musicInfos['cover']}
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