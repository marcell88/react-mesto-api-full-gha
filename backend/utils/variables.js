const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../env/.env') });

const pathCheck = path.join(__dirname, '../env/.env');

const { NODE_ENV = 'development', PORT = 3000, JWT_SECRET = 'super-secret' } = process.env;

module.exports = {
  pathCheck,
  NODE_ENV,
  PORT,
  JWT_SECRET,
};
