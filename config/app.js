const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const APP_ENV = process.env.APP_ENV || 'development';

module.exports = {
  PORT,
  JWT_SECRET,
  APP_ENV,
};
