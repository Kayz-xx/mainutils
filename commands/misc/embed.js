const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'embed',
    aliases: 'embedcreate',
    cooldown: '5',
    usage: 'embed <channel> <title> <description> <footer> <color>',
    permissions: [],
  
    async execute(client, message, cmd,  args, Discord) {


        const channel = message.mentions.channels.first()
        if(!channel) return message.reply('Provide A Channel To Send Embed') 

        const title = args.slice(1).join(" ")
        if(!title) return message.reply('Provide Title For Embed.') 
        const description =  args.slice(2).join(" ")
        if(!description) return message.reply('Provide Description For Embed.')
        const footer =  args.slice(3).join(" ")
        if(!footer) return message.reply('Provide Footer For Embed.')
        const color = args[4] 
        if(!color) return message.reply('Provide Color For Embed.') 

        // Send Embed
        const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(color || 'RANDOM')
        .setFooter(footer)
        channel.send(embed) // Send Embed
    }
}