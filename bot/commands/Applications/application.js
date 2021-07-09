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
		'This command lets you apply for the current availible positions!',
	async execute(client, message, cmd, args) {
		message.react('<:tick:859297441466679326>');
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
		const msg = await message.author.send(
			new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Positions Availible')
				.addFields(
					{
						name: `1.${data.Positions0.Name}`,
						value: `Total Questions: 7 \n Status: ${data.Positions0.Status}`,
						inline: true,
					},
					{
						name: `2.${data.Positions1.Name}`,
						value: `Total Questions: 7 \n Status: ${data.Positions1.Status}`,
						inline: true,
					},
					{
						name: `3.${data.Positions2.Name}`,
						value: `Total Questions: 10 \n Status:${data.Positions2.Status}`,
						inline: true,
					}
				)
		);
		const collected = await msg.channel
			.awaitMessages(filter, {
				max: 1,
				time: 60000,
			})
			.then(async (message) => {
				message = message.first();
				if (message.content.toUpperCase() == '1') {
					if (data.Positions0.Status === 'Closed')
						return message.author.send(
							new Discord.MessageEmbed()
								.setTitle(`An Error Occurred`)
								.setColor('DA0037')
								.setDescription(
									`This application is closed, please wait for it to be open!`
								)
						);
					message.author.send(
						new Discord.MessageEmbed()
							.setTitle(
								`Apply For Event Manager: ${message.author.tag}`
							)
							.setColor('#0099ff')
							.setDescription(
								'This is the Event Manager Application for Elite Empire. Please make sure you will be able to reach the daily quota of 3 events before applying. Answer the questions truthfully and to the best of your ability. Good luck!'
							)
					);
					const msg = await message.author.send(
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
					);
					await msg.react('859297441466679326');
					await msg.react('859297426799853569');
					await msg
						.awaitReactions(filter2, {
							max: 1,
							time: 60000,
							errors: ['time'],
						})
						.then(async (collected) => {
							if (
								collected.first().emoji.id ==
								'859297441466679326'
							) {
								const questions = [
									`What's your discord name? (name with #)`,
									`What's your discord ID? (if need help contact a staff member to tell you your discord ID.)`,
									`The daily requirement is hosting at least 3 events per day (these events must be sponsored by you & the minimum amount given away per winner is 1mill) do you think you will be able to manage this?`,
									` What's your timezone? (PST, CST, EST...)`,
									`Have you read the dank memer rules for giveaways?`,
									` Do you know how to run Mudae events, Slots Events, Fight Cages or Mafia events? If so, which ones?`,
									`Do you have any new ideas for events?`,
								];

								let collectCounter = 0;
								let endCounter = 0;

								const appStart = await message.author.send({
									embed: {
										description:
											questions[collectCounter++],
										color: '#77ACF1',
									},
								});
								const channel = appStart.channel;

								const collector = channel.createMessageCollector(
									filter
								);

								collector.on('collect', () => {
									if (collectCounter < questions.length) {
										channel.send({
											embed: {
												description:
													questions[collectCounter++],
												color: '#77ACF1',
											},
										});
									} else {
										channel.send({
											embed: {
												description:
													'Application has been sent!',
												color: '#77ACF1',
											},
										});
										collector.stop('fulfilled');
									}
								});

								const appsChannel = client.channels.cache.get(
									'855828767846039582'
								);
								collector.on('end', (collected, reason) => {
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
												'Event Manager Application'
											)
											.setAuthor(message.author.tag)
											.setDescription(mappedResponses)
											.addField('Status', '**(Pending)**')
											.setColor('#77ACF1');

										appsChannel.send(embed);
									}
								});
							}
							if (
								collected.first().emoji.id ==
								'859297426799853569'
							) {
								return message.author.send('Okay Goodbye!');
							} else {
								return message.author.send(
									'No reactions added'
								);
							}
						})
						.catch(async () => {
							return message.author.send(
								'You took too long to react!'
							);
						});
				} else if (message.content.toUpperCase() == '2') {
					if (data.Positions1.Status === 'Closed')
						return message.author.send(
							new Discord.MessageEmbed()
								.setTitle(`An Error Occurred`)
								.setColor('DA0037')
								.setDescription(
									`This application is closed, please wait for it to be open!`
								)
						);
					message.author.send(
						new Discord.MessageEmbed()
							.setTitle(
								`Apply For Giveaway Manager: ${message.author.tag}`
							)
							.setColor('#0099ff')
							.setDescription(
								'This is the Giveawy Manager Application for Elite Empire. Please make sure you will be able to reach the daily quota of 3 mil per day before applying. Answer the questions truthfully and to the best of your ability. Good luck!'
							)
					);
					const msg = await message.author.send(
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
					);
					await msg.react('859297441466679326');
					await msg.react('859297426799853569');
					await msg
						.awaitReactions(filter2, {
							max: 1,
							time: 60000,
							errors: ['time'],
						})
						.then(async (collected) => {
							if (
								collected.first().emoji.id ==
								'859297441466679326'
							) {
								const questions = [
									`What's your discord name? (name with #)`,
									`What's your discord ID? (if need help contact a staff member to tell you your discord ID.)`,
									`The daily requirement is currently 3Mil, do you think you will be able to give this much away per day? (if the answer is no to this, your application will immediately be overlooked.)`,
									`What's your timezone? (PST, CST, EST...)`,
									`Have you read the dank memer rules for giveaways?`,
									`How much money do you have total in your inventory, bank and wallet? (This will be checked, so don't exaggerate)`,
								];

								let collectCounter = 0;
								let endCounter = 0;

								const appStart = await message.author.send({
									embed: {
										description:
											questions[collectCounter++],
										color: '#77ACF1',
									},
								});
								const channel = appStart.channel;

								const collector = channel.createMessageCollector(
									filter
								);

								collector.on('collect', () => {
									if (collectCounter < questions.length) {
										channel.send({
											embed: {
												description:
													questions[collectCounter++],
												color: '#77ACF1',
											},
										});
									} else {
										channel.send({
											embed: {
												description:
													'Application has been sent!',
												color: '#77ACF1',
											},
										});
										collector.stop('fulfilled');
									}
								});

								const appsChannel = client.channels.cache.get(
									'855828767846039582'
								);
								collector.on('end', (collected, reason) => {
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

										appsChannel.send(embed);
									}
								});
							}
							if (
								collected.first().emoji.id ==
								'85927426799853569'
							) {
								return message.author.send('Okay Goodbye!');
							} else {
								return message.author.send(
									'No reactions added'
								);
							}
						})
						.catch(async () => {
							return message.author.send(
								'You took too long to react!'
							);
						});
				} else if (message.content.toUpperCase() == '3') {
					if (data.Positions2.Status === 'Closed')
						return message.author.send(
							new Discord.MessageEmbed()
								.setTitle(`An Error Occurred`)
								.setColor('DA0037')
								.setDescription(
									`This application is closed, please wait for it to be open!`
								)
						);
					message.author.send(
						new Discord.MessageEmbed()
							.setTitle(
								`Apply For Moderator: ${message.author.tag}`
							)
							.setColor('#0099ff')
							.setDescription(
								'This is the Moderator Application for Elite Empire. Please make sure you will be able to reach the daily quota of 3 mil per day before applying. Answer the questions truthfully and to the best of your ability. Good luck!'
							)
					);
					const msg = await message.author.send(
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
					);
					await msg.react('859297441466679326');
					await msg.react('859297426799853569');
					await msg
						.awaitReactions(filter2, {
							max: 1,
							time: 60000,
							errors: ['time'],
						})
						.then(async (collected) => {
							if (
								collected.first().emoji.id ==
								'859297441466679326'
							) {
								const questions = [
									`What's your discord name? (name with #)`,
									`What's your discord ID? (if need help contact a staff member to tell you your discord ID.)`,
									`What's your timezone? (PST, CST, EST...)`,
									`How long have you been in Elite Empire?`,
									`What's your current Amari level?`,
									`Do you have any previous experience with moderation?`,
									`Why should we choose you over other applicants?`,
									`Why do you want to be a moderator in this server?`,
									`Are you familiar with Carl Bot and Dank Memer?`,
									`List some carl bot moderation commands that you know.`,
									`Do you agree to follow all Discord TOS and Dank Memer rules?`,
								];

								let collectCounter = 0;
								let endCounter = 0;

								const appStart = await message.author.send({
									embed: {
										description:
											questions[collectCounter++],
										color: '#77ACF1',
									},
								});
								const channel = appStart.channel;

								const collector = channel.createMessageCollector(
									filter
								);

								collector.on('collect', () => {
									if (collectCounter < questions.length) {
										channel.send({
											embed: {
												description:
													questions[collectCounter++],
												color: '#77ACF1',
											},
										});
									} else {
										channel.send({
											embed: {
												description:
													'Application has been sent!',
												color: '#77ACF1',
											},
										});
										collector.stop('fulfilled');
									}
								});

								const appsChannel = client.channels.cache.get(
									'855828767846039582'
								);
								collector.on('end', (collected, reason) => {
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

										appsChannel.send(embed);
									}
								});
							}
							if (
								collected.first().emoji.id ==
								'85927426799853569'
							) {
								return message.author.send('Okay Goodbye!');
							} else {
								return message.author.send(
									'No reactions added'
								);
							}
						})
						.catch(async () => {
							return message.author.send(
								'You took too long to react!'
							);
						});
				} else {
					message.author.send(`Terminated: Invalid Response`);
				}
			})
			.catch(async () => {
				console.log(error);
				return message.author.send('No response. Prompt Cancelled');
			});
	},
};
