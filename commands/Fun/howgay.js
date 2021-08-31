const { MessageButton, MessageActionRow } = require('discord.js')
const Discord = require('discord.js')



module.exports = {
    name: 'howgay',
    aliases: ['gaypercent'],
    cooldown: '0',
    permissions: [],
    category: 'Misc',
    description: 'Just a regular howgay command',

  
    async execute(client, message, cmd,  args) {
        let member = args[0] || message.author

        let random = Math.floor(Math.random() * 100)

        const embed = new Discord.MessageEmbed()
        .setTitle('Gay Rate Machine')
        .setDescription(`${member} is ${random}% Gay🌈`)
        .setColor("BLUE")
        message.channel.send({content: embed})
    }

}