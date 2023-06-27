const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');

// Constants
const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connecteed to DB...');
  })
  .catch((err) => { console.log('Error with DB connection: ', err); });

app.use(express.json());
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(defaultErrorHandler);
app.listen(PORT, () => { console.log('Server is ON...'); });
