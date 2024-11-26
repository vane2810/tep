'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar los nuevos campos después de la columna id
    await queryInterface.addColumn('instructions', 'points_max', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: 'Puntos máximos para completar el juego',
      after: 'id', // Posición después de la columna 'id'
    });

    await queryInterface.addColumn('instructions', 'points_min', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: 'Puntos mínimos requeridos para aprobar',
      after: 'points_max', // Posición después de la columna 'id'
    });

    // Eliminar las columnas innecesarias
    await queryInterface.removeColumn('instructions', 'points');
    await queryInterface.removeColumn('instructions', 'instructions');
    await queryInterface.removeColumn('instructions', 'video_url');
  },

  down: async (queryInterface, Sequelize) => {
    // Restaurar las columnas eliminadas
    await queryInterface.addColumn('instructions', 'points', {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: 'Puntos del juego (ya no se usa)',
    });

    await queryInterface.addColumn('instructions', 'instructions', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Instrucciones del juego (ya no se usa)',
    });

    await queryInterface.addColumn('instructions', 'video_url', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'URL del video (ya no se usa)',
    });

    // Eliminar los nuevos campos
    await queryInterface.removeColumn('instructions', 'points_max');
    await queryInterface.removeColumn('instructions', 'points_min');
  },
};
