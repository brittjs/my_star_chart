'use strict';
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      field: 'username',
      allowNull: false,
      unique: true
    },
    pwd: {
      type: Sequelize.STRING,
      field: 'pwd',
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [8, 20],
          msg: "Your password must be between 8 and 20 characters in length."
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      field: 'email',
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [6, 100],
          msg: "You email address must be between 6 and 100 characters in length."
        }
      },
      isEmail: {
        msg: "Must be a valid email address."
      }
    },
    githubId: {
      type: Sequelize.STRING,
      field: 'githubId',
      allowNull: true,
      unique: true
    },

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Task, {foreignKey: 'UserId' });
        User.hasMany(models.Star, {foreignKey: 'UserId' });
      }
    }
  });
  return User;
};
