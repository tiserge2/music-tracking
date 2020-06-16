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
    let youtubeKey = "AIzaSyAqKrDHg-xF9VVh5h8loAgSj9iCV5O5yWA";
    let options    = {
      q: req.params.artist + req.params.title + 'audio',
      part: 'snippet',
      type: 'video' 
    }
    var listOFLink = [];
    youtubeSearch(youtubeKey, options, (error, result) => {
      if(error) {
        console.log("WE have an error")
        console.log(error.error.errors)
      } else {
        console.log("Result: ", result.error.errors)
        // result.items.map((item,i) => {
        //   listOFLink.push("http://www.youtube.com/watch?v=" + item.id.videoId)
        // });
        // console.log(listOFLink);
        // const download =  videos(listOFLink[0], youtubeKey,'./server/download/music/')
        //  download.then( downloads => {
        //   downloads[0].onProgress(progress => {
        //     console.log(progress*100)
        //   })
        //   downloads[0].then(() => {
        //     console.log("finished")
        //   })
        //   downloads[0].catch(err => {
        //     console.log(err)
        //   })
        // }) 
        // res.send("Music downloaded Successfully")
      }
    });
  });  
}
