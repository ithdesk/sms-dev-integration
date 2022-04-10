require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env['DB_NAME'], process.env['DB_USER'],
process.env['DB_PASS'], {
  host: process.env['DB_HOST'],
  dialect: 'mysql',
  charset: 'utf8',
  collate: 'utf8_general_ci',
  timezone: '-03:00',
  port: process.env.DB_PORT
});

async function testConn() {
  try {   
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConn();

module.exports = sequelize;