var koa = require('koa'),
    path = require('path'),
    // views = require('koa-views'),
    config = require('config'),
    serve = require('koa-static'),
    koaPg = require('koa-pg');

var app = module.exports = koa();

//configs are coming from config/default.js

//intialize koa-static
app.use(serve(config.publicfiles.path));

// do this to start
// ...Authenticate with PassportJs and GitHub OAuth2 API
// Load the auth.js file,
// ...which itself is extended from koa-passport.
passport = require('./auth');

// Initialize passport.
app.use(passport.initialize());


//pulls in routers
require('./app/routes')(app);

//intialize koa-ejs
var render = require('koa-ejs');

render(app, {
  root: path.join(config.template.path),
  layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

if (!module.parent) app.listen(3000);
