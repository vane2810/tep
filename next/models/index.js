'use strict';

const { Sequelize, DataTypes } = require('sequelize');

// Configurar conexión a la base de datos MySQL
const sequelize = new Sequelize('techeduplanet', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
});

// Importar los modelos que necesitas
const User = require('./user')(sequelize, DataTypes);
const Character = require('./character')(sequelize, DataTypes);
const Progreso = require('./progreso')(sequelize, DataTypes);
const Level = require('./level')(sequelize, DataTypes);  // Importar el modelo Level

// Definir las relaciones entre los modelos
User.belongsTo(Character, { foreignKey: 'characterId', as: 'character' });
User.belongsTo(Level, { foreignKey: 'levelId', as: 'level' });  // Definir relación con Level
User.hasMany(Progreso, { foreignKey: 'usuario_id', as: 'progreso', onDelete: 'CASCADE' });  // Agregar onDelete: 'CASCADE'

// Relaciones inversas
Progreso.belongsTo(User, { foreignKey: 'usuario_id', as: 'user' });
Progreso.belongsTo(Character, { foreignKey: 'characterId', as: 'character' });

Character.hasMany(User, { foreignKey: 'characterId', as: 'users' });
Character.hasMany(Progreso, { foreignKey: 'characterId', as: 'progreso' });

Level.hasMany(User, { foreignKey: 'levelId', as: 'users' });  // Definir relación inversa de Level con User

// Exportar los modelos y la conexión de Sequelize
module.exports = {
  sequelize,
  User,
  Character,
  Progreso,
  Level,
};
