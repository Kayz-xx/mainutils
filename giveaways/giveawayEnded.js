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

	     host = await client.users.fetch(m[0]).catch(() => null);
	}
	let desc = ''
	let win = ''
	let arr = []
	winners.map((d) => {
		desc += `${d.toString()} `
	})
	winners.forEach((w) => {
	arr.push(w.id)
	})
	win += arr.join(', ')
	win = win.replace(/,(?=[^,]*$)/, ' and')
	let embed2 = new MessageEmbed()
		.setTitle('Your giveaway ended!')
		.setDescription(`Your winners are ${desc}\nMake sure to do payouts soon <:EE_Dogangry:869338671030104064>.\nIf the winners don’t DM you/contact support in first 12 hours after the giveaway ends you can reroll them.`)
		.addField('Giveaway', `[${giveaway.prize}](${giveaway.messageURL})`)
		.addField('Winner ID\'s', `\`${win}\``)
		.setColor('FFA0A0')
		.setFooter(guild.name, guild.iconURL())
		.setTimestamp();
	if (winners.length === 0) {
		embed2.setDescription('No winners were picked');
	}
	host.send({ embeds: [embed2] }).catch(() => console.log("Could not send user DM!"))
	winners.forEach((member) => {
		let embed = new MessageEmbed()
			.setTitle('You won a giveaway!')
			.setDescription(
				`Congratulations! You just won a giveaway in ${guild.name}! <:EE_PepeCute:768253104872357949>\nPlease wait patiently to receive your payout.\nPlease DM the host within 12 hours after the giveaway ended to receive your prize, if not you will be rerolled. <:EE_WorryFrogThatsRight:866048814859026472>`
			)
			.setColor('B5FFD9')
			.addField(
				'Giveaway',
				`[${giveaway.prize}](${giveaway.messageURL})`
			)
			.setFooter(guild.name, guild.iconURL())
			.setTimestamp();
		member.send({ embeds: [embed] }).catch(() => console.log("Could not send user DM!"))
	});
};
