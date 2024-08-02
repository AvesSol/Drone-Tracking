const mongoose = require("mongoose");
require("dotenv").config();

exports.Connection = () => {
  mongoose.connect(process.env.MONGO_DB, {})
    .then(() => {
      console.log("database is connected Succesfully");
    })
    .catch((e) => {
      console.log("Something went wrong while connecting database ", e);
    });
};
