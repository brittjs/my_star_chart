var koa = require('koa'),
    path = require('path'),
    // views = require('koa-views'), 
    config = require('config'),
    serve = require('koa-static'),
    koaPg = require('koa-pg');

var app = module.exports = koa();

//intialize koa-static
app.use(serve(config.publicfiles.path));

//intialize database 
app.use(koaPg(config.database.path));

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

//creates and connects to postgres
var Sequelize = require('sequelize')
  , sequelize = new Sequelize('starchart', 'okay', 'P@ssw0rd', {
      dialect: 'postgres',
      port:    5432
    });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

if (!module.parent) app.listen(3000);