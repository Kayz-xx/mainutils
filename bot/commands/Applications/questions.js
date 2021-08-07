const DiscordJS = require('discord.js');
const { db } = require('../../firebase');
const Discord = require('discord.js');

module.exports = {
	name: 'questions',
	aliases: ['appsetup'],
	cooldown: '0',
	permissions: [],
	category: 'Applications',
	description:
		"This command set's the positions' status(Open or Closed) availible for the server",
	async execute(client, message, cmd, args) {
		if (!message.member.hasPermission('ADMINISTRATOR'))
		return message.channel.send('You cannot use this command!')
		const filter = (m) => m.author.id === message.author.id;

		let data =
			(await db
				.ref(`Applications/${message.guild.id}`)
				.once('value')
				.then((snapshot) => snapshot.val())) || [];

		db.ref(`Applications/${message.guild.id}`);

		String.prototype.capitalize = function() {
			return this.charAt(0).toUpperCase() + this.slice(1);
		};
		const msg = message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Positions Availible')
				.setAuthor('Select one of the below!')
				.addFields(
					{
						name: `1.${data.Positions0.Name}`,
						value: `Total Questions: ${data.Positions0.Questions.slice(2, 6).length} \n Status: ${data.Positions0.Status.capitalize()}`,
						inline: true,
					},
					{
						name: `2.${data.Positions1.Name}`,
						value: `Total Questions: 6 \n Status: ${data.Positions1.Status.capitalize()}`,
						inline: true,
					},
					{
						name: `3.${data.Positions2.Name}`,
						value: `Total Questions: 12 \n Status: ${data.Positions2.Status.capitalize()}`,
						inline: true,
					},
					{
						name: `4.${data.Positions3.Name}`,
						value: `Total Questions: 5 \n Status: ${data.Positions3.Status.capitalize()}`,
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
					message.channel.send(
						`You have 120 seconds, to setup the questions for ${data.Positions0.Name}! When you are done type \`done\` or after 12 questions it will auto-set.`
					);
					const questions = [
						'Specify an intro message',	
						'Specify an acceptance message',
						'What do you want as the 1st question?',
						'What do you want as the 2nd question?',
						'What do you want as the 3rd question?',
						'What do you want as the 4th question?',
						'What do you want as the 5th question?',
						'What do you want as the 6th question?',
						'What do you want as the 7th question?',
						'What do you want as the 8th question?',
						'What do you want as the 9th question?',
						'What do you want as the 10th question?',
						'What do you want as the 11th question?',
						'What do you want as the 12th question?',
					];
					let counter = 0;

					const filter = (m) => {
						return m.author.id === message.author.id;
					};

					const collector = new DiscordJS.MessageCollector(
						message.channel,
						filter,
						{
							max: questions.length,
							time: 120000,
						}
					);

					message.channel.send({
						embed: {
							description: questions[counter++],
							color: '#77ACF1',
						},
					});
					collector.on('collect', (m) => {
						if (m.content.toLowerCase() == 'done')
							return collector.stop('DONE');
						if (counter < questions.length) {
							m.channel.send({
								embed: {
									description: questions[counter++],
									color: '#77ACF1',
								},
							});
						}
					});

					collector.on('end', (collected, reason) => {
						console.log(`Collected ${collected.size} messages`);
						if (reason == 'DONE') {
							message.channel.send('Setup Ended, questions set!');
						}

						let counter = 0;
						collected.forEach((value) => {
							if (value.content.toUpperCase() === 'DONE') return;
							console.log(questions[counter++], value.content);
						});
						let index = 0;
						collected.forEach((value) => {
							if (value.content.toUpperCase() === 'DONE') return;
							db.ref(
								`Applications/${
									message.guild.id
								}/Positions0/Questions/${index++}`
							).set(value.content);
						});
					});
				} else if (message.content.toUpperCase() == '2') {
					message.channel.send(
						`You have 120 seconds, to setup the questions for ${data.Positions1.Name}! When you are done type \`done\` or after 12 questions it will auto-set.`
					);
					const questions = [
						'Specify an intro message',	
						'Specify an acceptance message',
						'What do you want as the 1st question?',
						'What do you want as the 2nd question?',
						'What do you want as the 3rd question?',
						'What do you want as the 4th question?',
						'What do you want as the 5th question?',
						'What do you want as the 6th question?',
						'What do you want as the 7th question?',
						'What do you want as the 8th question?',
						'What do you want as the 9th question?',
						'What do you want as the 10th question?',
						'What do you want as the 11th question?',
						'What do you want as the 12th question?',
					];
					let counter = 0;

					const filter = (m) => {
						return m.author.id === message.author.id;
					};

					const collector = new DiscordJS.MessageCollector(
						message.channel,
						filter,
						{
							max: questions.length,
							time: 120000,
						}
					);

					message.channel.send({
						embed: {
							description: questions[counter++],
							color: '#77ACF1',
						},
					});
					collector.on('collect', (m) => {
						if (m.content.toLowerCase() == 'done')
							return collector.stop('DONE');
						if (counter < questions.length) {
							m.channel.send({
								embed: {
									description: questions[counter++],
									color: '#77ACF1',
								},
							});
						}
					});

					collector.on('end', (collected, reason) => {
						console.log(`Collected ${collected.size} messages`);
						if (reason == 'DONE') {
							message.channel.send('Setup Ended, questions set!');
						}

						let counter = 0;
						collected.forEach((value) => {
							if (value.content.toUpperCase() === 'DONE') return;
							console.log(questions[counter++], value.content);
						});
						let index = 0;
						collected.forEach((value) => {
							if (value.content.toUpperCase() === 'DONE') return;
							db.ref(
								`Applications/${
									message.guild.id
								}/Positions1/Questions/${index++}`
							).set(value.content);
						});
					});
				} else if (message.content.toUpperCase() == '3') {
					message.channel.send(
						`You have 120 seconds, to setup the questions for ${data.Positions2.Name}! When you are done type \`done\` or after 12 questions it will auto-set.`
					);
					const questions = [
						'Specify an intro message',	
						'Specify an acceptance message',
						'What do you want as the 1st question?',
						'What do you want as the 2nd question?',
						'What do you want as the 3rd question?',
						'What do you want as the 4th question?',
						'What do you want as the 5th question?',
						'What do you want as the 6th question?',
						'What do you want as the 7th question?',
						'What do you want as the 8th question?',
						'What do you want as the 9th question?',
						'What do you want as the 10th question?',
						'What do you want as the 11th question?',
						'What do you want as the 12th question?',
					];
					let counter = 0;

					const filter = (m) => {
						return m.author.id === message.author.id;
					};

					const collector = new DiscordJS.MessageCollector(
						message.channel,
						filter,
						{
							max: questions.length,
							time: 120000,
						}
					);

					message.channel.send({
						embed: {
							description: questions[counter++],
							color: '#77ACF1',
						},
					});
					collector.on('collect', (m) => {
						if (m.content.toLowerCase() == 'done')
							return collector.stop('DONE');
						if (counter < questions.length) {
							m.channel.send({
								embed: {
									description: questions[counter++],
									color: '#77ACF1',
								},
							});
						}
					});

					collector.on('end', (collected, reason) => {
						console.log(`Collected ${collected.size} messages`);
						if (reason == 'DONE') {
							message.channel.send('Setup Ended, questions set!');
						}

						let counter = 0;
						collected.forEach((value) => {
							if (value.content.toUpperCase() === 'DONE') return;
							console.log(questions[counter++], value.content);
						});
						let index = 0;
						collected.forEach((value) => {
							if (value.content.toUpperCase() === 'DONE') return;
							db.ref(
								`Applications/${
									message.guild.id
								}/Positions2/Questions/${index++}`
							).set(value.content);
						});
					});
				} else if (message.content.toUpperCase() == '4') {
						message.channel.send(
							`You have 120 seconds, to setup the questions for ${data.Positions3.Name}! When you are done type \`done\` or after 12 questions it will auto-set.`
						);
						const questions = [
							'Specify an intro message',	
							'Specify an acceptance message',
							'What do you want as the 1st question?',
							'What do you want as the 2nd question?',
							'What do you want as the 3rd question?',
							'What do you want as the 4th question?',
							'What do you want as the 5th question?',
							'What do you want as the 6th question?',
							'What do you want as the 7th question?',
							'What do you want as the 8th question?',
							'What do you want as the 9th question?',
							'What do you want as the 10th question?',
							'What do you want as the 11th question?',
							'What do you want as the 12th question?',
						];
						let counter = 0;
	
						const filter = (m) => {
							return m.author.id === message.author.id;
						};
	
						const collector = new DiscordJS.MessageCollector(
							message.channel,
							filter,
							{
								max: questions.length,
								time: 120000,
							}
						);
	
						message.channel.send({
							embed: {
								description: questions[counter++],
								color: '#77ACF1',
							},
						});
						collector.on('collect', (m) => {
							if (m.content.toLowerCase() == 'done')
								return collector.stop('DONE');
							if (counter < questions.length) {
								m.channel.send({
									embed: {
										description: questions[counter++],
										color: '#77ACF1',
									},
								});
							}
						});
	
						collector.on('end', (collected, reason) => {
							console.log(`Collected ${collected.size} messages`);
							if (reason == 'DONE') {
								message.channel.send('Setup Ended, questions set!');
							}
	
							let counter = 0;
							collected.forEach((value) => {
								if (value.content.toUpperCase() === 'DONE') return;
								console.log(questions[counter++], value.content);
							});
							let index = 0;
							collected.forEach((value) => {
								if (value.content.toUpperCase() === 'DONE') return;
								db.ref(
									`Applications/${
										message.guild.id
									}/Positions3/Questions/${index++}`
								).set(value.content);
							});
						});
				} else {
					message.channel.send(`Terminated: Invalid Response`);
				}
			})
			.catch(async (error) => {
				console.log(error);
				return message.channel.send('No response. Prompt Cancelled');
			});
	},
};
