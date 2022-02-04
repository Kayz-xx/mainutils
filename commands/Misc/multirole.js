const Discord = require('discord.js');
module.exports = {
	name: 'multirole',
	aliases: [],
	cooldown: '0',
	description: 'Used to assign roles to a member.',
	category: 'Misc',

	async execute(client, message, cmd, args) {
		      if(!message.member.roles.cache.has("764885367400693764") && !message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return;
		let roles;
		let users;
		const flags = new Map();
		const remainder = ` ${args.join(' ')}`;
		const params = remainder.split(/ --| —/).filter((el) => !!el);

		params.forEach((content) => {
			if (!content.startsWith(' ')) {
				flags.set(
					` ${content.split(' ').slice(0, 1).join(' ')}`,
					`${content.split(' ').slice(1).join(' ')}`
				);
			}
		});

		if (flags.get(` users`)) {
			users = flags.get(` users`);
		} else {
			return message.reply(`Missing the flag \`--users\``);
		}

		if (flags.get(` roles`)) {
			roles = flags.get(` roles`);
			if (roles.length >= 1024) {
				return message.reply(
					`Roles cannot contain more than 1024 character`
				);
			}
		} else {
			return message.reply(`Missing the flag \`--roles\``);
		}
		let rolesinfo = roles.split(' ');
		let usersinfo = users.split(' ');
		let array = [];
		
      function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
        }
		rolesinfo.forEach(async (rolesinfo) => {
			let role = message.guild.roles.cache.find(
				(r) => r.id === rolesinfo
			);
			if (!role)
				message.channel.send({
					content: `The role ${role} could not be found`,
				});
			else if (role) array.push(role);
			let i = 0;
			usersinfo.forEach(async (users) => {
				let user = await message.guild.members
					.fetch(users)
					.catch((error) => {});
				if (!user)
					message.channel.send({
						content: `The user ${user} could not be found`,
					})
				return;
				else if (user) {
					if (user.roles.cache.some((r) => r.id === array[i].id))
						return;
					await sleep(2500)
					user.roles.add(array);
				}
				i++;
			});
		});

		let users2 = usersinfo.map((x) => {
			return `<@${x}>`;
		});

		let roles2 = rolesinfo.map((x) => {
			return `<@&${x}>`;
		});

		let embed = new Discord.MessageEmbed()
			.setTitle('Roles Assigned')
			.setDescription(
				`**Users:** ${users2
					.join(', ')
					.replace(/,(?=[^,]*$)/, ' and')}\n**Roles:** ${roles2
					.join(', ')
					.replace(/,(?=[^,]*$)/, ' and')}`
			)
			.setColor('RANDOM')
			.setTimestamp();

		message.channel.send({ embeds: [embed] });
	},
};
