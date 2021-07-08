const Discord = require('discord.js');
const { db } = require('../../firebase');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'accept',
	aliases: [],
	category: 'Applications',
	cooldown: '0',
	usage: '<message.id> <Event Manager | Giveaway Manager | Moderator>',
	description: "This a command that accept's applicants. (Only Admins can use this command)",
	permissions: [],
	
	  async execute(client, message, cmd,  args) {
		if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('This command can only be used by administrators!')
		const messageID = args[0];
		let acceptQuery = args.slice(1).join(' ').toLowerCase()
		try {
			const applicationChannel =
				message.guild.channels.cache.get('855828767846039582');
			const applicationdEmbed = await applicationChannel.messages.fetch(
				messageID
			);

			const data = applicationdEmbed.embeds[0];
			const acceptEmbed = new MessageEmbed()
				.setTitle(data.title)
				.setAuthor(data.author.name)
				.setDescription(data.description)
				.setColor(data.color)
				.addField('Status **(Accepted)**', `${acceptQuery}`);

				console.log(acceptQuery)

			applicationdEmbed.edit({ embed: acceptEmbed});

			if (acceptQuery === 'event manager') {
				acceptQuery =
					'Congratulations! You have been accepted as a Event Manager, you have been given the 》Event Manager《 role. Please read the pinned messages in <#764885370219134992> and feel free to ask any higher staff for assisstance.';
			} else if (acceptQuery === 'giveaway manager') {
				acceptQuery =
					'Congratulations! You have been accepted as a Giveaway Manager, you have been given the 》Giveaway Manger《 role. Please read the pinned messages in <#764885370219134992> and feel free to ask any higher staff for assistance.';
			} else if (acceptQuery.toLowerCase() === 'moderator') {
				acceptQuery =
					'Congratulations! You have been accepted as a Moderator, you have been given the 》Trial Mod《 role. Please read the pinned messages in <#764885370219134992> and feel free to ask any higher staff for assisstance.';
			}
			const user = await client.users.cache.find(
				(u) => u.tag === data.author.name
			);
			user.send({
				embed: {
					title: 'Application Accepted',
					description: `${acceptQuery}`,
					color: '#77ACF1',
				},
			});

			// user.roles.add(data3.Staffrole)
		} catch (err) {
			console.log(err);
		}
	},
};
