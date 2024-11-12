'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      // Relación de uno a muchos con el modelo User
      Character.hasMany(models.User, {
        foreignKey: 'characterId',
        as: 'users',
      });
    }
  }

  Character.init({
    name: {  // Cambiado a "name" para coincidir con el campo de la migración
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_url: {  // Cambiado a "img_url" para coincidir con la migración
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {  // Cambiado a "description" para coincidir con la migración
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Character',  // Nombre del modelo en singular
    tableName: 'Characters',  // Nombre de la tabla en plural
    timestamps: true,
  });

  return Character;
};
