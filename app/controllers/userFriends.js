var db = require('../models/index.js');

module.exports = {

  // -------------------------------------------------------------
  //
  //     get list of friends for user
  //
  // -------------------------------------------------------------
  getAllFriendsForUser: function* getAllFriendsForUser(next) {

    user = this.state.user;

    var mappedUserFriends = [];
    var userFriends = yield db.sequelize.query("SELECT * FROM \"Users\" WHERE \"id\" in (SELECT \"Friend1Id\" FROM \"Friendships\" WHERE \"Friend2Id\"='" + user.id + "' UNION SELECT \"Friend2Id\" FROM \"Friendships\" WHERE \"Friend1Id\"='" + user.id +"')", { type: db.sequelize.QueryTypes.SELECT});

    if (!user) {
      console.log("The user with UserId = " + this.state.userId + " does not exist.");
      this.body = "The user with UserId = " + this.state.userId + " does not exist.";
    } else {

      // userFriends is an array of javascript objects

      // userFriends.forEach(function (userFriend) {
      //   mappedUserFriends.push( userFriend["username"]);
      // });

      //mappedUserFriends is now an array of usernames as double-quoted strings

      this.body = userFriends;
    }
  },  

  findUserByEmail: function * findUserByEmail(next) {  
    foundUser = yield db.sequelize.models.User.findOne ({
        where: {
          email: "ashleyfisher@gmail.com"
        }
      });
    console.log(foundUser);
    yield next;
  },  

    createFriendship: function *createFriendship(next) {

    // var friendship = this.request.body;

    // //  should be able to replace the statement below with this ....
    // var newFriendship = yield db.sequelize.models.Friend.create(friendship);

    // var newTask = yield db.sequelize.models.Friend.create({description: task.description,
    //                                              due_date: task.due_date,
    //                                              recurring: task.recurring,
    //                                              completed: task.completed,
    //                                              postponed: task.postponed,
    //                                              priority:  task.priority,
    //                                              FriendId:   this.state.userId});
     
    // this.body = newFriendship.dataValues;

    yield next;
  }
}