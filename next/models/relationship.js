/* Modelo de la tabla user_relationships */
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRelationship extends Model {
    static associate(models) {
      // Asociaciones con el modelo User
      UserRelationship.belongsTo(models.User, {
        foreignKey: 'studentId',
        as: 'studentInfo'
      });

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
        model: 'Users',
        key: 'id',
      },
    },
    guardianId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    role: {
      type: DataTypes.ENUM('padre', 'docente'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserRelationship',
    tableName: 'user_relationships',
    timestamps: true,
  });

  return UserRelationship;
};
