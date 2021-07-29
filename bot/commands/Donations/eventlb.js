const {db} = require('../../firebase')
const { Client, Message, MessageEmbed, Collection } = require('discord.js')
const formatter = new Intl.NumberFormat('en')
const eventdonations = require('../../eventdonations')

module.exports = {
    name: 'eventleaderboard',
    aliases: ['eventleaderboard', 'eventlb'],
    cooldown: '0',
    usage: '',
    permissions: [],
    commands: ['eventleaderboard'],
    category: 'Donations',
    description: 'Event Donation Leaderboard',
    
    async execute(client, message, cmd,  args) {

     
            const guildId = message.guild.id
        const data = await eventdonations.getDonation(guildId);
        let desc = ""

        for (let i = 0; i < Math.min(10, data.length); i ++) {
          let user = data [i];
          desc += `${i+1}) <@!${user.userId}> - **${formatter.format(user.eventcoins)} coins**\n`
        };

        const embed = new MessageEmbed ()
        .setTitle(`Event Donation Leaderboard in ${message.guild.name}`)
        .setDescription(desc)
        .setFooter(`These are event donations`)
        .setColor('88FFF7')

        message.channel.send(embed)

    }
}
