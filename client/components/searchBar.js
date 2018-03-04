import React from 'react'
require('!style-loader!css-loader!../css/searchBar.css');


class SearchBar extends React.Component {
    constructor({initialChecked}) {
        super();
        this.state = {
            search : initialChecked,
            apiCall : false,
            musicSearches: {
                
            }
        }
    }

    truncate(string){
        if (string.length > 15)
            return string.substring(0,15)+'...';
        else
            return string;
    }
    
    makeApiCall(e) {
        e.preventDefault();
        if( this.refs.textInput.value !== "") {
            let val = this.refs.textInput.value
            let inpt = this.refs.selectInput.value
            const newState = !this.state.search
            this.setState({search : newState})
            this.props.callbackParent(newState)
            let stringthis = 'Je vais a la maison de ma mere pour plus dinfos'
            console.log(stringthis,this.truncate(stringthis))
            //this place will be for the api call
            //so that the user could search for something
            var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
                targetUrl = 'https://api.deezer.com/search/'
            const values = []
            fetch(proxyUrl + targetUrl + inpt + '?q=' + val + '&limit=100')
                .then( blob => blob.json())
                .then( data => {
                    console.log(data);
                    data.data.map((infos) => {
                        var object = {
                            "artist" : "",
                            "title" : "",
                            "album" : "",
                            "cover" : ""
                        }
                        
                        if(inpt === 'track'){
                            object["artist"] = this.truncate(infos.artist.name)
                            object["title"] = this.truncate(infos.title)
                            object["album"] = this.truncate(infos.album.title)
                            object["cover"] = infos.album.cover_small
                        } 
                        if(inpt === 'artist') {
                            object["artist"] = this.truncate(infos.name)
                            object["title"] = 'See all his titles'
                            object["album"] = infos.nb_album + ' album(s)'
                            object["cover"] = infos.picture_small
                        }
                        if(inpt === 'album') {
                            object["artist"] = this.truncate(infos.artist.name)
                            object["title"] = infos.nb_tracks + ' tracks'
                            object["album"] = this.truncate(infos.title)
                            object["cover"] = infos.cover_small
                        }
                        
                        values.push(object);
                    });
                    this.setState({musicSearches : values})
                    this.props.callbackParentForMusicSearch(values)
                    console.table(this.state.musicSearches)
                })
            console.log(this.state.search)
            console.log(val)
            console.log(inpt)
        } else {
            alert("No search words")
        }

        
    }
    
    render() {
        return(
            <div>
                <select name="categorie" ref="selectInput">
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                    <option value="track">Track</option>
                </select>
                <input
                    type='text'
                    placeholder='search for songs'
                    ref="textInput"
                />
                <button onClick={this.makeApiCall.bind(this)}
                        >
                        Search
                </button>
            </div>
        )
    }
}

export default SearchBar;