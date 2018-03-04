import React from 'react'
import Home from './home'
import Search from './search'
import List from './list'
import Error from './Error'
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
require('!style-loader!css-loader!../css/setWindowHeight.css');


class Main extends React.Component {
     /*ill make the api call here instead*/
        constructor(props) {
            super(props);
            this.state = {
                values : [
                    
                ]
            };
        }

        truncate(string){
            if (string.length > 15)
                return string.substring(0,15)+'...';
            else
                return string;
        }

        componentDidMount(){
            var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
                targetUrl = 'https://api.deezer.com/chart&limit=50';
            const values = [];
            
            fetch(proxyUrl + targetUrl)
                .then(blob => blob.json())
                .then(data => {
                    console.log(data);
                    data.tracks.data.map((infos) => {
                        var object = {
                            "artist" : "",
                            "artist_fullname": "",
                            "title" : "",
                            "title_fullname": "",
                            "album" : "",
                            "album_fullname": "",
                            "cover" : "",
                            "cover_medium" : "",
                        }
                        object["artist"] = this.truncate(infos.artist.name);
                        object["title"] = this.truncate(infos.title);
                        object["album"] = this.truncate(infos.album.title);
                        
                        object["artist_fullname"] = infos.artist.name;
                        object["title_fullname"] = infos.title;
                        object["album_fullname"] = infos.album.title;

                        object["cover"] = infos.album.cover_small;
                        object["cover_medium"] = infos.album.cover_medium;

                        values.push(object);
                    });
                    this.setState({ values });
                })
                .catch(e => {
                    console.log(e);
                    return e;
                });
                
        }

    render() {

        return(
            <div className='windowPosition'>
                <main>
                    <Switch>
                        <Route exact path='/' render={(props) => (
                            <Home data={this.state.values}/>)} 
                        />
                        <Route path='/search' component={Search} />
                        <Route path='/list' component={List} />
                        <Route path='*' component={Error} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default Main;