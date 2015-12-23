"use strict"

var db = require('../models/index.js');

const passport = require('koa-passport'),
    GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: 'b4dc1bef40b637ccf7d9',
    clientSecret: '003a6c2bb6ef141dc2fd9497ba12baf04c818f61',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //Based on profile return from Github, find existing user
    let user = profile;

    console.log('function in auth/auth.ßjs');
    console.log('user');
    console.log(user);


    // see if this user.id is already in the table
    // ... if not insert row into User table

    db.sequelize.models.User
      .findOrCreate({where: { username: user.username, githubId: user.id } })
      .then(function(logginginUser) {
         console.log('in auth/auth.js findOrCreate user succeeded');
         console.log('logginginUser');
         console.log(logginginUser);
      })
      .catch(function(error) {
                            console.log('in auth/auth.js findOrCreate user failed');
                            console.log('error');
                            console.log(error);
                         });

    //Return user model
    return done(null, user);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
