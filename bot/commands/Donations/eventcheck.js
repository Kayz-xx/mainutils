const eventdonations = require('../../eventdonations')
const { MessageEmbed } = require('discord.js')
const formatter = new Intl.NumberFormat('en')

module.exports = {
    name: 'eventcheck',
    aliases: ['eventcheck', 'eventdonation'],
    cooldown: '0',
    permissions: [],
    category: 'Donations',
    description: 'Chech a users event donation or your own event donation!',
    
    async execute(client, message, cmd,  args) {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const coins = await eventdonations.getCoins(guildId, userId)

    let embed = new MessageEmbed()
    .setAuthor(`Event Donations at ${message.guild.name}`)
    .setColor("RANDOM")
    .addField(`Amount Donated in ${message.guild.name}:`, formatter.format(coins), true)
    .setTimestamp()
    message.channel.send(embed)
      
  },
}