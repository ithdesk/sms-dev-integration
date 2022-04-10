require('dotenv').config();

module.exports = {
  async index(req, res) {
    try {
      return res.status(200).send("ROTA DE LISTAGEM DE SMS")
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  async create(req, res) {
    try {
      return res.status(200).send("ROTA DE ENVIO DE SMS")
    } catch (err) {
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