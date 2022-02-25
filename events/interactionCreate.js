// let polle = require('../poll')
// const { shuffle, sample } = require('lodash');
// const QuickChart = require('quickchart-js');
module.exports.run = async (client, interaction) => {
	// if (interaction.customId.startsWith('poll')) {
	// 	const [_, pollID, __, choice] = interaction.customId.split('_');
	// 	const { user } = interaction;
	// 	const hasVoted = await polle.hasVoted(pollID, user.id, interaction.guild.id);
	// 	if (hasVoted === true) {
	// 		return interaction.followUp({
	// 			embeds: [
	// 				{
	// 					title: 'You can only vote once',
	// 					description: `You've already voted for **poll #${pollID}**`,
	// 					color: 16711680 // red
	// 				}
	// 			],
	// 			ephemeral: true
	// 		});
	// 	}

	// 	await polle.addVote(pollID, user.id, choice, interaction.guild.id);
	// 	return interaction.followUp({
	// 		embeds: [
	// 			{
	// 				description: `You've successfully voted for **poll #${pollID}**`,
	// 				color: 8519546 // green
	// 			}
	// 		],
	// 		ephemeral: true
	// 	});
	// }

	// if (interaction.customId.startsWith('endPoll')) {
	// 	const pollID = interaction.customId.split('_')[1];
	// 	const poll = await polle.get(+pollID, interaction.guild.id);
	// 	if (poll.user !== interaction.user.id) {
	// 		return interaction.followUp({
	// 			embeds: [
	// 				{
	// 					description:
	// 						"This isn't your poll, so you can't end it."
	// 				}
	// 			],
	// 			ephemeral: true
	// 		});
	// 	}
	// 	await polle.end(poll._id);

	// 	const myChart = new QuickChart()
	// 		.setWidth(640)
	// 		.setHeight(480)
	// 		.setBackgroundColor('#0D0C1D');
	// 	const choices = Object.values(poll.choice);
	// 	const choicesObject = {};
	// 	const emotes = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];
	// 	const colours = [
	// 		'#e27d60',
	// 		'#085dcb',
	// 		'#e8a87c',
	// 		'#c38d9e',
	// 		'#41b3a3',
	// 		'#8d8741',
	// 		'#659dbd',
	// 		'#daad86',
	// 		'#bc986a',
	// 		'#fbeec1'
	// 	];

	// 	choices.forEach((c, idx) => {
	// 		choicesObject[idx + 1] = c.votes;
	// 	});
	// 	const [choiceNumber, voteCount] = Object.entries(choicesObject)
	// 		.sort((a, b) => b[1] - a[1])
	// 		.slice(0, 5)
	// 		.reduce(
	// 			(acc, elem) => {
	// 				acc[0].push(elem[0]);
	// 				acc[1].push(elem[1]);
	// 				return acc;
	// 			},
	// 			[[], []]
	// 		);
	// 	myChart.setConfig({
	// 		type: 'outlabeledPie',
	// 		data: {
	// 			labels: choiceNumber,
	// 			datasets: [
	// 				{
	// 					backgroundColor: shuffle(colours),
	// 					data: voteCount,
	// 					borderColor: '#00000000'
	// 				}
	// 			]
	// 		},
	// 		options: {
	// 			title: {
	// 				text: 'Vote Results',
	// 				display: true,
	// 				fontColor: 'white',
	// 				fontSize: 20,
	// 				fontFamily: 'lato'
	// 			},
	// 			legend: {
	// 				position: 'right'
	// 			},
	// 			plugins: {
	// 				outlabels: {
	// 					text: '%l %p',
	// 					color: 'black',
	// 					stretch: 30,
	// 					font: {
	// 						minSize: 15
	// 					}
	// 				}
	// 			}
	// 		}
	// 	});
	// 	await interaction.message.edit({
	// 		content: `This poll ended **<t:${Math.round(Date.now()/1000)}:R>**!`,
	// 		components: [],
	// 		embeds: [
	// 			{
	// 				title: `Results for poll #${pollID} by ${interaction.user.username}`,
	// 				color: "RANDOM",
	// 				description: `${
	// 					poll.random === true
	// 						? `Random Voter: <@${sample(poll.voters)}>\n`
	// 						: ''
	// 				}Question: ${poll.question}\n\n${choices
	// 					.map(
	// 						(c, idx) =>
	// 							`${emotes[idx]} — ${c.choice}: **${
	// 								c.votes?.toLocaleString() ?? 0
	// 							}**`
	// 					)
	// 					.join('\n\n')}`,
	// 				image: {
	// 					url: myChart.getUrl()
	// 				}
	// 			}
	// 		]
	// 	});
	// 	return interaction.followUp({
	// 		content: `Successfully ended poll **#${pollID}**`,
	// 		ephemeral: true
	// 	});
	// }
	let role1 = '764885367387586620';
	let role2 = '764885367378804805';
	let role3 = '860638310837256234';
	let role4 = '764885367378804802';
	let role5 = '860638377257467944';
	let role6 = '764885367378804796';
	let role7 = '764885367345119289';
	let role8 = '764885367345119287';

	let category = [role1, role2, role3, role4, role5, role6, role7, role8];

	let roleExclusive = [
		'764885367345119290',
		'764885367378804804',
		'860643620114006056',
		'764885367378804801',
		'764885367378804799',
		'764885367378804798',
		'764885367378804797',
		'764885367345119291',
		'764885367345119288',
		'764885367345119286',
	];

	async function colorRole(interaction, role) {
		await interaction.deferUpdate()
		// await category.forEach((role) => {
		// 	if (
		// 		interaction.member.roles.cache.some((r) => role.includes(r.id))
		// 	) {
		// 		interaction.member.roles.remove(role);
		// 	}
		// });
		if (interaction.member.roles.cache.hasAny(...category)) {
			await interaction.member.roles.remove(category);
		}
		await interaction.member.roles.add(role);
		return await interaction.followUp({
			content: `You got the <@&${role}> role!`,
			ephemeral: true,
		});
	}

	async function EcolorRole(interaction, role) {
			await interaction.deferUpdate()
		if (
			!interaction.member.roles.cache.has('768840484906729473') &&
			!interaction.member.roles.cache.has('764885367249174614')
		)
			return interaction.followUp({
				content: `You do not qualify for these roles!`,
				ephemeral: true,
			});
		if (interaction.member.roles.cache.hasAny(...roleExclusive)) {
			await interaction.member.roles.remove(roleExclusive);
		}
		// await roleExclusive.forEach((role) => {
		// 	if (
		// 		interaction.member.roles.cache.some((r) => role.includes(r.id))
		// 	) {
		// 		interaction.member.roles.remove(role);
		// 	}
		// });
		await interaction.member.roles.add(role);
		return await interaction.followUp({
			content: `You got the <@&${role}> role!`,
			ephemeral: true,
		});
	}

	if (interaction.customId === 'wBtn') {
		colorRole(interaction, role1);
	}
	if (interaction.customId === 'rBtn') {
		colorRole(interaction, role2);
	}
	if (interaction.customId === 'oBtn') {
		colorRole(interaction, role3);
	}
	if (interaction.customId === 'yBtn') {
		colorRole(interaction, role4);
	}
	if (interaction.customId === 'gBtn') {
		colorRole(interaction, role5);
	}
	if (interaction.customId === 'bBtn') {
		colorRole(interaction, role6);
	}
	if (interaction.customId === 'vBtn') {
		colorRole(interaction, role7);
	}
	if (interaction.customId === 'pBtn') {
		colorRole(interaction, role8);
	}
	if (interaction.customId === 'removeRoles') {
		await interaction.deferUpdate()
		await interaction.member.roles.remove(category);
		return await interaction.followUp({
			content: `You removed all the roles!`,
			ephemeral: true,
		});
	}

	if (interaction.customId === 'blackBtn') {
		EcolorRole(interaction, roleExclusive[0]);
	}
	if (interaction.customId === 'pRBtn') {
		EcolorRole(interaction, roleExclusive[1]);
	}
	if (interaction.customId === 'pOBtn') {
		EcolorRole(interaction, roleExclusive[2]);
	}
	if (interaction.customId === 'pyBtn') {
		EcolorRole(interaction, roleExclusive[3]);
	}
	if (interaction.customId === 'nGBtn') {
		EcolorRole(interaction, roleExclusive[4]);
	}
	if (interaction.customId === 'pGBtn') {
		EcolorRole(interaction, roleExclusive[5]);
	}
	if (interaction.customId === 'dBBtn') {
		EcolorRole(interaction, roleExclusive[6]);
	}
	if (interaction.customId === 'pBBtn') {
		EcolorRole(interaction, roleExclusive[7]);
	}
	if (interaction.customId === 'pVBtn') {
		EcolorRole(interaction, roleExclusive[8]);
	}
	if (interaction.customId === 'pPBtn') {
		EcolorRole(interaction, roleExclusive[9]);
	}
	if (interaction.customId === 'removeRoles2') {
		await interaction.deferUpdate()
		await interaction.member.roles.remove(roleExclusive);
		return await interaction.followUp({
			content: `You removed all the roles!`,
			ephemeral: true,
		});
	}

	let ping1 = [
		'764885367241048064',
		'767787322133184542',
		'774568693522366474',
		'827280787228590170',
	];

	let ping2 = [
		'764885367223484484',
		'764885367223484483',
		'860297165846872066',
		'855638128215195649',
		'888763947874930749',
	];

	let ping3 = [
		'778355810043559976',
		'914243403070459914',
		'793676669550329897',
		'794315002449231893',
		'767788380351102976',
	];

	let p1 = ['764885367223484478', '764885367223484479', '764885367223484477'];

	let p2 = ['764885367223484476', '764885367211294759', '764885367211294758'];

	let p3 = [
		'764885367211294757',
		'764885367211294756',
		'764885367211294755',
		'764885367211294754',
		'764885367211294753',
		'764885367211294752',
	];

	let p4 = [
		'764885367173677106',
		'764885367173677105',
		'771819040372948992',
		'764885367173677104',
		'764885367173677103',
	];

	let roles = [
		'p764885367241048064',
		'p827280787228590170',
		'p767787322133184542',
		'p764885367223484484',
	];

	async function pingRoles(interaction, array) {
		await interaction.deferUpdate()
		for (let i = 0; i < array.length; i++) {
			if (interaction.customId === array[i]) {
				if (interaction.member.roles.cache.has(array[i].replace('p', ''))) {
					await interaction.member.roles.remove(array[i].replace('p', ''));
					return await interaction.followUp({
						content: `You removed the <@&${array[i].replace('p', '')}> role!`,
						ephemeral: true,
					});
				} else {
					await interaction.member.roles.add(array[i].replace('p', ''));
					return await interaction.followUp({
						content: `You got the <@&${array[i].replace('p', '')}> role!`,
						ephemeral: true,
					});
				}
			}
		}
	}

	pingRoles(interaction, ping1);
	pingRoles(interaction, ping2);
	pingRoles(interaction, ping3);

	pingRoles(interaction, p1);
	pingRoles(interaction, p2);
	pingRoles(interaction, p3);
	pingRoles(interaction, p4);
	

	pingRoles(interaction, roles);
};
