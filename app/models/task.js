'use strict';
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
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
      }
    }
  });
  return Task;
};