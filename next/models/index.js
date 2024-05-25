'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('techeduplanet', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql', 
});

const User = require('./user')(sequelize, DataTypes);
const Role = require('./role')(sequelize, DataTypes);

// Definir la relación
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

module.exports = {
  sequelize,
  User,
  Role,
};
