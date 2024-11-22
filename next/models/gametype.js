'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GameType extends Model {
        static associate(models) {
            // Relación con Game
            GameType.hasMany(models.Game, {
                foreignKey: 'gametype_id', // Relación inversa con Game
                as: 'games',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });

            // Relación con GameDetail
            GameType.hasMany(models.GameDetail, {
                foreignKey: 'gameTypeId',
                as: 'details',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
        }
    }

    GameType.init(
        {
            type_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            required_data: {
                type: DataTypes.JSON, // Campo para las claves requeridas
                allowNull: false, // Aseguramos que no pueda estar vacío
            },
            default_instructions: {
                type: DataTypes.TEXT, 
                allowNull: true, 
            },
            default_video_url: {
                type: DataTypes.STRING, // URL del video tutorial
                allowNull: true, // Opcional
                validate: {
                    isUrl: true, // Asegura que sea una URL válida
                },
            },
        },
        {
            sequelize,
            modelName: 'GameType',
            tableName: 'gametypes',
            timestamps: true,
            underscored: true,
        }
    );

    return GameType;
};
