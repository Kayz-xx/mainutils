
const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')

const coinsCache = {} // { 'guildId-userId': coins }

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, coins) => {
  return await mongo().then(async (mongoose) => {
    try {


      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            coins, 
          },
        },
        {
          upsert: true,
          new: true,
        }
      )



      coinsCache[`${guildId}-${userId}`] = result.coins

      return result.coins
    } finally {

    }
  })
}

module.exports.removeCoins = async (guildId, userId, coins) => {
  return await mongo().then(async (mongoose) => {
    try {


      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            coins,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )



      coinsCache[`${guildId}-${userId}`] = result.coins

      return result.coins
    } finally {

    }
  })
}

module.exports.getCoins = async (guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return cachedValue
  }

  return await mongo().then(async (mongoose) => {
    try {
     

      const result = await profileSchema.findOne({
        guildId,
        userId,
      })


      let coins = 0
      if (result) {
        coins = result.coins
      } else {
        await new profileSchema({
          guildId,
          userId,
          coins,
        }).save()
      }

      coinsCache[`${guildId}-${userId}`] = coins

      return coins
    } finally {
  
    }
  })
}

module.exports.getDonation = async (guildId) => {
  return await mongo().then(async (mongoose) => {
      let data = await profileSchema.find ({guildId , coins: {$gt: 2000000000}});
      data.sort ((a, b) => b.coins - a.coins);
      let arr = await profileSchema.find({guildId: guildId})
      let total = 0
      await Promise.all(arr.map(a=> total = parseInt(total.toString()) + parseInt(a.coins.toString())))
      let arr2 = await profileSchema.find({guildId: guildId})
      let newarr = arr2.filter(x => x.coins >= 1).length

      return [data, total, newarr]
  })
}


