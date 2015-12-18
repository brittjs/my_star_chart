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
    console.log('POST   /users/2/tasks/7/stars');


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


    // var newTask = yield db.sequelize.models.Star.create({description: task.description,
    //                                              due_date: task.due_date,
    //                                              recurring: task.recurring,
    //                                              completed: task.completed,
    //                                              postponed: task.postponed,
    //                                              priority:  task.priority,
    //                                              UserId:   task.UserId});

    var newStar = yield db.sequelize.models.Star.create({TaskId: this.state.taskId,
                                               UserId: this.state.userId,
                                               x_cord: star.x_cord,
                                               y_cord: star.y_cord});

     console.log('newStar');
     // console.log(newStar);

     this.body = newStar.dataValues;

    yield next;
  },

};

