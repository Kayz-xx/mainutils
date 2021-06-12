const mongo = require('./mongo')
const roleSchema = require('./schemas/roleSchema')
const roleSchema = require('./schemas/roleSchema')



module.exports = (client) => {}

module.exports.addrole = async (guildId, userId, role) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOneAndUpdate()')

      const result = await roleSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            role, 
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      console.log('RESULT:', result)

      role[`${guildId}-${userId}`] = result.role

      return result.role
    } finally {
      mongoose.connection.close()
    }
  })
}