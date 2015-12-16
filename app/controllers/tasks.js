var db = require('../models/index.js');

module.exports = {

  // GET    /users/2/tasks   - Retrieves list of tasks for user #2
  // GET    /users/2/tasks/8 - Retrieves task #8 for user #2
  // POST   /users/2/tasks   - Creates a new task in user #2
  // PUT    /users/2/tasks/8 - Updates task #8 for user #2
  // DELETE /users/2/tasks/8 - Deletes task #8 for user #2

  // router
  //   .get('/users/:userId/tasks',         tasksCtrl.getListOfTasksForUser)
  //   .get('/users/:userId/tasks/:taskId', tasksCtrl.getTaskforUser)
  //   .post('/users/:userId/tasks',        tasksCtrl.createTask)
  //   .put('/users/:userId/tasks/:taskId', tasksCtrl.updateTask)
  //   .del('/users/:userId/tasks/:taskId', tasksCtrl.removeTask);

  // -------------------------------------------------------------
  //
  //     get list of tasks for user
  //
  // -------------------------------------------------------------
  getListOfTasksForUser: function* getListOfTasksForUser(next) {
    console.log('GET    /users/2/tasks');
    console.log('this.state.user');
    console.log(this.state.user);

    //  need to fix associations before this can be uncommented

    //this.body = yield this.state.user.tasks.findAll();
    yield next;
  },

  // -------------------------------------------------------------
  //
  //     get Task for user
  //
  // -------------------------------------------------------------
  getTaskforUser: function *getTaskforUser(next) {
    console.log('GET    /users/2/tasks/8');
    this.body = this.state.task.dataValues;
    yield next;
  },

  // -------------------------------------------------------------
  //
  //     create task for user
  //
  // -------------------------------------------------------------
  createTask: function *createTask(next) {
    console.log('POST   /users/2/tasks');

    // var Task = sequelize.define('Task', {
    //   user_id: DataTypes.INTEGER,
    //   description: DataTypes.STRING,
    //   due_date: DataTypes.STRING,
    //   recurring: DataTypes.BOOLEAN,
    //   completed: DataTypes.BOOLEAN,
    //   postponed: DataTypes.BOOLEAN,
    //   priority: DataTypes.INTEGER
    // }, {

    var newTask = yield db.sequelize.models.Task.create({description: "Test description",
                                               due_date: Date.now(),
                                               recurring: false,
                                               completed: false,
                                               postponed: false,
                                               priority:  1,
                                               user_id:   1 });

     console.log('newTask');
     console.log(newTask);

     this.body = newTask.dataValues;

    yield next;
  },



  // -------------------------------------------------------------
  //
  //     update task for user
  //
  // -------------------------------------------------------------
  updateTask: function *updateTask(next) {
    console.log('PUT    /users/2/tasks/8');


    // Post.update({
    //   updatedAt: null,
    // }, {
    //   where: {
    //     deletedAt: {
    //       $ne: null
    //     }
    //   }
    // });

    console.log('this.state.taskId');
    console.log(this.state.taskId);

    var updatedTask = yield db.sequelize.models.Task.update({description: "Test description"},
                                                             {where: {
                                                                 id: this.state.taskId
                                                               }
                                                             });
    console.log('updatedTask');
    console.log(updatedTask[0]);

    this.body = updatedTask.dataValues;

    yield next;
  },

  // -------------------------------------------------------------
  //
  //     remove task for user
  //
  // -------------------------------------------------------------
  removeTask: function *removeTask(next) {
    console.log('DELETE /users/2/tasks/8');


    // Post.destroy({
    //   where: {
    //     status: 'inactive'
    //   }
    // });


    var deletedTask = yield db.sequelize.models.Task.destroy({where: {
                                                                 id: this.state.taskId
                                                               }
                                                             });

    console.log('deletedTask');
    console.log(deletedTask)
    yield next;
  }

};

