const Discord = require('discord.js');
module.exports = {
	name: 'viewlock',
	aliases: [],
	cooldown: '0',
	permissions: [],
	category: 'Misc',
	usage: '<channel> <user|role>',

	async execute(client, message, cmd, args) {
		try {
			if (
				!message.member.roles.cache.has('764885367400693764') &&
				!message.member.roles.cache.has('792799102140022785') &&
				!message.member.permissions.has(
					Discord.Permissions.FLAGS.MANAGE_MESSAGES
				)
			)
				return;
			if (
				message.channel.id !== '792795803037990943' &&
				message.channel.id !== '792505415748812801' &&
				message.channel.id !== '916771549753778246'
			)
				return;
			let channel = message.mentions.channels.first();
			let array = [
				'764885367160700960',
				'794628723613761566',
				'764885367241048071',
				'764885367241048073',
				'764885367249174609',
				'764885367249174610',
				'764885367249174611',
				'764885367249174612',
			];
			let mem = args[1];
				if (!channel) {
				channel = message.channel; 
				mem = args[0];
			}
			if (!mem) return message.reply('Please specify a role id.');
			let newd = array.map((d) => `<@&${d}>`);
			let embed = new Discord.MessageEmbed()
				.setTitle('Valid Roles')
				.setDescription(newd.join(`\n`))
				.setColor('RANDOM')
				.setTimestamp();
			console.log(mem)
			if (!array.includes(mem))
				return message.reply({
					content: `Please choose a role from below.`,
					embeds: [embed],
				});
			let role = await message.guild.roles.fetch(mem);
			if (!role) return message.reply('This role could not be found.');

			//if(channel.permissionsFor(role).has("VIEW_CHANNEL")) return message.channel.send(`${channel} was already viewlocked for \`${role.name}\``)
			channel.permissionOverwrites.edit(
				role,
				{ VIEW_CHANNEL: false },
				{ reason: `Viewlock command by ${message.author.tag}` }
			);
			message.channel.send(
				`<#${channel.id}> has been viewlocked for \`${role.name}\``
			);
		} catch (error) {
			message.channel.send(
				'There was an error viewlocking the channel, please make sure there are no errors.'
			);
		}
	},
};
