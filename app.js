const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./api/route/routes');
require('dotenv').config();

const port = process.env.PORT || 3000;
// mongoose.connect(
//   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`,
//   { useNewUrlParser: true }
// );
const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;
mongoose.connect(db, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);

app.listen(port, () => {
  console.log('El servidor está inicializado en el puerto 3000');
});

const respuesta = {};
app.get('/', (req, res) => {
  res.send('DB connection stablished');
});
