const mongoose = require("mongoose");
// require("dotenv").config();
const config = require('./config.json')
module.exports = async () => {
  await mongoose.connect(config.mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  return mongoose;
};
