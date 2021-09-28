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
			const filter = (m) => m.author.id === message.author.id;

			const filter2 = (reaction, user) => {
				return (
					['859297441466679326', '859297426799853569'].includes(
						reaction.emoji.id
					) && user.bot == false
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
						const btn1 = new MessageButton()
						.setLabel('Begin')
						.setCustomId('1')
						.setStyle('SUCCESS');
					const btn2 = new MessageButton()
						.setLabel('Cancel')
						.setCustomId('2')
						.setStyle('DANGER');
			
					const row3 = new MessageActionRow()
						.addComponents(btn1, btn2)
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
						 components: [row3]});
						 const filter3 = (btn) => btn.user.bot == false
						 const collector3 = msg.createMessageComponentCollector({
							 filter: filter3,
							 time: 60000,
						   });
						 collector3.on('collect', async (btn) => {
							msg.components[0].components.forEach((com) => {
								com.setDisabled(true);
								com.setStyle('SECONDARY');
							});
							let rows2 = new MessageActionRow().addComponents(msg.components[0].components)
							msg.edit({components: [rows2]});
							 if (btn.customId == '1') {
								 btn.deferUpdate();
								 
							
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
								let ele = true
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
										
									} 
									else if (ele === true) {
										ele = false
										const btn1 = new MessageButton()
										.setLabel('Confirm')
										.setCustomId('1')
										.setStyle('SUCCESS');
									const btn2 = new MessageButton()
										.setLabel('Cancel')
										.setCustomId('2')
										.setStyle('DANGER');
							
									const row = new MessageActionRow()
										.addComponents(btn1, btn2)

										let msg2 = await channel.send({embeds: [
											{
												description:
													'Do you want to send you application?',
												color: '#77ACF1',
											},
										], components: [row]})
										const filter = (fn) => fn
										const collector3 = msg2.createMessageComponentCollector({
											filter: filter,
											time: 15000,
										  });
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
												msg2.components[0].components.forEach((com) => {
													com.setDisabled(true);
													com.setStyle('SECONDARY');
												});
												let rows2 = new MessageActionRow().addComponents(msg2.components[0].components)
												msg2.edit({components: [rows2]});
											
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
											.setTitle('Event Manager Application')
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
										description:
											'Application cancelled!',
										color: 'RED',
									},
								],
							});
							collector3.stop();
						
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
						const btn1 = new MessageButton()
						.setLabel('Begin')
						.setCustomId('1')
						.setStyle('SUCCESS');
					const btn2 = new MessageButton()
						.setLabel('Cancel')
						.setCustomId('2')
						.setStyle('DANGER');
			
					const row3 = new MessageActionRow()
						.addComponents(btn1, btn2)
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
						 components: [row3]});
						 const filter3 = (btn) => btn.user.bot == false
						 const collector3 = msg.createMessageComponentCollector({
							 filter: filter3,
							 time: 60000,
						   });
						 collector3.on('collect', async (btn) => {
							msg.components[0].components.forEach((com) => {
								com.setDisabled(true);
								com.setStyle('SECONDARY');
							});
							let rows2 = new MessageActionRow().addComponents(msg.components[0].components)
							msg.edit({components: [rows2]});
							 if (btn.customId == '1') {
								 btn.deferUpdate();
								 
							
								let index = 0;
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
								let ele = true
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
										
									} 
									else if (ele === true) {
										ele = false
										const btn1 = new MessageButton()
										.setLabel('Confirm')
										.setCustomId('1')
										.setStyle('SUCCESS');
									const btn2 = new MessageButton()
										.setLabel('Cancel')
										.setCustomId('2')
										.setStyle('DANGER');
							
									const row = new MessageActionRow()
										.addComponents(btn1, btn2)

										let msg2 = await channel.send({embeds: [
											{
												description:
													'Do you want to send you application?',
												color: '#77ACF1',
											},
										], components: [row]})
										const filter = (fn) => fn
										const collector3 = msg2.createMessageComponentCollector({
											filter: filter,
											time: 15000,
										  });
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
												msg2.components[0].components.forEach((com) => {
													com.setDisabled(true);
													com.setStyle('SECONDARY');
												});
												let rows2 = new MessageActionRow().addComponents(msg2.components[0].components)
												msg2.edit({components: [rows2]});
											
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
											.setTitle('Giveaway Manager Application')
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
										description:
											'Application cancelled!',
										color: 'RED',
									},
								],
							});
							collector3.stop();
						
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
						const btn1 = new MessageButton()
						.setLabel('Begin')
						.setCustomId('1')
						.setStyle('SUCCESS');
					const btn2 = new MessageButton()
						.setLabel('Cancel')
						.setCustomId('2')
						.setStyle('DANGER');
			
					const row3 = new MessageActionRow()
						.addComponents(btn1, btn2)
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
						 components: [row3]});
						 const filter3 = (btn) => btn.user.bot == false
						 const collector3 = msg.createMessageComponentCollector({
							 filter: filter3,
							 time: 60000,
						   });
						 collector3.on('collect', async (btn) => {
							msg.components[0].components.forEach((com) => {
								com.setDisabled(true);
								com.setStyle('SECONDARY');
							});
							let rows2 = new MessageActionRow().addComponents(msg.components[0].components)
							msg.edit({components: [rows2]});
							 if (btn.customId == '1') {
								 btn.deferUpdate();
								 
							
								let index = 0;
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
								let ele = true
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
										
									} 
									else if (ele === true) {
										ele = false
										const btn1 = new MessageButton()
										.setLabel('Confirm')
										.setCustomId('1')
										.setStyle('SUCCESS');
									const btn2 = new MessageButton()
										.setLabel('Cancel')
										.setCustomId('2')
										.setStyle('DANGER');
							
									const row = new MessageActionRow()
										.addComponents(btn1, btn2)

										let msg2 = await channel.send({embeds: [
											{
												description:
													'Do you want to send you application?',
												color: '#77ACF1',
											},
										], components: [row]})
										const filter = (fn) => fn
										const collector3 = msg2.createMessageComponentCollector({
											filter: filter,
											time: 15000,
										  });
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
												msg2.components[0].components.forEach((com) => {
													com.setDisabled(true);
													com.setStyle('SECONDARY');
												});
												let rows2 = new MessageActionRow().addComponents(msg2.components[0].components)
												msg2.edit({components: [rows2]});
											
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
											.setTitle('Moderator Application')
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
										description:
											'Application cancelled!',
										color: 'RED',
									},
								],
							});
							collector3.stop();
						
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
						const btn1 = new MessageButton()
						.setLabel('Begin')
						.setCustomId('1')
						.setStyle('SUCCESS');
					const btn2 = new MessageButton()
						.setLabel('Cancel')
						.setCustomId('2')
						.setStyle('DANGER');
			
					const row3 = new MessageActionRow()
						.addComponents(btn1, btn2)
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
						 components: [row3]});
						 const filter3 = (btn) => btn.user.bot == false
						 const collector3 = msg.createMessageComponentCollector({
							 filter: filter3,
							 time: 60000,
						   });
						 collector3.on('collect', async (btn) => {
							msg.components[0].components.forEach((com) => {
								com.setDisabled(true);
								com.setStyle('SECONDARY');
							});
							let rows2 = new MessageActionRow().addComponents(msg.components[0].components)
							msg.edit({components: [rows2]});
							 if (btn.customId == '1') {
								 btn.deferUpdate();
								 
							
								let index = 0;
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
								let ele = true
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
										
									} 
									else if (ele === true) {
										ele = false
										const btn1 = new MessageButton()
										.setLabel('Confirm')
										.setCustomId('1')
										.setStyle('SUCCESS');
									const btn2 = new MessageButton()
										.setLabel('Cancel')
										.setCustomId('2')
										.setStyle('DANGER');
							
									const row = new MessageActionRow()
										.addComponents(btn1, btn2)

										let msg2 = await channel.send({embeds: [
											{
												description:
													'Do you want to send you application?',
												color: '#77ACF1',
											},
										], components: [row]})
										const filter = (fn) => fn
										const collector3 = msg2.createMessageComponentCollector({
											filter: filter,
											time: 15000,
										  });
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
												msg2.components[0].components.forEach((com) => {
													com.setDisabled(true);
													com.setStyle('SECONDARY');
												});
												let rows2 = new MessageActionRow().addComponents(msg2.components[0].components)
												msg2.edit({components: [rows2]});
											
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
											.setTitle('Karuta Manager Application')
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
										description:
											'Application cancelled!',
										color: 'RED',
									},
								],
							});
							collector3.stop();
						
						}
					});
					} else {
						message.author.send({
							content: `The response you gave was invalid, ended application process.`,
						});
					}
				})
				.catch(async (error) => {
					console.log(error);
					return message.author.send({
						content: 'There was an error running the command.',
					});
				});
			}
		},
	};
