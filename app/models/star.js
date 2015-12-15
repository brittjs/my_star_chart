'use strict';
module.exports = function(sequelize, DataTypes) {
  var Star = sequelize.define('Star', {
    task_id: DataTypes.INTEGER,
    x_cord: DataTypes.INTEGER,
    y_cord: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Star;
};