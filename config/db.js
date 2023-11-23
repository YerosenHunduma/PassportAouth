const mongoose = require("mongoose");
require("dotenv").config();

const connectedToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
};

module.exports.connectedToDb = connectedToDb;
