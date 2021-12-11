const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
const cooldowns = new Map();
const Discord = require('discord.js');
const {afk} = require('../collection')
const moment = require('moment')
const math = require('mathjs')
module.exports.run = async (client, message) => {    
	/*if(message.guild.id === "855455031385391104") {
		if(message.author.id === "491933949686448138") {
			if(message.content.includes("You gave eye holder")) {
				if(message.content.includes("pepetrophy")) {
					//let user = message.content.slice(0, 22)
					//let number = message.content.substr(45, 3).replace(/[*]/g, '')
					let te = message.content.split(" ")
				    let embed = new MessageEmbed()
					.setTitle("Odd Eye Raffle")
					.setDescription(`${te[0]} You gained ${te[5]} entries`)
					.setFooter("Check Profile")
					.setColor("FFFFFF")
					.setThumbnail("https://images-ext-1.discordapp.net/external/6dLo523x4mPONn-TL1O4NqOHB5vookWf__UHV-QpDIs/https/cdn.discordapp.com/emojis/787964747848089642.gif")
					message.channel.send({embeds: [embed]})
				}
			}
		}
	}*/
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
	if(message.channel.type === "GUILD_TEXT") {
try {
	if(message.author.bot) return;
	const conditions = ['/', '*', '+', '-']
	const conditions2 = ['k', 'm', 'b']
	function hasNumber(myString) {
		return /\d/.test(myString);
	  }
	let ms;
	if(conditions2.some(el => message.content.includes(el))) {
		let object = {
		k:"e3",
		m:"e6",
		b:"e9"
	 };
     ms = message.content.replace(/k|m|b/g, function(m){
		return object[m];
	  })
	} else {
		ms = message.content.replace(/,/g, '');
	}
	if(hasNumber(ms) && conditions.some(el => ms.includes(el))) {
		let num = math.evaluate(ms)
		if(isNaN(num)) return;
		message.react('✔')
		const filter = (reaction, user) => {
			return user.bot === false
		};
		const collector = message.createReactionCollector({ filter, time: 15000, max: 2 });
		collector.on('collect', (reaction, user) => {
			if(reaction.emoji.name === '✔') {
			let embed = new MessageEmbed()
			.setTitle(`Calculated ${Math.round(num)}`)
			.setDescription(`Calculated: \`${num.toLocaleString()}\`\nRaw: \`${num}\``)
			.setColor("RANDOM")
			message.channel.send({embeds: [embed]})
			}
		});
	
		}
	} catch(error) {
	}
	const mentionedMember = message.mentions.members.first()
	if (mentionedMember && !message.author.bot) {
		const data = afk.get(mentionedMember.id)

		if(data) {
			const [timestamp, reason] = data
			const timeAgo = moment(timestamp).fromNow()
			let embeds = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setDescription(`<:replycont:877221297308958761> ${mentionedMember} is currently AFK: ${reason}\n<:reply:877221312198754355> ${timeAgo}`)
			.setColor('ffffff')
			message.reply({embeds: [embeds]})
		}
	}

	const getData = afk.get(message.author.id)
	if(getData){
		const [timestamp, reason] = getData
		let now = Date.now()
		let diff = now - timestamp
		if(diff >= 30000) {
		afk.delete(message.author.id)
		message.reply({content: `Welcome back ${message.member}, your AFK has been removed`})
		}
	}

	const prefix = config.prefix;
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();

	const command =
		client.commands.get(cmd) ||
		client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

	const validPermissions = [];
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
						1
					)} more seconds before using ${command.name}`
				)
				.setFooter(`Run -help [command] to check cooldowns`)
				.setTimestamp()
				.setColor('CE1212')

				return message.reply(
					{embeds: [embed2]}
				);
			}
		}


		time_stamps.set(message.author.id, current_time);

		setTimeout(
			() => time_stamps.delete(message.author.id),
			cooldown_amount
		);
	}

	if (command) {
		if (command.ownerOnly) {
			if (message.author.id !== '491933949686448138')
				return message.channel.send({content: 
					'This command can only be use by owner!'
				});
		}
	}

	try {
		command.execute(client, message, cmd, args);
	} catch (err) {
		let embed = new MessageEmbed()
		.setTitle(
			'An Error Occured <:sim:860034795169251358>, use `help`'
		)
		.setDescription('This command does not exist!')
		.setFooter(
			`Use \`help\` [command] to see specific commands`
		)
		.setTimestamp()
		.setColor('CE1212')

		message.reply({embeds: [embed]})
			.then((msg) => {
				setTimeout(() => msg.delete(), 3000);
			});
		}
	}
};
