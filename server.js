var koa = require('koa'),
    path = require('path'),
    views = require('koa-views'), 
    config = require('config'),
    serve = require('koa-static'),
    koaPg = require('koa-pg');

var app = module.exports = koa();

//configs are coming from config/default.js

//intialize koa-views
app.use(views(config.template.path));

//intialize koa-static
app.use(serve(config.publicfiles.path));

//pulls in routers
require('./app/routes')(app);

//intialize koa-ejs
var render = require('koa-ejs');

render(app, {
  root: path.join(config.template.path),
  // layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

if (!module.parent) app.listen(3000);