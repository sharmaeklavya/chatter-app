const mongoose = require("mongoose");
const { DB_URL, PORT } = require("./environment");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      return PORT;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
