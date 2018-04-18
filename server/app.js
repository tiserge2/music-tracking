//server/server.js
var express     = require('express');
var path        = require('path');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var cookieParser= require('cookie-parser');
var session     = require('express-session');
var bodyParser  = require('body-parser');
var flash       = require('connect-flash');
var configDB    = require('./config/database');

//connection to the database
mongoose.connect(configDB.online_url);
mongoose.Connection;

var app         = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));

app.use(express.static(path.join(__dirname, '../client')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

require("./routes/routes.js")(app);

module.exports = app;