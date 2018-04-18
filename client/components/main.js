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
            super(props)
            this.state = {
                values : [],
            };
            this.getChart    = this.getChart.bind(this)
        }


        getChart = () => {
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
                            "title" : "",
                            "album" : "",
                            "cover" : "",
                            "cover_medium" : "",
                            "preview": ""
                        }
                        object["artist"] = infos.artist.name;
                        object["title"] = infos.title;
                        object["album"] = infos.album.title;
                        object["preview"] = infos.preview

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

        componentDidMount(){
            this.getChart()
        }

    render() {

        return(
            <div className='windowPosition'>
                <main>
                    <Switch>
                        <Route exact path='/' render={(props) => (
                            <Home data={this.state.values}/>
                            )} 
                        />
                        <Route path='/search' component={Search} />
                        <Route path='/list' render={(props) => (
                                <List />
                            )}
                        />
                        <Route path='*' component={Error} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default Main;