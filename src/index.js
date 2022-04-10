require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT;

app.use(routes);
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`SMS Dev Integration API is running on port ${PORT}`);
});

