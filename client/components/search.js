import React from 'react'
import SearchBar from './searchBar'
import NoSearch from './noSearch'
import SearchLoading from './searchLoading'
import Title from './track-info'
require('!style-loader!css-loader!../css/setWindowHeight.css');
require('!style-loader!css-loader!../css/search.css');
require('!style-loader!css-loader!../css/home.css');

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            isSearching : false,
            isApiCalled : false,
            albumSearch : {

            },
            artistSearch: {

            },
            trackSearch:[

            ]
        }
    }

    onChildChange(newState) {
        this.setState({isSearching : true})
    }

    onMusicSearched(values) {
        this.setState({isApiCalled: !this.state.isApiCalled})
        this.setState({trackSearch : values})
    }
    
    render(){
        return (
            <div className='home windowPosition'>
                <div className='searchContainer'>
                    <SearchBar initialChecked={this.state.isSearching}
                                callbackParent={(newState) => {this.onChildChange(newState)}}
                                callbackParentForMusicSearch={(values) => {this.onMusicSearched(values)}}/>
                    
                    <div className='titleContainer' id='style-2'>
                        {
                            this.state.isSearching ? 
                                    this.state.isApiCalled ?
                                        this.state.trackSearch.map((track,i) => {
                                            return(
                                                <Title key={i}  artist = {track.artist} 
                                                                title = {track.title} 
                                                                album = {track.album} 
                                                                cover = {track.cover}
                                                                preview = {track.preview}
                                                                cover_medium = {track.cover_medium}
                                                                parent="search"
                                                />
                                            )
                                        })
                                        :
                                        <SearchLoading />
                                :
                            <NoSearch />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;