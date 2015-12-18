var db     = require('../models/index.js');
var Router = require('koa-router');

module.exports = function(app, passport) {

// 	//var Router        = require('koa-router'),
//       //passport      = require('../auth/auth.js'),
//       //bodyParser    = require('koa-bodyparser'),
//   var fs              = require('fs');

  var indexCtrl       = require('../controllers/index'),
      userTasksCtrl   = require('../controllers/userTasks'),
      userStarsCtrl   = require('../controllers/userStars'),
      userTasksStarsCtrl = require('../controllers/userTasksStars');


// // do this to start
// // ...Authenticate with PassportJs and GitHub OAuth2 API
// // Load the auth.js file,
// // ...which itself is extended from koa-passport.
// // passport = require('../auth/auth.js');

// // Initialize passport.
// // app.use(passport.initialize());

// // sessions
// // var convert = require('koa-convert');
// // var session = require('koa-generic-session');
// // app.keys = 'your-session-secret';
// // app.use(function* (next) {convert(session());});


// // body parser
// var bodyParser = require('koa-bodyparser');
// app.use(bodyParser());

// // authentication



// // routes

var router = new Router();

router.get('/', function* getIndex(next)
{
  console.log(this.session);
  yield this.render('index');
});

router.get('/login', function* getLogin(next)
{
  yield this.render('login');
});

router.post('/login', passport.authenticate('local',
{
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  // passport.authenticate('github', {successRedirect: '/', failureRedirect: '/login'})

  //  successReturnToOrRedirect allow us to use url in this.session.returnTo so it is more dynamic
  //  and enable to redirect back where we came from instead of just '/'.

  passport.authenticate('github', {successReturnToOrRedirect: '/', failureRedirect: '/login'})
);



// // ==========================



// // ==========================

// //Middleware: request logger
function *reqlogger(next){
  console.log('%s - %s %s',new Date().toISOString(), this.req.method, this.req.url);
  yield next;
}
app.use(reqlogger);



//   router.get('/custom',         indexCtrl.custom);


//   router.get('/logout',        function(ctx) {
//                                           ctx.logout();
//                                           ctx.redirect('/');
//                                         });


//   // We will need to configure 2 paths in publicRouter:
//   //      /auth/github – for authentication process.
//   //     /auth/github/callback – for callback after authentication process.

//   // router.get('/auth/github', passport.authenticate('github', {scope: ['user','repo']}));



//   router
//     //.get('/',               indexCtrl.errorHandler, indexCtrl.index)
//     .get('/link/:id',       indexCtrl.errorHandler, function *(next) {
//       console.log('/link/'+this.params.id);
//       this.body = "Get value from params : "+ this.params.id;
//     })
//     .get('/view',           indexCtrl.errorHandler, indexCtrl.view)
//     // .get('/:userId', indexCtrl.errorHandler, indexCtrl.stardata)
//     .get('/stardata',       indexCtrl.errorHandler, indexCtrl.stardata);

//   // a user's tasks paths
//   //

//   // GET    /users/12/tasks   - Retrieves list of tasks for user #12
//   // GET    /users/12/tasks/5 - Retrieves task #5 for user #12
//   // POST   /users/12/tasks   - Creates a new task in user #12
//   // PUT    /users/12/tasks/5 - Updates task #5 for user #12
//   // DELETE /users/12/tasks/5 - Deletes task #5 for user #12

  router
    .get('/users/:userId/tasks',                  userTasksCtrl.getListOfTasksForUser)
    .get('/users/:userId/tasks/:taskId',          userTasksCtrl.getTaskforUser)
    .post('/users/:userId/tasks',                 userTasksCtrl.createTask)
    .put('/users/:userId/tasks/:taskId',          userTasksCtrl.updateTask)
    .del('/users/:userId/tasks/:taskId',          userTasksCtrl.removeTask);

//   // a user's star paths
//   //

//   // GET    /users/12/stars   - Retrieves list of stars for user #12
//   router
//     .get('/users/:userId/stars',                  userStarsCtrl.getListOfStarsForUser);


//   // a user's task's star paths
//   //

//   // POST    /users/2/tasks/7/stars   - Creates a new star for user #2 and for task #7
//   router
//     .post('/users/:userId/tasks/:taskId/stars',   userTasksStarsCtrl.createStar);



//   router
//     .param("userId", function*(userId, next)
//     {
//       // this.state.user = { foo: userId }
//       if (userId) {
//         console.log('routes/index.js get userId = ' + userId);
//         this.state.user = yield db.sequelize.models.User.findById(userId);
//         // this.state.user = yield db.sequelize.models.User.findAll({where: {id: userId},
//         //                                                           include: [{ model: db.sequelize.models.Task }]});
//         this.state.userId = userId;
//         console.log('');

//         // User.findAll({
//         //   where: ...,
//         //   include: [
//         //     { model: Picture }, // load all pictures
//         //     { model: Picture, as: 'ProfilePicture' }, // load the profile picture. Notice that the spelling must be the exact same as the one in the association
//         //   ]
//         // });
//       }
//       yield next;
//     })
//     .param("taskId", function*(taskId, next)
//     {
//       if (taskId) {
//         console.log('routes/index.js get taskId = ' + taskId);

//         this.state.task = yield db.sequelize.models.Task.findById(taskId);
//         this.state.taskId = taskId;
//         console.log('');
//       }
//       yield next;
//     });
//     // .param("task", function*(task, next)
//     // {
//     //  if (task) {
//     //    console.log('routes/index.js get task = ' + task.description);

//   //       this.state.taskDesc = task.description;
//   //       this.state.taskId = task.id;
//   //       console.log('');
//   //     }
//     //  yield next;
//     // });

//   // =====================================================
//   //
//   //  Secure Router - must come after public router above
//   //
//   // =====================================================

//   //Secures routes
//   // var securedRouter = new Router();

//   // //Middleware: authed
//   // // authed middleware to check request already authenticated.
//   // function *authed(next){

//   //   if (this.req.isAuthenticated()){
//   //     yield next;
//   //   } else {
//   //     //Set redirect path in session
//   //     this.session.returnTo = this.session.returnTo || this.req.url;
//   //     this.redirect('/auth/github');
//   //   }
//   // }

//   // securedRouter.get('/app', authed, function *(){

//   //   // this.req.user which is the user model returned

//   //   this.body = 'Secured Zone: koa-tutorial\n'
//   //        + JSON.stringify(this.req.user, null, '\t');
//   // });

//   // app.use(securedRouter.middleware());


//   // Require authentication for now
  app.use(function* (next)
  {
    if(this.request.url === '/login' || this.request.url.match("^/auth/github"))
    {
      return yield next;
    }

    if (this.isAuthenticated())
    {
      // console.log('is authenticated');
      yield next;
    }
    else
    {
      // console.log('is not authenticated');
      this.redirect('/login');
    }
  });

  app.use(router.middleware());

};


