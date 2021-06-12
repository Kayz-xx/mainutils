const Discord = require('discord.js')

module.exports = {
  commands: ['ping'],
  minArgs: 0,
  maxArgs: 0,

  callback: (message, arguments, text) => {

        const ping = new Discord.MessageEmbed()
        .setDescription(`🏓\` ${Date.now() - message.createdTimestamp} ms\``);

        message.channel.send(ping) //so it replys to the `.ping` command
    
    
    }
}