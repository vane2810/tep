'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar y añadir columna en una posición específica si no existe
    const tableDesc = await queryInterface.describeTable('gametypes');
    if (!tableDesc.required_data) {
      await queryInterface.addColumn('gametypes', 'required_data', {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: '[]',
        after: 'description', // Coloca la columna después de 'description'
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la columna si existía
    const tableDesc = await queryInterface.describeTable('gametypes');
    if (tableDesc.required_data) {
      await queryInterface.removeColumn('gametypes', 'required_data');
    }
  },
};
