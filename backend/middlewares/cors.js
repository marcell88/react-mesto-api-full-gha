const cors = require('cors');

const whiteList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = cors();
