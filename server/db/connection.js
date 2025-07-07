const mongoose = require("mongoose");

const connection = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connection Successful!"))
    .catch((err) => console.error("MongoDB Connection Failed:", err));
};

module.exports = connection;
