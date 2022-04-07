const moment = require('moment');
const { Message, Client, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'stats',
	aliases: [],
	cooldown: '0',
	permissions: [],
	category: 'Misc',
	async execute(client, message, cmd, args) {
//         function heistStatistics(string, message) {
//             let array = string.replace(/```/g, '').split('\n')
//             let usersDead = array.filter(x => x[0] === '-').length
//             let usersFined = array.filter(x => x[0] === '#')
//             let usersHeisted = array.filter(x => x[0] === '+')
        
//             let highestFine = usersFined.map(el => el.replace(/,/g, '').match(/⏣ \d+/)).reduce((a, b) => (parseInt(a[0].replace(/⏣ /, '')) > parseInt(b[0].replace(/⏣ /, '')) ? a : b)).input
            
//             let heistAmount = parseInt(message.replace(/⏣|,/g, '').split('`')[1])
        
//             let heistValue = parseInt(usersHeisted[0].replace(/,/g, '').match(/\d+/)[0])
        
//             let fineValue = 0
//             usersFined.map(el => {
//                 fineValue += parseInt(el.replace(/,/g, '').match(/\d+/)[0])
//             })
//             let averageValue = Math.round(fineValue/ usersFined.length)
//             return [usersDead, usersFined.length, usersHeisted.length, highestFine, heistAmount, heistValue, fineValue, averageValue]
//         }
	function heistStatistics(string, message) {
	    let array = string.replace(/```/g, '').split('\n')
	    if(!array) return
	    let usersDead = array.filter(x => x[0] === '-').length
	    let usersFined = array.filter(x => x[0] === '#')
	    let usersHeisted = array.filter(x => x[0] === '+')

	    let highestFine = Math.max.apply(null, usersFined.map(x => x.match(/\s\b\d[\d,.]*\b/g).map(e => e.replace(/,/g, ''))));

	    let heistAmount = Number(message.match(/\W\b\d[\d,.]*\b/g)[0].replace(/`|,/g, ''))

	    let heistValue =  Number(usersHeisted[0].match(/\s\b\d[\d,.]*\b/g)[0].replace(/,/g, ''))

	    let fineValue = 0
	    usersFined.map(m => {
		fineValue +=  Number(m.match(/\s\b\d[\d,.]*\b/g)[0].replace(/,/g, ''))
	    })
	    let averageValue = Math.round(fineValue / usersFined.length)
	    return [usersDead, usersFined.length, usersHeisted.length, highestFine, heistAmount, heistValue, fineValue, averageValue]
	}
		const messageId = args[0]
        let firstMessage = await message.channel.messages.fetch(messageId)
        let heistMessages = await message.channel.messages.fetch({after: messageId})
        heistMessages = heistMessages.filter(x => x.author.id === '270904126974590976' && x.createdTimestamp > new Date().getTime() - 300000)
        if(!heistMessages) return;
        heistMessages.forEach(x => {
            heistMessages += `${x.content}\n`
        })
        let [usersDead, usersFined, usersHeisted, highestFine, heistAmount, heistValue, fineValue, averageValue] = heistStatistics(heistMessages, firstMessage.content)
        let embed = new MessageEmbed()
        .setTitle(`Heist Statistics for ${heistAmount.toLocaleString()}`)
        .setColor('RANDOM')
        .setTimestamp()
        .setDescription(`<:replycont:877221297308958761> **Users Dead**: \`${usersDead}\`\n<:replycont:877221297308958761> **Users Fined**: \`${usersFined}\`\n<:replycont:877221297308958761> **Users Succesfull**: \`${usersHeisted}\`\n<:replycont:877221297308958761> **Amount Heisted**: \`${heistValue.toLocaleString()}\`\n<:replycont:877221297308958761> **Total Fine**: \`${fineValue.toLocaleString()}\`\n<:replycont:877221297308958761> **Average Fine**: \`${averageValue.toLocaleString()  }\``)
        .addField('Most Fined', `\`\`\`${highestFine}\`\`\``)

        let button = new MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('stats')
        .setLabel('Your Stats')

        let row = new MessageActionRow().addComponents(button)

        let msg = await message.channel.send({embeds: [embed], components: [row]})

        const filter = fn => fn
		const collector = msg.createMessageComponentCollector({
			filter,
			time: 60000,
		  });
		collector.on('collect', (btn) => {
			if (btn.customId == 'stats') {
                let found = heistMessages.replace(/```/g, '').split('\n').find(x => x === btn.user.username)
                let embed = new MessageEmbed()
                .setTitle(`Heist stats for ${btn.user.tag}`)
                .setColor('RANDOM')
                .setDescription(`\`\`\`${found}\`\`\``)
                if(!found) embed.setDescription('Could not find your results in this heist.')
				btn.reply({embeds: [embed], ephemeral: true})
			}
		});
		collector.on('end', (collected, reason) => {
			if (reason.toLowerCase() === 'time') {

				msg.components[0].components.forEach((com) => {
					com.setDisabled(true);
					com.setStyle('SECONDARY');
				});
				let rows2 = new MessageActionRow().addComponents(msg.components[0].components)
				msg.edit({components: [rows2]});
			}
		});
	},
};
