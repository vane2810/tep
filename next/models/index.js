'use strict';

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Importar dotenv para cargar las variables de entorno

// Configurar conexión a la base de datos MySQL usando variables de entorno
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

// Importar los modelos que necesitas
const User = require('./user')(sequelize, DataTypes);
const Character = require('./character')(sequelize, DataTypes);
const Progreso = require('./progreso')(sequelize, DataTypes);
const Level = require('./level')(sequelize, DataTypes);
const UserRelationship = require('./relationship')(sequelize, DataTypes);

// Definir las relaciones entre los modelos
User.belongsTo(Character, { foreignKey: 'characterId', as: 'character' });
User.belongsTo(Level, { foreignKey: 'levelId', as: 'level' });
User.hasMany(Progreso, { foreignKey: 'usuario_id', as: 'progreso', onDelete: 'CASCADE' });

// Relación entre User y UserRelationship
User.hasMany(UserRelationship, { foreignKey: 'studentId', as: 'guardians' });  // Relación estudiante -> guardianes
User.hasMany(UserRelationship, { foreignKey: 'guardianId', as: 'students' });  // Relación guardián -> estudiantes

// Relaciones inversas de UserRelationship
UserRelationship.belongsTo(User, { foreignKey: 'studentId', as: 'studentInfo' });
UserRelationship.belongsTo(User, { foreignKey: 'guardianId', as: 'guardianInfo' });

// Relaciones inversas
Progreso.belongsTo(User, { foreignKey: 'usuario_id', as: 'user' });
Progreso.belongsTo(Character, { foreignKey: 'characterId', as: 'character' });

Character.hasMany(User, { foreignKey: 'characterId', as: 'users' });
Character.hasMany(Progreso, { foreignKey: 'characterId', as: 'progreso' });

Level.hasMany(User, { foreignKey: 'levelId', as: 'users' });

// Exportar los modelos y la conexión de Sequelize
module.exports = {
  sequelize,
  User,
  Character,
  Progreso,
  Level,
  UserRelationship,
};
