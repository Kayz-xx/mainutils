const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const ms = require('parse-ms');

module.exports = {
	name: 'search',
	category: 'fun',

	description: 'A game of searching items!',
	async execute(client, message, cmd, args) {
		const user = message.member;

		const locations = [
			'car',
			'sock',
			'wallet',
			'box',
			'pocket',
			'bus',
			'park',
			'train',
			'lounge',
			'keyboard',
			'bathroom',
			'bed',
			'sofa',
			'backpack',
			'laptop',
			'sewer',
			'pantry',
			'shoe',
			'tree',
			'air',
			'street',
			'attic',
			'grass',
			'bus',
		];
		let location = locations
			.sort(() => Math.random() - Math.random())
			.slice(0, 3);

		let items = [
			`🍔 Amxaa's burger`,
			`😸 Teanal's cat girl`,
			`:potted_plant: Emil's weed`,
			`Squid's janitor`,
			`<:laptop:775773370193150012> Kayz's laptop`,
			`Ghosty's chicken`,
			`<:phone:775771423926124614> Baba's Phone`,
			`Manda's purse`,
			`🍔 Amxaa's burger`,
			`😸 Teanal's cat girl`,
			`:potted_plant: Emil's weed`,
			`Squid's janitor`,
			`<:laptop:775773370193150012> Kayz's laptop`,
			`Ghosty's chicken`,
			`<:phone:775771423926124614> Baba's Phone`,
			`Manda's purse`,
			`🍔 Amxaa's burger`,
			`😸 Teanal's cat girl`,
			`:potted_plant: Emil's weed`,
			`Squid's janitor`,
			`<:laptop:775773370193150012> Kayz's laptop`,
			`Ghosty's chicken`,
			`<:phone:775771423926124614> Baba's Phone`,
			`Manda's purse`,
			`🍔 Amxaa's burger`,
			`😸 Teanal's cat girl`,
			`:potted_plant: Emil's weed`,
			`Squid's janitor`,
			`<:laptop:775773370193150012> Kayz's laptop`,
			`Ghosty's chicken`,
			`<:phone:775771423926124614> Baba's Phone`,
			`Manda's purse`,
			`🍔 Amxaa's burger`,
			`😸 Teanal's cat girl`,
			`:potted_plant: Emil's weed`,
			`Squid's janitor`,
			`<:laptop:775773370193150012> Kayz's laptop`,
			`Ghosty's chicken`,
			`<:phone:775771423926124614> Baba's Phone`,
			`Manda's purse`,
			`🍔 Amxaa's burger`,
			`😸 Teanal's cat girl`,
			`:potted_plant: Emil's weed`,
			`Squid's janitor`,
			`<:laptop:775773370193150012> Kayz's laptop`,
			`Ghosty's chicken`,
			`<:phone:775771423926124614> Baba's Phone`,
			`Manda's purse`,	
			`:bank: Axe's Bank`,
			`:bank: Axe's Bank`,
		];
		const amount = items[Math.floor(Math.random() * items.length)];
		const amount1 = items[Math.floor(Math.random() * items.length)];
		const amount2 = items[Math.floor(Math.random() * items.length)];

		const btn1 = new MessageButton()
			.setLabel(location[0])
			.setCustomId('1')
			.setStyle('PRIMARY');
		const btn2 = new MessageButton()
			.setLabel(location[1])
			.setCustomId('2')
			.setStyle('PRIMARY');
		const btn3 = new MessageButton()
			.setLabel(location[2])
			.setCustomId('3')
			.setStyle('PRIMARY');

		const row = new MessageActionRow()
			.addComponents(btn1, btn2, btn3)

		const msg = await message.channel.send({
			content: `**Where Do You Want To Search?** \n_Choose an option below_`,
			components: [row],
		});

		const embed = new MessageEmbed()
			.setAuthor(
				`${user.user.username} Searched`,
				user.user.displayAvatarURL({ dynamic: true })
			)
			.setTimestamp()
			.setColor('RANDOM')
			.setDescription(
				`You Searched In The **${
					btn1.label
				}** And Found ** ${amount.toLocaleString()}**`
			);
		const embed1 = new MessageEmbed()
			.setAuthor(
				`${user.user.username} Searched`,
				user.user.displayAvatarURL({ dynamic: true })
			)
			.setTimestamp()
			.setColor('RANDOM')
			.setDescription(
				`You Searched In The  **${
					btn2.label
				}** And Found ** ${amount1.toLocaleString()}** `
			);
		const embed2 = new MessageEmbed()
			.setAuthor(
				`${user.user.username} Searched`,
				user.user.displayAvatarURL({ dynamic: true })
			)
			.setTimestamp()
			.setColor('RANDOM')
			.setDescription(
				`You Searched In The  **${
					btn3.label
				}** And Found **${amount2.toLocaleString()}**`
			);

		const filter = (button) => button.user.id === message.author.id;
		const collector = msg.createMessageComponentCollector({
			filter,
			time: 15000,
		  });
		collector.on('collect', (btn) => {
		
			btn.message.components[0].components.forEach((com) => {
				com.setDisabled(true);
				com.setStyle('SECONDARY');
			});
			btn.message.components[0].components[btn.customId - 1].setStyle(
				'PRIMARY'
			);
			let rows = new MessageActionRow().addComponents(btn.message.components[0].components)
	
			if (btn.customId == '1') {
				btn.deferUpdate();
				msg.edit({
					embeds: [embed],
					components: [rows],
				});
				collector.stop();
			} else if (btn.customId == '2') {
				btn.deferUpdate();
				msg.edit({
					embeds: [embed1],
					components: [rows],
				});
				collector.stop();
			} else if (btn.customId == '3') {
				btn.deferUpdate();
				msg.edit({
					embeds: [embed2],
					components: [rows],
				});
				collector.stop();
			}
		});
		collector.on('end', (collected, reason) => {
			if (reason.toLowerCase() === 'time') {

				msg.components[0].components.forEach((com) => {
					com.setDisabled(true);
					com.setStyle('SECONDARY');
				});
				let rows2 = new MessageActionRow().addComponents(msg.components[0].components)
				msg.edit({content: `Guess you didn't want to search anywhere`, components: [rows2]});
			}
		});
	},
};
