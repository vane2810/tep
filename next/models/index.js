'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('techeduplanet', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql', // o 'postgres', 'sqlite', 'mssql'
});

const User = require('./user')(sequelize, Sequelize);

module.exports = {
  sequelize,
  User,
};

