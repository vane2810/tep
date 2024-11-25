'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar las columnas innecesarias
    await queryInterface.removeColumn('gamedetails', 'gameTypeId');
    await queryInterface.removeColumn('gamedetails', 'json_url');

    // Agregar la columna 'config' de tipo JSON después de 'game_id'
    await queryInterface.addColumn('gamedetails', 'config', {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {}, // Definir un valor por defecto vacío
      after: 'game_id' // Colocar la columna después de 'game_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir los cambios realizados en la función 'up'

    // Agregar las columnas eliminadas
    await queryInterface.addColumn('gamedetails', 'gameTypeId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('gamedetails', 'json_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Eliminar la columna 'config'
    await queryInterface.removeColumn('gamedetails', 'config');
  },
};
