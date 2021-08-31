
const Discord = require('discord.js')
module.exports = {
    name: 'echo',
    aliases: [],
    cooldown: '0',
    usage: '[channel] <sentence>',
    permissions: [],
    category: 'Misc',
    description: 'Sends a message through the bot',
  
    async execute(client, message, cmd,  args) {
        let channel = message.channel
        let arg = 0
        if (message.mentions.channels.first()) channel = message.mentions.channels.first(), arg = 1
        let sentence = args.slice(arg).join(' ')
        if(!sentence) return channel.send({content: "Missing sentence"})
        channel.send({content: sentence})
    }
}