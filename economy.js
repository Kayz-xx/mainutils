
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
     let data = await profileSchema.find({guildId}).sort({coins: -1}).limit(50)

		let count = await profileSchema.count({guildId, coins: {$gt: 1}})

		let arr = await profileSchema.aggregate([{
			$match: {
			  guildId: guildId
			}
		  },
		  {
			$group: {
			  _id: guildId,
			  total: { $sum: "$coins" }
			}
		  }
		]);
		let total = Math.round(arr[0].total)

		return [data, count, total]
  })
}


