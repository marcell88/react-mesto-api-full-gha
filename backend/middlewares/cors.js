const cors = require('cors');

const whiteList = [
  'http://markell.students.nomoreparties.sbs',
  'https://markell.students.nomoreparties.sbs',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) {
      console.log('origin');
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = cors(corsOptions);
