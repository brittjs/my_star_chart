'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    pwd: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(Tasks, {foreignKey: 'UserId' });
        User.hasMany(Stars, {foreignKey: 'UserId' });
      }
    }
  });
  return User;
};
