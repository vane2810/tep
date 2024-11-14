'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GameType extends Model {
        static associate(models) {
            // Relación con el modelo Game (un GameType puede tener muchos juegos)
            GameType.hasMany(models.GameDetail, {
                foreignKey: 'game_type_id',
                as: 'games',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            });
        }
    }

    GameType.init(
        {
            type_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'GameType',
            tableName: 'gametypes',
            timestamps: true,
            underscored: true // Utiliza snake_case para los nombres de las columnas
        }
    );

    return GameType;
};
