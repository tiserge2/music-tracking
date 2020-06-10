import React from 'react'
import Title from './track-info'
import axios from 'axios'
import SearchLoading from './searchLoading'
import '../css/setWindowHeight.css'
import '../css/home.css'
import '../css/list.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// require('!style-loader!css-loader!../css/setWindowHeight.css');
// require('!style-loader!css-loader!../css/list.css');

class List extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: cookies.get('username'),
            favorites: [],
            length: 0,
            hasData: false
        }
        this.getFavorite = this.getFavorite.bind(this)
        console.log("getting username from cookie ", cookies.get('username'))
    }

    getFavorite = () => {
        console.log("user asking for favorite: ", this.state.username)
        axios.get('/getFavorite', {
            params: {
                username: this.state.username
            }
        } 
        ).then((response) => {
            console.log("has the data been arrived?")
            console.log(response.data)
            console.log(this.state)
            if(this.state.length === 0 || response.data.length > this.state.length) {
                this.setState({favorites: response.data, length: response.data.length})
                console.log(this.state)
                this.setState({hasData: true})
            }
        });
    }

    componentDidMount = () => {
        this.getFavorite()
    }

    removeElement = (id) => {
        console.log("element to remove: ", id)
    }

    render(){
        return (
            <div className='windowPosition home'>
                <div className='listPreferenceBoard'>
                    <h1 className='texte1'>
                        Preferences
                    </h1>

                    <div className='titleContainer' id='style-2'>
                    {
                        !this.state.hasData ? <SearchLoading />
                        :
                        this.state.favorites.map((favorite, i) => {
                            return(
                                <Title key={i}     artist = {favorite['artist']} 
                                                   title = {favorite['title']}
                                                   album = {favorite['album']} 
                                                   cover = {favorite['cover']}
                                                   id    = {favorite['_id']}
                                                   parent="favorite"
                                                   callGetFavorite = {(id) => {this.removeElement(id)}}
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

export default List;