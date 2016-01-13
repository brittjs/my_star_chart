"use strict";

var db = require('../models/index.js');


// =============================================================
//   so that user can register using their Twitter account
//   ... This is OAuth
// =============================================================

var twitterObject = {};

if (process.env.NODE_ENV === "production") {
  twitterObject = {
    consumerKey: process.env.PROD_TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.PROD_TWITTER_CONSUMER_SECRET,
    callbackURL: "https://my-star-chart.herokuapp.com/auth/twitter/callback"
  };
} else {
  twitterObject = {
    consumerKey: process.env.DEV_TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.DEV_TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  };
}
console.log('auth/auth.js twitter callback url = ' + twitterObject.callbackURL);


const passport = require('koa-passport'),
   TwitterStrategy = require('passport-twitter').Strategy;



passport.use(new TwitterStrategy(twitterObject,
  function(token, tokenSecret, profile, done) {
    console.log('inside Twitter oauth');
    console.log(profile);
    db.sequelize.models.User.findOrCreate({where:
        { username: profile.username },
    function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    }
  });
  }));

// =============================================================
//   so that user can register using their GitHub account
//   ... This is OAuth
// =============================================================

var githubObject = {};

if (process.env.NODE_ENV === "production") {
  githubObject = {
    clientID: process.env.PROD_GITHUB_CLIENT_ID,
    clientSecret: process.env.PROD_GITHUB_CLIENT_SECRET,
    callbackURL: "https://my-star-chart.herokuapp.com/auth/github/callback"
  };
} else {
  githubObject = {
    clientID: process.env.DEV_GITHUB_CLIENT_ID,
    clientSecret: process.env.DEV_GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  };
}
console.log('auth/auth.js github callback url = ' + githubObject.callbackURL);

const   GithubStrategy = require('passport-github').Strategy;



passport.use(new GithubStrategy(githubObject,
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

