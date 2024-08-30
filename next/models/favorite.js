'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, {
        foreignKey: 'usuario_id',
        as: 'user',
      });
      Favorite.belongsTo(models.Game, {
        foreignKey: 'juego_id',
        as: 'game',
      });
    }
  }
  Favorite.init({
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    juego_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Favorite',
    timestamps: true,
  });
  return Favorite;
};
