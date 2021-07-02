const Discord = require('discord.js')

module.exports = {
  name: 'ping',
  aliases: 'latency',
  cooldown: '2',
  permissions: [],
  commands: ['ping'],

  async execute(client, message, cmd,  args, Discord) {

        const ping = new Discord.MessageEmbed()
        .setDescription(`🏓\` ${Date.now() - message.createdTimestamp} ms\``);

        message.channel.send(ping) 
    
    
        }
    }
