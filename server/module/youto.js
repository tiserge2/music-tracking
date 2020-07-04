const youto         = require('ytdl-core');
const fs            = require('fs')
const readline = require('readline');
 let writeStream = fs.createWriteStream('./server/download/music/music.mp3')
 //let readStream  = fs.createReadStream('./server/download/music/musicCopy.mp3')

async function getYoutubeMusic(url) {
    let starttime
    console.log("Getting youtube music")
     youto(url)
            .pipe(fs.createWriteStream('./server/download/music/music.mp3'))
            .once('response', () => {
                starttime = Date.now()
                console.log(starttime)
            })
            .on('progress', (chunkLength, downloaded, total) => {
                console.log(chunkLength)
            })
            .on('end', () => {
                console.log("terminated")
            })
    
}
module.exports = getYoutubeMusic;
