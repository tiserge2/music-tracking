//server/server.js
var express     = require('express');
var path        = require('path');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var cookieParser= require('cookie-parser');
var session     = require('express-session');
var bodyParser  = require('body-parser');
var flash       = require('connect-flash');
var passport    = require('passport');
var configDB    = require('./config/database');
const socketIO  = require('socket.io');
const http      = require('http');
  
//connection to the database
mongoose.connect(configDB.online_url,
        {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // reconnectTries: Number.MAX_VALUE,
                // reconnectInterval:1000
        }
);
mongoose.Connection;

var Favorite        = require('./models/Favorite');   


Favorite.find({userId: "5ee41c9b21a3cc0017cf1a1e"}, function(err, favorites) {
        console.log("Inside favorite") 
        if(err)
          res.send(err)
        console.log(favorites)
        res.json(favorites)
      })

require('./config/passport')(passport);
var app         = express();

app.use(express.static(path.join(path.resolve(__dirname, '..'), 'client/build')));
// app.use(express.static(path.join(path.resolve(__dirname), 'download/music')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('keyboard cat'));
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/client'));



//passport setup
app.use(session({
        cookie: { maxAge: 60000 }, 
        secret: 'thismoica',
        saveUninitialized: true,
        resave: true
})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())


const server = http.createServer(app)
const io     = socketIO(server)

require("./routes/routes.js")(app, io);


var serverPort = 8080;
var port = process.env.PORT || serverPort;
app.listen(port, function() {
 console.log('running at localhost: ' + port);
});

module.exports = app;
module.exports = io;