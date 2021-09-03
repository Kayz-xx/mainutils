const economy = require('../../economy')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const formatter = new Intl.NumberFormat('en')
const {db} = require('../../firebase.js')
const eventdonations = require('../../eventdonations')
const {Permissions} = require('discord.js')
module.exports = {
    name: 'itemdonoadd',
    aliases: ['idonoadd'],
    cooldown: '0',
    category: 'Donations',
    permissions: [],
    usage: '<user> <amount> <item>',
    description: 'Adds donation to a user',


  
    async execute(client, message, cmd,  args) {

    const mention = message.mentions.users.first()
    
    let data2 = await db
    .ref(`Donations/Info/${message.guild.id}/Settings/Role`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
  db.ref(`Donations/Info/${message.guild.id}/Settings/Role`)

    
  if(!message.member.roles.cache.has(`${data2}`) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({content: 'You cant use this command'}) //replace with staff role id

    if (!mention) {
      message.reply({content:'Please tag a user to add the donation to'})
      return
    }

    let amount = args[1]
    if (!amount) {
        message.reply({content:'Please mention an amount of items.'})
        return
      }

    let data5 = await db
    .ref(`Donations/Info/${message.guild.id}/List`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
    db.ref(`Donations/Info/${message.guild.id}/List`)
    let item = data5.find(item => item.name === args[2]) || data5.find(item => item.aliases === args[2])
    if(!item) return message.reply({content: `Could not find that item!`})

    /*let amount2 = args[3]
    let item2 = args[4]
    if(item2) {
    item2 = data5.find(item => item.name === args[4]) || data5.find(item => item.aliases === args[4])
    if(!item2) return message.reply({content: `Could not find that item!`})
    }

    let amount3 = args[5]
    if(item3) {
        item3 = data5.find(item => item.name === args[4]) || data5.find(item => item.aliases === args[4])
        if(!item3) return message.reply({content: `Could not find that item!`})
        }
*/
    const coins = item.amount * Number(amount)
    if (isNaN(coins)) {
      message.reply({content:'Please provide a valid number of coins.'})
      return
    }
  
    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.addCoins(guildId, userId, coins)
    
    
    let data = await db
    .ref(`Donations/Info/Amount Added`)
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
    db.ref(`Donations/Info/Amount Added`).set(data)


    let data3 = await db
    .ref(`Donations/Info/${message.guild.id}/Settings/Channel`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
  db.ref(`Donations/Info/${message.guild.id}/Settings/Channel`)


    message.guild.channels.cache.get(`${data3}`).  
    send({embeds:[
      new Discord.MessageEmbed()
    .setTitle('Donation Logging')
    .setColor("RANDOM")
    .addFields(
      { name: 'User', value: `<@${userId}>` },
      { name: 'Amount Added', value: formatter.format(coins) },
      { name: 'Items', value: `**${amount}** ${item.name}` },
      { name: 'New Total Amount', value: formatter.format(newCoins) },
    )
    .addField(`\u200B`,`[Link To CMD](${message.url})`)
    .setFooter(`Action taken by ${message.author.tag}`)
    .setTimestamp()
    ]})

      message.react('<a:EE_purplecheck:866351693108215849>')
  

      let data4 = await db
      .ref(`Donations/Info/${message.guild.id}/Settings`)
      .once("value")
      .then(snapshot => snapshot.val())|| []
      db.ref(`Donations/Info/${message.guild.id}/Settings`)

      let auser = message.mentions.members.first()
      let hasRole1 = auser.roles.cache.some(role => role.id === data4.Donorole1)
      let hasRole2 = auser.roles.cache.some(role => role.id === data4.Donorole2)
      let hasRole3 = auser.roles.cache.some(role => role.id === data4.Donorole3)
      let hasRole4 = auser.roles.cache.some(role => role.id === data4.Donorole4)
      let hasRole5 = auser.roles.cache.some(role => role.id === data4.Donorole5)
      let hasRole6 = auser.roles.cache.some(role => role.id === data4.Donorole6)
      let hasRole7 = auser.roles.cache.some(role => role.id === data4.Donorole7)
      let hasRole8 = auser.roles.cache.some(role => role.id === data4.Donorole8)
      let hasRole9 = auser.roles.cache.some(role => role.id === data4.Donorole9)

      function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
        }

      if (!hasRole1 && newCoins >= data4.Amount1) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole1)
      }  if (!hasRole2 && newCoins >= data4.Amount2) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole2)
      }  if (!hasRole3 && newCoins >= data4.Amount3) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole3)
      } if (!hasRole4 && newCoins >= data4.Amount4) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole4)
      } if (!hasRole5 && newCoins >= data4.Amount5) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole5)
      } if (!hasRole6 && newCoins >= data4.Amount6) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole6)
      }  if (!hasRole7 && newCoins >= data4.Amount7) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole7)
      }  if (!hasRole8 && newCoins >= data4.Amount8) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole8)
      } if (!hasRole9 && newCoins >= data4.Amount9) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole9)
      } 
      
        }
    }
