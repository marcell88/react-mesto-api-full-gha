const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');

const { PORT, NODE_ENV } = require('./utils/variables');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connecteed to DB...');
  })
  .catch((err) => { console.log('Error with DB connection: ', err); });

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use((req, res, next) => {
  console.log(NODE_ENV);
  console.log(req.headers);
  next();
});

app.use(requestLogger);
app.use(express.json());
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(defaultErrorHandler);
app.listen(PORT, () => { console.log('Server is ON...'); });
