
const mongo = require('./mongo')
const eventSchema = require('./schemas/event-schema')

const eventcoinsCache = {
  coins: 0, cowoncy: 0, tickets: 0
} // { 'guildId-userId': coins }

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, eventcoins, type) => {
  return await mongo().then(async (mongoose) => {
    try {

      let coins = 0
      let cowoncy = 0
      let tickets = 0
      if(type == "dank") coins = eventcoins
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
        coins: result.eventcoins, cowoncy: result.eventcowoncy, tickets: result.eventtickets
      }

      if(type == "dank") return result.eventcoins
      if(type == "owo")  return result.eventcowoncy
      if(type == "karuta")  return result.eventtickets
    } finally {

    }
  })
}

module.exports.removeCoins = async (guildId, userId, eventcoins, type) => {
  return await mongo().then(async (mongoose) => {
    try {
 
      let coins = 0
      let cowoncy = 0
      let tickets = 0
      if(type == "dank") coins = eventcoins
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
        coins: result.eventcoins, cowoncy: result.eventcowoncy, tickets: result.eventtickets
      }

     
      if(type == "dank") return result.eventcoins
      if(type == "owo")  return result.eventcowoncy
      if(type == "karuta")  return result.eventtickets
    } finally {

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
    } finally {

    }
  })
}

module.exports.getDonation = async (guildId, userId) => {
  return await mongo().then(async (mongoose) => {
    let data = await eventSchema.find({guildId}).sort({eventcoins: -1}).limit(50)
    return data
  })
}
