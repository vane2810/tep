'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Report extends Model {
        static associate(models) {
            // Relación con el modelo User
            Report.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user', // Asociación con el usuario
                onDelete: 'CASCADE',
            });
        }
    }

    Report.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pendiente', 'en proceso', 'resuelto'),
            allowNull: false,
            defaultValue: 'pendiente',
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    }, {
        sequelize,
        modelName: 'Report',
        tableName: 'Reports',
        timestamps: true,
    });

    return Report;
};
