require('dotenv').config();

const sequelize = require('../database/connection');

const {
  SMSSent,
  SMSResponse,
} = require('../database/models');

const axios = require('axios');

module.exports = {
  async index(req, res) {
    try {
      const messages = await SMSSent.findAll();
      return res.status(200).json(messages);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  async create(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { receiverNumber, message } = req.body;

      const smsSent = await axios.post(`${process.env.SMSDEV_API_URL}/send`, {
        key: process.env.SMSDEV_API_KEY,
        type: 9,
        number: receiverNumber,
        msg: message,
      });
      
      const { data } = smsSent;

      const sms = await SMSSent.create({
        receiverNumber,
        message,
        smsDevId: data.id,
        situation: data.situacao,
        description: data.descricao,
        errorCode: data.codigo
      }, {
        transaction,
      });
    
      await transaction.commit();
      return res.status(200).json(sms);
    } catch (err) {
      await transaction.rollback();
      return res.status(400).json(err);
    }
  },
  async response(req, res) {
    try {
      return res.status(200).send("ROTA DE CALLBACK DE SMS")
    } catch (err) {
      return res.status(400).json(err);
    }
  },
}