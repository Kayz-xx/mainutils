
const { Client, Message, MessageEmbed, Collection } = require('discord.js')
const economy = require('../../economy')
const formatter = new Intl.NumberFormat('en')



module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    cooldown: '0',
    usage: '',
    permissions: [],
    commands: ['leaderboard'],
    category: 'Donations',
    description: 'Donation Leaderboard',
    
    async execute(client, message, cmd,  args) {
            const guildId = message.guild.id
        const data = await economy.getDonation(guildId);
        let desc = ""

        for (let i = 0; i < Math.min(10, data.length); i ++) {
          let user = data [i];
          desc += `${i+1}) <@!${user.userId}> - **${formatter.format(user.coins)} coins**\n`
        };

        const embed = new MessageEmbed ()
        .setTitle(`Donation Leaderboard in ${message.guild.name}`)
        .setDescription(desc)
        .setFooter(`These are normal donations | Top 10 Donors`)
        .setColor('3B14A7')

        message.channel.send(embed)

    }
}
