// migrations/XXXXXX-modify-contents-table.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('contents', 'aditional');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('contents', 'aditional', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
