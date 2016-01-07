var db = require('../models/index.js');
var User = require('../models/user.js');

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
    //  must get userId into user.html here somehow !!

    console.log('controllers/index.js user()');
    console.log('this.session');
    console.log(this.session);

    console.log('this.session.passport.user.id');
    console.log(this.session.passport.user.id);

    // console.log('this');
    // console.log(this);

    // console.log('this.state');
    // console.log(this.state);    //   <=  {}

    this.session.passport.user.provider = this.session.passport.user.provider || 'local';

    //  This will not work if user logs with email and password (local)
    //  get userId from User table
    //
    if (this.session.passport.user.provider === 'github') {
      var users = yield db.sequelize.models.User.findAll({
                               where: {
                                        githubId: this.session.passport.user.id
                                      }
                              });
    } else {
      // local
      var users = yield db.sequelize.models.User.findAll({
                               where: {
                                        id: this.session.passport.user.id
                                      }
                              });

    }

    // console.log("users");
    // console.log(users);

    yield this.render('user.html', users[0].dataValues);

		yield next;
	},

  star: function* star(next) {
    yield this.render('star.html');
    yield next;
  },

};




