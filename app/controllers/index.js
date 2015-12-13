module.exports = {
	index: function *index(next) {
		this.body = "Welcome to koajs-starter";
	},
	
	view: function *index(next) {
		yield this.render('index.ect', {
			title: 'Render view template'
		});
		yield next;
	},

	kitten: function *index() {
		// this.body = "kittens";
	this.render('user.ejs');

	},
	
	test: function *(next, id) {
		this.body = "Get param from controller : "+this.params.id;
	}
};


// var render = require('koa-ejs');

// render(app, {
//   root: path.join(__dirname, 'view'),
//   layout: 'template',
//   viewExt: 'html',
//   cache: false,
//   debug: true
// });