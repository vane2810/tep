'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.belongsTo(models.Level, {
        foreignKey: 'nivel_id',
        as: 'level',
      });
      Game.hasMany(models.Progress, {
        foreignKey: 'juego_id',
        as: 'progress',
      });
      Game.hasMany(models.Favorite, {
        foreignKey: 'juego_id',
        as: 'favorites',
      });
    }
  }
  Game.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: DataTypes.STRING,
    nivel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Game',
    timestamps: true,
  });
  return Game;
};
