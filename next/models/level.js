// models/level.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    static associate(models) {
      Level.hasMany(models.User, {
        foreignKey: 'levelId',
        as: 'users',
      });
    }
  }
  Level.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Level',
    timestamps: true,
  });
  return Level;
};
