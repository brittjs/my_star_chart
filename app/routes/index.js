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
		.get('/stardata/:userId', indexCtrl.errorHandler, indexCtrl.stardata)
		.get('/createdtestuser', indexCtrl.sqlcmdstardata);

	router
		.param("userId", function*(userId, next)
		{
			this.state.user = { foo: userId }
			yield next;
		})

	// app.use(indexCtrl.errorHandler);
	app.use(router.middleware());
};


