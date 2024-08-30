'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    static associate(models) {
      Level.hasMany(models.User, {
        foreignKey: 'levelId',
        as: 'users',
      });
      Level.hasMany(models.Game, {
        foreignKey: 'nivel_id',
        as: 'games',
      });
    }
  }
  Level.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Level',
    timestamps: true,
  });
  return Level;
};
