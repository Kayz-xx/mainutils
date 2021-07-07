const { db } = require('../../firebase');
const DiscordJS = require('discord.js');

module.exports = {
	name: 'amount',
	aliases: ['setamount'],
	cooldown: '0',
	category: 'Donations',
	usage: '<amount>',
	permissions: [],
	commands: ['amount'],
	description: 'Sets up the autorole amount',
	
	async execute(client, message, cmd, args) {
		try {
			if (!message.member.hasPermission('MANAGE_GUILD'))
				return message.channel
					.send('You do not have permission to use this command.')
					.then((m) => m.delete({ timeout: 5000 }));

			const questions = [
				'Please specify amount 1',
				'Please specify amount 2',
				'Please specify amount 3',
				'Please specify amount 4',
				'Please specify amount 5',
				'Please specify amount 6',
				'Please specify amount 7',
				'Please specify amount 8',
				'Please specify amount 9',
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
					time: 100000,
				}
			);

			message.channel.send(questions[counter++]);
			collector.on('collect', (m) => {
				if (counter < questions.length) {
					m.channel.send(questions[counter++]);
				}
			});

			collector.on('end', (collected) => {
				console.log(`Collected ${collected.size} messages`);

				if (collected.size < questions.length) {
					message.reply('You did not answer the questions in time');
					return;
				}

				let counter = 0;
				collected.forEach((value) => {
					console.log(questions[counter++], value.content);
				});
				let index = 1;
				collected.forEach((value) => {
					db.ref(
						`Donations/Info/${
							message.guild.id
						}/Settings/Amount${index++}`
					).set(value.content);
				});
			});
		} catch (e) {
			console.log(e.stack);
			return message.channel.send(e.message);
		}
	},
};
