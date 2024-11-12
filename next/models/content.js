'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      // Relación con el modelo Subtopic
      Content.belongsTo(models.Subtopic, {
        foreignKey: 'subtopicId',
        as: 'subtopic',
        onDelete: 'CASCADE', // Configuración para eliminación en cascada
      });
    }
  }

  Content.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT, // Tipo TEXT para permitir contenido extenso
      allowNull: true,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    audio_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aditional: {
      type: DataTypes.TEXT, // Tipo TEXT para contenido adicional extenso
      allowNull: true,
    },
    subtopicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subtopic', // Nombre de la tabla relacionada
        key: 'id',
      },
      onDelete: 'CASCADE', // Eliminación en cascada al borrar subtema
    },
  }, {
    sequelize,
    modelName: 'Content',
    tableName: 'Contents', // Nombre de la tabla en plural
    timestamps: true,
  });

  return Content;
};
