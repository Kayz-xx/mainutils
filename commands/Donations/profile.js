const economy = require('../../owo')
const economy2 = require('../../karuta')
const economy3 = require('../../economy')
const { MessageEmbed } = require('discord.js')
const formatter = new Intl.NumberFormat('en')

module.exports = {
    name: 'profile',
    aliases: ['wcheck', 'kcheck'],
    cooldown: '0',
    permissions: [],
    category: 'Donations',
    usage: '<user>',
    description: 'Checks a users donation or your own donation!',
    
    async execute(client, message, cmd,  args) {
        let str
        let che = false
        let user = args[0]
        let target;
        if(!user) target = message.author
        else {
        user = user.replace(/[\\<>@#&!]/g, "");
        target = await client.users.fetch(user).catch(error => {})
        if(!target) {
            che = true
            str = "This user was not found"
            target = message.author
        }
        }
    
        const guildId = message.guild.id
        const userId = target.id

        const coins = await economy.getCoins(guildId, userId)
        const coins2 = await economy2.getCoins(guildId, userId)
        const coins3 = await economy3.getCoins(guildId, userId)
    if(cmd === 'profile') {
    let embed = new MessageEmbed()
    .setAuthor(`${target.tag}'s Donations`)
    .setColor("RANDOM")
    .addField(`Dank Donation`, `${formatter.format(coins3)} **Coins** ⏣`)
    .addField(`Owo Donation`, `${formatter.format(coins)} **Cowoncy** <:cowoncy:919665528811974667>`)
    .addField(`Karuta Donation`, `${formatter.format(coins2)} **Tickets** 🎟️`)
    .setTimestamp()
    if(che) {
        embed.setFooter(str)
    }
    message.channel.send({embeds: [embed]})
}
    if(cmd === 'wcheck') {    
        let embed = new MessageEmbed()
        .setAuthor(`${target.tag}'s Donations`)
        .setColor("RANDOM")
        .addField(`Owo Donation`, `${formatter.format(coins)} **Cowoncy** <:cowoncy:919665528811974667>`)
        .setTimestamp()
        if(che) {
            embed.setFooter(str)
        }
        message.channel.send({embeds: [embed]})
    }

    if(cmd === 'kcheck') {
        let embed = new MessageEmbed()
        .setAuthor(`${target.tag}'s Donations`)
        .setColor("RANDOM")
        .addField(`Karuta Donation`, `${formatter.format(coins2)} **Tickets** 🎟️`)
        .setTimestamp()
        if(che) {
            embed.setFooter(str)
        }
        message.channel.send({embeds: [embed]})
    }
  },
}
