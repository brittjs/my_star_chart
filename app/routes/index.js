var db     = require('../models/index.js');
var Router = require('koa-router');

module.exports = function(app, passport) {

  var indexCtrl       = require('../controllers/index'),
      userTasksCtrl   = require('../controllers/userTasks'),

      userStarsCtrl   = require('../controllers/userStars'),
      userTasksStarsCtrl = require('../controllers/userTasksStars');
      userFriendsCtrl   = require('../controllers/userFriends');

// routes

var router = new Router();

router.get('/', indexCtrl.user);

//following line - temporary route for testing stars
router.get('/star', indexCtrl.star);

router.get('/login', function* getLogin(next)
{
  yield this.render('login');
});

router.post('/login', passport.authenticate('local',
{
  successRedirect: '/user',
  failureRedirect: '/login'
}));


//      /auth/github – for authentication process.
//     /auth/github/callback – for callback after authentication process.

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  // passport.authenticate('github', {successRedirect: '/', failureRedirect: '/login'})

  //  successReturnToOrRedirect allow us to use url in this.session.returnTo so it is more dynamic
  //  and enable to redirect back where we came from instead of just '/'.

  // passport.authenticate('github', {successReturnToOrRedirect: '/', failureRedirect: '/login'})
  passport.authenticate('github', {successReturnToOrRedirect: '/custom_auth_callback', failureRedirect: '/login'})
);

router.get('/custom_auth_callback', function* (next) {

  //create user (formerly in auth/auth.js)

     console.log('inside routes/index.js  router.get(custom_auth_callback...)');

     console.log(this.session.passport.user.id);

     // this is doing nothing because the returned data from database is not saved anywhere
     yield db.sequelize.models.User
      .findOrCreate({where: { username: this.session.passport.user.username, githubId: this.session.passport.user.id } })
      .then(function(logginginUser) {
         console.log('in auth/auth.js findOrCreate user succeeded');
         console.log('logginginUser');
         console.log(logginginUser);

         // &&&

         //Return user model
         //return done(null, logginginUser);
      });
      // .catch(function(error) {
      //                       console.log('in auth/auth.js findOrCreate user failed');
      //                       console.log('error');
      //                       console.log(error);

      //                    });

  this.redirect('/');
});

router.get('/logout', function* (next) {
  console.log('inside router.get(logout.... )');
  this.logOut();
  this.redirect('/login');
  yield next;
});


// ======================================================
//  code to allow users to register locally on login page
//
// ======================================================

// router.post('/custom', function*(next) {
//   var ctx = this;
//   yield passport.authenticate('local', function*(err, user, info) {
//     if (err) throw err;
//     if (user === false) {
//       ctx.status = 401;
//       ctx.body = { success: false };
//     } else {
//       yield ctx.login(user);
//       ctx.body = { success: true };
//     }
//   }).call(this, next);
// });

// POST /login
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login'
  })
);

// =======================================================
	router
		.get('/user', indexCtrl.errorHandler, indexCtrl.user)

//Middleware: request logger
function *reqlogger(next){
  console.log('%s - %s %s',new Date().toISOString(), this.req.method, this.req.url);

  yield next;
}
app.use(reqlogger);

  // a user's task paths

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

  // GET    /users/12/stars   - Retrieves list of stars for user #12
  router
    .get('/users/:userId/stars',                  userStarsCtrl.getListOfStarsForUser);

  // a user's task's star paths

  // POST    /users/2/tasks/7/stars   - Creates a new star for user #2 and for task #7
  router
    .post('/users/:userId/tasks/:taskId/stars',   userTasksStarsCtrl.createStar);

  // GET     /users/2/tasks/7/stars   - Gets one star for user #2 and for task #7
  router
    .get('/users/:userId/tasks/:taskId/stars',   userTasksStarsCtrl.getOneStar);

  // a user's friend(ship) paths
  router
    .get('/users/:userId/friends',                userFriendsCtrl.getAllFriendsForUser)
    .get('/users/search/:emailAddress/',          userFriendsCtrl.findUserByEmail)
    .post('/users/:userId/friends',               userFriendsCtrl.createFriendship)
    .del('/users/:userId/friends/:friendId',      userFriendsCtrl.removeFriendship);


  router
    .param("userId", function*(userId, next)
    {
      if (userId) {
        console.log('routes/index.js get userId = ' + userId);
        this.state.user = yield db.sequelize.models.User.findById(userId);
        this.state.userId = userId;
        console.log('');
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

    .param("emailAddress", function*(emailAddress, next)
    {
      if (emailAddress) {
        console.log('your search term is' + emailAddress)
          yield foundUser = db.sequelize.models.User.findOne ({
              where: {
                email: emailAddress
              }
            });
          this.body = foundUser;
      }
    })

    .param("friendId", function*(friendId, next)
    {
      if (friendId) { 

      }
      yield next;
    });

//   // Require authentication for now
  app.use(function* (next)
  {
    console.log('authentication middleware');
    console.log('this.request.url');
    console.log(this.request.url);

    if(this.request.url === '/login' || this.request.url.match("^/auth/github"))
    {
      return yield next;
    }

    if (this.isAuthenticated())
    {
      yield next;
    }
    else
    {
      //console.log('is not authenticated');
      this.redirect('/login');
    }
  });

  app.use(indexCtrl.errorHandler);
  app.use(router.middleware());

};


