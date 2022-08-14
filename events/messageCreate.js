const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
const cooldowns = new Map();
const Discord = require('discord.js');
const afk = require('../afk');
const math = require('mathjs');
// const { db } = require('../firebase');
// const custom = require('../schemas/ping-schema');
const ar = require('../autoResponse');
module.exports.run = async (client, message) => {
	/*if(message.author.id === '491933949686448138') {
		const mention = message.mentions.members.first()
		if(!mention) return;
		let data =
		(await db
			.ref(`Reminders/${message.guild.id}/${mention.id}`)
			.once('value')
			.then((snapshot) => snapshot.val())) || [];
			db.ref(`Reminders/${message.guild.id}/${mention.id}`);
		if(data.length > 0)	{
		if(message.content.includes(`Here are your daily coins, ${mention.displayName}`)) {
			if(data[0].daily == true) {
				let date = new Date().getTime()
				message.react("⏰")
				setTimeout(() => {
				mention.send({content: 'You can now **claim daily** <a:daily:884080989452783646>'})
				}, 1000);
			} 
		}		
	  }
	}*/
	if (message.channel.type === 'GUILD_TEXT') {
		// 	if(message.author.id === '270904126974590976' && message.channel.id === "866419331776905226" && message.embeds[0]?.fields[0].name.includes('Shared') && message.embeds[0]?.fields[2].name.includes('amxaa')) {
		// 				let ar = message.embeds[0].fields[0].value.split('`')[1]
		// 				let te = ar.replace('⏣', '')
		// 				let user = message.mentions.repliedUser.id
		// 				if(te.includes(',')) te = te.replace(/,/g, '')
		// 				let data = await db
		// 				.ref(`Grinders/${message.guild.id}`)
		// 				.once("value")
		// 				.then(snapshot => snapshot.val())|| []
		// 				let num = parseInt(te)
		// 				let item = data.find((x) => x.userId === user)
		// 				const place = data.indexOf(item)
		// 				if(item) {
		// 					data[place] = {
		// 						userId: user,
		// 						coins: item.coins + num
		// 					}
		// 					db.ref(`Grinders/${message.guild.id}`).set(data)
		// 				} else {
		// 					data.push({
		// 						userId: user,
		// 						coins: num
		// 					})
		// 					db.ref(`Grinders/${message.guild.id}`).set(data)
		// 				}
		// 				await economy.addCoins(message.guild.id, user, num)
		// 				let embed = new Discord.MessageEmbed().setColor('RANDOM').setTitle('Grinders Donation').setDescription(`<:replycont:877221297308958761> **User:** <@${user}>\n<:reply:877221312198754355> **Amount:** ⏣ ${num} `).setFooter('Thank You').setTimestamp()
		// 				message.channel.send({embeds: [embed]})
		// 		}
		// 				if(message.author.id === '270904126974590976' && message.channel.id === "942321197155254292" && message.embeds[0]?.title === 'Successful Trade!') {
		// 			let users = ['AmberFerrari', 'Bàbà_yàgà','Cai ケイリー', 'Fazhan','Kag','Kayz','emily chan','ghosty','júles 𐐪𐑂','milly','rave','squid ᥫ᭡','veg ✧.*','~°•°~','𝕵𝖚𝖚𝖑𝖈𝖆𝖙', 'amxaa']
		// 			if(!users.some(user => message.embeds[0].fields[1].value.includes(user))) return
		// 			if(message.embeds[0].fields[0].value.includes('⏣')) {
		// 			let selection = message.embeds[0].fields[0].value

		// 			let number = parseInt(selection.replace(/\*\*/g, '').split('⏣')[1].trim().replace(/,/g, ''))
		// 			let user = message.mentions.repliedUser.id

		// 			await economy.addCoins(message.guild.id, user, number)
		// 			const newcoins = await eventdonations.addCoins(message.guild.id, user, number)
		// 			let embed = new Discord.MessageEmbed().setColor('RANDOM').setTitle('50k special donations').setDescription(`<:replycont:877221297308958761> **User:** <@${user}>\n<:reply:877221312198754355> **Amount:** ${number} `).setFooter('Thank You').setTimestamp().setThumbnail('https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024')
		// 			let channel = message.guild.channels.cache.get(`805543230473109534`)
		// 			let emb = go.makeEmbed('dank', user, number, newcoins, message)
		// 			message.channel.send({embeds: [embed]})
		// 			channel.send({embeds: [emb]})
		// 			} else if (!message.embeds[0].fields[0].value.includes('⏣')) {
		// 			let items =
		//       		(await db
		//         	.ref(`Donations/Info/${message.guild.id}/List`)
		//        		.once('value')
		//         	.then((snapshot) => snapshot.val())) || [];

		// 			let selection = message.embeds[0].fields[0].value.split('>')
		// 			let user = message.mentions.repliedUser.id
		// 			let number = selection[1].split('**')[1].replace(/x|,/g, '')
		// 			let item = selection[2].replace(/\*\*/g, '').trim()
		// 			if(!number || item === '') return;

		// 			let final = go.search(item, items)
		// 			if (final.similarity <= 0.6) return message.reply({ content: `Could not find that item!` });

		// 			const total = final.item.amount * parseInt(number)

		// 			await economy.addCoins(message.guild.id, user, total)
		// 			const newcoins = await eventdonations.addCoins(message.guild.id, user, total)
		// 			let embed = new Discord.MessageEmbed().setColor('RANDOM').setTitle('50k special donations').setDescription(`<:replycont:877221297308958761> **User:** <@${user}>\n<:reply:877221312198754355> **Amount:** ${total} `).setFooter('Thank You').setTimestamp().setThumbnail('https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024')
		// 			.addField('Items', `**${number} x ${item}** = **${total.toLocaleString()}**`, true)
		// 			let channel = message.guild.channels.cache.get(`805543230473109534`)
		// 			let emb = go.makeEmbed('dank', user, total, newcoins, message)
		// 			message.channel.send({embeds: [embed]})
		// 			channel.send({embeds: [emb]})
		// 			}

		// 	}
		// if(message.author.id === '270904126974590976' && message.channel.id === "945352910194229338" && message.embeds[0]?.fields[2]?.name.includes('Bàbà_yàgà')) {
		// 		if(message.embeds[0]?.fields[0]?.name.includes('Shared')) {
		// 		let ar = message.embeds[0].fields[0].value.split('`')[1]
		// 		let te = ar.replace('⏣', '')
		// 		let user = message.mentions.repliedUser.id
		// 		if(te.includes(',')) te = te.replace(/,/g, '')
		// 		let num = Math.trunc(parseInt(te) / 5000000)
		// 		if(num < 1) return message.channel.send(`<@${user}>'s entry (${num}) has been invalidated as it does not meet the requirements.`)
		// 		let data =
		//         (await db
		//             .ref(`Lottery System/${message.guild.id}/Lottery`)
		//             .once('value')
		//             .then((snapshot) => snapshot.val())) || [];
		//         data.push({
		// 			"User": user,
		// 			"Entries": num
		// 		})
		// 		db.ref(`Lottery System/${message.guild.id}/Lottery/`).set(data)
		// 		let embed = new Discord.MessageEmbed().setColor('RANDOM').setTitle('Blob Raffle Entry').setDescription(`<:replycont:877221297308958761> **User:** <@${user}>\n<:reply:877221312198754355> **Entries:** ${num} `).setFooter('Good Luck').setTimestamp()
		// 		message.channel.send({embeds: [embed]})
		// 	} if(message.embeds[0]?.fields[0]?.name.includes('Gifted')) {
		// 		let ar = message.embeds[0].fields[0].value.split('`')
		// 		let num = ar[1]
		// 		let item = ar[2].split('>')[1].trim()
		// 		let user = message.mentions.repliedUser.id
		// 		if(num.includes(',')) num = num.replace(/,/g, '')
		// 		if(item !== 'Pepe Trophy') return message.channel.send(`<@${user}>'s entry (${num}) has been invalidated as it does not meet the requirements.`)
		// 		let data =
		//         (await db
		//             .ref(`Lottery System/${message.guild.id}/Lottery`)
		//             .once('value')
		//             .then((snapshot) => snapshot.val())) || [];
		//         data.push({
		// 			"User": user,
		// 			"Entries": num * 8
		// 		})
		// 		db.ref(`Lottery System/${message.guild.id}/Lottery/`).set(data)
		// 		let embed = new Discord.MessageEmbed().setColor('RANDOM').setTitle('Blob Raffle Entry').setDescription(`<:replycont:877221297308958761> **User:** <@${user}>\n<:reply:877221312198754355> **Entries:** ${num*8} `).setFooter('Good Luck').setTimestamp()
		// 		message.channel.send({embeds: [embed]})
		// 	}
		// }

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
				let num = math.evaluate(ms);
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
				let embed = new Discord.MessageEmbed()
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
				message.author.send({ embeds: [embed] });
				await afk.set(message.author.id, message.guild.id);
			}
		}
		const prefix = config.prefix;
		if (!message.content.startsWith(prefix)) {
			const arResult = await ar.checkAr(message.guild.id);
			if (arResult.length > 0) {
				for (let i = 0; i < arResult.length; i++) {
					let arCheck = arResult[i];
					let checkStr = arCheck.trigger;
					let regex = new RegExp(`\\b${checkStr}\\b`, 'gm');
					if (regex.test(message.content)) {
						if (
							arCheck.ignoredChannels.includes(
								message.channel.id,
							) ||
							arCheck.ignoredMembers.includes(message.author.id)
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
		}
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const cmd = args.shift().toLowerCase();

		const command =
			client.commands.get(cmd) ||
			client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

		if (command) {
			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Discord.Collection());
			}

			const current_time = Date.now();
			const time_stamps = cooldowns.get(command.name);
			const cooldown_amount = command.cooldown * 1000;	

			if (time_stamps.has(message.author.id)) {
				const expiration_time =
					time_stamps.get(message.author.id) + cooldown_amount;

				if (current_time < expiration_time) {
					const time_left = (expiration_time - current_time) / 1000;

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

			time_stamps.set(message.author.id, current_time);

			setTimeout(
				() => time_stamps.delete(message.author.id),
				cooldown_amount,
			);
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
