'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      // Relación con el modelo Level
      Subject.belongsTo(models.Level, {
        foreignKey: 'levelId',
        as: 'level',
      });

      // Relación con el modelo Topic
      Subject.hasMany(models.Topic, {
        foreignKey: 'subjectId',
        as: 'topics',
      });
    }
  }

  Subject.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Level', // Nombre de la tabla en plural
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Subject', // Nombre del modelo en singular
    tableName: 'Subjects', // Nombre de la tabla en plural
    timestamps: true,
  });

  return Subject;
};
