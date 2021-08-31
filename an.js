
const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')
async function asyncCall() {
return await mongo().then(async (mongoose) => {
    console.log("Searching...")
let arr = await profileSchema.find({guildId: '764885367160700958'})
let newarr = arr.filter(x => x.coins >= 1)
/*let total = 0
Promise.all(arr.map(a=> total = parseInt(total.toString()) + parseInt(a.coins.toString())))*/
console.log(newarr.length)
})
}
asyncCall()