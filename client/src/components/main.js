import React from 'react'
import Home from './home'
import Search from './search'
import List from './list'
import { Switch, Route } from 'react-router-dom'
import withAuth from '../utils/withAuth' 
import UserAction from './User'

class Main extends React.Component {
     /*ill make the api call here instead*/
        constructor(props) { 
            super(props);
            this.state = {
                values : [],
                loading: true
            };
            this.getChart    = this.getChart.bind(this)
        }
 
        getChart = () => {
            const values = [];

            fetch("/getChartDeezer/")
                .then( blob => blob.json())
                .then(response => {
                    console.log(response.data)
                    response.tracks.data.map((infos) => {
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
        }

        componentDidMount(){
            this.getChart()
        }

    render() {

        return(
            <div className='windowPosition'>
                <main>
                    <UserAction />
                    <Switch>
                        <Route  exact path='/home' render={(props) => <Home data={[this.state.values, this.state.loading]}/>} />
                        <Route exact   path='/home/search' render={(props) => <Search />} />
                        <Route  exact  path='/home/list' component={withAuth(List)}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

export default Main;