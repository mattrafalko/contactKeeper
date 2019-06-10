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

    console.log('successfully connected to db');
  } catch (error) {
    console.log('couldnt connect to db', error);
  }
};

module.exports = connectDB;
