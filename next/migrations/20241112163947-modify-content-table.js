// migrations/XXXXXX-modify-contents-table.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('contents', 'img_url');
    await queryInterface.removeColumn('contents', 'audio_url');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('contents', 'img_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('contents', 'audio_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
