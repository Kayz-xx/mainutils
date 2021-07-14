const { db } = require('../../firebase.js');
const Discord = require('discord.js');
module.exports = {
	name: 'vouch',
	aliases: ['vc'],
	cooldown: '0',
	permissions: [],
	category: 'Misc',
	usage: '<user>',
	description:
		'A fully fleged vouch system!(vouch - to vouch a specified user) (vc- to check a specified users vouches)',

	async execute(client, message, cmd, args) {
		if (cmd === 'vouch') {
			if (message.channel.id === '863445906636537867') {
				const target = message.mentions.members.first();
				if (!target) {
					message.reply('Please specify someone to vouch');
					return;
				}

				const { guild } = message;
				const guildId = guild.id;
				const targetId = target.user.id;
				const authorId = message.author.id;
				const now = new Date();

				if (targetId === authorId) {
					message.reply('You cannot vouch yourself');
					return;
				}

				const data =
					(await db
						.ref(`Vouch System/${message.guild.id}/${targetId}`)
						.once('value')
						.then((snapshot) => snapshot.val())) || [];

				db.ref(`Vouch System/${message.guild.id}/${targetId}`);

				const vouches = client.vouches; // client.vouches = new Map () in index.js

				if (!vouches.has(targetId)) {
					vouches.set(targetId, []);
				}

				const vouched = vouches.get(targetId);

				const user_vouched = vouched.find(
					(recent) => recent.LastGivenBy === authorId
				);

				if (user_vouched) {
					if (Date.now() - user_vouched.LastGivenAt < 900000) {
						return message.channel.send(
							new Discord.MessageEmbed()
								.setAuthor(
									message.author.tag,
									message.author.displayAvatarURL()
								)
								.setFooter(
									`You can vouch the same person every 15 mins`
								)
								.setDescription(
									`You can't vouch that person again! <:ee:863849610540089365>`
								)
								.setColor('FF0000')
						);
					}
				}

				vouched.push({
					LastGivenBy: authorId,
					LastGivenAt: Date.now(),
				});

				/*let array = [targetId]

				 array.push({
					"LastGivenBy": authorId,
					"LastGivenAt": Date.now()
				})

				console.log(array)
				console.log(array[0])*/

				if (!data.Vouches) {
					let index = 1;
					db.ref(
						`Vouch System/${message.guild.id}/${targetId}/Vouches`
					).set(index);
				} else {
					let data2 = data.Vouches + 1;
					db.ref(
						`Vouch System/${message.guild.id}/${targetId}/Vouches`
					).set(data2);
				}

				message.react(`<a:EE_check:767808449241153587>`);
			}
		}

		if (cmd === 'vc') {
			const target = message.mentions.members.first() || message.member;
			if (!target) {
				message.reply('Please specify a user!');
				return;
			}

			const { guild } = message;
			const guildId = guild.id;
			const targetId = target.user.id;

			let data =
				(await db
					.ref(`Vouch System/${message.guild.id}/${targetId}`)
					.once('value')
					.then((snapshot) => snapshot.val())) || [];
			db.ref(`Vouch System/${message.guild.id}/${targetId}`);

			if (!data.Vouches) {
				return message.channel.send({
					embed: {
						title: `User: ${target.user.username}`,
						description: `This user does not have any vouches!`,
						color: 'RANDOM',
					},
				});
			}
			const role = '863489844557905971';
			let rating = 'Needs MM/Sus Ngl';
			let emoji = '🥉';
			if (data.Vouches > 25) {
				rating = 'Regular trader';
				emoji = '🥈';
			}
			if (data.Vouches >= 76) {
				rating = 'Elite Trader';
				emoji = '🥇';
				target.roles.add(role);
			}

			message.channel.send(
				new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setAuthor(
						`${target.user.username}'s vouches`,
						target.user.displayAvatarURL({ dynamic: true })
					)
					.addFields({
						name: `total`,
						value: `\`${data.Vouches}\``,
						inline: true,
					})
					.setFooter(`${emoji} trust rating: ${rating}`)
			);
		}
	},
};
