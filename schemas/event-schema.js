const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const eventSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  eventcoins: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('events', eventSchema)
