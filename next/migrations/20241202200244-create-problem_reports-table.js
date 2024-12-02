/* Tabla de reportes de problemas */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reports', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pendiente', 'en proceso', 'resuelto'),
        allowNull: false, // Debería ser obligatorio si el reporte siempre debe tener un estado
        defaultValue: 'pendiente' // Valor predeterminado 'pendiente' si no se especifica el estado
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Asegúrate de que 'Users' esté correctamente nombrada en plural
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE' // Esto elimina los reportes cuando el usuario asociado es eliminado
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
    await queryInterface.dropTable('reports');
  }
};
