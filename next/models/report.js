'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Report extends Model {
        static associate(models) {
            // Relación con otros modelos 
        }
    }

    Report.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('problema', 'sugerencia'),
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
    }, {
        sequelize,
        modelName: 'Report',
        tableName: 'Reports',
        timestamps: true,
    });

    return Report;
};
