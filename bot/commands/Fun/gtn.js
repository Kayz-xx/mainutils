const guildNumber = new Map();
const guildAttempts = new Map();

function guildNumberMap(message) {
	const guildId = message.guild.id;

	var number = Math.floor(Math.random() * 100) + 1;
	// If there is no command running map for the guild, create one
	if (!guildNumber.get(guildId)) {
		guildNumber.set(guildId, number);
	}
}

function guildAttemptsMap(message) {
	const guildId = message.guild.id;
	// If there is no command running map for the guild, create one
	if (!guildAttempts.get(guildId)) {
		guildAttempts.set(guildId, { attempts: 1 });
	} else {
		guildAttempts.get(guildId).attempts++;
	}
}
const Discord = require('discord.js');
module.exports = {
	name: 'guessthenumber',
	aliases: ['gtn', 'guess'],
	cooldown: '0',
	permissions: [],
	category: 'Fun',
	description: 'Just a regular guess command',

	async execute(client, message, cmd, args) {
		const { member, channel, guild } = message;

		const provideaguess = new Discord.MessageEmbed()
			.setColor('#F30B04')
			.setDescription(`**❌ Please provide a guess!**`);

		const pickinganumber = new Discord.MessageEmbed()
			.setColor('#33F304')
			.setTitle('Guess The Number')
			.setDescription(
				'**Picking a number between 1 and 100**\n\nYou have 7 attempts to guess the number'
			)
			.setFooter('Start guessing by running `guess <number>`')
			.setTimestamp();

		await guildNumberMap(message);
		await guildAttemptsMap(message);

		let guess = args[0];
		if (!guess && guildAttempts.get(guild.id).attempts === 1) {
			return channel.send(pickinganumber);
		} else if (!guess) {
			return channel.send(provideaguess);
		}

		let attempts = guildAttempts.get(guild.id);

		if (attempts.attempts > 8) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#F30B04')
					.setDescription(`**❌ You used all your attempts!**`)
					.setFooter(`The number was ${guildNumber.get(guild.id)}`)
			);
		}

		if (+guess === guildNumber.get(guild.id)) {
			let attempts = guildAttempts.get(guild.id);
			if ((attempts.attempts = 1))
				return message.channel.send(
					new Discord.MessageEmbed()
						.setColor('#33F304')
						.setTitle('JACKPOT')
						.setDescription(
							`You guessed the number on your first try! you must have some skills!`
						)
				);
			const guessedthenumber = new Discord.MessageEmbed()
				.setColor('#33F304')
				.setDescription(
					`✅ Perfect, <@${
						member.id
					}> the number was ${guildNumber.get(
						guild.id
					)}, it only took you ${attempts.attempts} attempts!`
				);

			channel.send(guessedthenumber);
			guildNumber.delete(guild.id);
			guildAttempts.delete(guild.id);

			return;
		} else if (+guess < guildNumber.get(guild.id)) {
			return message.reply(`${guess} Is too low!`);
		} else if (+guess > guildNumber.get(guild.id)) {
			return message.reply(`${guess} Is too high!`);
		} else {
			return message.reply('Invalid number please try again');
		}
	},
};
