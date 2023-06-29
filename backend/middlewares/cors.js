const cors = require('cors');
const { NODE_ENV } = require('../utils/variables');

const whiteList = [
  'http://markell.students.nomoreparties.sbs',
  'https://markell.students.nomoreparties.sbs',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (NODE_ENV !== 'production' || whiteList.indexOf(origin) !== -1) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

};

module.exports = cors(corsOptions);
