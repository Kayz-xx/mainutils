
const mongo = require('./mongo')
const eventSchema = require('./schemas/event-schema')

const eventcoinsCache = {} // { 'guildId-userId': coins }

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, eventcoins) => {
  return await mongo().then(async (mongoose) => {
    try {


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



      eventcoinsCache[`${guildId}-${userId}`] = result.eventcoins

      return result.eventcoins
    } finally {

    }
  })
}

module.exports.removeCoins = async (guildId, userId, eventcoins) => {
  return await mongo().then(async (mongoose) => {
    try {
 

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

 

      eventcoinsCache[`${guildId}-${userId}`] = result.eventcoins

      return result.eventcoins
    } finally {

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
   

      const result = await eventSchema.findOne({
        guildId,
        userId,
      })


      let eventcoins = 0
      if (result) {
        eventcoins = result.eventcoins
      } else {

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

module.exports.getDonation = async (guildId, userId) => {
  const cachedValue = eventcoinsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return cachedValue
  }

  return await mongo().then(async (mongoose) => {
    try {
      const data = await eventSchema.find ({ 
        guildId
      });
      
      data.sort ((a, b) => b.eventcoins - a.eventcoins);

      return data
    } finally {

    }
  })
}
