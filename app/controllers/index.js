module.exports = {

	index: function *index(next) {
		this.body = "Hello World";
	},
	
	view: function *index(next) {
		yield this.render('index.ect', {
			title: 'Render view template'
		});
		yield next;
	},
	
	bookstore: function *index(next) {
    var result = yield this.pg.db.client.query_("SELECT * FROM books");
    this.body = result.rows;
    yield next;
	}
};

