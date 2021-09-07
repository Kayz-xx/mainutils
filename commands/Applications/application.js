const Discord = require('discord.js');
const { db } = require('../../firebase');
const { MessageEmbed } = require('discord.js');

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
		const filter = (m) => m.author.id === message.author.id;

		const filter2 = (reaction, user) => {
			return (
				['859297441466679326', '859297426799853569'].includes(
					reaction.emoji.id
				) && user.id === message.author.id
			);
		};
		let data =
			(await db
				.ref(`Applications/${message.guild.id}`)
				.once('value')
				.then((snapshot) => snapshot.val())) || [];

		db.ref(`Applications/${message.guild.id}`);

		String.prototype.capitalize = function() {
			return this.charAt(0).toUpperCase() + this.slice(1);
		};
		if (!data.Positions0)
			return message.author.send({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle(`An Error Occurred`)
						.setColor('DA0037')
						.setDescription(
							`One or more of the applications has not been setup correctly!`
						),
				],
			});
		else if (!data.Positions1)
			return message.author.send({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle(`An Error Occurred`)
						.setColor('DA0037')
						.setDescription(
							`One or more of the applications has not been setup correctly!`
						),
				],
			});
		else if (!data.Positions2)
			return message.author.send({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle(`An Error Occurred`)
						.setColor('DA0037')
						.setDescription(
							`One or more of the applications has not been setup correctly!`
						),
				],
			});
		else if (!data.Positions3)
			return message.author.send({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle(`An Error Occurred`)
						.setColor('DA0037')
						.setDescription(
							`One or more of the applications has not been setup correctly!`
						),
				],
			});
		const msg = await message.author.send({
			embeds: [
				new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Positions Availible')
					.addFields(
						{
							name: `1.${data.Positions0.Name}`,
							value: `Total Questions: 7 \n Status: ${data.Positions0.Status.capitalize()}`,
							inline: true,
						},
						{
							name: `2.${data.Positions1.Name}`,
							value: `Total Questions: 7 \n Status: ${data.Positions1.Status.capitalize()}`,
							inline: true,
						},
						{
							name: `3.${data.Positions2.Name}`,
							value: `Total Questions: 11 \n Status: ${data.Positions2.Status.capitalize()}`,
							inline: true,
						},
						{
							name: `4.${data.Positions3.Name}`,
							value: `Total Questions: 5 \n Status: ${data.Positions3.Status.capitalize()}`,
							inline: true,
						}
					),
			],
		});
		let index = 0;

		const collected = await msg.channel
			.awaitMessages({ filter, max: 1, time: 60000 })
			.then(async (message) => {
				message = message.first();
				if (message.content.toUpperCase() == '1') {
					if (data.Positions0.Status === 'closed')
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
									`Apply For Event Manager: ${message.author.tag}`
								)
								.setColor('#0099ff')
								.setDescription(data.Positions0.Questions[0]),
						],
					});
					const msg = await message.author.send({
						embeds: [
							new Discord.MessageEmbed()
								.setTitle(`Ready?`)
								.setColor('#0099ff')
								.setAuthor(
									'Ready to apply? (Use reactions to continue)'
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
					});
					await msg.react('859297441466679326');
					await msg.react('859297426799853569');
					const react = msg.createReactionCollector({
						filter2,
						max: 1,
						time: 60000,
					});
					react.on('collect', async (reaction, user) => {
						if (reaction.emoji.id == '859297441466679326') {
							let index = 0;
							const questions = data.Positions0.Questions.slice(
								2,
								9
							);

							let collectCounter = 0;
							let endCounter = 0;

							const appStart = await message.author.send({
								embeds: [
									{
										description:
											questions[collectCounter++],
										color: '#77ACF1',
									},
								],
							});
							const channel = appStart.channel;

							const collector = channel.createMessageCollector({
								filter,
							});

							collector.on('collect', (m) => {
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
								} else {
									channel.send({
										embeds: [
											{
												description:
													'Application has been sent!',
												color: '#77ACF1',
											},
										],
									});
									collector.stop('fulfilled');
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
										.setTitle('Event Manager Application')
										.setAuthor(message.author.tag)
										.setDescription(mappedResponses)
										.addField('Status', '**(Pending)**')
										.setColor('#77ACF1');

									appsChannel.send({ embeds: [embed] });
								}
							});
						}
						if (reaction.emoji.id == '859297426799853569') {
							return message.author.send({
								content: 'Okay Goodbye!',
							});
						} else {
							return message.author.send({
								content: 'No reactions added',
							});
						}
					});
				} else if (message.content.toUpperCase() == '2') {
					if (data.Positions1.Status === 'closed')
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
									`Apply For Giveaway Manager: ${message.author.tag}`
								)
								.setColor('#0099ff')
								.setDescription(data.Positions1.Questions[0]),
						],
					});
					const msg = await message.author.send({
						embeds: [
							new Discord.MessageEmbed()
								.setTitle(`Ready?`)
								.setColor('#0099ff')
								.setAuthor(
									'Ready to apply? (Use reactions to continue)'
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
					});
					await msg.react('859297441466679326');
					await msg.react('859297426799853569');
					const react = msg.createReactionCollector({
						filter2,
						max: 1,
						time: 60000,
					});
					react.on('collect', async (reaction, user) => {
						console.log(reaction)
						if (reaction.emoji.id == '859297441466679326') {
							const questions = data.Positions1.Questions.slice(
								2,
								8
							);

							let collectCounter = 0;
							let endCounter = 0;

							const appStart = await message.author.send({
								embeds: [
									{
										description:
											questions[collectCounter++],
										color: '#77ACF1',
									},
								],
							});
							const channel = appStart.channel;

							const collector = channel.createMessageCollector({
								filter,
							});

							collector.on('collect', (m) => {
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
								} else {
									channel.send({
										embeds: [
											{
												description:
													'Application has been sent!',
												color: '#77ACF1',
											},
										],
									});
									collector.stop('fulfilled');
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
										.setTitle(
											'Giveaway Manager Application'
										)
										.setAuthor(message.author.tag)
										.setDescription(mappedResponses)
										.addField('Status', '**(Pending)**')
										.setColor('#77ACF1');

									appsChannel.send({ embeds: [embed] });
								}
							});
						}
						if (reaction.emoji.id == '85927426799853569') {
							return message.author.send({
								content: 'Okay Goodbye!',
							});
						} else {
							return message.author.send({
								content: 'No reactions added',
							});
						}
					});
				} else if (message.content.toUpperCase() == '3') {
					if (data.Positions2.Status === 'closed')
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
									`Apply For Moderator: ${message.author.tag}`
								)
								.setColor('#0099ff')
								.setDescription(data.Positions2.Questions[0]),
						],
					});
					const msg = await message.author.send({
						embeds: [
							new Discord.MessageEmbed()
								.setTitle(`Ready?`)
								.setColor('#0099ff')
								.setAuthor(
									'Ready to apply? (Use reactions to continue)'
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
					});
					await msg.react('859297441466679326');
					await msg.react('859297426799853569');
					const react = msg.createReactionCollector({
						filter2,
						max: 1,
						time: 60000,
					});
					react.on('collect', async (reaction, user) => {
						if (reaction.emoji.id == '859297441466679326') {
							const questions = data.Positions3.Questions.slice(
								2,
								12
							);

							let collectCounter = 0;
							let endCounter = 0;

							const appStart = await message.author.send({
								embeds: [
									{
										description:
											questions[collectCounter++],
										color: '#77ACF1',
									},
								],
							});
							const channel = appStart.channel;

							const collector = channel.createMessageCollector({
								filter,
							});

							collector.on('collect', (m) => {
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
								} else {
									channel.send({
										embeds: [
											{
												description:
													'Application has been sent!',
												color: '#77ACF1',
											},
										],
									});
									collector.stop('fulfilled');
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
										.setTitle('Moderator Application')
										.setAuthor(message.author.tag)
										.setDescription(mappedResponses)
										.addField('Status', '**(Pending)**')
										.setColor('#77ACF1');

									appsChannel.send({ embeds: [embed] });
								}
							});
						}
						if (reaction.emoji.id == '85927426799853569') {
							return message.author.send({
								content: 'Okay Goodbye!',
							});
						} else {
							return message.author.send({
								content: 'No reactions added',
							});
						}
					});
				} else if (message.content === '4') {
					if (data.Positions3.Status === 'closed')
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
									`Apply For Karuta Manager: ${message.author.tag}`
								)
								.setColor('#0099ff')
								.setDescription(data.Positions3.Questions[0]),
						],
					});
					const msg = await message.author.send({
						embeds: [
							new Discord.MessageEmbed()
								.setTitle(`Ready?`)
								.setColor('#0099ff')
								.setAuthor(
									'Ready to apply? (Use reactions to continue)'
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
					});
					await msg.react('859297441466679326');
					await msg.react('859297426799853569');
					const react = msg.createReactionCollector({
						filter2,
						max: 1,
						time: 60000,
					});
					react.on('collect', async (reaction, user) => {
						if (reaction.emoji.id == '859297441466679326') {
							let index = 0;
							const questions = data.Positions3.Questions.slice(
								2,
								9
							);

							let collectCounter = 0;
							let endCounter = 0;

							const appStart = await message.author.send({
								embeds: [
									{
										description:
											questions[collectCounter++],
										color: '#77ACF1',
									},
								],
							});
							const channel = appStart.channel;

							const collector = channel.createMessageCollector({
								filter,
							});

							collector.on('collect', (m) => {
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
								} else {
									channel.send({
										embeds: [
											{
												description:
													'Application has been sent!',
												color: '#77ACF1',
											},
										],
									});
									collector.stop('fulfilled');
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
										.setTitle('Karuta Manager Application')
										.setAuthor(message.author.tag)
										.setDescription(mappedResponses)
										.addField('Status', '**(Pending)**')
										.setColor('#77ACF1');

									appsChannel.send({ embeds: [embed] });
								}
							});
						}
						if (reaction.emoji.id == '85927426799853569') {
							return message.author.send({
								content: 'Okay Goodbye!',
							});
						} else {
							return message.author.send({
								content: 'No reactions added',
							});
						}
					});
				} else {
					message.author.send({
						content: `Terminated: Invalid Response`,
					});
				}
			})
			.catch(async () => {
				console.log(error);
				return message.author.send({
					content: 'There was an error running the command.',
				});
			});
		}
	},
};
