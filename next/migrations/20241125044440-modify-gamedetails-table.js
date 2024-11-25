'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar las columnas 'gameTypeId' y 'json_url'
    await queryInterface.removeColumn('gamedetails', 'gameTypeId');
    await queryInterface.removeColumn('gamedetails', 'json_url');
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir eliminaciones añadiendo nuevamente las columnas 'gameTypeId' y 'json_url'
    await queryInterface.addColumn('gamedetails', 'gameTypeId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('gamedetails', 'json_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
