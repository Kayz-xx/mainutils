const { MessageEmbed, Permissions } = require('discord.js');
const userManager = require('../../functions/user');
module.exports = {
	name: 'prcolor',
	aliases: ['prc', 'prname', 'prinfo', 'pradd', 'prremove'],
	cooldown: '0',
	permissions: [],
	category: 'Misc',
	async execute(client, message, cmd, args) {
		if (cmd === 'prcolor' || cmd === 'prc') {
			if (
				!message.member.roles.cache.hasAny(
					'878635281241227344',
					'937763384017973290',
					'853166230139043850',
				) &&
				!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
			)
				return;
			const hex = args[0];
			const regex = /[0-9A-Fa-f]{6}/g;
			const valid = regex.test(hex);
			if (!hex || !valid)
				return message.reply({
					content:
						'Please specify a valid hex to change the color to.',
				});
			// const role = roleObj.find((i) => i.owner.trim() === message.author.id);
			const role = await userManager.getRole(
				message.guild.id,
				message.author.id,
			);
			if (!role)
				return message.reply({
					content: "It seems like you don't have a personal role.",
				});

			const userRole = message.guild.roles.cache.get(role);
			userRole
				.setColor(
					hex,
					`Personal role color changed by role owner (${message.author.id})`,
				)
				.catch((err) => {
					message.channel.send({
						content:
							'There was an error setting the color make sure the hex is valid!',
					});
				});
			const embed = new MessageEmbed()
				.setColor(hex)
				.setDescription(`Role color changed to **${hex}**`);
			message.channel.send({ embeds: [embed] });
		}
		if (cmd === 'prname') {
			if (
				!message.member.roles.cache.hasAny(
					'878635281241227344',
					'937763384017973290',
					'853166230139043850',
				) &&
				!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
			)
				return;
			const name = args.join(' ');
			if (name.length === 0)
				return message.reply({ content: 'Please enter a role name.' });
			const role = await userManager.getRole(
				message.guild.id,
				message.author.id,
			);
			if (!role)
				return message.reply({
					content: "It seems like you don't have a personal role.",
				});
			const userRole = message.guild.roles.cache.get(role);
			userRole
				.setName(
					name,
					`Personal role name changed by role owner (${message.author.id})`,
				)
				.catch((err) => {
					message.channel.send({
						content:
							'There was an error setting the color make sure the name is valid!',
					});
				});
			const embed = new MessageEmbed()
				.setDescription(`Role name changed to ${name}`)
				.setColor('WHITE');
			message.channel.send({ embeds: [embed] });
		}
		if (cmd === 'prinfo') {
			if (
				!message.member.roles.cache.hasAny(
					'878635281241227344',
					'937763384017973290',
					'853166230139043850',
				) &&
				!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
			)
				return;
			const role = await userManager.getRole(
				message.guild.id,
				message.author.id,
			);
			if (!role)
				return message.reply({
					content: "It seems like you don't have a personal role.",
				});
			const userRole = await message.guild.roles.fetch(role);
			const mapped = userRole.members.map((x) => `<@${x.id}>`);
			const embed = new MessageEmbed()
				.setAuthor({
					name: `${message.author.username}'s Role Info`,
					iconURL: message.author.displayAvatarURL(),
				})
				.setDescription(
					`<:dot:859815130437779467> **Role**: <@&${
						userRole.id
					}> \`(${userRole.hexColor})\`
					<:dot:859815130437779467> **Created**: <t:${(
						userRole.createdTimestamp / 1000
					).toFixed(0)}:R>
					<:dot:859815130437779467> **Members**: ${mapped.join(', ')}`,
				)
				.addField('Member Count', `${mapped.length} member(s)`)
				.setColor(userRole.color);
			message.channel.send({ embeds: [embed] });
		}
		if (cmd === 'pradd') {
			if (
				!message.member.roles.cache.has('764885367400693764') &&
				!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
			)
				return;
			const user =
				client.users.cache.get(args[0]) ||
				message.mentions.users.first();
			if (!user)
				return message.reply({ content: 'Please specify a user.' });
			const role = await message.guild.roles.fetch(args[1]);
			if (!role)
				return message.reply({
					content: "Please specify the user's role.",
				});
			const result = await userManager.addRole(
				message.guild.id,
				user.id,
				role.id,
			);
			const embed = new MessageEmbed()
				.setDescription(
					`Personal role <@&${role.id}> added to <@${user.id}>`,
				)
				.setColor(role.color);
			if (!result)
				return message.channel.send({
					content: 'There was an error adding the role.',
				});
			message.channel.send({ embeds: [embed] });
		}
		if (cmd === 'prremove') {
			if (
				!message.member.roles.cache.has('764885367400693764') &&
				!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
			)
				return;
			const user =
				client.users.cache.get(args[0]) ||
				message.mentions.users.first();
			if (!user)
				return message.reply({ content: 'Please specify a user.' });
			const role = await message.guild.roles.fetch(args[1]);
			if (!role)
				return message.reply({
					content: "Please specify the user's role.",
				});
			const result = await userManager.removeRole(
				message.guild.id,
				user.id,
			);
			const embed = new MessageEmbed()
				.setDescription(
					`Personal role <@&${role.id}> removed from <@${user.id}>`,
				)
				.setColor(role.color);
			if (!result)
				return message.channel.send({
					content: 'There was an error removing the role.',
				});
			message.channel.send({ embeds: [embed] });
		}
	},
};
