const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const profileSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  coins: {
    type: Number,
    min: 0,
    max: 10 ** 100,
    default: 0,
    required: true,
  },
})

module.exports = mongoose.model('profiles', profileSchema)
