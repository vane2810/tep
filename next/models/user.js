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
      User.hasMany(models.UserRelationship, {
        foreignKey: 'studentId',
        as: 'guardians',
      });

      User.hasMany(models.UserRelationship, {
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
        model: 'Level',  // En singular, como el modelo
        key: 'id',
      },
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Character',  // En singular, como el modelo
        key: 'id',
      },
    },

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users', // Nombre de la tabla en plural
    timestamps: true,
  });

  return User;
};
