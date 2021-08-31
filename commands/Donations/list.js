const {
	Client,
	Message,
	MessageEmbed,
	Collection,
	MessageActionRow,
	MessageButton,
	ButtonInteraction,
} = require('discord.js');
const formatter = new Intl.NumberFormat('en');
const { db } = require('../../firebase.js');
let page = 0;
module.exports = {
	name: 'itemlist',
	aliases: ['list'],
	cooldown: '0',
	usage: '',
	permissions: [],
	category: 'Donations',

	async execute(client, message, cmd, args) {
		let data =
			(await db
				.ref(`Donations/Info/${message.guild.id}/List`)
				.once('value')
				.then((snapshot) => snapshot.val())) || [];
		db.ref(`Donations/Info/${message.guild.id}/List`);
		data = data.sort();

		let first = new MessageButton()
			.setEmoji('<:fastb:878937208818630706>')
			.setCustomId('first')
			.setStyle('SECONDARY');

		let back = new MessageButton()
			.setEmoji('<:behind:875319719161397248>')
			.setCustomId('back')
			.setStyle('SECONDARY');

		let next = new MessageButton()
			.setEmoji('<:ahead:875319731220017162>')
			.setCustomId('next')
			.setStyle('SECONDARY');

		let last = new MessageButton()
			.setEmoji('<:fasta:878937199578607626>')
			.setCustomId('last')
			.setStyle('SECONDARY');

		let del = new MessageButton()
			.setEmoji('<:Cancel:875313311640616971>')
			.setCustomId('del')
			.setStyle('DANGER');

		let row = new MessageActionRow().addComponents(
			first,
			back,
			del,
			next,
			last
		);

		const newd = data.map((d) => {
			return `${d.name}<a:im5:859288337280925746> ⏣ **${formatter.format(
				d.amount
			)}**`;
		});
		let pg = newd.length - 1;

		const embed = new MessageEmbed()
			.setTitle('Item List')
			.setDescription(newd.slice(0, 10).join(`\n\n`))
			.setColor('RANDOM')
			.setFooter(`Page 0 of ${Math.floor(pg / 10)}`);

		const index = 10;
		const generateEmbed = (start) => {
			const current = newd.slice(start, start + index).join(`\n\n`);
			const embed = new MessageEmbed()
				.setTitle('Item List')
				.setDescription(current)
				.setColor('RANDOM')
				.setFooter(`Page ${start / 10} of ${Math.floor(pg / 10)}`);

			return embed;
		};

		const msg = await message.channel.send({
			embeds: [embed],
			components: [row],
		});

		const filter = (btn) => btn.user.id === message.author.id;

		const collector = msg.createMessageComponentCollector({
			filter,
			time: 60000,
		});

		collector.on('collect', async (btn) => {
			if (btn.customId === 'first') {
				page = 0;
				btn.update({
					embeds: [generateEmbed(page)],
					components: [row],
				});
			}
			if (btn.customId === 'back') {
				if (page > Math.floor(pg / 10) * 10 || page <= 0) {
					return btn.deferUpdate();
				} else {
					page -= index;
					btn.update({
						embeds: [generateEmbed(page)],
						components: [row],
					});
				}
			}
			if (btn.customId === 'next') {
				if (page >= Math.floor(pg / 10) * 10 || page < 0) {
					return btn.deferUpdate();
				} else {
					page += index;
					btn.update({
						embeds: [generateEmbed(page)],
						components: [row],
					});
				}
			}
			if (btn.customId === 'last') {
				page = Math.floor(pg / 10) * 10;
				btn.update({
					embeds: [generateEmbed(page)],
					components: [row],
				});
			}
			if (btn.customId === 'del') {
				setTimeout(() => msg.delete(), 500);
				btn.deferUpdate();
			}
		});
		collector.on('end', (reason) => {
			msg.components[0].components.forEach((com) => {
				com.setDisabled(true);
				com.setStyle('SECONDARY');
			});
			let rows2 = new MessageActionRow().addComponents(
				msg.components[0].components
			);
			msg.edit({
				components: [rows2],
			});
		});
	},
};
