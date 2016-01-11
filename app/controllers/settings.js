var db = require('../models/index.js');
var User = require('../models/user.js');

module.exports = {

  settings: function* settings(next) {

    this.session.passport.user.provider = this.session.passport.user.provider || 'local';

    if (this.session.passport.user.provider === 'github') {
      var users = yield db.sequelize.models.User.findAll({
                               where: {
                                        githubId: this.session.passport.user.id
                                      }
                              });
    } else {

      var users = yield db.sequelize.models.User.findAll({
                               where: {
                                        id: this.session.passport.user.id
                                      }
                              });

    }

    yield this.render('settings.html', users[0].dataValues);

    yield next;

  }

};


