const Discord = require('discord.js');
const { Permissions } = require('discord.js');
module.exports = {
	name: 'poll',
	aliases: ['apoll'],
	cooldown: '0',
	permissions: [],
	category: 'Misc',

	async execute(client, message, cmd, args) {
		if (cmd === 'poll') {
			const pll = args.join(' ');
			if (
				!message.member.permissions.has(
					Permissions.FLAGS.MANAGE_MESSAGES
				)
			) {
				return message.channel.send({
					content: "You don't have enough Permissions",
				});
			}
			if (!pll) {
				return message.channel.send({
					content: 'Enter some text for the Poll',
				});
			}
			let embed = new Discord.MessageEmbed()
				.setTitle('Poll')
				.setDescription(`${pll}`)
				.setFooter(`Started by ${message.author.username}`)
				.setColor('RANDOM');
			message.channel
				.send({ embeds: [embed] })
				.then(function(message, str) {
					message.react('✅');
					message.react('❌');
				})
				.catch(function() {});
		}
		if (cmd === 'apoll') {
      if (
				!message.member.permissions.has(
					Permissions.FLAGS.MANAGE_MESSAGES
				)
			) {
				return message.channel.send({
					content: "You don't have enough Permissions",
				});
			}
			const options = [
				'1️⃣',
				'2️⃣',
				'3️⃣',
				'4️⃣',
				'5️⃣',
				'6️⃣',
				'7️⃣',
				'8️⃣',
				'9️⃣',
				'🔟',
			];
			let question = [];

			for (let i = 0; i < args.length; i++) {
				if (args[i].startsWith('"')) break;
				else question.push(args[i]);
			}

			question = question.join(' ');

			const choices = [];

			const regex = /(["'])((?:\\\1|\1\1|(?!\1).)*)\1/g;
			let match;
			while ((match = regex.exec(args.join(' ')))) choices.push(match[2]);

			let content = [];
			for (let i = 0; i < choices.length; i++)
				content.push(`${options[i]} ${choices[i]}`);
			content = content.join('\n\n');

			let embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle(`**${question}**`)
				.setDescription(content)
				.setFooter(`Poll by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send({ embeds: [embed] }).then(async (m) => {
				for (let i = 0; i < choices.length; i++)
					await m.react(options[i]);
			});
		}
	},
};
