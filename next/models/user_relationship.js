'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRelationship extends Model {
    static associate(models) {
      // Relación con el modelo User para el estudiante
      UserRelationship.belongsTo(models.User, {
        foreignKey: 'studentId',
        as: 'studentInfo'
      });

      // Relación con el modelo User para el guardián
      UserRelationship.belongsTo(models.User, {
        foreignKey: 'guardianId',
        as: 'guardianInfo'
      });
    }
  }

  UserRelationship.init({
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',  // Nombre de la tabla en plural
        key: 'id',
      },
    },
    guardianId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',  // Nombre de la tabla en plural
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'UserRelationship',  // Nombre del modelo en singular
    tableName: 'UsersRelations',  // Nombre de la tabla en plural como en la migración
    timestamps: true,
  });

  return UserRelationship;
};
