const { MessageEmbed, Permissions, MessageButton, MessageActionRow } = require('discord.js');
const { db } = require('../../firebase');

	function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
let page = 0
module.exports = {
	name: 'lotterystart',
	aliases: ['enter', 'lotterylist', 'lotteryend'],
	cooldown: '0',
	permissions: [],
	description:
		'Lottery System!, (lotterystart- starts the lottery) (enter- allows the host to add users) (lotterylist- lists users in the lottery) (lotteryend- ends the lottery and determines a winner!)',
	category: 'Misc',

	async execute(client, message, cmd, args) {
        if(!message.member.roles.cache.has("764885367400693764") && !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return;
        if (cmd === 'lotterystart') {
			let data2 =
				(await db
					.ref(`Lottery System/${message.guild.id}/Status`)
					.once('value')
					.then((snapshot) => snapshot.val())) || [];
			if (data2 === true) {
				return message.channel.send({embeds: 
					[new MessageEmbed()
						.setDescription('A lottery is already being hosted!')
						.setColor('CE1212')]
				});
			} else {
				const prize = args.slice(0).join(' ');
				if (!prize) {
					return message.channel.send({content: 'Please specify a prize!'});
				}
				message.channel.send({embeds:
					[new MessageEmbed()
						.setAuthor(
							'New Lottery!',
							message.author.avatarURL({ dynamic: true })
						)
						.setTitle(
							`${message.author.tag} started a lottery for ${prize}! <a:im4:858370157890371595>`
						)
						.setThumbnail(
							'https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024'
						)
						.setTimestamp()
						.setColor('5C33F6')
						]});
                db.ref(`Lottery System/${message.guild.id}/Status`).set(true)
                db.ref(`Lottery System/${message.guild.id}/Prize`).set(prize)
			}
		}
		if (cmd === 'enter') {
        	let data2 =
				(await db
					.ref(`Lottery System/${message.guild.id}/Status`)
					.once('value')
					.then((snapshot) => snapshot.val())) || [];
        if (data2 !== true) {
				return message.channel.send({embeds: 
					[new MessageEmbed()
						.setDescription('There is no lottery being hosted.')
						.setColor('CE1212')]
				})
        }
        let values = args.join(' ').split('+');
		if (values.length < 1)
	    return message.reply('You must atleast specify 1 user and amount of entried');
		let array2 = [];
		let amount;
        let list = []
		for (var i = 0; i < values.length; i++) {
			array2.push(values[i].trim().split(' '));
		}
		for (const i of array2) {
			amount = i[0];
			if (!i[0]) {
				return
			}
			if (!i[1]) {
                return
			}
            if (isNaN(i[0])) {
                return message.reply('Please specify a valid number of entries')
				
			}
			if (isNaN(i[1])) {
                return message.reply('Please specify a valid Discord Id')
			}
            if (i[1].length < 18) {
                return message.reply('Please specify a valid Discord Id')
			}
            list.push({
                "User": i[1],
                "Entries": i[0]
            })
		}
        let data =
        (await db
            .ref(`Lottery System/${message.guild.id}/Lottery`)
            .once('value')
            .then((snapshot) => snapshot.val())) || [];     
       // db.ref(`Lottery System/${message.guild.id}/Lottery`).push(list)
       let v = data.length
       list.forEach((d) => {
        db.ref(`Lottery System/${message.guild.id}/Lottery/${v++}`).set(d)
       })
        const newlist = list.map((d) => {
            return `<@${d.User}> with **${d.Entries} Entries**`
        })
       
    
        let data3 =
				(await db
					.ref(`Lottery System/${message.guild.id}/Prize`)
					.once('value')
					.then((snapshot) => snapshot.val())) || [];
        let embed = new MessageEmbed()
        .setTitle(`${data3} Raffle`)
        .setAuthor(`${message.author.tag} has added these entries`)
        .setDescription(newlist.join("\n"))
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send({embeds: [embed]})
        } if(cmd === "lotterylist") {
            let data = 
            (await db
                .ref(`Lottery System/${message.guild.id}/Lottery`)
                .once('value')
                .then((snapshot) => snapshot.val())) || [];
                let data2 = 
                (await db
                    .ref(`Lottery System/${message.guild.id}/Status`)
                    .once('value')
                    .then((snapshot) => snapshot.val())) || [];
                    if (data2 !== true) {
                        return message.channel.send({embeds: 
                            [new MessageEmbed()
                                .setDescription('There is no lottery being hosted.')
                                .setColor('CE1212')]
                        }) 
                }
            else {
                 let first = new MessageButton()
				.setEmoji('<:fastb:878937208818630706>')
				.setCustomId('first')
				.setStyle('SECONDARY');

			let back = new MessageButton()
				.setEmoji('<:behind:875319719161397248>')
				.setCustomId('back')
				.setStyle('SECONDARY');

			let next = new MessageButton()
				.setEmoji('<:ahead:875319731220017162>')
				.setCustomId('next')
				.setStyle('SECONDARY');

			let last = new MessageButton()
				.setEmoji('<:fasta:878937199578607626>')
				.setCustomId('last')
				.setStyle('SECONDARY');

			let del = new MessageButton()
				.setEmoji('<:Cancel:875313311640616971>')
				.setCustomId('del')
				.setStyle('DANGER');

			let row = new MessageActionRow().addComponents(
				first,
				back,
				del,
				next,
				last
			);


                let i = 0
                const newlist = data.map((d) => {
                    return `${i + 1}-${i = i + parseInt(d.Entries)}) <@${d.User}>`
                })
                

                let pg = newlist.length - 1
                let data3 =
				(await db
					.ref(`Lottery System/${message.guild.id}/Prize`)
					.once('value')
					.then((snapshot) => snapshot.val())) || [];

                const index = 15
                const generateEmbed = (start) => {
                    const current = newlist.slice(start, start + index).join(`\n\n`);
                    const embed = new MessageEmbed()
                    .setTitle(`${data3} Raffle List`)
                        .setDescription(current)
                        .setColor('RANDOM')
                        .setTimestamp()
                        .setFooter(`Page ${start / 15} of ${Math.floor(pg / 15)}`);
    
                    return embed;
                };

                const filter = (fn) => fn
    
                const msg = await message.channel.send({
                    embeds: [generateEmbed(0)],
                    components: [row],
                });

                const collector = msg.createMessageComponentCollector({
                    filter,
                    time: 180000,
                });
                
    
                collector.on('collect', async (btn) => {
                    if (btn.customId === 'first') {
                        page = 0;
                        btn.update({
                            embeds: [generateEmbed(page)],
                            components: [row],
                        });
                    }
                    if (btn.customId === 'back') {
                        if (page > Math.floor(pg / 15) * 15 || page <= 0) {
                            return btn.deferUpdate();
                        } else {
                            page -= index;
                            btn.update({
                                embeds: [generateEmbed(page)],
                                components: [row],
                            });
                        }
                    }
                    if (btn.customId === 'next') {
                        if (page >= Math.floor(pg / 15) * 15 || page < 0) {
                            return btn.deferUpdate();
                        } else {
                            page += index;
                            btn.update({
                                embeds: [generateEmbed(page)],
                                components: [row],
                            });
                        }
                    }
                    if (btn.customId === 'last') {
                        page = Math.floor(pg / 15) * 15;
                        btn.update({
                            embeds: [generateEmbed(page)],
                            components: [row],
                        });
                    }
                    if (btn.customId === 'del') {
                        setTimeout(() => msg.delete(), 500);
                        collector.stop();
                    }
                });
                collector.on('end', (reason) => {
                    msg.components[0].components.forEach((com) => {
                        com.setDisabled(true);
                        com.setStyle('SECONDARY');
                    });
                    let rows2 = new MessageActionRow().addComponents(
                        msg.components[0].components
                    );
                    msg.edit({
                        components: [rows2],
                    });
                });
                
            }
        } if(cmd  === "lotteryend"){
            let data =
            (await db
                .ref(`Lottery System/${message.guild.id}/Lottery`)
                .once('value')
                .then((snapshot) => snapshot.val())) || [];
                let data2 = 
                (await db
                    .ref(`Lottery System/${message.guild.id}/Status`)
                    .once('value')
                    .then((snapshot) => snapshot.val())) || [];
                    if (data2 !== true) {
                        return message.channel.send({embeds: 
                            [new MessageEmbed()
                                .setDescription('There is no lottery being hosted.')
                                .setColor('CE1212')]
                        })
                }   else if (data.length == 0) {
                    message.channel.send({embeds: 
                        [new MessageEmbed()
                            .setDescription('No one entered the lottery')
                            .setColor('CE1212')]
                    })
                    db.ref(`Lottery System/${message.guild.id}/Status`).set(false)
                }
        else if (data.length >= 1) {
            let main = []
            data.forEach(d => {
                for(let i = 0; i < parseInt(d.Entries); i++) {
                    main.push(d.User)
                }
            })
            let data3 =
            (await db
                .ref(`Lottery System/${message.guild.id}/Prize`)
                .once('value')
                .then((snapshot) => snapshot.val())) || [];
	    shuffleArray(main)
            const realWinner =
                main[
                    Math.floor(Math.random() * main.length)
                ];
            delete data.splice(0, data.length);
            db.ref(
                `Lottery System/${message.guild.id}/Lottery`
            ).set(data);

            const user = await client.users.fetch(realWinner);

            user.send({embeds: [
                new MessageEmbed()
                    .setDescription(
                        `Congratulations you have won the lottery for ${data3}`
                    )
                    .addField(`\u200B`, `[Lottery](${message.url})`)
                    .setFooter('Your prize will be payed out soon.')
                    .setTimestamp()
                    .setColor('5C33F6')
            ]});
            let embed7 = new MessageEmbed()
            .setDescription(`🟥 Deciding Winner 🟥`)
            .setTimestamp()
            .setColor('5C33F6')
            let msg = await message.channel.send({embeds: [
            embed7
            ]});
                setTimeout(() => {
                    embed7.setDescription('🟧 Almost there! 🟧')
                    msg.edit({embeds: [embed7]})
                }, 2000);
                setTimeout(() => {
                        embed7.setTitle('Congratulations! <a:im6:860038641841602581>')
						embed7.setDescription(`🟩 <@${realWinner}> has won the lottery! 🟩`)
						embed7.setFooter('Your prize will be payed out soon.')
						embed7.setTimestamp()
						embed7.setColor('5C33F6')
                msg.edit({embeds: [embed7]})
              }, 4000);
            db.ref(`Lottery System/${message.guild.id}/Status`).set(false)
        } 
       
        }
	},
};
