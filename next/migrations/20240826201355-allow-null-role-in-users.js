'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('estudiante', 'docente', 'padre'),
      allowNull: true, // Permitir NULL en el campo role
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('estudiante', 'docente', 'padre'),
      allowNull: false, // Revertir a NOT NULL si es necesario
    });
  }
};

