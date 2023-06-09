//server/routes/routes.js
const videos        = require('videos')
var Favorite        = require('../models/Favorite');
var User            = require('../models/User')
var getYoutubeMusic = require('../module/youto.js')
var youtubeSearch   = require('youtube-api-v3-search');
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const fetch = require("node-fetch");

const path          = require('path');
var withAuth        = require('../config/middleware');
const jwt           = require('jsonwebtoken');
const fs            = require('fs')

var secret          = 'mysecretsshhh';



module.exports = function(app, io) {
  app.get('/', function(req, res) {
    console.log('redirection...')
    res.redirect(307, 'http://localhost:8080/home');
  });

  app.get('/home', function(req, res){
    console.log('sending file')
    res.sendFile(path.join(path.resolve(__dirname, "../..") + '/client/build/index.html'));
  });

  app.get('/checkToken', withAuth, function(req, res) {
    console.log("Checking toking");
    res.sendStatus(200);
  });

  app.get('/api/secret', withAuth, function(req, res) {
    res.send('The password is potato');
  });

    //creating the route responsible of the registration
  app.post("/register", function(req, res) {
      console.log("we are about to register a new user");
      User.findOne({'username': req.body.username}, function(err, user) {
        console.log("checking if there was an error")
        if(err) {
          console.log(err)
        } else {
          console.log("checking if the user already exist")
          if(user) {
              console.log("User already exists");
              res.send({message:"User already exist."});
          } else {
              var newUser = new User();
              console.log("Body: ", req.body)
              // TO-DO 
              // Backend verify the value are not empty

              newUser.username = req.body.username; 
              newUser.password = newUser.generateHash(req.body.password);
              newUser.save(function(err) {
                console.log("Saving the new user to the DB");
                if(err) {
                  res.json({message: "Error registering new user please try again."});
                } 
                res.json({message: "saved"});
              });
          }
        }
      });
  });

    //creating the route responsible of the login
  app.post("/login", function(req, res) {
    console.log("We are in login route");
    // TO-DO 
    // Backend verify the value are not empty
    const { username, password } = req.body;
    User.findOne({ username }, function(err, user) {
      console.log("Checking if user exist"); 
      if (err) {
        console.error(err);
        res.status(500)
           .json({error: 'Internal error please try again'}); 
      } 
      
      if (!user) {
        res.status(401)
           .json({error: 'Incorrect username or password'});
      } else {
        console.log("Checking if password is correct");
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500) 
               .json({error: 'Internal error please try again'});
          } 
          
          if (!same) {
            res.status(401)
               .json({error: 'Incorrect username or password'});
          } else {
            console.log("Issuing token");
            // Issue token
            const payload = { username };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true }).sendStatus(200);
          }
        });
      }
    });
  });

  app.post('/addFavorite',  function(req, res) {
    console.log("we are in the /addFavorite route...")
    console.log(req.body)

    var favorite = new Favorite()
    console.log("The server received the add request..")
    
    User.find({username: req.body.username}, function(err, user) {
      if(err)
        res.send(err)

      var userId = user[0]._id
      console.log('id user: ', user[0]._id)

      favorite.userId = userId
      favorite.artist = req.body.artist
      favorite.title  = req.body.title
      favorite.album  = req.body.album
      favorite.cover  = req.body.cover
      favorite.cover_medium = req.body.cover_medium
      favorite.preview =  req.body.preview
      favorite.date = new Date()

      favorite.save(function(err) {
        if(err)
          res.send(err);

        console.log("favorite: ", favorite)
        req.flash('info', 'the new data has been saved to the db..')
        res.send("the new data has been saved to the db..")
      }) 
    })
  });
 
  app.get('/getFavorite', function(req, res) {
    console.log("we are in the /getFavorite route");
    console.log('User to get favorite: ', req.query.username)
    User.find({username: req.query.username}, function(err, user) {
      if(err)
        res.send(err)
      if(user[0]._id) {
        Favorite.find({userId: user[0]._id}, function(err, favorites) {
          if(err)
            res.send(err)
          console.log(favorites)
          res.json(favorites)
        })
      } else {
        res.send("Internal problem, please try again.")
      }
    })
  });

  app.get('/getChartDeezer', function(req, res) {
    console.log("getting chart")
    fetch('https://api.deezer.com/chart&limit=50')
      .then(blob => blob.json())
      .then(response => {
        res.send(response)
      })
      .catch(error => {
        console.log(error)
      })
  });

  app.post('/searchDeezer',  function(req, res) {
    console.log(req.body)
    let inpt = req.body.input
    let q = req.body.q

    fetch("https://api.deezer.com/search/" + inpt + '?q=' + q + '&limit=100')
      .then(blob => blob.json())
      .then(response => {
        res.send(response.data)
      })
      .catch(error => {
        console.log(error)
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

  app.post('/downloadMusic/', async function(req, res) {
    console.log("we are in the download favorite route");
    console.log("Data: ", req.body)
    let youtubeKey = "AIzaSyAS5Achi7g3-awm4o88Th_sVLpTt-hagTM";
    let options    = {
      q: req.body.artist + req.body.title + 'audio',
      part: 'snippet',
      type: 'video' 
    }
    var listOFLink = [];
    youtubeSearch(youtubeKey, options, (error, result) => {
      if(error) {
        console.log("WE have an error")
        console.log(error)
        res.json({status: 'error', message: 'Error downloading, please try again'})
      } else {
        console.log("Result: ", result)
        result.items.map((item,i) => {
          listOFLink.push(item.id.videoId)
        });
        console.log(listOFLink);
        var YD = new YoutubeMp3Downloader({
            // "ffmpegPath": "/path/to/ffmpeg",        // Where is the FFmpeg binary located?
            "outputPath": "./server/download/music/",    // Where should the downloaded and encoded files be stored?
            "youtubeVideoQuality": "highest",       // What video quality should be used?
            "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
            "progressTimeout": 2000                 // How long should be the interval of the progress reports
        });
        
        //Download video and save as MP3 file
        YD.download(listOFLink[0]);
        
        YD.on("finished", function(err, data) {
            console.log(listOFLink[0], " has been downloaded successfully...")
            console.log("Nom du fichier: ", JSON.stringify(data));

            var musicFile = removeG(JSON.stringify(data.videoTitle)) + ".mp3";
            var tempFile = "/download/music/" +  musicFile;
            var filePath = path.join(path.resolve(__dirname, '..'), tempFile);

            console.log("\n\nFile path: ", filePath)
            console.log("music path: ", musicFile)
            console.log("temp path: ", tempFile, "\n\n")

            res.download(filePath, musicFile, (err) => {
              if(err) {
                console.log("There is an error");
                console.log(err)
              } else {
                console.log("Everything is ok");
                //delete the file from server
                fs.unlink(filePath, function (err) {
                  if (err) throw err;
                  // if no error, file has been deleted successfully
                  console.log('File deleted!');
              }); 
              }
            });
        });
        
        YD.on("error", function(error) {
            console.log(error);
            res.json({state: 'error', message: 'Error downloading, please try again'})
        });
        
        YD.on("progress", function(progress) {
            console.log("Downloading: ", JSON.stringify(progress.progress.percentage));
            // res.json({state: 'downloading', percentage: JSON.stringify(progress.progress.percentage)})
        });
      }
    });
  });  
}

var removeG = function(value) {
  var temp = []
  var temp1 = []
  for(var i = 0; i < value.length; i++) {
    temp.push(value[i])
  }
  
  for(var j = 1; j < temp.length - 1; j++) {
    temp1.push(temp[j])
  }
  return temp1.join("")
}