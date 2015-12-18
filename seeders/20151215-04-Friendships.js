'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

return [
    queryInterface.bulkInsert('Friendships', [
      { Friend1Id: 1, Friend2Id: 2 },
      { Friend1Id: 1, Friend2Id: 3 },
      { Friend1Id: 4, Friend2Id: 1 },
      { Friend1Id: 5, Friend2Id: 1 },
      { Friend1Id: 2, Friend2Id: 3 },
      { Friend1Id: 2, Friend2Id: 4 },
      { Friend1Id: 5, Friend2Id: 2 },
      { Friend1Id: 3, Friend2Id: 4 },
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
