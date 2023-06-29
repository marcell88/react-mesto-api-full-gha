require('dotenv').config();

const { NODE_ENV = 'development', PORT = 3000, JWT_SECTRET = 'super-secret' } = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  JWT_SECTRET,
};
