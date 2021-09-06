const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'whois',
	description: 'Get the info of any user',
	category: 'info',
	usage: '<id>',

	async execute(client, message, cmd, args) {
		let users = args[0];
		if (!users)
			return message.channel.send({content: 
				'```whois <userid>\n      ^^^^^^^^\nuserid is a required argument which is missing.```'
			});

		const member = await client.users.fetch(users);

		let inGuild = false;

		if (message.guild.members.cache.has(member.id)) inGuild = true;
		console.log(message.guild.members.cache.has(member.id))
		const embed = new Discord.MessageEmbed()
			.setAuthor(`${member.tag}`, member.avatarURL())
			.setThumbnail(member.avatarURL())
			.setDescription(`In Elites\n**${inGuild}**`)
			.addFields(
				{
					name: 'Joined Discord',
					value: `${moment(member.createdAt).format('DD MMM YYYY')}`,
					inline: true,
				},
				{
					name: 'Discriminator',
					value: `${member.discriminator}`,
					inline: true,
				},
				{
					name: 'Bot',
					value: `${member.bot}`,
					inline: true,
				},
				{ name: 'User ID', value: `${member.id}`, inline: true }
			)
			.setColor(`RANDOM`)
			.setTimestamp()
			
		message.channel.send({embeds: [embed]});
	},
};
