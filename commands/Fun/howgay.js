const { MessageButton, MessageActionRow } = require('discord.js')
const Discord = require('discord.js')



module.exports = {
    name: 'howgay',
    aliases: ['gaypercent'],
    cooldown: '0',
    permissions: [],
    category: 'Misc',
    description: 'Just a regular howgay command',

  
    async execute(client, message, cmd,  args) {
        let member = message.mentions.users.first()
        if(!member) return message.reply('Please mention a member to fight with')
        if (member.bot || member.id === message.author.id) return;
        let type = args[1]
        let op = ["high","low"]
        if(!op.some(el => type.toLowerCase().includes(el))) return message.reply("Valid Options: \`High, Low\`")
        if(!type) return message.reply('Please specify highgay or lowgay')
        let acceptbutton = new MessageButton()
		.setStyle('SUCCESS')
		.setLabel("Accept")
		.setCustomId('accept');
	    let denybutton = new MessageButton()
		.setStyle('DANGER')
		.setLabel("Deny")
		.setCustomId('deny');
	let row = new MessageActionRow().addComponents([
		acceptbutton,
		denybutton,
	]);
	const embed = new Discord.MessageEmbed()
		.setTitle("Howgay Fight")
		.setDescription(`<@${message.author.id}> challenged <@${member.id}> to a fight, do you accept?`)
		.setFooter("Good Luck")
        .setTimestamp()
		.setColor("RANDOM");

	const question = await message.reply({
		embeds: [embed],
        components: [row]
	});
	const Collector = await question.createMessageComponentCollector({ filter: (fn) => fn, 
		time: 30000,
	});
	Collector.on('collect', async (btn) => {
		if (btn.member.id !== member.id) {
			return btn.reply({content: 'This is not your choice.', ephemeral: true}
			);
		}
		btn.deferUpdate()
		if (btn.customId === 'deny') {
			acceptbutton = new MessageButton()
				.setDisabled()
				.setStyle('SUCCESS')
				.setLabel("Accept")
				.setCustomId('accept');
			denybutton = new MessageButton()
				.setDisabled()
				.setStyle('DANGER')
				.setLabel("Deny")
				.setCustomId('deny');
			row = new MessageActionRow().addComponents([
				acceptbutton,
				denybutton,
			]);
			const emd = new Discord.MessageEmbed()
            .setTitle("Howgay Fight")
            .setDescription(`The fight was cancelled.`)
            .setFooter("Good Luck")
            .setTimestamp()
            .setColor("RANDOM");
			Collector.stop();
			return question.edit({
				embeds: [emd],
				components: [row]
			    });
            } else if (btn.customId === 'accept') {
                Collector.stop();
              
        
                let val = Math.floor(Math.random() * 100) + 1;
                let val2 = Math.floor(Math.random() * 100) + 1;
        
                let embed = new Discord.MessageEmbed()
                .setTitle('Howgay')
                .addField(`${message.author.tag}`, `Percent: **${val}%**`)
                .setTimestamp()
                .setFooter('Enjoy!')
                .setColor("RANDOM")
        
                let msg = await message.channel.send({embeds: [embed]})
        
                if(type.toLowerCase() === "low") {
                    embed.addField(`${member.tag}`, `Percent: **${val2}**%`, true)
                    embed.setColor("RANDOM")
                    msg.edit({embeds: [embed]})
                    if(val < val2) {
                        embed.setDescription(`<@${message.author.id}> has won the game.`)
                        embed.setColor("RANDOM")
                        msg.edit({embeds: [embed]})
                    }
                    if(val === val2) {
                        embed.setDescription(`It\'s a tie!`)
                        embed.setColor("RANDOM")
                        msg.edit({embeds: [embed]})
                    }
                    if(val > val2) {
                        embed.setDescription(`<@${member.id}> has won the game.`)
                        embed.setColor("RANDOM")
                        msg.edit({embeds: [embed]})
                    }
                }
        
                if(type.toLowerCase() === "high") {
                    embed.addField(`${member.tag}`, `Percent: **${val2}**%`, true)
                    embed.setColor("RANDOM")
                    msg.edit({embeds: [embed]})
                    if(val > val2) {
                        embed.setDescription(`<@${message.author.id}> has won the game.`)
                        embed.setColor("RANDOM")
                        msg.edit({embeds: [embed]})
                    }
                    if(val === val2) {
                        embed.setDescription(`It\'s a tie!`)
                        embed.setColor("RANDOM")
                        msg.edit({embeds: [embed]})
                    }
                    if(val < val2) {
                        embed.setDescription(`<@${member.id}> has won the game.`)
                        embed.setColor("RANDOM")
                        msg.edit({embeds: [embed]})
                    }
                }
            }
        }) 
        Collector.on('end', async (collected, reason) => {
                const embed = new Discord.MessageEmbed()
                .setTitle("Timed Out")
                .setDescription(`<@${message.author.id}> challenged <@${member.id}> to a fight, do you accept?`)
                .setTimestamp()
                .setColor("RED");
				question.components[0].components.forEach((com) => {
					com.setDisabled(true);
					com.setStyle('SECONDARY');
				});
				let rows2 = new MessageActionRow().addComponents(question.components[0].components)
				question.edit({embeds: [embed], components: [rows2]});

        })
    }

}
