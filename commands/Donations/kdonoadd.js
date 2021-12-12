const economy = require('../../owo')
const Discord = require('discord.js')
const formatter = new Intl.NumberFormat('en')
const {Permissions} = require('discord.js')
module.exports = {
    name: 'kdonoadd',
    aliases: [],
    cooldown: '0',
    category: 'Donations',
    permissions: [],
    usage: '<user> <amount>',
    description: 'Adds karuta donation to a user',


  
    async execute(client, message, cmd,  args) {
    const mention = message.mentions.users.first()

  if(!message.member.roles.cache.has(`862094191520907275`) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({content: 'You cant use this command'})

    if (!mention) {
      message.reply({content:'Please tag a user to add the donation to'})
      return
    }

    const coins = args[1]
    if (isNaN(coins)) {
      message.reply({content:'Please provide a valid number of tickets'})
      return
    }

    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.addCoins(guildId, userId, coins)
    
    message.guild.channels.cache.get(`805543230473109534`).
    send({embeds:[
      new Discord.MessageEmbed()
    .setTitle('Karuta Donation Logging')
    .setColor("RANDOM")
    .addFields(
      { name: 'User', value: `<@${userId}>` },
      { name: 'Tickets Added', value: formatter.format(coins) },
      { name: 'New Total Tickets', value: formatter.format(newCoins) },
    )
    .addField(`\u200B`,`[Link To CMD](${message.url})`)
    .setFooter(`Action taken by ${message.author.tag}`)
    .setTimestamp()
    ]})

      message.react('<a:EE_purplecheck:866351693108215849>')
        }
    }