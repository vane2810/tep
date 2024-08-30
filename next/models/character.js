'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      Character.hasMany(models.User, {
        foreignKey: 'characterId',
        as: 'users',
      });
    }
  }
  Character.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Character',
    timestamps: true,
  });
  return Character;
};
