'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relación con la tabla de niveles
      User.belongsTo(models.Level, {
        foreignKey: 'levelId',
        as: 'level',
      });

      // Relación con la tabla de personajes
      User.belongsTo(models.Character, {
        foreignKey: 'characterId',
        as: 'character',
      });

      // Relación con la tabla de relaciones de usuarios (estudiantes y guardianes)
      User.hasMany(models.UserRelation, {
        foreignKey: 'studentId',
        as: 'guardians',
      });

      User.hasMany(models.UserRelation, {
        foreignKey: 'guardianId',
        as: 'students',
      });

    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.ENUM('estudiante', 'docente', 'padre', 'admin'),
      allowNull: true,
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Level', 
        key: 'id',
      },
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Character',  
        key: 'id',
      },
    },

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users', 
    timestamps: true,
  });

  return User;
};
