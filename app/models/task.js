'use strict';
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 50],
          msg: "Your description must be between 5 and 50 characters in length."
        }
      }
    },
    due_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    recurring: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    postponed: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    priority: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Task.belongsTo(models.User); // Will add a UserId attribute to Task to hold the primary key value for User
        Task.hasMany(models.Star, { foreignKey: 'TaskId' });
      }
    }
  });
  return Task;
};
// User.hasMany(Picture)
// User.belongsTo(Picture, { as: 'ProfilePicture', constraints: false })

