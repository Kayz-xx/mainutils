const Discord = require('discord.js');
const ms = require('ms');
const giveawayModel = require('../../schemas/giveaway-schema')

module.exports = {
	name: 'gstart',
	aliases: ['giveawaystart'],
	cooldown: '0',
	permissions: [],
	category: 'Giveaways',

	async execute(client, message, cmd, args) {
		if(message.member.roles.cache.some(x => x.id === '774008242127765535')) {
		let roles = []
		message.guild.roles.cache.forEach(role => roles.push({name: role.name, id: role.id}))
function similarityBetween(s1, s2) {
	let longer = s1;
	let shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	const longerLength = longer.length;
	if (longerLength === 0) {
		return 1.0;
	}
	return (
		(longerLength - editDistance(longer, shorter)) /
		parseFloat(longerLength)
	);
}

function editDistance(s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	const costs = [];
	for (let i = 0; i <= s1.length; i++) {
		let lastValue = i;
		for (let j = 0; j <= s2.length; j++) {
			if (i === 0) {
				costs[j] = j;
			} else {
				if (j > 0) {
					let newValue = costs[j - 1];
					if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
						newValue =
							Math.min(
								Math.min(newValue, lastValue),
								costs[j]
							) + 1;
					}
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0) {
			costs[s2.length] = lastValue;
		}
	}
	return costs[s2.length];
}

function search(query) {
	query = query.toLowerCase();

	const target = roles;
	const candidates = [];

	for (const item in target) {
		const candidate = {
			item: target[item],
			similarity: 0,
		};

		if (candidate.item.id.toLowerCase() === query) {
			candidate.similarity = 1;
		} else if (candidate.item.name.toLowerCase() === query) {
			candidate.similarity = 0.999;
		} else if (
			candidate.item.name.toLowerCase().includes(" " + query + " ") ||
			candidate.item.id.includes(" " + query + " ")
		) {
			candidate.similarity = 0.998;
		} else if (
			candidate.item.name.toLowerCase().includes(query + " ") ||
			candidate.item.id.includes(query + " ")
		) {
			candidate.similarity = 0.997;
		} else if (
			candidate.item.name.toLowerCase().includes(" " + query) ||
			candidate.item.id.includes(" " + query)
		) {
			candidate.similarity = 0.997;
		} else if (
			candidate.item.name.toLowerCase().includes(query) ||
			candidate.item.id.includes(query)
		) {
			candidate.similarity = 0.996;
		} else {
			const similarity = similarityBetween(
				query,
				candidate.item.name
			);
			candidate.similarity = similarity;
		}

		candidates.push(candidate);
	}
	return candidates.sort((a, b) => b.similarity - a.similarity)[0]

}

		const time = args[0];
		if (!time) {
			return message.reply({
				content: `\`\`\`\yml\nSyntax: e!gstart <time> <winners> <requirement> <prize>\n                  ^^^^\n\ntime is a required argument that is missing. \`\`\``,
			});
		}
		if (ms(time) < 10000) {
			return message.reply({
				content: 'The minimum time for a giveaway is 10s or more.',
			});
		}
		const winners = args[1];
		if (!winners) {
			return message.reply({
				content: `\`\`\`\yml\nSyntax: e!gstart <time> <winners> <requirement> <prize>\n                         ^^^^^^^\n\nwinners is a required argument that is missing. \`\`\``,
			});
		}

		if (parseInt(winners) <= 0) {
			return message.reply({
				content: `\`\`\`Winners can only be a positive integer\`\`\``,
			});
		}
		if(parseInt(winners) > 20) return message.reply("The max amount of winners is 20") 

		const host = message.author;
		const add = ms(time);


		let blank = [];
		let str = '';
		let r = '';
		let b = '';
		let d = '';
		let requirement = false;
		let bypass = false;
		let blacklisted = false;
		const regex = /(?<RoleID>\w+)\[?(?<Type>role|blrole|bypass)?\]?/gm;
		const string = args[2]

		if (!string) {
			return message.reply({
				content: `\`\`\`\yml\nSyntax: e!gstart <time> <winners> <requirement> <prize>\n                                   ^^^^^^^^^^^\n\nprize is a required argument that is missing. \`\`\``,
			});
		}
		let prize = args
			.slice(3)
			.join(' ')
			.split(/ --| —/)[0];
		if (!prize) {
			return message.reply({
				content: `\`\`\`\yml\nSyntax: e!gstart <time> <winners> <requirement> <prize>\n                                                 ^^^^^\n\nprize is a required argument that is missing. \`\`\``,
			});
		}
		let m;
		const flags = new Map();
		const remainder = ` ${args.join(' ')}`;
		const params = remainder.split(/ --| —/).filter((el) => !!el);
		setTimeout(() => message.delete(), 1000)
		params.forEach((content) => {
			if (!content.startsWith(' ')) {
				flags.set(
					` ${content
						.split(' ')
						.slice(0, 1)
						.join(' ')}`,
					`${content
						.split(' ')
						.slice(1)
						.join(' ')}`
				);
			}
		});

		let msg;
		let donor;
		let v;
		let donormsg = '';
		if (flags.get(` donor`)) {
			donor = flags.get(` donor`);
			v = client.users.cache.get(donor) || message.mentions.members.first()
			if (v == null || v == undefined)
				return message.reply('No user found with that id!');
			donormsg = `\n\n**Donor:**\n${v.toString()}`;
		} else if (!flags.get(` donor`)) {
			donor = 'No Donor';
		}

	

		
		while ((m = regex.exec(string)) !== null) {
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		
		if (m.groups?.Type === 'role') {
			let tem = search(m.groups?.RoleID)
			
			if(tem.similarity <= 0.6) return message.reply("No role found with the name or id provided")
		
			r = message.guild.roles.cache.find(
				(r) => r.id == tem.item.id
			) 
			if(!r) return message.reply({content: 'This role could not be found in the server.'})
			blank.push({ name: 'Required Roles', id: r.id, idn: r.name });
		}
		if (m.groups?.Type === 'bypass') {
			let tem = search(m.groups?.RoleID)
			if(tem.similarity <= 0.6) return message.reply("No role found with the name or id provided")
		
			b = message.guild.roles.cache.find(
				(r) => r.id == tem.item.id
			) 
			if(!b) return message.reply({content: 'This role could not be found in the server.'})
			blank.push({ name: 'Bypass Roles', id: b.id, idn: b.name });
		}
		if (m.groups?.Type === 'blrole') {
			let tem = search(m.groups?.RoleID)
			if(tem.similarity <= 0.6) return message.reply("No role found with the name or id provided")
			
			b = message.guild.roles.cache.find(
				(r) => r.id == tem.item.id
			) 
			if(!d) return message.reply({content: 'This role could not be found in the server.'})
			blank.push({
				name: 'Blacklisted Roles',
				id: d.id,
				idn: d.name,
			});
		}
		}
		let r1 = blank.filter((item) => item.name === 'Required Roles');
		if (r1.length > 0) requirement = true;
		else requirement = false;
		let d2 = blank.filter((item) => item.name === 'Bypass Roles');
		if (d2.length > 0) bypass = true;
		else bypass = false;
		let c4 = blank.filter((item) => item.name === 'Blacklisted Roles');
		if (c4.length > 0) blacklisted = true;
		else blacklisted = false;
		let rolereq = []
		let bypassreq = []
		r1.forEach((d) => {
			rolereq.push(`<@&${d.id}>`);
		});
		d2.forEach((d) => {
			bypassreq.push(`<@&${d.id}>`);
		});
		let blarray = [];
		let bled = [];
		c4.forEach((d) => {
			blarray.push(`<@&${d.id}>`);
			bled.push(`${d.id}`);
		});

		if (requirement) {
			str = `**\n\nRequirement:**\nRoles: `
			str += rolereq.join(', ')
			str = str.replace(/,(?=[^,]*$)/, ' and')
		}

		if (requirement && bypass) {
			str += `\nBypass Roles: `;
			str += bypassreq.join(', ')
			str = str.replace(/,(?=[^,]*$)/, ' and')
		}

		if (requirement && bypass == false && blacklisted) {
			str += `\nBlacklisted Roles: `;
			str += blarray.join(', ')
			str = str.replace(/,(?=[^,]*$)/, ' and')
		}

		if (requirement == false && bypass == false && blacklisted) {
			str += `**\n\nRequirement:**\nBlacklisted Roles: `;
			str += blarray.join(', ')
			str = str.replace(/,(?=[^,]*$)/, ' and')
		}

		if (requirement && bypass && blacklisted) {
			str += `\nBlacklisted Roles: `;
			str += blarray.join(', ')
			str = str.replace(/,(?=[^,]*$)/, ' and')
		}


		if (string.toLowerCase() == 'none') str = '';
		client.giveaways.start(message.channel, {
			duration: ms(time),
			winnerCount: parseInt(winners),
			prize: prize,
			hostedBy: host,
			reaction: '<a:EE_check:881050609959190528>',
			extraData: [r1, d2, bled],
			exemptMembers: new Function(
				'member',
				`const x = this.extraData[2].some(r => member.roles.cache.has(r)); return x;`
			),
			messages: {
				giveaway:
					'<a:nya:880473843867725874> **ELITE EMPIRE GIVEAWAY** <a:nya:880473843867725874>',
				giveawayEnded:
					'<a:sed:880473858870747166> **GIVEAWAY ENDED** <a:sed:880473858870747166>',
				inviteToParticipate:
					'React with <a:EE_check:881050609959190528> to participate!',
				drawing: `Time: **${ms(add, {long: true,})}** ({timestamp})`,
				noWinnerMessage: 'Giveaway cancelled, no valid participations.',
				hostedBy: `Hosted by: ${host}${str}${donormsg}`,
				winMessage:
					"Congratulations, {winners}! You have won the **{this.prize}** giveaway! Make sure to wait at least 12 hours before DMing the host for the prize. You'll get rerolled if you DM before 12 hours. \n{this.messageURL}",
				winners: 'Winners: ',
				endedAt: 'Ended at',
				embedFooter: {
					text: `Winners(${winners.replace('w', '')}) | Ends At`,
					iconURL: message.guild.iconURL()
				},
			},
		});
		if (flags.get(` msg`)) {
			msg = flags.get(` msg`);
			em2 = new Discord.MessageEmbed()
				.setTitle(
					'<a:nya:880473843867725874> Elite Empire Giveaway! <a:nya:880473843867725874>'
				)
				.setColor('2D46B9')
				.setDescription(`**Message:** ${msg}`);
			message.channel.send({ embeds: [em2] });
		} else if (!flags.get(` msg`)) {
			msg = 'No Message';
		}
		}
	},
};
/* let rolesRegex = new RegExp(/(?<Roles>(\d{18}(\[(role|bypassrole|blrole)\])?( +)?)+)/, 'igm');
        let inputRoleMatch = new RegExp(/(?<RoleID>\d{18})(\[(?<Type>(role|bypassrole|blrole))\])?/, 'igm')

        const { Roles } = rolesRegex.exec(message.content).groups;

        let roles = [...Roles.matchAll(inputRoleMatch)]

        let roled = ''
        let bl = ''
        let bypass = ''

        for(const { RoleID, Type } of roles){
        if(Type === "role") {
         roled = message.guild.roles.cache.find(r => r.id == RoleID)
        if(Type === "blrole") {
          bl = message.guild.roles.cache.find(r => r.id == RoleID)
           }
        if(Type === "bypassrole") {
         bypass = message.guild.roles.cache.find(r => r.id == RoleID)
        }
}
*/

/*
        let data = await db
        .ref(`Giveaways/Role`)
        .once("value")
        .then(snapshot => snapshot.val())|| []
    
        db.ref(`Giveaways/Role`).set(req.id)
        
*/

/*	let rolearray = args[2].split(',');
let req = [];
let role = [];
rolearray.forEach((e) => {
	req.push(
		message.guild.roles.cache.find((r) => r.id === e) ||
		message.guild.roles.cache.find((r) => r.name === e)
	);
});

const flags = new Map();
const remainder = ` ${args.join(' ')}`;
const params = remainder.split(/ --| —/).filter((el) => !!el);

params.forEach((content) => {
	if (!content.startsWith(' ')) {
		flags.set(
			` ${content
				.split(' ')
				.slice(0, 1)
				.join(' ')}`,
			`${content
				.split(' ')
				.slice(1)
				.join(' ')}`
		);
	}
});

if (flags.get(` bypass`)) {
	roles = flags.get(` bypass`);
	if (roles.length >= 1024) {
		return message.reply(
			`Roles cannot contain more than 1024 character`
		);
	}
} else {
}
let rolesinfo = roles.split(',')
rolesinfo.forEach((rolesinfo) => {
	role.push(
		message.guild.roles.cache.find((r) => r.id === rolesinfo)
	);
});
if (rolearray == 'none') req = null;
let prize = args.slice(3).join(' ').split('--')[0]
const host = message.author;
const add = ms(time);
const date = parseInt(new Date().getTime()) + parseInt(add);
const rdate = Math.ceil(date / 1000);
let str = '';
let rolec = '';
if (req) {
	id = req.id;
	name = req.name;

	if (typeof rolearray === 'string') {

		rolec = `<@&${req[0].id}>`;
		str = `\n\n**Requirement:**\n Roles: ${rolec}`;
	} else {
		for (let i = 0; i < Math.min(10, req.length); i ++) {
			let r = req [i];
			rolec += `<@&${r.id}>,`
		  };
		str = `\n\n**Requirement:**\n Roles: ${rolec}`;
	}
		str += `\nBypass Roles: `
	for (let i = 0; i < Math.min(10, role.length); i ++) {
		let r = role [i];
		str += `<@&${r.id}>,`
	  };
}*/
