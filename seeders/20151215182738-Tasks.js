'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   console.log('hello')
   return [
    queryInterface.bulkInsert('Tasks', [
      { user_id: 1, description: 'A non recurring task', recurring: false, completed: false, postponed: false},
      { user_id: 1, description: 'A recurring task', recurring: true, completed: false, postponed: false},
      { user_id: 1, description: 'A completed non recurring task', recurring: false, completed: true, postponed: false},
      { user_id: 1, description: 'A completed recurring task', recurring: true, completed: true, postponed: false},

      { user_id: 2, description: 'Walk the dog', recurring: false, completed: false, postponed: false},
      { user_id: 2, description: 'Eat a veggie', recurring: true, completed: false, postponed: false},
      { user_id: 2, description: 'Floss', recurring: false, completed: true, postponed: false},
      { user_id: 2, description: 'Do six push-ups', recurring: true, completed: true, postponed: false},

      { user_id: 3, description: 'Watch TV', recurring: false, completed: false, postponed: false},
      { user_id: 3, description: 'Do laundry', recurring: true, completed: false, postponed: false},
      { user_id: 3, description: 'Phone mom', recurring: false, completed: true, postponed: false},
      { user_id: 3, description: 'Ride bike', recurring: true, completed: true, postponed: false},

      { user_id: 4, description: 'Make a salad', recurring: false, completed: false, postponed: false},
      { user_id: 4, description: 'Make dentist appointment', recurring: true, completed: false, postponed: false},
      { user_id: 4, description: 'Floss', recurring: false, completed: true, postponed: false},
      { user_id: 4, description: 'Feed cats', recurring: true, completed: true, postponed: false},

      { user_id: 5, description: 'Get massage', recurring: false, completed: false, postponed: false},
      { user_id: 5, description: 'Bake cookies', recurring: true, completed: false, postponed: false},
      { user_id: 5, description: 'Take a shower', recurring: false, completed: true, postponed: false},
      { user_id: 5, description: 'Wash the dishes', recurring: true, completed: true, postponed: false}
    ])
  ];
  console.log('bye')
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
