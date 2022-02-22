const { MessageButton, MessageActionRow, Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'reactionroles',
	aliases: ['gpin'],
	cooldown: 0,
	permissions: [],
	category: 'Misc',

	async execute(client, message, cmd, args) {
		if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return
		// let roles = [
		// 	{
		// 		emoji: '<:EeC_white:793964042619977789>',
		// 		role: '764885367387586620',
		// 	},
		// 	{
		// 		emoji: '<:EeC_red:793963197953605663>',
		// 		role: '764885367378804805',
		// 	},
		// 	{
		// 		emoji: '<:EeC_orange:793963242098917406>',
		// 		role: '860638310837256234',
		// 	},
		// 	{
		// 		emoji: '<:EeC_yellow:793963285733048360>',
		// 		role: '764885367378804802',
		// 	},
		// 	{
		// 		emoji: '<:EeC_green:793963326950080512>',
		// 		role: '860638377257467944',
		// 	},
		// 	{
		// 		emoji: '<:EeC_blue:793963373078511636>',
		// 		role: '764885367378804796',
		// 	},
		// 	{
		// 		emoji: '<:EeC_violet:793963414304325663>',
		// 		role: '764885367345119289',
		// 	},
		// 	{
		// 		emoji: '<:EeC_pink:793963455206916178>',
		// 		role: '764885367345119287',
		// 	},
		// ];

		let buttonRoleEmbed = new MessageEmbed()
			.setTitle('Color Roles')
			.setColor('WHITE').setDescription(`
			<:EeC_white:793964042619977789> = <@&764885367387586620>
			<:EeC_red:793963197953605663> = <@&764885367378804805>
			<:EeC_orange:793963242098917406> = <@&860638310837256234>
			<:EeC_yellow:793963285733048360> = <@&764885367378804802>
			<:EeC_green:793963326950080512> = <@&860638377257467944>
			<:EeC_blue:793963373078511636> = <@&764885367378804796>
			<:EeC_violet:793963414304325663> = <@&764885367345119289>
			<:EeC_pink:793963455206916178> = <@&764885367345119287>
			`);

		// let rows = []
		// let buttons2 = []
		// for(let i = 0; i < roles.length; i++) {
		// 	buttons2.push(
		// 		new MessageButton()
		// 			.setStyle('PRIMARY')
		// 			.setCustomId(roles[i].role)
		// 			.setEmoji(roles[i].emoji)
		// 	);
		// 	for (let i = 0; i < 1; i++) {
		// 		rows.push(new MessageActionRow());
		// 	}
		// 	rows.forEach((row, i) => {
		// 		row.addComponents(buttons2.slice(0 + i * 4, 4 + i * 4));
		// 	});
	
		// }

		let wBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('wBtn')
			.setEmoji('<:EeC_white:793964042619977789>');

		let rBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('rBtn')
			.setEmoji('<:EeC_red:793963197953605663>');

		let oBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('oBtn')
			.setEmoji('<:EeC_orange:793963242098917406>');

		let yBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('yBtn')
			.setEmoji('<:EeC_yellow:793963285733048360>');

		let gBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('gBtn')
			.setEmoji('<:EeC_green:793963326950080512>');

		let bBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('bBtn')
			.setEmoji('<:EeC_blue:793963373078511636>');

		let vBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('vBtn')
			.setEmoji('<:EeC_violet:793963414304325663>');

		let pBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('pBtn')
			.setEmoji('<:EeC_pink:793963455206916178>');

		let removeRolesBtn = new MessageButton()
			.setStyle('DANGER')
			.setLabel('Remove')
			.setCustomId('removeRoles')
			.setEmoji('❌');

		let colorRow = new MessageActionRow().addComponents(
			wBtn,
			rBtn,
			oBtn,
			yBtn
		);

		let colorRow2 = new MessageActionRow().addComponents(
			gBtn,
			bBtn,
			vBtn,
			pBtn
		);

		let colorRow3 = new MessageActionRow().addComponents(removeRolesBtn);
		//rows.push(colorRow3);

		let chan2 = await client.channels.fetch('945760854136209478')

		chan2.send({
			embeds: [buttonRoleEmbed],
			components: [colorRow, colorRow2, colorRow3],
		});

		let buttonRoleEmbed2 = new MessageEmbed()
			.setTitle('Exclusive Color Roles')
			.setColor('WHITE').setDescription(`
		<:EeC_black:793983059686064128> = <@&764885367345119290>
<:EeC_pred:793982385577525320> = <@&764885367378804804>
<:EeC_porange:793982448790274058> = <@&860643620114006056>  
<:EeC_pyellow:793982462144544809> = <@&764885367378804801>
<:EeC_ngreen:793982614721003530> = <@&764885367378804799>
<:EeC_pgreen:793982633519743007> = <@&764885367378804798>
<:EeC_sblue:793982815762907136> = <@&764885367378804797>
<:EeC_pblue:793982945551450131> = <@&764885367345119291>
<:EeC_ppurple:793982996730347530> = <@&764885367345119288>
<:EeC_ppink:793983047997063228> = <@&764885367345119286>
		`);

		let blackBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('blackBtn')
			.setEmoji('<:EeC_black:793983059686064128>');

		let pRBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('pRBtn')
			.setEmoji('<:EeC_pred:793982385577525320>');

		let pOBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('pOBtn')
			.setEmoji('<:EeC_porange:793982448790274058>');

		let pYBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('pyBtn')
			.setEmoji('<:EeC_pyellow:793982462144544809>');

		let nGBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('nGBtn')
			.setEmoji('<:EeC_ngreen:793982614721003530>');

		let pGBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('pGBtn')
			.setEmoji('<:EeC_pgreen:793982633519743007>');

		let dBBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('dBBtn')
			.setEmoji('<:EeC_sblue:793982815762907136>');

		let pBBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('pBBtn')
			.setEmoji('<:EeC_pblue:793982945551450131>');

		let pVBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('pVBtn')
			.setEmoji('<:EeC_ppurple:793982996730347530>');

		let pPBtn = new MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('pPBtn')
			.setEmoji('<:EeC_ppink:793983047997063228>');

		let removeRolesBtn2 = new MessageButton()
			.setStyle('DANGER')
			.setLabel('Remove')
			.setCustomId('removeRoles2')
			.setEmoji('❌');

		let colorRow6 = new MessageActionRow().addComponents(
			blackBtn,
			pRBtn,
			pOBtn,
			pYBtn,
			nGBtn
		);

		let colorRow4 = new MessageActionRow().addComponents(
			pGBtn,
			dBBtn,
			pBBtn,
			pVBtn,
			pPBtn
		);

		let colorRow5 = new MessageActionRow().addComponents(removeRolesBtn2);

		chan2.send({
			embeds: [buttonRoleEmbed2],
			components: [colorRow6, colorRow4, colorRow5],
		});

		let ping1 = [
			{
				role: '764885367241048064',
				emoji: '<a:giveaway:945643098850078730>',
			},
			{
				role: '767787322133184542',
				emoji: '<a:heistping:945642941085528064>',
			},
			{
				role: '774568693522366474',
				emoji: '<a:nitro:945642998392324106>',
			},
			{
				role: '827280787228590170',
				emoji: '<a:EE_rheist:860620411980873728>',
			},
		];

		let ping2 = [
			{
				role: '764885367223484484',
				emoji: '<a:partner:945643057813004338>',
			},
			{
				role: '764885367223484483',
				emoji: '<a:EE_rrannouncement:774735175711326258>',
			},
			{ role: '860297165846872066', emoji: '<:bump:945744715855323166>' },
			{
				role: '855638128215195649',
				emoji: '<:karuta:945739329433632829>',
			},
			{ role: '888763947874930749', emoji: '<a:owo:920252021058179072>' },
		];
		let ping3 = [
			{
				role: '778355810043559976',
				emoji: '<a:event_ping:945652225508794398>',
			},
			{
				role: '914243403070459914',
				emoji: '<:mafia_ping:945652479926861835>',
			},
			{
				role: '793676669550329897',
				emoji: '<a:fight_cage:945652306962157608>',
			},
			{
				role: '794315002449231893',
				emoji: '<:mudae_ping:945652416991342632>',
			},
			{
				role: '767788380351102976',
				emoji: '<:raffle_ping:945652530812166184>',
			},
		];

		let p1 = [
			{
				role: '764885367223484478',
				emoji: '<:her:945736256682360864>',
			},
			{
				role: '764885367223484479',
				emoji: '<:he:945736222293254194>',
			},
			{ role: '764885367223484477', emoji: '<:them:945736293525102683>' },
		];

		let p2 = [
			{
				role: '764885367223484476',
				emoji: '👻',
			},
			{
				role: '764885367211294759',
				emoji: '🥶',
			},
			{ role: '764885367211294758', emoji: '😈' },
		];

		let p3 = [
			{
				role: '764885367211294757',
				emoji: '<:EE_rrAfrica:860982567406665758>',
			},
			{
				role: '764885367211294756',
				emoji: '<:EE_rrAsia:767770899507052565>',
			},
			{
				role: '764885367211294755',
				emoji: '<:EE_rrOceania:767770809871237130>',
			},
			{
				role: '764885367211294754',
				emoji: '<:EE_rrEurope:767770625808007178>',
			},
			{
				role: '764885367211294753',
				emoji: '<:EE_rrNorth_America:767770151034159154>',
			},
			{
				role: '764885367211294752',
				emoji: '<:EE_rrSouth_America:767770577330896906>',
			},
		];

		let p4 = [
			{
				role: '764885367173677106',
				emoji: '🙍',
			},
			{
				role: '764885367173677105',
				emoji: '👫',
			},
			{ role: '771819040372948992', emoji: '💑' },
			{
				role: '764885367173677104',
				emoji: '❗',
			},
			{ role: '764885367173677103', emoji: '👀' },
		];

		// let buttons = [];
		// let row = [];
		// let str = '';

		async function makeEmbed(message, ping1, title, channel) {
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
			let chan = await client.channels.fetch(channel)
			chan.send({
				embeds: [buttonRoleEmbed2.setDescription(str).setTitle(title)],
				components: [row],
			});
		}
		makeEmbed(message, ping1, 'Giveaway Pings', '945757610316013638');
		makeEmbed(message, ping2, 'Server Pings', '945757610316013638');
		makeEmbed(message, ping3, 'Event Pings', '945757610316013638');

		makeEmbed(message, p1, 'Gender Roles', '945760941792981072');
		makeEmbed(message, p2, 'Age', '945760941792981072');
		let buttons = [];
		let row = [];
		let row2 = [];
		str = '';
		for (let i = 0; i < p3.length; i++) {
			let role = message.guild.roles.cache.get(p3[i].role);
			buttons.push(
				new MessageButton()
					.setStyle('PRIMARY')
					.setCustomId(p3[i].role)
					.setLabel(role.name)
					.setEmoji(p3[i].emoji)
			);
			row = new MessageActionRow().addComponents(buttons.slice(0, 3));
			row2 = new MessageActionRow().addComponents(buttons.slice(3, 7));
			str += `${p3[i].emoji} = <@&${p3[i].role}>\n`;
		}
		let chan = await client.channels.fetch('945760941792981072')
		chan.send({
			embeds: [buttonRoleEmbed.setDescription(str).setTitle('Location')],
			components: [row, row2],
		});
		makeEmbed(message, p4, 'Relationship Status', '945760941792981072');

		// for (let i = 0; i < ping1.length; i++) {
		// 	let role = message.guild.roles.cache.get(ping1[i].role);
		// 	buttons.push(
		// 		new MessageButton()
		// 			.setStyle('PRIMARY')
		// 			.setCustomId(ping1[i].role)
		// 			.setLabel(role.name)
		// 			.setEmoji(ping1[i].emoji)
		// 	);
		// 	row = new MessageActionRow().addComponents(buttons);
		// 	str += `${ping1[i].emoji} = <@&${ping1[i].role}>\n`;
		// }
		// message.channel.send({
		// 	embeds: [buttonRoleEmbed2.setDescription(str)],
		// 	components: [row],
		// });
		// buttons = [];
		// row = [];
		// str = '';
		// for (let i = 0; i < ping2.length; i++) {
		// 	let role = message.guild.roles.cache.get(ping2[i].role);
		// 	buttons.push(
		// 		new MessageButton()
		// 			.setStyle('PRIMARY')
		// 			.setCustomId(ping2[i].role)
		// 			.setLabel(role.name)
		// 			.setEmoji(ping2[i].emoji)
		// 	);
		// 	row = new MessageActionRow().addComponents(buttons);
		// 	str += `${ping2[i].emoji} = <@&${ping2[i].role}>\n`;
		// }
		// message.channel.send({
		// 	embeds: [buttonRoleEmbed2.setDescription(str)],
		// 	components: [row],
		// });
		// buttons = [];
		// row = [];
		// str = '';
		// for (let i = 0; i < ping3.length; i++) {
		// 	let role = message.guild.roles.cache.get(ping3[i].role);
		// 	buttons.push(
		// 		new MessageButton()
		// 			.setStyle('PRIMARY')
		// 			.setCustomId(ping3[i].role)
		// 			.setLabel(role.name)
		// 			.setEmoji(ping3[i].emoji)
		// 	);
		// 	row = new MessageActionRow().addComponents(buttons);
		// 	str += `${ping3[i].emoji} = <@&${ping3[i].role}>\n`;
		// }
		// message.channel.send({
		// 	embeds: [buttonRoleEmbed2.setDescription(str)],
		// 	components: [row],
		// });

		// buttons = [];
		// row = [];
		// str = '';
		// for (let i = 0; i < p1.length; i++) {
		// 	let role = message.guild.roles.cache.get(p1[i].role);
		// 	buttons.push(
		// 		new MessageButton()
		// 			.setStyle('PRIMARY')
		// 			.setCustomId(p1[i].role)
		// 			.setLabel(role.name)
		// 			.setEmoji(p1[i].emoji)
		// 	);
		// 	row = new MessageActionRow().addComponents(buttons);
		// 	str += `${p1[i].emoji} = <@&${p1[i].role}>\n`;
		// }
		// message.channel.send({
		// 	embeds: [buttonRoleEmbed2.setDescription(str)],
		// 	components: [row],
		// });

		// buttons = [];
		// row = [];
		// str = '';
		// for (let i = 0; i < p2.length; i++) {
		// 	let role = message.guild.roles.cache.get(p2[i]);
		// 	buttons.push(
		// 		new MessageButton()
		// 			.setStyle('PRIMARY')
		// 			.setCustomId(p2[i])
		// 			.setLabel(role.name)
		// 	);
		// 	row = new MessageActionRow().addComponents(buttons);
		// 	str += `<@&${p2[i]}>\n`;
		// }
		// message.channel.send({
		// 	embeds: [buttonRoleEmbed2.setDescription(str)],
		// 	components: [row],
		// });

		// buttons = [];
		// row = [];
		// str = '';
		// for (let i = 0; i < p4.length; i++) {
		// 	let role = message.guild.roles.cache.get(p4[i]);
		// 	buttons.push(
		// 		new MessageButton()
		// 			.setStyle('PRIMARY')
		// 			.setCustomId(p4[i])
		// 			.setLabel(role.name)
		// 	);
		// 	row = new MessageActionRow().addComponents(buttons);
		// 	str += `<@&${p4[i]}>\n`;
		// }
		// message.channel.send({
		// 	embeds: [buttonRoleEmbed2.setDescription(str)],
		// 	components: [row],
		// });
	},
};
