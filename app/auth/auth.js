"use strict"

var db = require('../models/index.js');


// =============================================================
//   so that user can register using their GitHub account
//   ... This is OAuth
// =============================================================

const passport = require('koa-passport'),
    GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: 'b4dc1bef40b637ccf7d9',
    clientSecret: '003a6c2bb6ef141dc2fd9497ba12baf04c818f61',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function findExistingUserBasedOnOAuthUser(accessToken, refreshToken, profile, done) {
    //Based on profile return from Github, find existing user
    let user = profile;

    console.log('function in auth/auth.ßjs');
    console.log('user');
    console.log(user);


    // see if this user.id is already in the table
    // ... if not insert row into User table

    console.log("in findExistingUserBasedOnOAuthUser");

    db.sequelize.models.User
      .findOrCreate({where: { githubId: user.id } })
      .then(function(logginginUser) {
         console.log('in auth/auth.js findOrCreate user succeeded');
         console.log('logginginUser');
         console.log(logginginUser);
         //Return user model
         //return done(null, logginginUser);
      })
      .catch(function(error) {
                            console.log('in auth/auth.js findOrCreate user failed');
                            console.log('error');
                            console.log(error);

                         });

    user.type = "github";

    //Return user model
    return done(null, user);
  })
);

// =============================================================
//   so that user can register with email and password (local)
//   ... without using github or any other website
// =============================================================
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done) {

  console.log("inside auth/auth.js  passport.use(new LocalStrategy .... ");
  console.log("username = " + username);
  console.log("password = " + password);
  // retrieve user ...
  var users = db.sequelize.models.User.findAll({
                             where: {
                                      email: username
                                    }
                            })
        .then(function(users) {
           console.log('in auth/auth.js Local findAll user succeeded');
           console.log('users');
           console.log(users);
           console.log("");

           if (users.length === 0) {
            // this is a new user,  insert user and password in database

            // ==========================================================

            var user1 = {};
            user1.email = username;
            user1.pwd = password;
            user1.username = username;

            var result = db.sequelize.models.User.create(user1)
                  .then(function(return_value) {
                     console.log('in auth/auth.js Local create user succeeded');
                     console.log('return_value');
                     console.log(return_value);
                     console.log("");

                     done(null, return_value.dataValues);
                  })
                  .catch(function(error) {
                      console.log('in auth/auth.js Local create user failed');
                      console.log('error');
                      console.log(error);
                      done(null, false);
                   });

            // ==========================================================

           } else {

             var user = users[0].dataValues;

             user.type = "local";

             console.log("user");
             console.log(user);
             console.log("");

             if (username === user.email && password === user.pwd) {
               console.log("email and password matched");
               done(null, user);
             } else {
               console.log("username and password did not match");
               //  how to return a message to the user ?
               done(null, false);
             }

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

