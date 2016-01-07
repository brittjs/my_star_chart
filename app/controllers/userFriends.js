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
    var foundUser = yield db.sequelize.models.User.findOne ({
        where: {
          email: this.state.emailaddress
        }
      });
    if (!foundUser) {
      this.body = {email: this.state.emailaddress}; 
    } else {
      this.body = foundUser;
    }
    yield next;
  },  

  createFriendship: function *createFriendship(next) {
    var friendship = this.request.body;
    var newFriendship = yield db.sequelize.models.Friendship.create(friendship);
    this.body = newFriendship;
    yield next;
  },

  removeFriendship: function *removeFriendship(next) {
    var deletedFriendship = yield db.sequelize.models.Friendship.destroy({
      where: {
        $or: [
          {
            Friend1Id: this.state.friendId,
            Friend2Id: this.state.userId
          },
          {
            Friend1Id: this.state.userId,
            Friend2Id: this.state.friendId
          }
        ]}
      });
    this.body = deletedFriendship;
    yield next;
  }
};