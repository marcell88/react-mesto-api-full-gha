const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');

const { PORT, NODE_ENV, DB } = require('./utils/variables');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();
mongoose.connect(DB)
  .then(() => {
    console.log('Connecteed to DB...');
  })
  .catch((err) => { console.log('Error with DB connection: ', err); });

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(express.json());
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(defaultErrorHandler);
app.listen(PORT, () => { console.log(`Server is ON in ${NODE_ENV} mode...`); });
