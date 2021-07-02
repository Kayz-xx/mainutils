const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')



module.exports = {
    name: 'pings',
    aliases: 'giveaway, eventping',
    cooldown: '0',
    permissions: [],
    description: 'Giveaway Ping!',

  
  async execute(client, message, cmd,  args, Discord) {
      if(cmd === 'giveaway'){
    setTimeout(() => message.delete(), 100)
      const msg = args.slice(0).join(' ');
      message.channel.send(`<@&859323544138809364> ${msg} **- ${message.author.tag}**`)
     } if(cmd === 'eventping'){
        setTimeout(() => message.delete(), 100)
        const msg = args.slice(0).join(' ');
        message.channel.send(`<@&859323607678844928> ${msg} **- ${message.author.tag}**`)
     }
  }
}