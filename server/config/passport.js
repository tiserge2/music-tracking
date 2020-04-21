//passport configuration for local signin and signup
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

module.exports = function(passport) {
    //serialize User
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //deserialize user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        })
    });

    //local signup 
    passport.use('local-signup' , new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            session: false,
            passReqToCallback: true
        }, function(req, email, password, done) {
            console.log("we are in the local-signup strategy")
            process.nextTick(function() {
                User.findOne({'email': email}, function(err, user) {
                    console.log("checking if there were an error")
                    if(err)
                        return done(err);
                    console.log("checking if the user already exist")
                    if(user) {
                        console.log("User already exists");
                        return done(null, false);
                    } else {
                        var newUser = new User();
                        newUser.lastname = req.body.lastname;
                        newUser.firstname = req.body.firstname;
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.question = req.body.question;
                        newUser.answer = req.body.answer;
                        console.log("sending information to the user model")
                        newUser.save(function(err) {
                            if(err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        })
    );

    //local signin
    passport.use('local-signin', new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback : true
    }, function(req, email, password, done) {
        console.log("we are in the local signin strategy");
        process.nextTick(function() {
            User.findOne({'email': email}, function(err, user) {
                console.log("going to check if there were error")
                if(err)
                    return done(err);
                console.log("going to check if the user exist")
                if(!user) 
                    return done(null, false, {message: 'no user with that email'})
                console.log("going to check if the password is valid")
                if(!user.validPassword(password))
                    return done(null, false, {message: "password is not correct"});
                console.log("going to return the user successfully")
                console.log(user)
                return done(null, user);
            })
        });
    }))
}
