const economy = require('../../economy')
const { MessageEmbed } = require('discord.js')
const formatter = new Intl.NumberFormat('en')
const {db} = require('../../firebase.js')
const Discord = require('discord.js')
module.exports = {
  commands: ['remdono', 'removedono'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<The target's @> <coin amount>",
  callback: async (message, arguments) => {
    const mention = message.mentions.users.first()

    let data2 = await db
    .ref(`Donations/Info/${message.guild.id}/Settings/Role`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
  db.ref(`Donations/Info/${message.guild.id}/Settings/Role`)
  console.log(data2)
    
  if(!message.member.roles.cache.has(`${data2}`)) return message.channel.send('You cant use this command') //replace with staff role id

    if (!mention) {
      message.reply('Please tag a user to remove a donation from')
      return
    }

    let coins = arguments[1]
    if (isNaN(-coins)) {
      message.reply('Please provide a valid number of coins.')
      return
    }

    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.removeCoins(guildId, userId, -coins)

    const data = await db
    .ref(`Donations/Info/Amount Removed`)
    .once("value")
    .then(snapshot => snapshot.val())|| []

    data.push({
      "amount" : formatter.format(coins),
  "responsible_moderator_id" : `${message.author.id}`,
  "responsible_moderator_tag" : `${message.author.tag}`,
  "timestamp" : Date.now(),
  "donor" : userId,
  "server_id" : guildId
    })
    db.ref(`Donations/Info/Amount Removed`).set(data)

    let data3 = await db
    .ref(`Donations/Info/Settings/Channel`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
  db.ref(`Donations/Info/Settings/Channel`)
  console.log(data3)


    message.guild.channels.cache.get(`${data3}`).// replace with donation log channel id 
    send(
      new MessageEmbed()
    .setTitle('Donation Logging')
    .setColor("RANDOM")
    .addFields(
      { name: 'User', value: `<@${userId}>` },
      { name: 'Amount Removed', value: formatter.format(-coins) },
      { name: 'New Total Amount', value: formatter.format(newCoins) },
    )
    .addField(`\u200B`,`[Link To CMD](${message.url})`)
    .setFooter(`Action taken by ${message.author.tag}`)
    .setTimestamp()
      )
   
      message.react('✅')
      .then(console.log)
      .catch(console.error)

      let data4 = await db
      .ref(`Donations/Info/Settings`)
      .once("value")
      .then(snapshot => snapshot.val())|| []
      db.ref(`Donations/Info/Settings`)

    if (`${newCoins}` < data4.Amount1) return message.member.roles.remove(data.Donorole1)//these all are dono amounts and their roles change according based on the amounts
    if (`${newCoins}` < data4.Amount2) return message.member.roles.remove(data.Donorole2)
    if (`${newCoins}` < data4.Amount3) return message.member.roles.remove(data.Donorole3)
    if (`${newCoins}` < data4.Amount4) return message.member.roles.remove(data.Donorole4)
    if (`${newCoins}` < data4.Amount5) return message.member.roles.remove(data.Donorole5)
    if (`${newCoins}` < data4.Amount6) return message.member.roles.remove(data.Donorole6)
    if (`${newCoins}` < data4.Amount7) return message.member.roles.remove(data.Donorole7)
    if (`${newCoins}` < data4.Amount8) return message.member.roles.remove(data.Donorole8)
    if (`${newCoins}` < data4.Amount9) return message.member.roles.remove(data.Donorole9)
  },
}
