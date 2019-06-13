const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('Successfully connected to db');
  } catch (error) {
    console.log('Error connecting to DB: ', error);
  }
};

module.exports = connectDB;
