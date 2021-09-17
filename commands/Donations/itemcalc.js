const { MessageEmbed } = require('discord.js');
const { db } = require('../../firebase.js');

module.exports = {
	name: 'itemcalc',
	aliases: ['itemcalc'],
	cooldown: '0',
	category: 'Donations',
	permissions: [],
	usage: '<user> <amount> <item>',
	description: 'Adds donation to a user',

	async execute(client, message, cmd, args) {
		let data5 =
			(await db
				.ref(`Donations/Info/${message.guild.id}/List`)
				.once('value')
				.then((snapshot) => snapshot.val())) || [];
		db.ref(`Donations/Info/${message.guild.id}/List`);
		let values = args.join(' ').split('+');
		if (values.length < 1)
			return message.reply('You must atleast specify 1 item and amount');
		let array2 = [];
		let amount;
		let coins = 0;
		for (var i = 0; i < values.length; i++) {
			array2.push(values[i].trim().split(' '));
		}
		for (const i of array2) {
			amount = i[0];
			if (!i[0]) {
				break;
			}
			if (!i[1]) {
				break;
			}
			let item =
				data5.find(
					(item) => item.name.toUpperCase() === i[1].toUpperCase()
				) ||
				data5.find(
					(item) => item.aliases.toUpperCase() === i[1].toUpperCase()
				);
			if (!item)
				return message.reply({ content: `Could not find that item(${i[1]})!` });
			coins = coins + item.amount * Number(amount);
		}

		if (isNaN(coins)) {
			message.reply({
				content: 'Please provide a valid number of coins.',
			});
			return;
		}

		let embed = new MessageEmbed()
			.setTitle('Item Calculator')
			.setDescription(`**Value:** ${coins.toLocaleString()}`)
			.addField(`Command`, `\`e!eventdonoadd @user ${coins}\``)
			.setFooter(message.author.tag, message.author.displayAvatarURL())
			.setColor('RANDOM');
		message.channel.send({ embeds: [embed] });
	},
};
