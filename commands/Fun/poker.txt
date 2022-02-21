const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'poker',
	aliases: [],
	cooldown: '0',
	permissions: [],
	category: 'Misc',
	description: 'Just a regular poker command',

	async execute(client, message, cmd, args) {
		const channel = message.member.voice.channel;
		if (!channel)
			return message.reply({
				content: 'You must be in a vc to start playing poker',
			});

		fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
			method: 'POST',
			body: JSON.stringify({
				max_age: 86400,
				max_uses: 0,
				target_application_id: '755827207812677713',
				target_type: 2,
				temporary: false,
				validate: null,
			}),
			headers: {
				Authorization: `Bot ${client.token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((invite) => {
				if (!invite.code)
					return message.reply({
						content: 'Sadly i cant start a poker game session',
					});

				const e = new Discord.MessageEmbed()
					.setColor(0x5865f2)
					.setAuthor(
						message.author.username,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.setDescription(
						"This function is still in beta! so it won't work every time\nClick the Button to start!"
					);

				message.reply({
					embeds: [e],

					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									style: 5,
									label: 'Click me!',
									url: `https://discord.com/invite/${invite.code}`,
								},
							],
						},
					],
				});
			});
	},
};
