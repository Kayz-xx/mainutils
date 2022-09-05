const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const schema = new mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  response: reqString,
  trigger: reqString,
  type: reqString,
  ignoredChannels: {
    type: Array,
    default: [],
  },
  ignoredMembers: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("autoReponses", schema);
