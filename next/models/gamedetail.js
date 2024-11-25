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
        }
    }
    GameDetail.init(
        {
            gameId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            config: {
                type: DataTypes.JSONB, 
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
