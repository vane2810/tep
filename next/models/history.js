'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.User, {
        foreignKey: 'usuario_id',
        as: 'user',
      });
      History.belongsTo(models.Game, {
        foreignKey: 'juego_id',
        as: 'game',
      });
    }
  }
  History.init({
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    juego_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'History',
    timestamps: true,
  });
  return History;
};
