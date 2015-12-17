"use strict"


const passport = require('koa-passport'),
    GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: b4dc1bef40b637ccf7d9,
    clientSecret: 003a6c2bb6ef141dc2fd9497ba12baf04c818f61,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //Based on profile return from Github, find existing user
    let user = profile;

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
