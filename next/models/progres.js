'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    static associate(models) {
      Progress.belongsTo(models.User, {
        foreignKey: 'usuario_id',
        as: 'user',
      });
      Progress.belongsTo(models.Game, {
        foreignKey: 'juego_id',
        as: 'game',
      });
      Progress.belongsTo(models.Level, {
        foreignKey: 'nivel_id',
        as: 'level',
      });
    }
  }
  Progress.init({
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    juego_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nivel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    puntuacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_completado: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Progress',
    timestamps: true,
  });
  return Progress;
};
