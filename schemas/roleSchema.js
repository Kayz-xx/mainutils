const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const roleSchema = mongoose.Schema({
  guildId: reqString,
  roles: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('roles', roleSchema)
