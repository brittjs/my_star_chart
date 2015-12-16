'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   
   return [
    queryInterface.bulkInsert('Users', [
      { username: "Ashley", pwd: '12345', email: 'ashleyfisher@gmail.com'},
      { username: "Stephanie", pwd: '12345', email: 'stephanybeaton@gmail.com' },
      { username: "Tanner", pwd: '12345', email: 'tanneready@shaw.ca' },
      { username: "Lakshmi", pwd: '12345', email: 'lakshmikotteda@hotmail.com' },
      { username: "Brittany", pwd: '12345', email: 'brittanyjsee@gmail.com' }
    ])
  ];
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
