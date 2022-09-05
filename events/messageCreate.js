const config = require('../config.json');
const cooldowns = new Map();
const {
	MessageButton,
	MessageEmbed,
	MessageActionRow,
	Collection,
	Permissions
} = require('discord.js');
const { evaluate } = require('mathjs');
const afk = require('../functions/afk');
const hl = require('../functions/highlight');
const ar = require('../functions/autoResponse');
const { findPing } = require('../functions/user');
// const { db } = require('../firebase');
// const custom = require('../schemas/ping-schema');
const messengers = [];
module.exports.run = async (client, message) => {
	if (message.channel.type === 'GUILD_TEXT') {
		if (!messengers.includes(message.author.id)) addUser(message.author.id);
		if (message.author.bot) return;
		try {
			const operators = ['/', '*', '+', '-'];
			const conditions = ['k', 'm', 'b'];
			let ms = 0;
			if (conditions.some((el) => message.content.includes(el))) {
				let object = {
					k: 'e3',
					m: 'e6',
					b: 'e9',
				};
				ms = message.content.replace(/k|m|b/g, function (m) {
					return object[m];
				});
			} else {
				ms = message.content.replace(/,/g, '');
			}
			let check = /\d/.test(ms);
			if (check && operators.some((el) => ms.includes(el))) {
				let num = evaluate(ms);
				if (isNaN(num)) return;
				message.react('✔');
				const filter = (reaction, user) => {
					return user.bot === false;
				};
				const collector = message.createReactionCollector({
					filter,
					time: 15000,
					max: 2,
				});
				collector.on('collect', (reaction, user) => {
					if (reaction.emoji.name === '✔') {
						let embed = new MessageEmbed()
							.setTitle(`Calculated ${Math.round(num)}`)
							.setDescription(
								`Calculated: \`${num.toLocaleString()}\`\nRaw: \`${num}\``,
							)
							.setColor('RANDOM');
						message.channel.send({ embeds: [embed] });
					}
				});
			}
		} catch (err) {}

		const mentionedMember = message.mentions.members.first();
		if (mentionedMember) {
			const ping = await afk.find(mentionedMember.id, message.guild.id);
			if (ping && ping?.AFK === true) {
				if (message.author.id === ping.userId) return;
				const { timestamp, reason } = ping;
				await afk.push(
					ping.userId,
					ping.guildId,
					message.url,
					message.author.id,
					message.createdTimestamp,
				);
				let embeds = new MessageEmbed()
					.setAuthor({
						name: message.author.tag,
						iconURl: message.author.displayAvatarURL(),
					})
					.setDescription(
						`<:replycont:877221297308958761> ${mentionedMember} is currently AFK: ${reason}\n<:reply:877221312198754355> <t:${timestamp}:R>`,
					)
					.setColor('ffffff');
				message.reply({ embeds: [embeds] });
			}
		}

		const getData = await afk.find(message.author.id, message.guild.id);
		if (getData?.AFK === true) {
			const { timestamp } = getData;
			let now = Math.round(Date.now() / 1000);
			let diff = now - timestamp;
			if (diff >= 0) {
				let map = getData.pings.map((x) => {
					return `<@${x.author}> **-** <t:${Math.round(
						x.time / 1000,
					)}:R> : [Here](${x.url})`;
				});
				let embed = new MessageEmbed()
					.setTitle(`Welcome back, ${message.author.username}`)
					.setColor('RANDOM');
				if (getData.pings.length > 0) {
					embed.setDescription(
						`You got ${
							getData.pings.length
						} pings(s) while you were afk:\n${map.join('\n')}`,
					);
				}
				message.reply({ embeds: [embed] }).then((msg) => {
					setTimeout(() => msg.delete(), 3000);
				});
				message.author.send({ embeds: [embed] }).catch((err) => {});
				await afk.set(message.author.id, message.guild.id);
			}
		}
		const prefix = config.prefix;
		if (!message.content.startsWith(prefix)) {
			const arResult = await ar.checkAr(message.guild.id);
			const data = await hl.searchHighlight(
				message.guild.id,
				message.content,
			);
			if (arResult.length > 0) {
				for (let i = 0; i < arResult.length; i++) {
					let arCheck = arResult[i];
					let checkStr = arCheck.trigger;
					let regex = new RegExp(`\\b${checkStr}\\b`, 'gi');
					if (regex.test(message.content)) {
						if (
							arCheck.ignoredChannels?.includes(
								message.channel.id,
							) ||
							arCheck.ignoredMembers?.includes(message.author.id)
						)
							return;
						// if(message.author.id === arCheck.userId) return;
						if (arCheck.type === 'react') {
							message.react(arCheck.response);
						} else {
							message.channel.send(arCheck.response);
						}
					}
				}
			}
			if (data) {
				for (let i = 0; i < data.length; i++) {
					const member = await message.guild.members.fetch(
						data[i].userId,
					);
					if (
						!member
							.permissionsIn(message.channel.id)
							.has('VIEW_CHANNEL') &&
						messengers.includes(member.id) 
						// member.id === message.author.id
					)
						continue;
					const word = data[i].words.find((x) =>
						message.content.toLowerCase().includes(x.toLowerCase()),
					);
					let str = '';
					await new Promise((resolve) => setTimeout(resolve, 2500));
					let msg = await message.channel.messages
						.fetch({ around: message.id, limit: 5 })
						.catch();
					msg.reverse().map(
						(message) =>
							(str += `**[<t:${Math.round(
								message.createdTimestamp / 1000,
							)}:T>] ${message.author.tag}:** ${
								message.content
							}\n`),
					);
					const embed = new MessageEmbed()
						.setTitle(word)
						.setDescription(str)
						.setTimestamp()
						.setColor('RANDOM');
					// .addField(
					// 	'Source Message',
					// 	`[Link](${message.url})`,
					// 	false,
					// );
					const button = new MessageButton()
						.setLabel('Jump')
						.setStyle('LINK')
						.setURL(message.url);
					const row = new MessageActionRow().addComponents(button);
					// const user = await client.users.fetch(data[i].userId);
					member.send({
						content: `In ${message.guild.name} <#${message.channel.id}>, you were mentioned with highlight word '${word}'`,
						embeds: [embed],
						components: [row],
					}).catch(err => {})
				}
			}
			if (
				!message.member.roles.cache.hasAny(
					'800814702800142337',
					'840849272420302850',
					'825919715238871063',
					'851263668595326976',
				) &&
				!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
			)
				return;
			if (message.mentions.members.size < 1) return;
			message.mentions.members.forEach(async (member) => {
				if (
					!member
						.permissionsIn(message.channel.id)
						.has('VIEW_CHANNEL')
				)
					return;
				let user = await findPing(message.guild.id, member.id);
				if (user?.pings.length > 10) return;
				user?.pings.push({
					time: Date.now(),
					content: message.content,
					link: message.url,
					author: message.author.tag,
					channel: message.channel.id,
				});
				user.save();
			});
		}
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const cmd = args.shift().toLowerCase();

		const command =
			client.commands.get(cmd) ||
			client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

		if (command) {
			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Collection());
			}

			const currentDate = Date.now();
			const timeStamps = cooldowns.get(command.name);
			const cooldown = command.cooldown * 1000;

			if (timeStamps.has(message.author.id)) {
				const expiration_time =
					timeStamps.get(message.author.id) + cooldown;

				if (currentDate < expiration_time) {
					const time_left = (expiration_time - currentDate) / 1000;

					let embed2 = new MessageEmbed()
						.setTitle('An Error Occured <:sim:860034795169251358>')
						.setAuthor('Cooldown')
						.setDescription(
							`Please wait ${time_left.toFixed(
								1,
							)} more seconds before using ${command.name}`,
						)
						.setFooter(`Run -help [command] to check cooldowns`)
						.setTimestamp()
						.setColor('CE1212');

					return message.reply({ embeds: [embed2] });
				}
			}

			timeStamps.set(message.author.id, currentDate);

			setTimeout(() => timeStamps.delete(message.author.id), cooldown);
		}
		// } else {
		// 	const ping = await custom.findOne({
		// 		guildId: message.guild.id,
		// 		name: cmd,
		// 	});
		// 	if (!ping) return;
		// 	if (
		// 		!ping.roles.some((x) => message.member.roles.cache.has(x)) &&
		// 		!ping.channels.some((x) => message.channel.id === x)
		// 	)
		// 		return;
		// 	message.channel.send({
		// 		content: `<@&${ping.role}> ${args.slice(0).join(' ')} **- ${
		// 			message.author.tag
		// 		}**`,
		// 	});
		// }

		if (command) {
			if (command.ownerOnly) {
				if (message.author.id !== '491933949686448138')
					return message.channel.send({
						content: 'This command can only be used by the owner!',
					});
			}
		}

		try {
			command.execute(client, message, cmd, args);
		} catch (err) {
			let embed = new MessageEmbed()
				.setTitle(
					'An Error Occured <:sim:860034795169251358>, use `help`',
				)
				.setDescription('This command does not exist!')
				.setFooter({
					text: `Use \`help\` [command] to see specific commands`,
				})
				.setTimestamp()
				.setColor('CE1212');

			message.reply({ embeds: [embed] }).then((msg) => {
				setTimeout(() => msg.delete(), 3000);
			});
		}
	}
};

const addUser = async (userId) => {
	messengers.push(userId);
	setTimeout(() => {
		messengers.splice(messengers.indexOf(userId), 1);
	}, 10 * 1000);
};
