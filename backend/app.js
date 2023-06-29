const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');

const {
  pathCheck,
  PORT,
  NODE_ENV,
  JWT_SECRET,
} = require('./utils/variables');

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
  console.log(pathCheck);
  console.log(PORT);
  console.log(NODE_ENV);
  console.log(JWT_SECRET);
  next();
});

app.use(requestLogger);
app.use(express.json());
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(defaultErrorHandler);
app.listen(PORT, () => { console.log('Server is ON...'); });
