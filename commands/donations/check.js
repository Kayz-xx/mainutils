const economy = require('../../economy')
const { MessageEmbed } = require('discord.js')
const formatter = new Intl.NumberFormat('en')

module.exports = {
  commands: ['check', 'mydono'],
  maxArgs: 1,
  expectedArgs: "[Target user's @]",
  callback: async (message) => {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const coins = await economy.getCoins(guildId, userId)

    let embed = new MessageEmbed()
    .setAuthor(`My Donations at ${message.guild.name}`)
    .setColor("RANDOM")
    .addField(`You have Donated in ${message.guild.name}:`, formatter.format(coins), true)
    .setTimestamp()
    message.channel.send(embed)
  },
}