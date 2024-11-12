'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subtopic extends Model {
    static associate(models) {
      // Relación con el modelo Topic
      Subtopic.belongsTo(models.Topic, {
        foreignKey: 'topicId',
        as: 'topic',
      });

      // Relación con el modelo Content
      Subtopic.hasMany(models.Content, {
        foreignKey: 'subtopicId',
        as: 'contents',
      });
    }
  }

  Subtopic.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Topic', // Nombre de la tabla relacionada
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Subtopic',
    tableName: 'Subtopics', // Nombre de la tabla en plural
    timestamps: true,
  });

  return Subtopic;
};
