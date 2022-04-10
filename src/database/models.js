const { Sequelize, DataTypes } = require('sequelize');
const connection = require('./connection');

const SMSSent = connection.define('sms_sent', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  receiverNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  smsDevId: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },   
  errorCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },   
}, {
  freezeTableName: true,
});

const SMSResponse = connection.define('sms_response', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },   
  smsDevResponseId: {
    type: Sequelize.STRING,
    allowNull: false,
  },   
}, {
  freezeTableName: true,
});

SMSSent.hasMany(SMSResponse);
SMSResponse.belongsTo(SMSSent);

module.exports = {
  SMSSent,
  SMSResponse,
}
