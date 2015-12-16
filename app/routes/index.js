var db = require('../models/index.js');

module.exports = function(app) {
	var Router 		= require('koa-router'),
		indexCtrl 	= require('../controllers/index'),
		tasksCtrl   = require('../controllers/userTasks');

	var router = new Router();


	router
		.get('/', indexCtrl.errorHandler, indexCtrl.index)
		.get('/link/:id',  indexCtrl.errorHandler, function *(next) {
			console.log('/link/'+this.params.id);
			this.body = "Get value from params : "+ this.params.id;
		})
		.get('/view', indexCtrl.errorHandler, indexCtrl.view)
		// .get('/:userId', indexCtrl.errorHandler, indexCtrl.stardata)
		.get('/stardata', indexCtrl.errorHandler, indexCtrl.stardata)

	//   Examples
	//

	// GET    /users/12/tasks   - Retrieves list of tasks for user #12
	// GET    /users/12/tasks/5 - Retrieves task #5 for user #12
	// POST   /users/12/tasks   - Creates a new task in user #12
	// PUT    /users/12/tasks/5 - Updates task #5 for user #12
	// DELETE /users/12/tasks/5 - Deletes task #5 for user #12

  router
    .get('/users/:userId/tasks',         tasksCtrl.getListOfTasksForUser)
    .get('/users/:userId/tasks/:taskId', tasksCtrl.getTaskforUser)
    .post('/users/:userId/tasks',        tasksCtrl.createTask)
    .put('/users/:userId/tasks/:taskId', tasksCtrl.updateTask)
    .del('/users/:userId/tasks/:taskId', tasksCtrl.removeTask);



	router
		.param("userId", function*(userId, next)
		{
			// this.state.user = { foo: userId }
			if (userId) {
				console.log('routes/index.js get userId = ' + userId);
        this.state.user = yield db.sequelize.models.User.findById(userId);
        // this.state.user = yield db.sequelize.models.User.findAll({where: {id: userId},
        //                                                           include: [{ model: db.sequelize.models.Task }]});
        this.state.userId = userId;
        console.log('');

				// User.findAll({
        //   where: ...,
        //   include: [
        //     { model: Picture }, // load all pictures
        //     { model: Picture, as: 'ProfilePicture' }, // load the profile picture. Notice that the spelling must be the exact same as the one in the association
        //   ]
        // });
      }
      yield next;
		})
		.param("taskId", function*(taskId, next)
		{
			if (taskId) {
				console.log('routes/index.js get taskId = ' + taskId);

        this.state.task = yield db.sequelize.models.Task.findById(taskId);
        this.state.taskId = taskId;
        console.log('');
      }
			yield next;
		})
		.param("taskDesc", function*(taskDesc, next)
		{
			if (taskDesc) {
				console.log('routes/index.js get taskDesc = ' + taskDesc);

        this.state.taskDesc = taskDesc;
        console.log('');
      }
			yield next;
		})

	// app.use(indexCtrl.errorHandler);
	app.use(router.middleware());
};


