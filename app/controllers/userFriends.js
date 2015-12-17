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
      console.log(userFriends);

      userFriends.forEach(function (userFriend) {
        mappedUserFriends.push( userFriend["username"]);
      });

      //mappedUserFriends is now an array of usernames as double-quoted strings

      this.body = mappedUserFriends;
    }
  }
}