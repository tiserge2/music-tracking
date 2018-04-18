import React from 'react'
import Title from './track-info'
import axios from 'axios'
require('!style-loader!css-loader!../css/setWindowHeight.css');
require('!style-loader!css-loader!../css/list.css');

class List extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            favorites: [],
            length: 0
        }
        this.getFavorite = this.getFavorite.bind(this)
    }

    getFavorite = () => {
            axios.get('/getFavorite')
                .then((response) => {
                    console.log("has the data been arrived?")
                    console.log(response.data)
                    console.log(this.state)
                    if(this.state.length === 0 || response.data.length > length) {
                        this.setState({favorites: response.data, length: response.data.length})
                        console.log(this.state)
                    }
                });
    }

    componentWillMount = () => {
        this.getFavorite()
    }

    componentWillUpdate = () => {
        this.getFavorite()
    }

    componentDidMount = () => {
        
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
                        this.state.favorites.map((favorite, i) => {
                            return(
                                <Title key={i}     artist = {favorite['artist']} 
                                                   title = {favorite['title']}
                                                   album = {favorite['album']} 
                                                   cover = {favorite['cover']}
                                                   id    = {favorite['_id']}
                                                   parent="favorite"
                                                   callGetFavorite = {() => {this.getFavorite()}}
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