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
	},

	view: function *index(next) {
		yield this.render('template');
		yield next;
	},

	stardata: function *index(next) {
    var result = yield this.pg.db.client.query_("SELECT * FROM users");
    this.body = result.rows;
    yield next;
	}


};


