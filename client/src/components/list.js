import React from 'react'
import Title from './track-info'
import axios from 'axios'
import SearchLoading from './searchLoading'
import '../css/setWindowHeight.css'
import '../css/home.css'
import '../css/list.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies(); 

class List extends React.Component {
    constructor(props){
        super(props);
        console.log("Username: ", cookies.get('username'))
        this.state = {
            username: cookies.get('username'),
            favorites: [],
            length: 0,
            hasData: false
        }
        this.getFavorite = this.getFavorite.bind(this)
    }

    getFavorite = () => {
        axios.get('/getFavorite', {
            params: {
                username: this.state.username
            }
        } 
        ).then((response) => {
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
                                                   history={this.props.history}
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