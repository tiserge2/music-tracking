import React from 'react'
import FaPlus from 'react-icons/lib/fa/plus'
import Add from './Add'
import Remove from './Remove'
import Download from './Download'
import Play from './play'
import FaPlay from 'react-icons/lib/fa/play'
import FaDownload from 'react-icons/lib/fa/download'
import FaPlusSquare from 'react-icons/lib/fa/plus-square'
import '../css/track-info.css'
// require('!style-loader!css-loader!../css/track-info.css');

class Title extends React.Component {
    constructor(props) {
        super(props);
    }
    truncate(string){
            if (string.length > 13)
                return string.substring(0,13) + '...';
            else
                return string;
        }

    render() {
        return (
            <div className='musicField'>
                <div className='titleImage'>
                    <img src={this.props.cover} />
                </div>

                <div >
                    <div className='titleInfos'>
                        <p className='artistName'>
                        {
                            this.truncate(this.props.artist)
                        }                      
                        </p>
                        <p className='titleName'>
                        {
                            this.truncate(this.props.title)
                        }
                        </p>
                        <p className='albumName'>
                        {
                            this.truncate(this.props.album)
                        }
                        </p>
                    </div>
                    
                    <div className='buttonGroup'>
                        <div className='addButton'>
                        {
                            this.props.parent === "home" || this.props.parent === "search" ? 
                                <Add artist     = {this.props.artist} 
                                     title      = {this.props.title} 
                                     album      = {this.props.album}  
                                     cover      = {this.props.cover}
                                     cover_medium={this.props.cover_medium}
                                     {...this.props}
                                />
                            :
                                <Remove 
                                    artist     = {this.props.artist} 
                                    title      = {this.props.title} 
                                    album      = {this.props.album}  
                                    cover      = {this.props.cover}
                                    cover_medium={this.props.cover_medium}
                                    id          ={this.props.id}
                                    callRefresh ={(id) => {this.props.callGetFavorite(id)}}
                                    {...this.props}
                                />
                        }
                        
                        </div>

                        <div className='addButton'>
                            <Download artist     = {this.props.artist} 
                                      title      = {this.props.title} 
                                      album      = {this.props.album}
                                      {...this.props}
                            />
                        </div>

                        <div className='addButton'>
                            <Play   artist     = {this.props.artist} 
                                    title      = {this.props.title} 
                                    album      = {this.props.album}  
                                    cover      = {this.props.cover}
                                    cover_medium={this.props.cover_medium}
                                    preview    ={this.props.preview}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Title;