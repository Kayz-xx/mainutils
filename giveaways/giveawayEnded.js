const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, giveaway, winners) => {
	const guild = client.guilds.cache.get(giveaway.guildId)
	const regex = /(?<=<@)\d+(?=>)/g;
	const str = giveaway.hostedBy;
	let m;
	let host;

	while ((m = regex.exec(str)) !== null) {
	
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}

		host = client.users.cache.get(m[0]);
	}
	let desc = ''
	winners.map((d) => {
		desc += `${d.toString()} `
	})
	let embed2 = new MessageEmbed()
		.setTitle('Your giveaway ended!')
		.setDescription(`Your winners are ${desc}\nMake sure to do payouts soon ,\nIf the winners DM you/contact support before the 12 hours are up you can reroll them.`)
		.addField('Giveaway', `[${giveaway.prize}](${giveaway.messageURL})`)
		.setColor('FFA0A0')
		.setFooter(guild.name, guild.iconURL())
		.setTimestamp();
	if (winners.length === 0) {
		embed2.setDescription('No winners were picked');
	}
	host.send({ embeds: [embed2] });
	winners.forEach((member) => {
		let embed = new MessageEmbed()
			.setTitle('Your won a giveaway!')
			.setDescription(
				`Congratulations! You just won a giveaway in ${guild.name}!\n\n Please wait patiently to receive your payout. If you DM the host or contacting support before 12 hours, you will get rerolled and receive the \`No Giveaways\` role.`
			)
			.setColor('B5FFD9')
			.addField(
				'Giveaway',
				`[${giveaway.prize}](${giveaway.messageURL})`
			)
			.setFooter(guild.name, guild.iconURL())
			.setTimestamp();
		member.send({ embeds: [embed] });
	});
};
