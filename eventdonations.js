
const mongo = require('./mongo')
const eventSchema = require('./schemas/event-schema')

const eventcoinsCache = {} // { 'guildId-userId': coins }

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, eventcoins, type) => {
  return await mongo().then(async (mongoose) => {
    try {

      let coins = eventcoins
      let cowoncy = 0
      let tickets = 0
      if(type == "owo") cowoncy = eventcoins
      if(type == "karuta") tickets = eventcoins

      const result = await eventSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            eventcoins: coins, 
            eventcowoncy: cowoncy,
            eventtickets: tickets
          },
        },
        {
          upsert: true,
          new: true,
        }
      )



      eventcoinsCache[`${guildId}-${userId}`] = { 
        coins: eventcoins, cowoncy: eventcowoncy, tickets: eventtickets
      }

      return result.eventcoins
    } catch(error) {

    }
  })
}

module.exports.removeCoins = async (guildId, userId, eventcoins, type) => {
  return await mongo().then(async (mongoose) => {
    try {
 
      let coins = eventcoins
      let cowoncy = 0
      let tickets = 0
      if(type == "owo") cowoncy = eventcoins
      if(type == "karuta") tickets = eventcoins

      const result = await eventSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            eventcoins: coins, 
            eventcowoncy: cowoncy,
            eventtickets: tickets
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

 

      eventcoinsCache[`${guildId}-${userId}`] = { 
        coins: eventcoins, cowoncy: eventcowoncy, tickets: eventtickets
      }

      return result.eventcoins
    } catch(error) {

    }
  })
}

module.exports.getCoins = async (guildId, userId) => {
  const cachedValue = eventcoinsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return [cachedValue.coins, cachedValue.cowoncy, cachedValue.tickets]
  }

  return await mongo().then(async (mongoose) => {
    try {
   

      const result = await eventSchema.findOne({
        guildId,
        userId,
      })


      let eventcoins = 0
      let eventcowoncy = 0
      let eventtickets = 0
      if (result) {
        eventcoins = result.eventcoins
        eventcowoncy = result.eventcowoncy
        eventtickets = result.eventtickets
      } else {

        await new eventSchema({
          guildId,
          userId,
          eventcoins,
          eventcowoncy,
          eventtickets 
        }).save()
      }

      eventcoinsCache[`${guildId}-${userId}`] = { 
        coins: eventcoins, cowoncy: eventcowoncy, tickets: eventtickets
      }
      return [eventcoins, eventcowoncy, eventtickets]
    } catch(error) {

    }
  })
}

module.exports.getDonation = async (guildId, userId) => {
  return await mongo().then(async (mongoose) => {
    let data = await eventSchema.find({guildId}).sort({eventcoins: -1}).limit(50)
    return data
  })
}
