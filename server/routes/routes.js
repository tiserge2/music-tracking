//server/routes/routes.js
//var express   = require('express');
//var router    = express.Router();
//var app       = require('../app');
const videos = require('videos')
var Favorite    = require('../models/Favorite');
var Users        = require('../models/User')
var getYoutubeMusic =  require('../module/youto.js')
var youtubeSearch = require('youtube-api-v3-search');



module.exports = function(app, passport) {
  app.get('/', function(req, res){
    res.render('index')
  });

  app.post('/addFavorite', async function(req, res) {
    console.log("we are in the /addFavorite route...")
    console.log(req.body)

    var favorite = new Favorite()
      favorite.artist = req.body.artist
      favorite.title  = req.body.title
      favorite.album  = req.body.album
      favorite.cover  = req.body.cover
      favorite.cover_medium = req.body.cover_medium
      favorite.date = new Date()
    console.log("The server received the add request..")
    await favorite.save(function(err) {
      if(err)
        res.send(err);
      req.flash('info', 'the new data has been saved to the db..')
      res.send("the new data has been saved to the db..")
    }) 
    
  });

  app.get('/getFavorite', function(req, res) {
    console.log("we are in the /getFavorite route");
    Favorite.find({}, function(err, favorites) {
      if(err)
        res.send(err)
      console.log(favorites)
      res.json(favorites) 
    })
  });

  app.get('/removeFavorite/:id', async function(req, res) {
    console.log("we are in the remove favorite route");
    await Favorite.remove({_id: req.params.id}, function(err) {
      if(err)
        res.send(err)
      res.send("Successfully deleted")
      console.log("Successfully deleted")
    })
  });

   app.get('/downloadMusic/:artist&:title', async function(req, res) {
    console.log("we are in the download favorite route");
    let youtubeKey = "AIzaSyAkWn9RFdFLEkxUPOeoz3GzoIxx7Gqokek";
    let options    = {
      q: req.params.artist + req.params.title + 'audio',
      part: 'snippet',
      type: 'video' 
    }
    var listOFLink = [];
    youtubeSearch(youtubeKey, options, (error, result) => {
      if(error)
        console.log(error)
      result.items.map((item,i) => {
        listOFLink.push("http://www.youtube.com/watch?v=" + item.id.videoId)
        //res.send(item)
      });
      console.log(listOFLink);
      const download =  videos(listOFLink[0], youtubeKey,'./server/download/music/')
       download.then( downloads => {
        downloads[0].onProgress(progress => {
          console.log(progress*100)
        })
        downloads[0].then(() => {
          console.log("finished")
        })
        downloads[0].catch(err => {
          console.log(err)
        })
      })
      //getYoutubeMusic(listOFLink[1])
      res.send("Music downloaded Successfully")
    });
  });

  //creating the route responsible of the registration
  app.post("/submitForm", passport.authenticate('local-signup' ,
      {
        successRedirect: '/home',
        faillureRedirect: '/'
      }
    )
  );
}