const express = require('express');
const routes = express.Router();

const models = require('./database/models');
const connection = require('./database/connection');

const SMSController = require('./controllers/SMSController');

routes.get('/sms', SMSController.index);
routes.post('/sms', SMSController.create);
routes.post('/sms/response', SMSController.response);

routes.post('/database/sync', async (req, res) => {
  console.log(models);
  await connection.sync({ force: true });
  return res.sendStatus(200);
});

module.exports = routes;