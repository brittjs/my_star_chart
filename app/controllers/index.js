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
		yield this.render('index');
    yield next;
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


