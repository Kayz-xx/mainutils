
const mongo = require('./mongo')
const eventSchema = require('./schemas/event-schema')

const eventcoinsCache = {} // { 'guildId-userId': coins }

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, eventcoins) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOneAndUpdate()')

      const result = await eventSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            eventcoins, 
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      console.log('RESULT:', result)

      eventcoinsCache[`${guildId}-${userId}`] = result.eventcoins

      return result.eventcoins
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.removeCoins = async (guildId, userId, eventcoins) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOneAndUpdate()')

      const result = await eventSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            eventcoins,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      console.log('RESULT:', result)

      eventcoinsCache[`${guildId}-${userId}`] = result.eventcoins

      return result.eventcoins
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.getCoins = async (guildId, userId) => {
  const cachedValue = eventcoinsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return cachedValue
  }

  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOne()')

      const result = await eventSchema.findOne({
        guildId,
        userId,
      })

      console.log('RESULT:', result)

      let eventcoins = 0
      if (result) {
        eventcoins = result.eventcoins
      } else {
        console.log('Inserting a document')
        await new eventSchema({
          guildId,
          userId,
          eventcoins,
        }).save()
      }

      eventcoinsCache[`${guildId}-${userId}`] = eventcoins

      return eventcoins
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.getDonation = async (guildId, userId) => {
  const cachedValue = eventcoinsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return cachedValue
  }

  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running find()')

      const result = await eventSchema.findOne({
        guildId,
        userId,
      })

      console.log('RESULT:', result)

      let eventcoins = 0
      if (result) {
        eventcoins = result.eventcoins
      } else {
        console.log('Inserting a document')
        await new eventSchema({
          guildId,
          userId,
          eventcoins,
        }).save()
      }

      eventcoinsCache[`${guildId}-${userId}`] = eventcoins

      return eventcoins
    } finally {
    }
  })
}

