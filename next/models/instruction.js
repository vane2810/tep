'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Instruction extends Model {
        static associate(models) {
            Instruction.belongsTo(models.Game, {
                foreignKey: 'game_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }
    Instruction.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            points: {
                type: DataTypes.STRING,  // Cambiado de INTEGER a STRING
                allowNull: false
            },
            instructions: {
                type: DataTypes.TEXT,  // Cambiado de JSON a TEXT
                allowNull: false
            },
            video_url: {
                type: DataTypes.STRING,
                allowNull: true
            },
            game_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Instruction',
            tableName: 'Instructions',
            underscored: true,
            timestamps: true
        }
    );

    return Instruction;
};
