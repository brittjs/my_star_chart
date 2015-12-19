'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var randomX = getRandomInt(1, 100);
var randomY = getRandomInt(1, 100);

return [
    queryInterface.bulkInsert('Stars', [
      { TaskId: 3, UserId: 1, x_cord: 10, y_cord: 50},
      { TaskId: 4, UserId: 1, x_cord: 45, y_cord: 76},

      { TaskId: 7, UserId: 2, x_cord: 23, y_cord: 53},
      { TaskId: 8, UserId: 2, x_cord: 16, y_cord: 25},
      { TaskId: 21, UserId: 2, x_cord: 67, y_cord: 98},
      { TaskId: 22, UserId: 2, x_cord: 45, y_cord: 23},
      { TaskId: 23, UserId: 2, x_cord: 76, y_cord: 35},
      { TaskId: 24, UserId: 2, x_cord: 53, y_cord: 74},
      
      { TaskId: 11, UserId: 3, x_cord: 67, y_cord: 98},
      { TaskId: 12, UserId: 3, x_cord: 45, y_cord: 23},
      { TaskId: 15, UserId: 4, x_cord: 76, y_cord: 35},
      { TaskId: 16, UserId: 4, x_cord: 53, y_cord: 74},
      { TaskId: 19, UserId: 5, x_cord: 58, y_cord: 72},
      { TaskId: 20, UserId: 5, x_cord: 23, y_cord: 74},
    ])
  ];
  },

  /*TODO:
    write a loop to make co-ordinates actually random
    */

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
