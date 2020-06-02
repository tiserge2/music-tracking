//server/routes/routes.js
const videos        = require('videos')
var Favorite        = require('../models/Favorite');
var User            = require('../models/User')
var getYoutubeMusic = require('../module/youto.js')
var youtubeSearch   = require('youtube-api-v3-search');
const path          = require('path');
var withAuth        = require('../config/middleware');
const jwt           = require('jsonwebtoken');

var secret          = 'mysecretsshhh';



module.exports = function(app, passport) {
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
      User.findOne({'email': req.body.email}, function(err, user) {
        console.log("checking if there was an error")
        if(err) {
          console.log(err)
        } else {
          console.log("checking if the user already exist")
          if(user) {
              console.log("User already exists");
              res.status(500).send("User already exist.");
          } else {
              var newUser = new User();
              console.log("Body: ", req.body)
              // TO-DO 
              // Backend verify the value are not empty

              newUser.lastname = req.body.lastname;
              newUser.firstname = req.body.firstname;
              newUser.email = req.body.email; 
              newUser.password = newUser.generateHash(req.body.password);
              newUser.question = req.body.question;
              newUser.answer = req.body.answer;
              newUser.save(function(err) {
                console.log("Saving the new user to the DB");
                if(err) {
                  res.status(500).send("Error registering new user please try again.");
                }
                res.send("Vous etes enregistre!");
              });
          }
        }
      });
  });

    //creating the route responsibe of the login
  app.post("/login", function(req, res) {
    console.log("We are in login route");
    // TO-DO 
    // Backend verify the value are not empty
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
      console.log("Checking if user exist");
      if (err) {
        console.error(err);
        res.status(500)
           .json({error: 'Internal error please try again'});
      } 
      
      if (!user) {
        res.status(401)
           .json({error: 'Incorrect email or password'});
      } else {
        console.log("Checking if password is correct");
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
               .json({error: 'Internal error please try again'});
          } 
          
          if (!same) {
            res.status(401)
               .json({error: 'Incorrect email or password'});
          } else {
            console.log("Issuing token");
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true }).sendStatus(200);
          }
        });
      }
    });
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
}
