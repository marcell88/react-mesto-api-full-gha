require('dotenv').config();

const { NODE_ENV = 'development', PORT = 3000, JWT_SECRET = 'super-secret' } = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  JWT_SECRET,
};
