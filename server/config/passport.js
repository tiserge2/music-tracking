//passport configuration for local signin and signup
var LocalStrategy = require('passport-local');

var User = require('../models/User');

module.exports = function(passport) {
    //serialize User
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //deserialize user
    passport.deserializeUser(function(id, done) {
        User.findByIdId(id, function(err, user) {
            done(err, user);
        })
    });

    //local signup 
    passport.use('local-signup' , new LocalStrategy({
            lastnameField: "lastname",
            firstnameField: "firstname",
            emailField: "email",
            passwordField: "password",
            questionField: "question",
            answerField: "answer",
            passReqToCallback: true
        }, function(req, lastname, firstname, email, password, question,answer, done) {
            process.nextTick(function() {
                console.log("we are in the local-signup strategy")
                User.findOne({'local.email': email}, function(err, user) {
                    if(err)
                        return done(err);
                    if(user) {
                        return done(null, false, req.send('user alreadu esxists'));
                    } else {
                        var newUser = new User();
                        newUser.local.lastname = lastname;
                        newUser.local.firstname = firstname;
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.question = question;
                        newUser.local.answer = answer;

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
                return done(null, false, req.send("no user find"));

            if(!user.validPassword(password))
                return done(null, false, req.send("wrong password"));

            return done(null, user);
        })
    }))
}