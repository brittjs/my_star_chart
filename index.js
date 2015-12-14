var koa = require('koa'),
    path = require('path'),
    views = require('koa-views'), 
    config = require('config'),
    serve = require('koa-static'),
    koaPg = require('koa-pg');

var app = module.exports = koa();

// initialize koa-views
// app.use(views(config.template.path, config.template.options));

//intialize koa-static
app.use(serve('./app/public'));

//intialize database
app.use(koaPg('postgres://okay:Am9406209b@localhost:5432/bookstore'));

//pulls in routers
require('./app/routes')(app);

var render = require('koa-ejs');

render(app, {
  root: path.join('./app/views'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

if (!module.parent) app.listen(3000);