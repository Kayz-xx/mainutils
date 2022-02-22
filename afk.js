 const mongo = require('./mongo')
const schema = require('./schemas/afk-schema')

module.exports.find = async (userId, guildId) => {
    return await mongo().then(async (mongoose) => {
        const result = await schema.findOne({userId, guildId})
        return result
    })
  }


module.exports.create = async (userId, guildId, AFK, reason, timestamp) => {
    return await mongo().then(async (mongoose) => {
        const result = await schema.findOneAndUpdate({userId, guildId}, {userId, guildId, AFK, reason, timestamp}, {upsert: true, new: true})
        return result
    })
  }


module.exports.push = async (userId, guildId, url, author, time) => {
    return await mongo().then(async (mongoose) => {
        const result = await schema.findOneAndUpdate({userId, guildId}, {$push: {pings: {url, author, time}}}, {upsert: true, new: true})
        return result
    })
  }

  module.exports.set = async (userId, guildId) => {
    return await mongo().then(async (mongoose) => {
        const result = await schema.findOneAndUpdate({userId, guildId}, {AFK: false, pings: []}, {upsert: true, new: true})
        return result
    })
  }
