const cors = require('cors');
const { NODE_ENV } = require('../utils/variables');

const whiteList = [
  'http://markell.students.nomoreparties.sbs',
  'https://markell.students.nomoreparties.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
    if (NODE_ENV !== 'production' || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = cors(corsOptions);
