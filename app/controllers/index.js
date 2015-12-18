var db = require('../models/index.js');

module.exports = {


  errorHandler: function* (next) {
    // we catch all downstream errors here
    try {
      yield next;
    } catch (err) {
      console.log('err');
      console.log(err);
      // set response status
      this.status = 500;
      // set response body
      this.body = 'internal server error';
      // can emit on app for log
      // this.app.emit('error', err, this);
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
		yield this.render('user.html');
		yield next;
	},

  star: function* star(next) {
    yield this.render('star.html');
    yield next;
  },

};




