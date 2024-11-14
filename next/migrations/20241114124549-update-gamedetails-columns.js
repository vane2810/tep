'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cambiar el tipo de datos de `instructions` de JSON a TEXT
    await queryInterface.changeColumn('gamedetails', 'questions', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {

    // Revertir `instructions` de TEXT a JSON
    await queryInterface.changeColumn('gamedetails', 'questions', {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },
};
