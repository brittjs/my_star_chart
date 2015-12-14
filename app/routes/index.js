module.exports = function(app) {
	var Router 		= require('koa-router'),
		indexCtrl 	= require('../controllers/index');

	var router = new Router();

	router
		.get('/', indexCtrl.errorHandler, indexCtrl.index)
		.get('/link/:id',  indexCtrl.errorHandler, function *(next) {
			console.log('/link/'+this.params.id);
			this.body = "Get value from params : "+ this.params.id;
		})
		.get('/view', indexCtrl.errorHandler, indexCtrl.view)
		.get('/bookstore', indexCtrl.errorHandler, indexCtrl.bookstore);

	app.use(router.middleware());
};


