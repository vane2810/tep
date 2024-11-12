'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    static associate(models) {
      // Relación de uno a muchos con el modelo User
      Level.hasMany(models.User, {
        foreignKey: 'levelId',
        as: 'users',
      });
    }
  }

  Level.init({
    name: {  // Cambiado a "name" para coincidir con el campo de la migración
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {  // Cambiado a "description" para coincidir con la migración
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Level',  // Nombre del modelo en singular
    tableName: 'Levels',  // Nombre de la tabla en plural
    timestamps: true,
  });

  return Level;
};
