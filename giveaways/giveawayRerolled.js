

const { MessageEmbed } = require("discord.js");


module.exports.run = async (client, giveaway, winners) => {
    const guild = client.guilds.cache.get(giveaway.guildId)
    winners.forEach((member) => {
        let embed = new MessageEmbed()
        .setTitle("You won a giveaway!")
        .setDescription(`Congratulations! You just won a giveaway in ${guild.name}<a:nya6:883810109539635272>!\n\n Please wait patiently to receive your payout. If you DM the host or contacting support before 12 hours, you will get rerolled and receive the \`No Giveaways\` role.`)
        .setColor("B5FFD9")
        .addField('Giveaway', `[${giveaway.prize}](${giveaway.messageURL})`)
        .setFooter(guild.name, guild.iconURL())
        .setTimestamp()
        member.send({embeds: [embed]})
    });
};
