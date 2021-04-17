import React from 'react'
import { FormGroup, FormControl, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../css/searchBar.css'

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

    
    makeApiCall(e) {
        console.log("we are in the search bar make api call " +
                    this.refs.textInput.value + " " + this.selectInput.value)
        e.preventDefault();
        if( this.refs.textInput.value !== "") {
            let val = this.refs.textInput.value
            let inpt = this.selectInput.value
            const newState = !this.state.search
            this.setState({search : newState})
            this.props.callbackParent(newState)
            //this place will be for the api call
            //so that the user could search for something
            var proxyUrl = 'https://corsanywhere.herokuapp.com/',
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
                            "cover" : "",
                            "cover_medium" : "",
                            "preview":""
                        }
                        
                        if(inpt === 'track'){
                            object["artist"] = infos.artist.name
                            object["title"] = infos.title
                            object["album"] = infos.album.title 
                            object["cover"] = infos.album.cover_small
                            object["cover_medium"] = infos.album.cover_medium
                            object["preview"] = infos.preview
                        } 
                        if(inpt === 'artist') {
                            object["artist"] = infos.name
                            object["title"] = 'See all his titles'
                            object["album"] = infos.nb_album + ' album(s)'
                            object["cover"] = infos.picture_small
                        }
                        if(inpt === 'album') {
                            object["artist"] = infos.artist.name
                            object["title"] = infos.nb_tracks + ' tracks'
                            object["album"] = infos.title
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
            <div >
                <FormGroup controlId="formControlsSelect" ref="selectInput" className='form-group1'>
                    <FormControl  inputRef={input => this.selectInput = input} componentClass="select" id='select'  placeholder="select">
                        <option value="track" defaultValue>Track</option>
                        <option value="artist">Artist</option>
                        <option value="album">Album</option>
                    </FormControl>
                </FormGroup>
                <input
                    type='text'
                    placeholder='search for songs'
                    ref="textInput"
                />
                <Button type="submit" 
                        id="search-button"
                        onClick={this.makeApiCall.bind(this)}
                >
                        <FontAwesomeIcon icon={faSearch} />
                </Button>
            </div>
        )
    }
}

export default SearchBar;