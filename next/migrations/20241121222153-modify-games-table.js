'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('games', 'gametype_id', {
      type: Sequelize.INTEGER,
      allowNull: false, 
      after: 'contentId', 
      references: {
        model: 'gametypes', 
        key: 'id',          
      },
      onUpdate: 'CASCADE',  
      onDelete: 'CASCADE',  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('games', 'gametype_id');
  },
};
