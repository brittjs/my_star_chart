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

	index: function* (next) {
		this.body = "Hello World";

    // if user is not logged in, display login page

    // console.log(db);
	},

	view: function *view(next) {
		yield this.render('template');
		yield next;
	},

	stardata: function *stardata(next) {
    this.body = yield db.sequelize.models.Task.findById(1);
    console.log(this.state);
    // this.body = this.state.user;
    yield next;
	},

  login:  function *login(next) {

    // check users email address is in database
    // encrypt password and compare to encrypted password in database
    // pass cookie back to browser

    yield next;
  }
};


