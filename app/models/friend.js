'use strict';
module.exports = function(sequelize, DataTypes) {
  var Friend = sequelize.define('Friend', {
    Friend1Id: DataTypes.INTEGER,
    Friend2Id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Friend;
};