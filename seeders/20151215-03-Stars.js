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
      { TaskId: 3, UserId: 1, x_cord: randomX, y_cord: randomY},
      { TaskId: 4, UserId: 1, x_cord: randomX, y_cord: randomY},
      { TaskId: 7, UserId: 2, x_cord: randomX, y_cord: randomY},
      { TaskId: 8, UserId: 2, x_cord: randomX, y_cord: randomY},
      { TaskId: 11, UserId: 3, x_cord: randomX, y_cord: randomY},
      { TaskId: 12, UserId: 3, x_cord: randomX, y_cord: randomY},
      { TaskId: 15, UserId: 4, x_cord: randomX, y_cord: randomY},
      { TaskId: 16, UserId: 4, x_cord: randomX, y_cord: randomY},
      { TaskId: 19, UserId: 5, x_cord: randomX, y_cord: randomY},
      { TaskId: 20, UserId: 5, x_cord: randomX, y_cord: randomY}
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
