//  this needs to be fixed later
//  commented out for production migration
//require('./env.js');

var koa = require('koa'),
    path = require('path'),
    config = require('config'),
    serve = require('koa-static'),
    koaPg = require('koa-pg'),
    session = require('koa-session'),
    bodyParser = require('koa-body-parser')
    ;
var passport = require('./app/auth/auth.js');

var app = module.exports = koa();

app.keys = ['ZeJSnGjgmDpJKzue5t3xSrWA','y5CZ4NrKbVP6ARgdmYNsFxKV'];
app.use(session(app));

app.use(bodyParser());
//configs are coming from config/default.js

app.use(passport.initialize());
app.use(passport.session());

//intialize koa-static
app.use(serve(config.publicfiles.path));

//pulls in routers
require('./app/routes')(app, passport);

//intialize koa-ejs
var render = require('koa-ejs');

render(app, {
  root: path.join(config.template.path),
  // layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: true
});


var port       = process.env.PORT || 3000;

if (!module.parent) app.listen(port);
