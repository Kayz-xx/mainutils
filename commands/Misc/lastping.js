const { MessageButton, MessageActionRow, MessageEmbed, Permissions } = require('discord.js');
const { findPing } = require('../../functions/user');

module.exports = {
	name: 'lastping',
	aliases: ['lp'],
	cooldown: '0',
	permissions: [],
	category: 'Misc',

	async execute(client, message, cmd, args) {
		if (
			!message.member.roles.cache.hasAny(
				'800814702800142337',
				'840849272420302850',
				'825919715238871063',
				'851263668595326976',
			) &&
			!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
		)
			return;
		const user = await findPing(message.guild.id, message.author.id);

		const embed = new MessageEmbed()
			.setTitle('Last Pings')
			.setColor('#5865f2')
			.setTimestamp();

		if (!user || !user?.pings.length) {
			embed.setDescription(`No pings have been received yet.`);
			return message.reply({
				embeds: [embed],
			});
		}

		let pings = user.pings.sort((a, b) => b.time - a.time);
		if (pings.length > 10) pings = pings.slice(0, 10);
		const map = pings
			.map(
				(x, i) =>
					`${i + 1}. **${x.author}** - ${x.content}
					**In** <#${x.channel}> (<t:${Math.floor(x.time / 1000)}:R>)\n[Jump](${x.link})`,
			)
			.join('\n');
		embed.setDescription(map);
		let clearButton = new MessageButton()
			.setStyle('PRIMARY')
			.setLabel('Clear Pings')
			.setCustomId('clear');
		const row = new MessageActionRow().addComponents(clearButton);
		const msg = await message.reply({
			content: 'Most Recent Pings',
			embeds: [embed],
			components: [row],
		});

		const collector = msg.createMessageComponentCollector({
			filter: (button) => button.user.id === message.author.id,
			time: 30000,
		});

		collector.on('collect', async (button) => {
			if (button.customId === 'clear') {
				user.pings = [];
				user.save();

				embed.setDescription('Cleared Pings');
				button.reply({
					content: 'Pings have been cleared.',
					ephemeral: true,
				});
				const row = new MessageActionRow().addComponents(
					clearButton.setDisabled(true),
				);
				msg.edit({
					embeds: [embed],
					components: [row],
				});
			}
		});
		collector.on('end', async (collected) => {
			const row = new MessageActionRow().addComponents(
				clearButton.setDisabled(true),
			);
			msg.edit({
				embeds: [embed],
				components: [row],
			});
		});
	},
};
