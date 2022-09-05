const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  words: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("highlights", schema);
