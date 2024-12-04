'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StudentProgre extends Model {
        // Asociaciones con otros modelos
        static associate(models) {
            // Relación con el modelo User (Student)
            StudentProgre.belongsTo(models.User, {
                foreignKey: 'student_id',
                as: 'student',
                onDelete: 'CASCADE',
            });

            // Relación con el modelo Game
            StudentProgre.belongsTo(models.Game, {
                foreignKey: 'game_id',
                as: 'game',
                onDelete: 'CASCADE',
            });
        }
    }

    StudentProgre.init({
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Game',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.ENUM('incompleto', 'completado'),
            allowNull: false,
            defaultValue: 'incompleto',
        }
    }, {
        sequelize,
        modelName: 'StudentProgre',
        tableName: 'Student_progres',
        timestamps: true,
    });

    return StudentProgre;
};
