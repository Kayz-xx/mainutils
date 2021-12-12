const economy = require('../../owo')
const Discord = require('discord.js')
const formatter = new Intl.NumberFormat('en')
const {Permissions} = require('discord.js')
module.exports = {
    name: 'wdonoadd',
    aliases: [],
    cooldown: '0',
    category: 'Donations',
    permissions: [],
    usage: '<user> <amount>',
    description: 'Adds owo donation to a user',


  
    async execute(client, message, cmd,  args) {
    const mention = message.mentions.users.first()

  if(!message.member.roles.cache.has(`914242310894657536`) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({content: 'You cant use this command'})

    if (!mention) {
      message.reply({content:'Please tag a user to add the donation to'})
      return
    }

    const coins = args[1]
    if (isNaN(coins)) {
      message.reply({content:'Please provide a valid number of cowoncy'})
      return
    }

    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.addCoins(guildId, userId, coins)
    
    message.guild.channels.cache.get(`805543230473109534`).
    send({embeds:[
      new Discord.MessageEmbed()
    .setTitle('Owo Donation Logging')
    .setColor("RANDOM")
    .addFields(
      { name: 'User', value: `<@${userId}>` },
      { name: 'Cowoncy Added', value: formatter.format(coins) },
      { name: 'New Total Cowoncy', value: formatter.format(newCoins) },
    )
    .addField(`\u200B`,`[Link To CMD](${message.url})`)
    .setFooter(`Action taken by ${message.author.tag}`)
    .setTimestamp()
    ]})

      message.react('<a:EE_purplecheck:866351693108215849>')
        }
    }