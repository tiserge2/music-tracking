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
                    if(err)
                        return done(err);
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
        emailField: "email",
        passwordField: "password"
    }, function(req, email, password, done) {
        User.findOne({'local.email': email}, function(err, user) {
            if(err)
                return done(err);

            if(!user) 
                return done(null, false);

            if(!user.validPassword(password))
                return done(null, false);

            return done(null, user);
        })
    }))
}