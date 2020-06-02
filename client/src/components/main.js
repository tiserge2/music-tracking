import React from 'react'
import Home from './home'
import Search from './search'
import List from './list'
import Error from './Error'
import axios from 'axios'
import { Switch, Route, useParams, useRouteMatch, BrowserRouter } from 'react-router-dom'
import withAuth from '../utils/withAuth'

var history = require("history").createBrowserHistory


// require('!style-loader!css-loader!../css/setWindowHeight.css');


class Main extends React.Component {
     /*ill make the api call here instead*/
        constructor(props) { 
            super(props);
            console.log("[Main.js] Match: ", this.props.match)

            this.state = {
                values : [],
                loading: true
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
                    this.setState({ values: values, loading: false });
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
        // let match = this.props.match

        return(
            <div className='windowPosition'>
                <main>
                    {/* <BrowserRouter basename="home"> */}
                        <Switch>
                            <Route  exact path='/home' render={(props) => <Home data={[this.state.values, this.state.loading]}/>} />
                            <Route exact   path='/home/search' render={(props) => <Search />} />
                            <Route  exact  path='/home/list' component={withAuth(List)}/>
                        </Switch>
                    {/* </BrowserRouter> */}
                        {/* <Route  exact path={`${match.path}`} render={(props) => (<Home data={[this.state.values, this.state.loading]}/>)} />
                        <Route  path={`${match.path}/search`} render={(props) => <Search />} />
                        <Route  path={`${match.path}/list`} render={(props) => ( withAuth(List) )}/> */}

                        {/*  */}
                    {/* </Switch> */}
                </main>
            </div>
        )
    }
}

export default Main;