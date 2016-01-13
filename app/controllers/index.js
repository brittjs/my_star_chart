var db = require('../models/index.js');
var User = require('../models/user.js');
var passport = require('../auth/auth.js');

module.exports = {


  errorHandler: function* (next) {
    // we catch all downstream errors here
    try {
      yield next;
    } catch (err) {
      console.log('err');
      console.log(err);

      if (err.name === "SequelizeValidationError") {
        // 400 Bad Request
        // "The server cannot or will not process the request due to something
        //  that is perceived to be a client error (e.g., malformed request syntax,
        // invalid request message framing, or deceptive request routing)."
        this.status = 400;
        this.body = err.message;
      } else {
        // 500 Internal Server Error
        // A generic error message, given when an unexpected condition
        //  was encountered and no more specific message is suitable.

        // set response status
        this.status = 500;
        // set response body
        this.body = err.message;
        // can emit on app for log
        // this.app.emit('error', err, this);
      }
      yield next;
    }
  },

  custom: function(ctx, next) {
    return passport.authenticate('local', function(user, info, status) {
      if (user === false) {
        ctx.status = 401;
        ctx.body = { success: false };
      } else {
        ctx.body = { success: true };
        return ctx.login(user);
      }
    })(ctx, next);
  },

	user: function* user(next) {

    console.log('controllers/index.js user()');
    console.log('this.session');
    console.log(this.session);

    console.log('this.session.passport.user.id');
    console.log(this.session.passport && this.session.passport.user && this.session.passport.user.id);

    this.session.passport.user.provider = this.session.passport.user.provider || 'local';


    if (this.session.passport.user.provider === 'github') {
      var user = yield db.sequelize.models.User.findOne({
                               where: {
                                        githubId: this.session.passport.user.id
                                      }
                              });
    } else if (this.session.passport.user.provider === 'twitter') {
      var user = yield db.sequelize.models.User.findOne({
                               where: {
                                        username: this.session.passport.user.username
                                      }
                              });
    } else {
      // local
      var user = yield db.sequelize.models.User.findOne({
                               where: {
                                        id: this.session.passport.user.id
                                      }
                              });

    }

    yield this.render('user.html', user.dataValues);

		yield next;
	},

  createUser: function *createUser(user) {
    yield db.sequelize.models.User.create(user)
  }

};




