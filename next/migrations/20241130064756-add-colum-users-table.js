'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'lastname', {
      type: Sequelize.STRING,
      allowNull: true, 
      after: 'name' 
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'lastname');
  }
};
