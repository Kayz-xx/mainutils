const { MessageButton, MessageActionRow, Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'proles',
	aliases: [],
	cooldown: 0,
	permissions: [],
	category: 'Misc',
	ownerOnly: true,

	async execute(client, message, cmd, args) {
        setTimeout(() => message.delete(), 100);
        let req = [
            '768129052623372348',
            '764885367400693764',
            '764885367400693763',
            '770365283147317248',
        ]
		if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !req.some(r => message.member.roles.cache.has(r))) return

        let buttonRoleEmbed2 = new MessageEmbed()
        .setTitle('Roles')
        .setColor('WHITE').setDescription(`none`);

        let roles = [{emoji: '<a:EE_rgiveaway:860619074408153098>', role: '764885367241048064',},
        {emoji: '<a:EE_rrmoney:860620520474017822>', role: '827280787228590170'},
        {emoji: '<a:EE_rheist:860620411980873728>', role: '767787322133184542'},
        {emoji: '<a:EE_rrpartner:860610672852729916>', role: '764885367223484484'},]

		async function makeEmbed(message, ping1, title) {
			let buttons = [];
			let row = [];
			let str = '';
			for (let i = 0; i < ping1.length; i++) {
				let role = message.guild.roles.cache.get(ping1[i].role);
				buttons.push(
					new MessageButton()
						.setStyle('PRIMARY')
						.setCustomId(ping1[i].role)
						.setLabel(role.name)
						.setEmoji(ping1[i].emoji)
				);
				row = new MessageActionRow().addComponents(buttons);
				str += `${ping1[i].emoji} = <@&${ping1[i].role}>\n`;
			}
			message.channel.send({
				embeds: [buttonRoleEmbed2.setDescription(str).setTitle(title)],
				components: [row],
			});
		}
		makeEmbed(message, roles, '<a:EE_siren:795728285497032754> Get Ping Roles <a:EE_siren:795728285497032754>');
	},
};
