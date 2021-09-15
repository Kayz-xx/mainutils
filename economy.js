
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

module.exports.getDonation = async (guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return cachedValue
  }

  return await mongo().then(async (mongoose) => {
    try {
      const data = await profileSchema.find ({ 
        guildId
      });
      
      data.sort ((a, b) => b.coins - a.coins);

      return data
    } finally {

    }
  })
}

module.exports.getTotal = async (guildId) => {
  return await mongo().then(async (mongoose) => {
  let arr = await profileSchema.find({guildId: guildId})
let total = 0
Promise.all(arr.map(a => total = parseInt(total) + parseInt(a.coins)))
return total.toLocaleString()
    })
    }

    module.exports.getDonors = async (guildId) => {
      return await mongo().then(async (mongoose) => {
        let arr = await profileSchema.find({guildId: guildId})
        let newarr = arr.filter(x => x.coins >= 1)
        return newarr.length
        })
  }
    
