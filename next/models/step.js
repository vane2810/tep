'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Step extends Model {
        static associate(models) {
            // Relación con el modelo Content
            Step.belongsTo(models.Content, {
                foreignKey: 'contentId',
                as: 'content',
                onDelete: 'CASCADE', // Configuración para eliminación en cascada
            });
        }
    }

    Step.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT, // Contenido detallado del paso
            allowNull: true,
        },
        img_url: {
            type: DataTypes.STRING, // URL de imagen asociada al paso (si aplica)
            allowNull: true,
        },
        audio_url: {
            type: DataTypes.STRING, // URL de audio asociado al paso (si aplica)
            allowNull: true,
        },
        aditional: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        contentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Content', // Nombre de la tabla relacionada
                key: 'id',
            },
            onDelete: 'CASCADE', // Eliminación en cascada al borrar el contenido relacionado
        },
    }, {
        sequelize,
        modelName: 'Step',
        tableName: 'Steps', // Nombre de la tabla en plural
        timestamps: true,
    });

    return Step;
};
