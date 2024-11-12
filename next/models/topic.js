'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      // Relación con el modelo Subject
      Topic.belongsTo(models.Subject, {
        foreignKey: 'subjectId',
        as: 'subject',
      });

      // Relación con el modelo Subtopic
      Topic.hasMany(models.Subtopic, {
        foreignKey: 'topicId',
        as: 'subtopics',
      });
    }
  }

  Topic.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subject', // Nombre de la tabla relacionada
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Topic',
    tableName: 'Topics', // Nombre de la tabla en plural
    timestamps: true,
  });

  return Topic;
};
