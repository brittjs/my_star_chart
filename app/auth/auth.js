"use strict";

var db = require('../models/index.js');


// =============================================================
//   so that user can register using their GitHub account
//   ... This is OAuth
// =============================================================

const passport = require('koa-passport'),
    GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function findExistingUserBasedOnOAuthUser(accessToken, refreshToken, profile, done) {
    //the code that was here is now in routes/index.js 

    let user = profile;

    user.type = "github";

    //Return user model
    return done(null, user);
  })
);

// =============================================================
//   so that user can login with username and password (local)
//   ... without using github or any other website
// =============================================================
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done) {
  // retrieve user ...
    var user = db.sequelize.models.User.findOne({
                             where: {
                                      username: username
                                    }
                            })
        .then(function(user) {

             var user = user.dataValues;

             user.type = "local";

             if (username === user.username && password === user.pwd) {
               console.log("email and password matched");
               done(null, user);
             } else {
               console.log("username and password did not match");
               //  how to return a message to the user ?
               done(null, false);
             }
      })
      .catch(function(error) {
                            console.log('in auth/auth.js Local findAll user failed');
                            console.log('error');
                            console.log(error);

                         });
    }));

// =============================================================

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;

