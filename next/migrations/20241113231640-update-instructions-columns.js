'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cambiar el tipo de datos de `points` de INTEGER a STRING
    await queryInterface.changeColumn('instructions', 'points', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Cambiar el tipo de datos de `instructions` de JSON a TEXT
    await queryInterface.changeColumn('instructions', 'instructions', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir `points` de STRING a INTEGER
    await queryInterface.changeColumn('instructions', 'points', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    // Revertir `instructions` de TEXT a JSON
    await queryInterface.changeColumn('instructions', 'instructions', {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },
};
