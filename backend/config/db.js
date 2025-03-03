const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' }); // Explicitly set the path

console.log("Mongo URI:", process.env.MONGO_URI); // Debugging

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
