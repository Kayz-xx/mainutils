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

		let wBtn = new MessageButton()
			.setStyle('blurple')
			.setLabel('White')
			.setID('wBtn')
			.setEmoji('860992792901845032');

		let rBtn = new MessageButton()
			.setStyle('blurple')
			.setLabel('Red')
			.setID('rBtn')
			.setEmoji('860992751310209035');
		
		let oBtn = new MessageButton()
			.setStyle('blurple')
			.setLabel('Orange')
			.setID('oBtn')
			.setEmoji('860992751310209035');
		
		let yBtn = new MessageButton()
			.setStyle('blurple')
			.setLabel('Yellow')
			.setID('yBtn')
			.setEmoji('860992751310209035');
		
		let gBtn = new MessageButton()
			.setStyle('blurple')
			.setLabel('Green')
			.setID('gBtn')
			.setEmoji('860992751310209035');
		
		let bBtn = new MessageButton()
			.setStyle('blurple')
			.setLabel('Blue')
			.setID('bBtn')
			.setEmoji('860992751310209035');
		
		let vBtn = new MessageButton()
			.setStyle('Violet')
			.setLabel('Red')
			.setID('vBtn')
			.setEmoji('860992751310209035');
		
		
		let pBtn = new MessageButton()
			.setStyle('Pink')
			.setLabel('Red')
			.setID('pBtn')
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
			.addComponent(rBtn)
			.addComponent(oBtn)
			.addComponent(yBtn)
			.addComponent(gBtn)
			.addComponent(bBtn)
			.addComponent(vBtn)
			.addComponent(rBtn)
			.addComponent(wBtn)
			

		message.channel.send(buttonRoleEmbed, { component: colorRow });

		client.on('clickButton', async (button) => {
			let role1 = '764885367387586620'
			let role2 = '764885367378804805';
			let role3 = '860638310837256234'
			let role4 = '764885367378804802'
			let role5 = '860638377257467944'
			let role6 = '764885367378804796'
			let role7 = '764885367345119289'
			let role8 = '764885367345119287'

			let category = [role1, role2, role3, role4, role5, role6, role7, role8];

			if (button.id === 'wBtn') {
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
			} else if (button.id === 'rBtn') {
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
			} else if (button.id === 'oBtn') {
				category.forEach((role) => {
					if (
						button.clicker.member.roles.cache.some((r) =>
							role.includes(r.id)
						)
					) {
						button.clicker.member.roles.remove(role);
					}
				});
				button.clicker.member.roles.add(role3);
				button.reply.send(`You got the <@&${role3}> role!`, true);
			}  else if (button.id === 'yBtn') {
				category.forEach((role) => {
					if (
						button.clicker.member.roles.cache.some((r) =>
							role.includes(r.id)
						)
					) {
						button.clicker.member.roles.remove(role);
					}
				});
				button.clicker.member.roles.add(role4);
				button.reply.send(`You got the <@&${role4}> role!`, true);
			}  else if (button.id === 'gBtn') {
				category.forEach((role) => {
					if (
						button.clicker.member.roles.cache.some((r) =>
							role.includes(r.id)
						)
					) {
						button.clicker.member.roles.remove(role);
					}
				});
				button.clicker.member.roles.add(role5);
				button.reply.send(`You got the <@&${role5}> role!`, true);
			}  else if (button.id === 'bBtn') {
				category.forEach((role) => {
					if (
						button.clicker.member.roles.cache.some((r) =>
							role.includes(r.id)
						)
					) {
						button.clicker.member.roles.remove(role);
					}
				});
				button.clicker.member.roles.add(role6);
				button.reply.send(`You got the <@&${role6}> role!`, true);
			}  else if (button.id === 'vBtn') {
				category.forEach((role) => {
					if (
						button.clicker.member.roles.cache.some((r) =>
							role.includes(r.id)
						)
					) {
						button.clicker.member.roles.remove(role);
					}
				});
				button.clicker.member.roles.add(role7);
				button.reply.send(`You got the <@&${role7}> role!`, true);
			}  else if (button.id === 'yBtn') {
				category.forEach((role) => {
					if (
						button.clicker.member.roles.cache.some((r) =>
							role.includes(r.id)
						)
					) {
						button.clicker.member.roles.remove(role);
					}
				});
				button.clicker.member.roles.add(role8);
				button.reply.send(`You got the <@&${role8}> role!`, true);
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
				
					button.reply.send(`New Button!`, true);
			}
		});
	},
};
