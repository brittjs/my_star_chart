var db = require('../models/index.js');

module.exports = {

  getAllFriendsForUser: function* getAllFriendsForUser(next) {
    user = this.state.user;
    var mappedUserFriends = [];
    var userFriends = yield db.sequelize.query("SELECT * FROM \"Users\" WHERE \"id\" in (SELECT \"Friend1Id\" FROM \"Friendships\" WHERE \"Friend2Id\"='" + user.id + "' UNION SELECT \"Friend2Id\" FROM \"Friendships\" WHERE \"Friend1Id\"='" + user.id +"')", { type: db.sequelize.QueryTypes.SELECT});

    if (!user) {
      console.log("The user with UserId = " + this.state.userId + " does not exist.");
      this.body = "The user with UserId = " + this.state.userId + " does not exist.";
    } else {
      this.body = userFriends;
    }
  },  

  findUserByEmail: function * findUserByEmail(next) {  
    // foundUser = db.sequelize.models.User.findOne ({
    //     where: {
    //       email: emailAddress
    //     }
    //   });
    // this.body = yield foundUser;
    yield next;
  },  

  createFriendship: function *createFriendship(next) {
    var friendship = this.request.body;
    var newFriendship = yield db.sequelize.models.Friendship.create(friendship);
    this.body = newFriendship
    yield next;
  }
}