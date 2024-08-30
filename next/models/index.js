'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('techeduplanet', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
});

// Importar modelos
const User = require('./user')(sequelize, DataTypes);
const Level = require('./level')(sequelize, DataTypes);
const Character = require('./character')(sequelize, DataTypes);
const Progress = require('./progres')(sequelize, DataTypes);
const Game = require('./game')(sequelize, DataTypes);
const Favorite = require('./favorite')(sequelize, DataTypes);
const History = require('./history')(sequelize, DataTypes);

// Definir las relaciones
User.belongsTo(Level, { foreignKey: 'levelId', as: 'level' });
User.belongsTo(Character, { foreignKey: 'characterId', as: 'character' });
User.hasMany(Progress, { foreignKey: 'usuario_id', as: 'progress' });
User.hasMany(Favorite, { foreignKey: 'usuario_id', as: 'favorites' });
User.hasMany(History, { foreignKey: 'usuario_id', as: 'history' });

Level.hasMany(User, { foreignKey: 'levelId', as: 'users' });
Level.hasMany(Game, { foreignKey: 'nivel_id', as: 'games' });

Character.hasMany(User, { foreignKey: 'characterId', as: 'users' });

Game.belongsTo(Level, { foreignKey: 'nivel_id', as: 'level' });
Game.hasMany(Progress, { foreignKey: 'juego_id', as: 'progress' });
Game.hasMany(Favorite, { foreignKey: 'juego_id', as: 'favorites' });

Progress.belongsTo(User, { foreignKey: 'usuario_id', as: 'user' });
Progress.belongsTo(Game, { foreignKey: 'juego_id', as: 'game' });
Progress.belongsTo(Level, { foreignKey: 'nivel_id', as: 'level' });

Favorite.belongsTo(User, { foreignKey: 'usuario_id', as: 'user' });
Favorite.belongsTo(Game, { foreignKey: 'juego_id', as: 'game' });

History.belongsTo(User, { foreignKey: 'usuario_id', as: 'user' });
History.belongsTo(Game, { foreignKey: 'juego_id', as: 'game' });

module.exports = {
  sequelize,
  User,
  Level,
  Character,
  Progress,
  Game,
  Favorite,
  History,
};
