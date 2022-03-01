const moment = require('moment');
const { Message, Client, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'snipe',
	aliases: ['snipelist', 'esnipe'],
	cooldown: '0',
	permissions: [],
	category: 'Misc',
	ownerOnly: true,
	async execute(client, message, cmd, args) {
		if(cmd === 'snipe') {
		let snipes = client.snipes.get(message.channel.id);
		if(snipes) snipes = snipes.filter(x => x.type === 'Message Deleted')
	    else return message.reply({content: 'There is nothing to snipe in this channel'});

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
					`${moment(time).fromNow()} ${snipe + 1} / ${
						snipes.length
					}`
				)
				.setDescription(`**${type}**\n${msg.content} `)
				.setColor('RANDOM')]}
		);
	} if(cmd === 'snipelist') {
		const snipes = client.snipes.get(message.channel.id);
		if (!snipes) 
			return message.reply({content: 'There is nothing to snipe'});
		let data = snipes
			.map((snipe, index) => {
				const { msg, time, image, type } = snipe;
				return `**${type} by ${msg.author.tag} (<t:${Math.floor(time/1000)}:R>)**\n${msg.content}`;
			})
		data = data.slice(0, 10)
		let embed = new MessageEmbed()
		.setColor('RANDOM')
		.setDescription(data.join('\r\n'))

		message.channel.send({embeds: [embed]})
	} if(cmd === 'esnipe') {
		let snipes = client.snipes.get(message.channel.id);
		if(snipes) snipes = snipes.filter(x => x.type === 'Message Edited')
	    else return message.reply({content: 'There is nothing to snipe in this channel'});

		const snipe = +args[0] - 1 || 0;
		const target = snipes[snipe];
		if (!target)
			return message.reply({content: `There is only ${snipes.length} messages!`});

		let { msg, editedIn, oldContent, newContent } = target
		message.channel.send({embeds: [
			new MessageEmbed()
				.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
				.setFooter(
					`${snipe + 1} / ${
						snipes.length
					}`
				)
				//.setDescription(`Edited in \`${editedIn}\``)
				.addField('Old Message', oldContent)
                .addField('New Message', newContent)
				.setColor('RANDOM')]}
		);
	 }
	},
};
