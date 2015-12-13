var koa = require('koa'),
    path = require('path'),
    // views = require('koa-views'),
    

co = require('co'),
  views = require('co-views'),
 
    config = require('config'),
    serve = require('koa-static');

var app = module.exports = koa();

// initialize koa-views
//requires a generator function to use coviews
app.use(views(config.template.path, config.template.options));

//intialize koa-static
// app.use(serve(config.publicfiles.path, config.publicfiles.options));

require('./app/routes')(app);



var co = require('co');
var views = require('co-views');
 
var render = views(__dirname +'app/views', {
  map: { html: 'swig' }
});
 
var co = require('co');
var views = require('co-views');
 
var render = views('examples', {
  map: { html: 'swig' }
});
 
var tobi = {
  name: 'tobi',
  species: 'ferret'
};
 
var loki = {
  name: 'loki',
  species: 'ferret'
};
 
var luna = {
  name: 'luna',
  species: 'cat'
};
 
co(function *(){
  var a = render('user', { user: tobi });
  var b = render('user.jade', { user: loki });
  var c = render('user.ejs', { user: luna });
  var html = yield [a, b, c];
  html = html.join('');
  console.log(html);
});
 

if (!module.parent) app.listen(3000);


