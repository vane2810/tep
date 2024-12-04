'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        static associate(models) {
            // Relación con Content
            Game.belongsTo(models.Content, {
                foreignKey: 'contentId',
                as: 'content',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });

            // Relación con GameType
            Game.belongsTo(models.GameType, {
                foreignKey: 'gametype_id', 
                as: 'gameType',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            // Relación con GameDetail
            Game.hasMany(models.GameDetail, {
                foreignKey: 'gameId',
                as: 'details',
                onDelete: 'CASCADE',
            });

            // Relación con Instruction
            Game.hasMany(models.Instruction, {
                foreignKey: 'game_id',
                as: 'instructions',
                onDelete: 'CASCADE',
            });

            // Relación con la tabla de Progreso
            Game.hasMany(models.StudentProgre, {
                foreignKey: 'gameId',
                as: 'progresses',
                onDelete: 'CASCADE', 
            });
        }
    }

    Game.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            img_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            contentId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Content',
                    key: 'id',
                },
            },
            gametype_id: { // Relación directa con GameType
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'GameType',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            modelName: 'Game',
            tableName: 'games',
            timestamps: true,
        }
    );

    return Game;
};