var db     = require('../models/index.js');
var Router = require('koa-router');

module.exports = function(app, passport) {

  var indexCtrl       = require('../controllers/index'),
      userTasksCtrl   = require('../controllers/userTasks'),

      userStarsCtrl   = require('../controllers/userStars'),
      userTasksStarsCtrl = require('../controllers/userTasksStars');
      userFriendsCtrl   = require('../controllers/userFriends');
      settingsCtrl    = require('../controllers/settings');


// routes

var router = new Router();

router.get('/', indexCtrl.user);

router.get('/login', function* getLogin(next)
{
  yield this.render('login');
});

router.post('/login', passport.authenticate('local',
{
  successRedirect: '/user',
  failureRedirect: '/login'
}));

router
  .get('/auth/twitter', 
    passport.authenticate('twitter'))
  .get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/user',
                                     failureRedirect: '/login' }));



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

     yield db.sequelize.models.User
      .findOrCreate({where: { username: this.session.passport.user.username, githubId: this.session.passport.user.id } })
      .then(function(logginginUser) {
         console.log('in auth/auth.js findOrCreate user succeeded');
         console.log('logginginUser');
         console.log(logginginUser);
      })
      .catch(function(error) {
                            console.log('in auth/auth.js findOrCreate user failed');
                            console.log('error');
                            console.log(error);

                         });

  this.redirect('/');
});

router.get('/settings', settingsCtrl.settings);

router.get('/logout', function* (next) {
  console.log('inside router.get(logout.... )');
  this.logOut();
  this.redirect('/login');
  yield next;
});

// =======================================================
	router
		.get('/user', indexCtrl.errorHandler, indexCtrl.user);

//Middleware: request logger
function *reqlogger(next){
  console.log('%s - %s %s',new Date().toISOString(), this.req.method, this.req.url);

  yield next;
}
app.use(reqlogger);

  router
    .post('/users/new',                           indexCtrl.createUser);

  // a user's task paths
  router
    .get('/users/:userId/tasks',                  userTasksCtrl.getListOfTasksForUser)
    .get('/users/:userId/old/tasks',              userTasksCtrl.getListOfOldTasksForUser)
    .get('/users/:userId/tasks/:taskId',          userTasksCtrl.getTaskforUser)
    .post('/users/:userId/tasks',                 userTasksCtrl.createTask)
    .put('/users/:userId/tasks/:taskId',          userTasksCtrl.updateTask)
    .del('/users/:userId/tasks/:taskId',          userTasksCtrl.removeTask);


  // a user's star paths
  router
    .get('/users/:userId/stars',                  userStarsCtrl.getListOfStarsForUser);

  // a user's task's star paths
  router
    .post('/users/:userId/tasks/:taskId/stars',   userTasksStarsCtrl.createStar)
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
        this.state.emailaddress = emailAddress;
      }
      yield next;
    })

    .param("friendId", function*(friendId, next)
    {
      if (friendId) { 
        this.state.friendId = friendId;
      }
      yield next;
    });

//   // Require authentication for now
  app.use(function* (next)
  {
    console.log('authentication middleware');
    console.log('this.request.url');
    console.log(this.request.url);

    if(this.request.url === '/login' || this.request.url.match("^/auth/github") || this.request.url.match("^/auth/twitter"))
    {
      return yield next;
    }

    if (this.isAuthenticated())
    {
      yield next;
    }
    else if (this.request.url === '/users/new')
    {
      var newUser = this.request.body;
      yield indexCtrl.createUser(newUser);
    }
    else 
    {
      console.log('is not authenticated, going back to login screen');
      this.redirect ('/login');
    }
  });

  app.use(indexCtrl.errorHandler);
  app.use(router.middleware());

};


