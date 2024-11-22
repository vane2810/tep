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
            game_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            points_max: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null,
                comment: 'Puntos máximos para completar el juego'
            },
            points_min: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null,
                comment: 'Puntos mínimos requeridos para aprobar'
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