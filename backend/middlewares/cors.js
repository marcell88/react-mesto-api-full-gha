const { NODE_ENV } = require('../utils/variables');
const UnhandledError = require('../errors/UnhandledErrod');

const whiteList = [
  'http://markell.students.nomoreparties.sbs',
  'https://markell.students.nomoreparties.sbs',
];

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  let isAllowedOrigin = false;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (whiteList.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin);
    isAllowedOrigin = true;
  }

  if (NODE_ENV !== 'production') {
    res.header('Access-Control-Allow-Origin', '*');
    isAllowedOrigin = true;
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  // for testing through postman
  if (!isAllowedOrigin) {
    return next(new UnhandledError('CORS blocked the request'));
  }

  return next();
};
