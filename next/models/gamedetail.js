'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GameDetail extends Model {
        static associate(models) {
            GameDetail.belongsTo(models.Game, {
                foreignKey: 'gameId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            GameDetail.belongsTo(models.GameType, {
                foreignKey: 'gameTypeId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    GameDetail.init(
        {
            gameTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            gameId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            json_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'GameDetail',
            tableName: 'gamedetails',
            underscored: false,
            timestamps: true,
        }
    );

    return GameDetail;
};