const { MessageButton, MessageActionRow } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'reactionroles',
	aliases: ['rr'],
	cooldown: 0,
	permissions: [],
    category: 'Misc',
	
	async execute(client, message, cmd,  args) {


		let buttonRoleEmbed = new MessageEmbed()
			.setTitle('Reaction Roles')
			.setColor('WHITE')
			.setDescription('Click the button to get these role!');

		let blueBtn = new MessageButton()
			.setStyle('blurple')
			.setLabel('Blue')
			.setID('blueBtn')
			.setEmoji('860992792901845032');

		let redBtn = new MessageButton()
			.setStyle('red')
			.setLabel('Red')
			.setID('redBtn')
			.setEmoji('860992751310209035');

		let removeRolesBtn = new MessageButton()
			.setStyle('red')
			.setLabel('Remove')
			.setID('removeRoles')
			.setEmoji('❌');

			let newroles = new MessageButton()
			.setStyle('red')
			.setLabel('Remove')
			.setID('newroles')
			.setEmoji('❌');

		let colorRow = new MessageActionRow()
			.addComponent(newroles)
			

		message.channel.send(buttonRoleEmbed, { component: colorRow });

		client.on('clickButton', async (button) => {
			let role1 = '861322309720735767';
			let role2 = '861322344374075392';

			let category = [role1, role2];

			if (button.id === 'blueBtn') {
				category.forEach((role) => {
					if (
						button.clicker.member.roles.cache.some((r) =>
							role.includes(r.id)
						)
					) {
						button.clicker.member.roles.remove(role);
					}
				});
				button.clicker.member.roles.add(role1);
				button.reply.send(`You got the <@&${role1}> role!`, true);
			} else if (button.id === 'redBtn') {
				category.forEach((role) => {
					if (
						button.clicker.member.roles.cache.some((r) =>
							role.includes(r.id)
						)
					) {
						button.clicker.member.roles.remove(role);
					}
				});
				button.clicker.member.roles.add(role2);
				button.reply.send(`You got the <@&${role2}> role!`, true);
			} else if (button.id === 'removeRoles') {
				await category.forEach((role) => {
					if (
						button.clicker.member.roles.cache.some((r) =>
							role.includes(r.id)
						)
					) {
						button.clicker.member.roles.remove(role);
					}
					button.reply.send(`You removed all the roles!`, true);
				});
			} else if (button.id === 'newroles') {
				await category.forEach((role) => {
					button.reply.send(`New Button!`, true);
				})
			}
		});
	},
};
