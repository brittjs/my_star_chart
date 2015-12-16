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
      { task_id: 3, x_cord: randomX, y_cord: randomY},
      { task_id: 4, x_cord: randomX, y_cord: randomY},
      { task_id: 7, x_cord: randomX, y_cord: randomY},
      { task_id: 8, x_cord: randomX, y_cord: randomY},
      { task_id: 11, x_cord: randomX, y_cord: randomY},
      { task_id: 12, x_cord: randomX, y_cord: randomY},
      { task_id: 15, x_cord: randomX, y_cord: randomY},
      { task_id: 16, x_cord: randomX, y_cord: randomY},
      { task_id: 19, x_cord: randomX, y_cord: randomY},
      { task_id: 20, x_cord: randomX, y_cord: randomY}
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
