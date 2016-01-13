var db = require('../models/index.js');

module.exports = {

  // -------------------------------------------------------------
  //
  //     get list of ALL tasks for reset stars function
  //
  // -------------------------------------------------------------
getAllTasksForUser: function* getAllTasksForUser(next) {

    if (!this.state.userId) {
      console.log("The user with UserId = " + this.state.userId + " does not exist.");
      this.body = "The user with UserId = " + this.state.userId + " does not exist.";
    } else {

      var user = this.state.user;
      
      var tasks = yield user.getTasks(); //gets all of user's tasks

      var mappedTasks = [];
      tasks.forEach(function (task) {
        mappedTasks.push( task["dataValues"]);
      });

      this.body = mappedTasks;
      yield next;
    }
  },

  // -------------------------------------------------------------
  //
  //     get list of today's tasks for user
  //
  // -------------------------------------------------------------
  getListOfTasksForUser: function* getListOfTasksForUser(next) {

    console.log("");
    console.log("inside controllers/userTasks getListOfTasksForUser()");
    console.log("");
    console.log('GET    /users/' + this.state.userId + '/today/tasks');

    console.log('this.state.userId');
    console.log(this.state.userId);

    if (!this.state.userId) {
      console.log("The user with UserId = " + this.state.userId + " does not exist.");
      this.body = "The user with UserId = " + this.state.userId + " does not exist.";
    } else {

      var user = this.state.user;

      var today = new Date();
      today.setHours(-8,0,0,0);

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(-8,0,0,0);

       // get tasks not completed and not postponed sorted in descending update order

       var tasks1 = yield db.sequelize.models.Task.findAll({
                                                            where: {
                                                                UserId: user.id,
                                                                completed: false,
                                                                postponed: false,
                                                                due_date: {
                                                                  $lt: tomorrow,
                                                                  $gt: today
                                                                }
                                                            },
                                                            order: [
                                                              ['updatedAt', 'DESC']
                                                            ]
                                                          });

        // console.log('tasks not completed and not postponed sorted in descending update order')

        var mappedTasks1 = [];

        tasks1.forEach(function (task) {
          mappedTasks1.push( task["dataValues"]);
        });

       // get tasks not completed and postponed sorted in descending update order

       var tasks2 = yield db.sequelize.models.Task.findAll({
                                                            where: {
                                                                UserId: user.id,
                                                                completed: false,
                                                                postponed: true,
                                                                due_date: {
                                                                  $lt: tomorrow,
                                                                  $gt: today
                                                                }
                                                            },
                                                            order: [
                                                              ['updatedAt', 'DESC']
                                                            ]
                                                          });

        // console.log('tasks not completed and postponed sorted in descending update order')

        var mappedTasks2 = [];

        tasks2.forEach(function (task) {
          mappedTasks2.push( task["dataValues"]);
        });


        // console.log(mappedTasks2);

       // get tasks completed sorted in descending update order

       var tasks3 = yield db.sequelize.models.Task.findAll({
                                                            where: {
                                                                UserId: user.id,
                                                                completed: true,
                                                                due_date: {
                                                                  $lt: tomorrow,
                                                                  $gt: today
                                                                }
                                                            },
                                                            order: [
                                                              ['updatedAt', 'DESC']
                                                            ]
                                                          });

        console.log('tasks completed sorted in descending update order')

        var mappedTasks3 = [];

        tasks3.forEach(function (task) {
          mappedTasks3.push( task["dataValues"]);
        });


        // console.log(mappedTasks3);

        var mappedTasks = mappedTasks1.concat(mappedTasks2, mappedTasks3);


      this.body = mappedTasks;

      yield next;
    }

  },

  // -------------------------------------------------------------
  //
  //     get list of yesterday's tasks for refresh function
  //
  // -------------------------------------------------------------
getListOfOldTasksForUser: function* getListOfOldTasksForUser(next) {

    if (!this.state.userId) {
      console.log("The user with UserId = " + this.state.userId + " does not exist.");
      this.body = "The user with UserId = " + this.state.userId + " does not exist.";
    } else {

      var user = this.state.user;

      var today = new Date();
      today.setHours(-8,0,0,0);

      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(-8,0,0,0);
      
      var tasks = yield db.sequelize.models.Task.findAll({
                                    where: {
                                        due_date: {
                                          $lt: today,
                                          $gt: yesterday
                                        }, 
                                        UserId: user.id
                                    }
                                  });  // gets you all tasks due yesterday

      var mappedTasks = [];
      tasks.forEach(function (task) {
        mappedTasks.push( task["dataValues"]);
      });

      this.body = mappedTasks;
      yield next;
    }
  },

  // -------------------------------------------------------------
  //
  //     get Task for user
  //
  // -------------------------------------------------------------
  getTaskforUser: function *getTaskforUser(next) {
    this.body = this.state.task.dataValues;
    yield next;
  },

  // -------------------------------------------------------------
  //
  //     create task for user
  //
  // -------------------------------------------------------------
  createTask: function *createTask(next) {

    var task = this.request.body;

    var newTask = yield db.sequelize.models.Task.create(task);

    this.body = newTask.dataValues;

    yield next;
  },



  // -------------------------------------------------------------
  //
  //     update task for user
  //
  // -------------------------------------------------------------
  updateTask: function *updateTask(next) {

    var task = this.request.body;


    if (task == {} ) {
      console.log("No Task properties were passes to the server to update the Task with");
      this.body = "No Task properties were passes to the server to update the Task with";

    } else {

        console.log("");

    var updatedTask = yield db.sequelize.models.Task.update({description: task.description,
                                                             due_date:    task.due_date,
                                                             priority:    task.priority,
                                                             recurring:   task.recurring,
                                                             postponed:   task.postponed,
                                                             completed:   task.completed},
                                                             {where: {
                                                                 id: task.id
                                                               }
                                                             });

    var updatedTask = yield db.sequelize.models.Task.update(task,
                                                             {where: {
                                                                 id: this.request.body.id
                                                               }
                                                             });
        this.body = updatedTask[0];

        yield next;

      }
                                                                                                                                              },

  // -------------------------------------------------------------
  //
  //     remove task for user -  Brittany also has code for this
  //
  // -------------------------------------------------------------
  removeTask: function *removeTask(next) {

    if (!this.state.taskId) {
      console.log("No Task Id was passes to the server to delete the Task with");
      this.body = "No Task Id was passes to the server to delete the Task with";
    } else {

        // must remove Stars associated with a Task before deleting the Task
        var deletedStars = yield db.sequelize.models.Star.destroy({where: {
                                                                     TaskId: this.state.taskId
                                                                   }
                                                                 });

        var deletedTask = yield db.sequelize.models.Task.destroy({where: {
                                                                     id: this.state.taskId
                                                                   }
                                                                 });

        //need to return something so that the client knows that the request was successful. Just returning the task and user id for now.
        this.body = {
          userId: this.state.userId,
          taskId: this.state.taskId
        };

        yield next;
    }
  }

};
