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
    console.log(db);
	},

	view: function *index(next) {
		yield this.render('template');
		yield next;
	},

	stardata: function *index(next) {
    this.body = yield db.sequelize.models.User.findAll();
    console.log(this.state);
    // this.body = this.state.user;
    yield next;
	},

  sqlcmdstardata: function *index(next) {
    this.users = yield user.all();
    console.log('something happened');
    yield next;
  }


};


