
const Discord = require('discord.js')
const {Permissions} = require('discord.js')
module.exports = {
    name: 'echo',
    aliases: [],
    cooldown: '0',
    usage: '[channel] <sentence>',
    permissions: [],
    category: 'Misc',
    description: 'Sends a message through the bot',
  
    async execute(client, message, cmd,  args) {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        let channel = message.channel
        let arg = 0
        if (message.mentions.channels.first()) channel = message.mentions.channels.first(), arg = 1
        message.react('✅')
        let sentence = args.slice(arg).join(' ')
        if(!sentence) return channel.send({content: "Missing sentence"})
        channel.send({content: sentence})
        }
    }
}
