// ./models/gamecard.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GameCard extends Model {
        static associate(models) {
            GameCard.belongsTo(models.Content, {
                foreignKey: 'contentId',
                as: 'content',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            });
        }
    }
    GameCard.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            img_url: {
                type: DataTypes.STRING,
                allowNull: true
            },
            contentId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Content',
                    key: 'id'
                }
            }
        },
        {
            sequelize,
            modelName: 'Game',
            tableName: 'Games',
            timestamps: true
        }
    );
    return GameCard;
};
