'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Progreso extends Model {
    static associate(models) {
      // Relacionamos con el modelo Users
      Progreso.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Progreso.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    nivel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    puntaje: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Progreso',
  });
  return Progreso;
};
