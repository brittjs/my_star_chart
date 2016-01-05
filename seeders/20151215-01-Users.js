'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

   return [
    queryInterface.bulkInsert('Users', [
      { username: "ashleyyy", pwd: '23456', email: 'ashleyfisher@gmail.com', githubId: '13425640' },
      { username: "StephanieBeaton", pwd: '12345', email: 'stephanybeaton@gmail.com', githubId: '8796670' },
      { username: "TannerEady", pwd: '34567', email: 'tanneready@shaw.ca' },
      { username: "genephoenix", pwd: '45678', email: 'lakshmikotteda@hotmail.com', githubId: '13411375' },
      { username: "brittjs", pwd: '56789', email: 'brittanyjsee@gmail.com', githubId: '13922751' }
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
