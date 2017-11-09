import React from 'react'
import Title from './track-info'
require('!style-loader!css-loader!../styleSheets/setWindowHeight.css');
require('!style-loader!css-loader!../styleSheets/home.css');


class Home extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                values : Array(

                    {
                        "artist" : "Aldo Ranks",
                        "title" : "Como Hago para olvidarte",
                        "album" : "Yo no se"
                    },
                    {
                        "artist" : "Makano",
                        "title" : "Me rehuso",
                        "album" : "Yo no se"
                    },
                    {
                        "artist" : "Makano",
                        "title" : "Como Hago para olvidarte",
                        "album" : "La discusion"
                    }
                )
            };
        }

    render () {
        return (
            <div className='windowPosition home'>
                <div className='trendsBoard'>
                    <h1>
                        Music Trends
                    </h1>

                    <div className='titleContainer' id='style-2'>
                        {
                            this.state.values.map(function(musicInfos, i){
                                return(
                                    <Title key={i} artist={musicInfos['artist']} 
                                                   title={musicInfos['title']}
                                                   album={musicInfos['album']} 
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