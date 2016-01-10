'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(-8,0,0,0);
  yesterday = yesterday+" 00:00:00.000 -08:00";

   return [
    queryInterface.bulkInsert('Tasks', [
      { UserId: 1, description: 'A non recurring task', due_date: yesterday, recurring: false, completed: false, postponed: false},
      { UserId: 1, description: 'A recurring task', due_date: yesterday, recurring: true, completed: false, postponed: false},
      { UserId: 1, description: 'A completed non recurring task', due_date: yesterday, recurring: false, completed: true, postponed: false},
      { UserId: 1, description: 'A completed recurring task', due_date: yesterday, recurring: true, completed: true, postponed: false},

      // { UserId: 2, description: 'Walk the dog', recurring: false, completed: false, postponed: false},
      // { UserId: 2, description: 'Eat a veggie', recurring: true, completed: false, postponed: false},
      // { UserId: 2, description: 'Floss', recurring: false, completed: true, postponed: false},
      // { UserId: 2, description: 'Do six push-ups', recurring: true, completed: true, postponed: false},

      // { UserId: 3, description: 'Watch TV', recurring: false, completed: false, postponed: false},
      // { UserId: 3, description: 'Do laundry', recurring: true, completed: false, postponed: false},
      // { UserId: 3, description: 'Phone mom', recurring: false, completed: true, postponed: false},
      // { UserId: 3, description: 'Ride bike', recurring: true, completed: true, postponed: false},

      // { UserId: 4, description: 'Make a salad', recurring: false, completed: false, postponed: false},
      // { UserId: 4, description: 'Make dentist appointment', recurring: true, completed: false, postponed: false},
      // { UserId: 4, description: 'Floss', recurring: false, completed: true, postponed: false},
      // { UserId: 4, description: 'Feed cats', recurring: true, completed: true, postponed: false},

      // { UserId: 5, description: 'Get massage', recurring: false, completed: false, postponed: false},
      // { UserId: 5, description: 'Bake cookies', recurring: true, completed: false, postponed: false},
      // { UserId: 5, description: 'Take a shower', recurring: false, completed: true, postponed: false},
      // { UserId: 5, description: 'Wash the dishes', recurring: true, completed: true, postponed: false},

      // { UserId: 2, description: 'Push to github', recurring: false, completed: true, postponed: false},
      // { UserId: 2, description: 'Wash the dishes', recurring: true, completed: true, postponed: false},
      // { UserId: 2, description: 'See stars', recurring: false, completed: true, postponed: false},
      // { UserId: 2, description: 'Walk outside', recurring: true, completed: true, postponed: false},

      // { UserId: 1, description: 'Awesome thing', recurring: false, completed: true, postponed: false},
      // { UserId: 1, description: 'Make friends', recurring: true, completed: true, postponed: false},
      // { UserId: 1, description: 'Hurray for stars', recurring: true, completed: true, postponed: false},
      { UserId: 1, description: 'A postponed task', due_date: yesterday, postponed: true, recurring: false, completed: false, postponed: false},
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
