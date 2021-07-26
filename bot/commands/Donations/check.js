const economy = require('../../economy')
const { MessageEmbed } = require('discord.js')
const formatter = new Intl.NumberFormat('en')

module.exports = {
    name: 'check',
    aliases: ['mydono', 'check'],
    cooldown: '0',
    permissions: [],
    category: 'Donations',
    usage: '<user>',
    description: 'Checks a users donation or your own donation!',
    
    async execute(client, message, cmd,  args) {
    
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const coins = await economy.getCoins(guildId, userId)

    let embed = new MessageEmbed()
    .setAuthor(`${target.tag}'s Donations`)
    .setColor("RANDOM")
    .addField(`Amount Donated in ${message.guild.name}:`, formatter.format(coins), true)
    .setTimestamp()
    message.channel.send(embed)
  },
}
