const {
	MessageEmbed,
	Permissions,
	PermissionOverwriteManager,
	PermissionOverwrites,
} = require('discord.js');

module.exports = {
	name: 'lockdown',
	aliases: [],
	cooldown: '0',
	permissions: [],
	description: 'Bot Info!',
	category: 'Misc',

	async execute(client, message, cmd, args) {
		if (
			!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) &&
			message.author.id !== '491933949686448138'
		)
			return message.reply({
				content:
					"You don't have enough permissions to use this command.",
			});

		const query = args[0];         
		if (!['true', 'false', 'list'].includes(query))
			return message.reply({
				content: 'Subcommands, \`true, false, list\`',
			});
		let embed = new MessageEmbed()
			.setTitle('Server Lockdown')
			.setDescription(
			`We've locked our server channels because we need to fix some things, don't worry it won't take long. We'll unlock once we're finished, thanks for your patience. <a:EE_yqb_happy:860982001863622667>`
			)
			.setTimestamp()
			.setColor('RANDOM')
			.setFooter('Sorry for the incovienience');

		let embed2 = new MessageEmbed()
			.setTitle('Server Has Been Unlocked')
			.setDescription(
			`Thank you for your patience, you can now use the server freely. <a:EE_poohDance:806921491093782588>`
			)
			.setTimestamp()
			.setColor('RANDOM')
			.setFooter('Thank you for cooperating');

		let arr = [
			'764885369384599566',
			'795012690292244481',
			'803506636336791584',
			'794615730569347072',
			'765275550490951770',
			'803659172910071828',
			'765274200914919435',
			'765274242882469888',
			'765274274519842876',
			'771809798769344514',
			'771809898634805258',
			'765276175546974238',
			'765276313250037760',
			'765276368438165518',
			'764885368591876161',
			'764885368591876162',
			'804088710261637171',
			'771822062335033354',
			'764885368591876165',
			'838872821609660496',
		];
          
          
		let channels = [];

		if (query == 'true') {
			for (let i = 0; i < arr.length; i++) {
				let channel = message.guild.channels.cache.get(arr[i]);
                if(!channel) return;
				channels.push(channel); 
			}
			channels.forEach(channel => {
                    if(channel.type != 'GUILD_TEXT') return
                    channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                        SEND_MESSAGES: false
                    }, {reason: `Lockdown initiated by ${message.author.tag}`})
                    if(channel.type == "GUILD_TEXT") channel.send({embeds: [embed]})
            })
            channels.length = 0
		}
		if (query == 'false') {
            for (let i = 0; i < arr.length; i++) {
				let channel = message.guild.channels.cache.get(arr[i]);
                if(!channel) return;
				channels.push(channel); 
			}
            channels.forEach(channel => {
				if (channel.type != 'GUILD_TEXT') return;
				channel.permissionOverwrites.edit(message.guild.roles.everyone, {
						SEND_MESSAGES: null,
					}, {reason: `Lockdown rescinded by ${message.author.tag}`})
				    if (channel.type == 'GUILD_TEXT') channel.send({ embeds: [embed2] });
            })
            channels.length = 0
		}
		if (query == 'list') {
			let str = '';
			arr.map((d) => {
				return (str += `\`${d}\` **—** <#${d}>\n`);
			});
			let set = new MessageEmbed()
				.setTitle('Lockdown Settings')
				.setDescription(str)
				.setFooter('Settings')
				.setColor('RANDOM')
				.setTimestamp();
			message.channel.send({ embeds: [set] });
		}
	},
};
