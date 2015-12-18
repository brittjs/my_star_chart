'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" }
      },
      description: {
        defaultValue: "set goals",
        type: Sequelize.STRING
      },
      due_date: {
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE
      },
      recurring: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      completed: {
        defaultValue: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      postponed: {
        defaultValue: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      priority: {
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      createdAt: {
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,        
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Tasks');
  }
};


//  Player.belongsTo(Team); // Will add a TeamId attribute to Player to hold the primary key value for Team
