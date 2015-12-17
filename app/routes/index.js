var db = require('../models/index.js');

module.exports = function(app) {

	var Router        = require('koa-router'),
      bodyParser    = require('koa-bodyparser'),
  		indexCtrl       = require('../controllers/index'),
  		userTasksCtrl   = require('../controllers/userTasks'),
      userStarsCtrl   = require('../controllers/userStars'),
      userTasksStarsCtrl = require('../controllers/userTasksStars');

	var router = new Router();


// ==========================



// ==========================

  app.use(bodyParser());
  app.use(router.middleware());

  router
    .get('/login',          indexCtrl.errorHandler, indexCtrl.login);

  // We will need to configure 2 paths in publicRouter:
  //      /auth/github – for authentication process.
  //     /auth/github/callback – for callback after authentication process.

  router.get('/auth/github', passport.authenticate('github', {scope: ['user','repo']}));

  router.get('/auth/github/callback',
    passport.authenticate('github', {successRedirect: '/', failureRedirect: '/'})
  );


	router
		.get('/',               indexCtrl.errorHandler, indexCtrl.index)
		.get('/link/:id',       indexCtrl.errorHandler, function *(next) {
			console.log('/link/'+this.params.id);
			this.body = "Get value from params : "+ this.params.id;
		})
		.get('/view',           indexCtrl.errorHandler, indexCtrl.view)
		// .get('/:userId', indexCtrl.errorHandler, indexCtrl.stardata)
		.get('/stardata',       indexCtrl.errorHandler, indexCtrl.stardata);

	// a user's tasks paths
	//

	// GET    /users/12/tasks   - Retrieves list of tasks for user #12
	// GET    /users/12/tasks/5 - Retrieves task #5 for user #12
	// POST   /users/12/tasks   - Creates a new task in user #12
	// PUT    /users/12/tasks/5 - Updates task #5 for user #12
	// DELETE /users/12/tasks/5 - Deletes task #5 for user #12

  router
    .get('/users/:userId/tasks',                  userTasksCtrl.getListOfTasksForUser)
    .get('/users/:userId/tasks/:taskId',          userTasksCtrl.getTaskforUser)
    .post('/users/:userId/tasks',                 userTasksCtrl.createTask)
    .put('/users/:userId/tasks/:taskId',          userTasksCtrl.updateTask)
    .del('/users/:userId/tasks/:taskId',          userTasksCtrl.removeTask);

  // a user's star paths
  //

  // GET    /users/12/stars   - Retrieves list of stars for user #12
  router
    .get('/users/:userId/stars',                  userStarsCtrl.getListOfStarsForUser);


  // a user's task's star paths
  //

  // POST    /users/2/tasks/7/stars   - Creates a new star for user #2 and for task #7
  router
    .post('/users/:userId/tasks/:taskId/stars',   userTasksStarsCtrl.createStar);



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
		});
		// .param("task", function*(task, next)
		// {
		// 	if (task) {
		// 		console.log('routes/index.js get task = ' + task.description);

  //       this.state.taskDesc = task.description;
  //       this.state.taskId = task.id;
  //       console.log('');
  //     }
		// 	yield next;
		// });




};


