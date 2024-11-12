/* Tabla de contenido */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,  // Cambiado a TEXT para permitir más caracteres
        allowNull: true
      },
      img_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      audio_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      aditional: {
        type: Sequelize.TEXT,  // Cambiado a TEXT para permitir más caracteres
        allowNull: true
      },
      subtopicId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subtopics',
          key: 'id'
        },
        onDelete: 'CASCADE', // Borra los contenidos si se elimina el subtema
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contents');
  }
};
