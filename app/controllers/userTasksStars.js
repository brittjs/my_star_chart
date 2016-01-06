var db = require('../models/index.js');

module.exports = {

  // a user's task's star paths
  //

  // POST    /users/2/tasks/7/stars   - Creates a new star for user #2 and for task #7

  // -------------------------------------------------------------
  //
  //     create star for user
  //
  // -------------------------------------------------------------
  createStar: function *createStar(next) {
    console.log('POST   /users/' + this.state.userId + '/tasks/' + this.state.taskId + '/stars');


    // console.log('this.request');
    // console.log(this.request);

    console.log('this.request.body');
    console.log(this.request.body);

    var star = this.request.body;

    // createTable('Stars', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   TaskId: {
    //     type: Sequelize.INTEGER,
    //     references: { model: "Tasks", key: "id" }
    //   },
    //   UserId: {
    //     type: Sequelize.INTEGER,
    //     references: { model: "Users", key: "id" }
    //   },
    //   x_cord: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER
    //   },
    //   y_cord: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER
    //   },
    //   createdAt: {
    //     defaultValue: Sequelize.fn('NOW'),
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   },
    //   updatedAt: {
    //     defaultValue: Sequelize.fn('NOW'),
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   }
    // }


    var newStar = yield db.sequelize.models.Star.create(star);

     console.log('newStar');
     // console.log(newStar);

     this.body = newStar.dataValues;

    yield next;
  },

  // GET    /users/2/tasks/7/stars   - Gets a star for user #2 and for task #7

  // -------------------------------------------------------------
  //
  //     get a star for a task
  //
  // -------------------------------------------------------------
  getOneStar: function *getOneStar(next) {
    console.log('GET   /users/' + this.state.userId + '/tasks/' + this.state.taskId + '/stars');


    // console.log('this.request');
    // console.log(this.request);

    console.log('this.request.body');
    console.log(this.request.body);

    var stars = yield db.sequelize.models.Star.findAll({
                               where: {
                                        UserId: this.state.userId,
                                        TaskId: this.state.taskId
                                      }
                               });

    this.body = stars[0].dataValues;

    yield next;

  },

};


