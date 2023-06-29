require('dotenv').config({ path: `${__dirname}../env/.env` });

const { NODE_ENV = 'development', PORT = 3000, JWT_SECRET = 'super-secret' } = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  JWT_SECRET,
};
