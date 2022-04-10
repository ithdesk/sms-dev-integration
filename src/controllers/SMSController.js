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
      const messages = await SMSSent.findAll({
        include: [SMSResponse]
      });
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
        status: data.descricao,
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
      const { id, id_sent, message } = req.body;

      const sms = await SMSSent.findOne({
        where: {
          smsDevId: id_sent,
        }
      });

      if (!sms) return res.status(400).json({ message: 'SMS not found'});

      const response = await SMSResponse.create({
        message,
        smsDevResponseId: id,
        smsSentId: sms.dataValues.id
      });

      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  async situation(req, res) {
    try {
      const { id, situacao, } = req.body;
      const sms = await SMSSent.findOne({
        where: {
          smsDevId: id,
        }
      });

      if (!sms) return res.status(400).json({ message: 'SMS not found'});

      sms.status = situacao;
      await sms.save();
      return res.sendStatus(200);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
}