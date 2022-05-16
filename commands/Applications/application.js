	const Discord = require('discord.js');
	const { db } = require('../../firebase');
	const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

	module.exports = {
		name: 'apply',
		aliases: ['application'],
		cooldown: '0',
		category: 'Applications',
		permissions: [],
		description:
			'This command lets you apply for the current availible positions in the server!',
		async execute(client, message, cmd, args) {
			if (message.channel.id === '764885369933791299') {
			message.react('<a:EE_blurplecheck:866355607615438888>');
			let guildid = message.guild.id;
			const filter = (m) => m.author.id === message.author.id;
	
			let data2 =
				(await db
					.ref(`Applications/${message.guild.id}`)
					.once('value')
					.then((snapshot) => snapshot.val())) || [];
	
			String.prototype.capitalize = function() {
				return this.charAt(0).toUpperCase() + this.slice(1);
			};
			let newdata = Object.values(data2);
			let exampleEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Positions Availible');
	
			for (let i = 0; i < newdata.length; i++) {
				exampleEmbed.addField(
					`${i + 1}. ${newdata[i].Name.capitalize()}`,
					`Total Questions: ${newdata[i].Questions.length.toString()}\nStatus: ${newdata[i].Status}`,
					true
				);
			}
	
			const msg = await message.author.send({
				embeds: [exampleEmbed],
			});
	
			const collected = await msg.channel
				.awaitMessages({ filter, max: 1, time: 60000 })
				.then(async (message) => {
					message = message.first();
					let num = parseInt(message.content) - 1;
					if(num > newdata.length - 1) return;
					let data =
						(await db
							.ref(
								`Applications/${guildid}/Positions${num.toString()}`
							)
							.once('value')
							.then((snapshot) => snapshot.val())) || [];
					if (data.Status === 'closed')
						return message.author.send({
							embeds: [
								new Discord.MessageEmbed()
									.setTitle(`An Error Occurred`)
									.setColor('DA0037')
									.setDescription(
										`This application is closed, please wait for it to be open!`
									),
							],
						});
					message.author.send({
						embeds: [
							new Discord.MessageEmbed()
								.setTitle(
									`Apply For ${data.Name}: ${message.author.tag}`
								)
								.setColor('#0099ff')
								.setDescription(data.Description),
						],
					});
					const btn1 = new MessageButton()
						.setLabel('Begin')
						.setCustomId('1')
						.setStyle('SUCCESS');
					const btn2 = new MessageButton()
						.setLabel('Cancel')
						.setCustomId('2')
						.setStyle('DANGER');
	
					const row3 = new MessageActionRow().addComponents(btn1, btn2);
					const msg = await message.author.send({
						embeds: [
							new Discord.MessageEmbed()
								.setTitle(`Ready?`)
								.setColor('#0099ff')
								.setAuthor(
									'Ready to apply? (Use buttons to continue)'
								)
								.addFields(
									{
										name: `<:tick:859297441466679326> Begin`,
										value: `Begin filling out the application`,
									},
									{
										name: `<:false:859297426799853569> Cancel`,
										value: `Cancel the application`,
									}
								)
								.setFooter(
									`You can type "cancel" at any time to exit.`
								),
						],
						components: [row3],
					});
					const filter3 = (btn) => btn.user.bot == false;
					const collector3 = msg.createMessageComponentCollector({
						filter: filter3,
						time: 60000,
					});
					collector3.on('collect', async (btn) => {
						msg.components[0].components.forEach((com) => {
							com.setDisabled(true);
							com.setStyle('SECONDARY');
						});
						let rows2 = new MessageActionRow().addComponents(
							msg.components[0].components
						);
						msg.edit({ components: [rows2] });
						if (btn.customId == '1') {
							btn.deferUpdate();
	
							const questions = data.Questions;
	
							let collectCounter = 0;
							let endCounter = 0;
	
							const appStart = await message.author.send({
								embeds: [
									{
										description: questions[collectCounter++],
										color: '#77ACF1',
									},
								],
							});
							const channel = appStart.channel;
	
							const collector = channel.createMessageCollector({
								filter,
							});
							let ele = true;
							collector.on('collect', async (m) => {
								if (m.content.toLowerCase() == 'cancel')
									return collector.stop('CANCEL');
								if (collectCounter < questions.length) {
									channel.send({
										embeds: [
											{
												description:
													questions[collectCounter++],
												color: '#77ACF1',
											},
										],
									});
								} else if (ele === true) {
									ele = false;
									const btn1 = new MessageButton()
										.setLabel('Confirm')
										.setCustomId('1')
										.setStyle('SUCCESS');
									const btn2 = new MessageButton()
										.setLabel('Cancel')
										.setCustomId('2')
										.setStyle('DANGER');
	
									const row = new MessageActionRow().addComponents(
										btn1,
										btn2
									);
	
									let msg2 = await channel.send({
										embeds: [
											{
												description:
													'Do you want to send your application?',
												color: '#77ACF1',
											},
										],
										components: [row],
									});
									const filter = (fn) => fn;
									const collector3 = msg2.createMessageComponentCollector(
										{
											filter: filter,
											time: 15000,
										}
									);
									collector3.on('collect', (btn) => {
										if (btn.customId == '1') {
											btn.deferUpdate();
											collector.stop('fulfilled');
											collector3.stop();
										} else if (btn.customId == '2') {
											btn.deferUpdate();
											collector.stop('CANCEL');
											collector3.stop();
										}
									});
									collector3.on('end', (collected, reason) => {
										collector.stop('TIME');
										msg2.components[0].components.forEach(
											(com) => {
												com.setDisabled(true);
												com.setStyle('SECONDARY');
											}
										);
										let rows2 = new MessageActionRow().addComponents(
											msg2.components[0].components
										);
										msg2.edit({
											components: [rows2],
										});
									});
								}
							});
	
							const appsChannel = client.channels.cache.get(
								'764885370558349373'
							);
							collector.on('end', (collected, reason) => {
								if (reason === 'CANCEL') {
									return channel.send({
										embeds: [
											{
												description:
													'Application cancelled!',
												color: 'RED',
											},
										],
									});
								}
	
								if (reason === 'fulfilled') {
									let index = 1;
									const mappedResponses = collected
										.map((msg) => {
											return `${index++}) ${
												questions[endCounter++]
											}\n -> ${msg.content}`;
										})
										.join('\n\n');
	
									const embed = new MessageEmbed()
										.setTitle(`${data.Name} Application`)
										.setAuthor(message.author.tag)
										.setDescription(mappedResponses)
										.addField('Status', '**(Pending)**')
										.setColor('#77ACF1');
	
									appsChannel.send({ embeds: [embed] });
								}
								collector3.stop();
							});
						} else if (btn.customId == '2') {
							btn.deferUpdate();
							btn.channel.send({
								embeds: [
									{
										description: 'Application cancelled!',
										color: 'RED',
									},
								],
							});
							collector3.stop();
						}
					});
				});
			}
		},
	};
