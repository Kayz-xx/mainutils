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
  eventcowoncy: {
    type: Number,
    required: true,
    default: 0
  },
  eventtickets: {
    type: Number,
    required: true,
    default: 0
  },
})

module.exports = mongoose.model('events', eventSchema)
