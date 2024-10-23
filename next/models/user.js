/* Modelo de la tabla users */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Level, {
        foreignKey: 'levelId',
        as: 'level',
      });
      User.belongsTo(models.Character, {
        foreignKey: 'characterId',
        as: 'character',
      });
      User.hasMany(models.Progress, {
        foreignKey: 'usuario_id',
        as: 'progress',
      });
      User.hasMany(models.Favorite, {
        foreignKey: 'usuario_id',
        as: 'favorites',
      });
      User.hasMany(models.History, {
        foreignKey: 'usuario_id',
        as: 'history',
      });

      User.hasMany(models.UserRelationship, {
        foreignKey: 'studentId',
        as: 'guardians'
      });
      
      User.hasMany(models.UserRelationship, {
        foreignKey: 'guardianId',
        as: 'students'
      });
      
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('estudiante', 'docente', 'padre'),
      allowNull: true,
    },
    levelId: DataTypes.INTEGER,
    characterId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });

  return User;
};
