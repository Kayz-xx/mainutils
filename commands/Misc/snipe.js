const moment = require('moment');
const { Message, Client, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'snipe',
	aliases: ['peek'],
	cooldown: '0',
	permissions: [],
	category: 'Misc',
	ownerOnly: true,
	async execute(client, message, cmd, args) {
		const snipes = client.snipes.get(message.channel.id);
		if (!snipes)
			return message.reply({content: 'There is nothing to snipe in this channel'});

		const snipe = +args[0] - 1 || 0;
		const target = snipes[snipe];
		if (!target)
			return message.reply({content: `There is only ${snipes.length} messages!`});

		const { msg, time, image, type } = target;
		message.channel.send({embeds: [
			new MessageEmbed()
				.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
				.setImage(image)
				.setFooter(
					`${moment(time).fromNow()} -> ${snipe + 1} / ${
						snipes.length
					}`
				)
				.setDescription(`**${type}**\n${msg.content} `)
				.setColor('RANDOM')]}
		);
	},
};
