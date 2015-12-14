var koa = require('koa'),
    path = require('path'),
    // views = require('koa-views'), 
    config = require('config'),
    serve = require('koa-static'),
    koaPg = require('koa-pg');

var app = module.exports = koa();

//intialize koa-static
app.use(serve('./app/public'));

//intialize database (put your own database and password here)
app.use(koaPg('postgres://okay:P@ssw0rd@localhost:5432/bookstore'));

//pulls in routers
require('./app/routes')(app);

//intialize koa-ejs
var render = require('koa-ejs');

render(app, {
  root: path.join('./app/views'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

if (!module.parent) app.listen(3000);