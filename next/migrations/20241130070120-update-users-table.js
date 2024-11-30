'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('estudiante', 'docente', 'padre', 'admin'),
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('estudiante', 'docente', 'padre', 'admin'),
      allowNull: true
    });
  }
};
