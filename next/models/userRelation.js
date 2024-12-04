'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRelation extends Model {
    static associate(models) {
      // Relación con el modelo User para el estudiante
      UserRelation.belongsTo(models.User, {
        foreignKey: 'studentId',
        as: 'studentInfo'
      });

      // Relación con el modelo User para el guardián
      UserRelation.belongsTo(models.User, {
        foreignKey: 'guardianId',
        as: 'guardianInfo'
      });
    }
  }

  UserRelation.init({
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',  
        key: 'id',
      },
    },
    guardianId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',  
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'UserRelation', 
    tableName: 'UsersRelations',  
    timestamps: true,
  });

  return UserRelation;
};
