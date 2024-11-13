'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar la columna 'duration' a la tabla 'Steps'
    await queryInterface.addColumn('steps', 'aditional', {
      type: Sequelize.TEXT,
      allowNull: true, // Puedes ajustarlo según tus necesidades
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la columna 'duration' en caso de revertir la migración
    await queryInterface.removeColumn('steps', 'aditional');
  }
};
