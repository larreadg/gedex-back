const { Sequelize } = require('sequelize');
const { database } = require('config/config');

const sequelize = new Sequelize(`mysql://${database.user}:${database.password}@${database.host}:${database.port}/${database.database}`);

module.exports = sequelize;