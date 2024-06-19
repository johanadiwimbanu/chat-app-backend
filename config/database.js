const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

const DBonnection = async () => {
  console.log('Trying connect to database');
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connecttion successfully');
  } catch (error) {
    console.log(error);
    console.log('Error DB Connectiong to database');
  }
};

module.exports = DBonnection;
