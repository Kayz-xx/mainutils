const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const userSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  roleId: {
    type: String,
  },
  channelId: {
    type: String,
  },
  timezone: {
    type: String,
  },
  pings: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("users", userSchema);
