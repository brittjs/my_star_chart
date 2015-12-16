'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    user_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    due_date: DataTypes.STRING,
    recurring: DataTypes.BOOLEAN,
    completed: DataTypes.BOOLEAN,
    postponed: DataTypes.BOOLEAN,
    priority: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Task;
};
