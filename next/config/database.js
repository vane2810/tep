// db/database.js o config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Crear una instancia de Sequelize usando las variables de entorno
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // Cambia esto si usas otro dialecto de base de datos
});

module.exports = { sequelize };
