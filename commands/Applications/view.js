const { db } = require('../../firebase');
const Discord = require('discord.js');
const { Permissions } = require('discord.js');

module.exports = {
	name: 'view',
	aliases: ['qview'],
	cooldown: '0',
	permissions: [],
	category: 'Applications',

	async execute(client, message, cmd, args) {
		if (
			!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) &&
			!message.author.id === '491933949686448138'
		)
			return;

		let data =
			(await db
				.ref(`Applications/${message.guild.id}`)
				.once('value')
				.then((snapshot) => snapshot.val())) || [];

		let newdata = Object.values(data);
		let name = [];
		let desc = [];
		let value = [];
		let menuOptions = [];
		let i = '0';
		newdata.forEach((x) => {
			i = parseInt(i) + 1;
			name.push(x.Name);
			desc.push(`${x.Name} Application`);
			value.push(i.toString());
		});

		for (let i = 0; i < name.length; i++) {
			let dataopt = {
				label: name[i],
				description: desc[i],
				value: value[i],
			};
			menuOptions.push(dataopt);
		}

		let slct = new Discord.MessageSelectMenu()
			.setMaxValues(1)
			.setCustomId('apps')
			.setPlaceholder('Application Questions')
			.addOptions([menuOptions]);

		const row = new Discord.MessageActionRow().addComponents([slct]);

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTimestamp()
			.setTitle('View Questions')
			.setDescription(
				'You can use the list below to view application question.'
			);

		let msg = await message.channel.send({
			embeds: [embed],
			components: [row],
		});

		let filter = (m) => m.user.id === message.author.id;
		let collector = msg.createMessageComponentCollector({
			filter,
			type: 'SELECT_MENU',
			time: 300000,
		});
		let question = [];
		collector.on('collect', (btn) => {
			let b = btn.values[0];
			if (btn.values[0] === parseInt(b).toString()) {
				btn.deferUpdate();
				question = newdata[b - 1].Questions;
				for (let i = 0; i < question.length; i++) {
					embed.setTitle(`${newdata[b - 1].Name}`);
					embed.addFields({
						name: `Question ${i + 1}`,
						value: question[i],
					});
				}
				msg.edit({ embeds: [embed] });
				embed.spliceFields(0, question.length);
			} else {
				collector.stop();
			}
		});

		collector.on('end', (btn) => {
			row.components[0].setDisabled(true);
			msg.edit({ embeds: [embed], components: [row] });
		});
	},
};
