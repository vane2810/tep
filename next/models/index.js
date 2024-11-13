'use strict';

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno

// Configurar conexión a la base de datos MySQL usando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// Importar los modelos
const User = require('./user')(sequelize, DataTypes);
const Character = require('./character')(sequelize, DataTypes);
const Level = require('./level')(sequelize, DataTypes);
const UserRelationship = require('./user_relationship')(sequelize, DataTypes);
const Subject = require('./subject')(sequelize, DataTypes);
const Topic = require('./topic')(sequelize, DataTypes);
const Subtopic = require('./subtopic')(sequelize, DataTypes);
const Content = require('./content')(sequelize, DataTypes);
const Step = require('./step')(sequelize, DataTypes);
const Game = require('./game')(sequelize, DataTypes); // Importar el modelo Game

// Definir relaciones entre los modelos

// Relaciones de User
User.belongsTo(Character, { foreignKey: 'characterId', as: 'character' });
User.belongsTo(Level, { foreignKey: 'levelId', as: 'level' });
User.hasMany(UserRelationship, { foreignKey: 'studentId', as: 'guardians' });
User.hasMany(UserRelationship, { foreignKey: 'guardianId', as: 'students' });

// Relaciones de UserRelationship
UserRelationship.belongsTo(User, { foreignKey: 'studentId', as: 'studentInfo' });
UserRelationship.belongsTo(User, { foreignKey: 'guardianId', as: 'guardianInfo' });

// Relaciones de Character
Character.hasMany(User, { foreignKey: 'characterId', as: 'users' });

// Relaciones de Level
Level.hasMany(User, { foreignKey: 'levelId', as: 'users' });
Level.hasMany(Subject, { foreignKey: 'levelId', as: 'subjects' });

// Relaciones de Subject
Subject.belongsTo(Level, { foreignKey: 'levelId', as: 'level' });
Subject.hasMany(Topic, { foreignKey: 'subjectId', as: 'topics' });

// Relaciones de Topic
Topic.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });
Topic.hasMany(Subtopic, { foreignKey: 'topicId', as: 'subtopics' });

// Relaciones de Subtopic
Subtopic.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' });
Subtopic.hasMany(Content, { foreignKey: 'subtopicId', as: 'contents', onDelete: 'CASCADE' });

// Relaciones de Content
Content.belongsTo(Subtopic, { foreignKey: 'subtopicId', as: 'subtopic' });
Content.hasMany(Step, { foreignKey: 'contentId', as: 'steps', onDelete: 'CASCADE' });
Content.hasMany(Game, { foreignKey: 'contentId', as: 'games', onDelete: 'CASCADE' }); 

// Relaciones de Step
Step.belongsTo(Content, { foreignKey: 'contentId', as: 'content' });

// Relaciones de Game
Game.belongsTo(Content, { foreignKey: 'contentId', as: 'content' }); 

// Exportar los modelos y la conexión de Sequelize
module.exports = {
  sequelize,
  User,
  Character,
  Level,
  UserRelationship,
  Subject,
  Topic,
  Subtopic,
  Content,
  Step,
  Game, 
};
