const ms = require('ms')
const {MessageEmbed} = require("discord.js")
module.exports = {
    name: "uptime",
    description: "Get the bot's uptime",
    category: "info",
    usage: "",
    
    async execute(client, message, cmd,  args) {
        let time = ms(client.uptime, {long: false})
        message.channel.send({ embeds: [new MessageEmbed()
        .setTitle("Uptime")
        .setDescription(`Uptime: ${time}`)
        .setColor("RANDOM")]})
    }
}