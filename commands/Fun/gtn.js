
const currentGames = new Object();
const Discord = require('discord.js');
const disbut = require('discord.js');
const ms = require('ms')

function convertTime(time) {
    const absoluteSeconds = Math.floor((time / 1000) % 60);
    const absoluteMinutes = Math.floor((time / (1000 * 60)) % 60);
    const absoluteHours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const absoluteDays = Math.floor(time / (1000 * 60 * 60 * 24));
    const d = absoluteDays
        ? absoluteDays === 1
            ? '1 day'
            : `${absoluteDays} days`
        : null;
    const h = absoluteHours
        ? absoluteHours === 1
            ? '1 hour'
            : `${absoluteHours} hours`
        : null;
    const m = absoluteMinutes
        ? absoluteMinutes === 1
            ? '1 minute'
            : `${absoluteMinutes} minutes`
        : null;
    const s = absoluteSeconds
        ? absoluteSeconds === 1
            ? '1 second'
            : `${absoluteSeconds} seconds`
        : null;
    const absoluteTime = [];
    if (d) absoluteTime.push(d);
    if (h) absoluteTime.push(h);
    if (m) absoluteTime.push(m);
    if (s) absoluteTime.push(s);
    return absoluteTime.join(', ');
}

module.exports = {
    name: 'guessthenumber',
    aliases: ['gtn'],
    cooldown: '0',
    permissions: [],
    category: 'Misc',
    description: 'A guess the number command!',

  
    async execute(client, message, cmd,  args) {
        let number = args[0]
        if(!number) return message.reply({content: 'Cannot start without a number.'})
        let times = args[1]
        if(!times) return message.reply({content: 'Cannot start without time.'})
        let id = '1'
        let publicGame = true
        let ongoingMessage = 'Only one game can be hosted at a time, a game is being hosted in <#{{channel}}>!'
        let returnWinner = true
        let embed = {};
        time = ms(times);
        embed.title = 'Guess The Number';
        embed.description = `You have **${convertTime(time)}** to guess the number, Good luck!`;
        embed.footer = `Hosted By ${message.author.tag}`;
        embed.color = "RANDOM"
        number = Math.floor(Math.random() * parseInt(number));
        winMessage = {};
            loseMessage =
			'The number i chose was **{{number}}**, better luck next time.';
            othersMessage = 'Only <@{{author}}> can use the buttons!';
            buttonText = 'Cancel';
        winMessage.publicGame =
			'GG, The number which I guessed was **{{number}}**. <@{{winner}}> made it in **{{time}}**.\n\n__**Stats of the game:**__\n**Duration**: {{time}}\n**Number of participants**: {{totalparticipants}} Participants\n**Participants**: {{participants}}';
            if (publicGame) {
                if (!ongoingMessage) {
                    ongoingMessage =
                        'Only one game can be hosted at a time, a game is being hosted in <#{{channel}}>';
                }    
                if (!returnWinner) returnWinner = false;

                const participants = [];
                if (currentGames[message.guild.id]) {
                    const embed3 = new Discord.MessageEmbed()
                        .setDescription(
                            ongoingMessage.replace(
                                /{{channel}}/g,
                                currentGames[`${message.guild.id}_channel`],
                            ),
                        )
                        .setFooter(embed.footer)
                        .setColor(embed.color)
                        .setTimestamp();
                    
                    return message.reply({embeds: [embed3]});
                }
                const embed2 = new Discord.MessageEmbed()
                    .setDescription(
                        `${embed.description.replace(
                            /{{time}}/g,
                            convertTime(time),
                        )}`,
                    )
                    .setTitle(embed.title)
                    .setFooter(embed.footer)
                    .setColor(embed.color)
                    .setTimestamp();
                
                let btn1 = new disbut.MessageButton()
                    .setStyle('DANGER')
                    .setLabel(buttonText)
                    .setCustomId(id);
                const msg = await message.reply({embeds: [embed2]});
                await msg.edit({
                    embeds: [embed2],
                    components: [{ type: 1, components: [btn1] }],
                });
                const gameCreatedAt = Date.now();
                const filter = (m) => !m.author.bot;
                const collector = new Discord.MessageCollector(
                    message.channel,{
                     filter,
                     time: time },
                );
		console.log(number)
                const gameCollector = msg.createMessageComponentCollector((fn) => fn);
                currentGames[message.guild.id] = true;
                currentGames[`${message.guild.id}_channel`] =
                    message.channel.id;
                collector.on('collect', async (_msg) => {
                    if (!participants.includes(_msg.author.id)) {
                        participants.push(_msg.author.id);
                    }
                    if (isNaN(_msg.content)) {
                        return;
                    }
                    const parsedNumber = parseInt(_msg.content, 10);
                    if (parsedNumber === number) {
                        const timer = convertTime(Date.now() - gameCreatedAt);
                        const _embed = new Discord.MessageEmbed()
                            .setDescription(
                                `${winMessage.publicGame
                                    .replace(/{{number}}/g, number)
                                    .replace(/{{winner}}/g, _msg.author.id)
                                    .replace(/{{time}}/g, timer)
                                    .replace(/{{totalparticipants}}/g, participants.length)
                                    .replace(
                                        /{{participants}}/g,
                                        participants.map((p) => '<@' + p + '>').join(', '),
                                    )}`,
                            )
                            .setTitle(embed.title)
                            .setFooter(embed.footer)
                            .setColor(embed.color)
                            .setTimestamp();
                        
                        btn1 = new disbut.MessageButton()
                            .setStyle('DANGER')
                            .setLabel(buttonText)
                            .setDisabled()
                            .setCustomId(id);
                        await msg.edit({
                            embeds: [embed],
                            components: [{ type: 1, components: [btn1] }],
                        });
                        _msg.reply({embeds: [_embed]});
                        gameCollector.stop();
                        collector.stop();
                    }
                })
                  /*  if (parseInt(_msg.content) < number) {
                        const _embed = new Discord.MessageEmbed()
                            .setDescription(
                                bigNumberMessage
                                    .replace(/{{author}}/g, _msg.author.toString())
                                    .replace(/{{number}}/g, parsedNumber),
                            )
                            .setColor(embed.color);
                        _msg.reply({embeds: [_embed]});
                    }
                    if (parseInt(_msg.content) > number) {
                        const _embed = new Discord.MessageEmbed()
                            .setDescription(
                                smallNumberMessage
                                    .replace(/{{author}}/g, _msg.author.toString())
                                    .replace(/{{number}}/g, parsedNumber),
                            )
                            .setColor(embed.color);
                        _msg.reply({embeds: [_embed]});
                    }
                });*/
        
                gameCollector.on('collect', (button) => {
                    if (button.user.id !== message.author.id) {
                        return button.reply({content: 
                            othersMessage.replace(
                                /{{author}}/g,
                                message.author.id,
                            ),
                            ephemeral: true,
					    });
                    }
                    button.deferUpdate();
                    if (button.customId === id) {
                        btn1 = new disbut.MessageButton()
                            .setStyle('DANGER')
                            .setLabel(buttonText)
                            .setDisabled()
                            .setCustomId(id);
                        gameCollector.stop();
                        collector.stop();
                        msg.edit({
                            embeds: [embed],
                            components: [{ type: 1, components: [btn1] }],
                        });
                        const _embed = new Discord.MessageEmbed()
                            .setTitle(embed.title)
                            .setDescription(
                                loseMessage.replace(/{{number}}/g, number),
                            )
                            .setColor(embed.color)
                            .setFooter(embed.footer)
                            .setTimestamp();
                        
                        message.reply({embeds: [_embed]});
                    }
                });
                collector.on('end', async (_collected, reason) => {
                    delete currentGames[message.guild.id];
                    if (reason === 'time') {
                        const _embed = new Discord.MessageEmbed()
                            .setTitle(embed.title)
                            .setDescription(
                                loseMessage.replace(/{{number}}/g, number),
                            )
                            .setColor(embed.color)
                            .setFooter(embed.footer)
                            .setTimestamp();
                        
                        btn1 = new disbut.MessageButton()
                            .setStyle('DANGER')
                            .setLabel(buttonText)
                            .setDisabled()
                            .setCustomId(id);
                        await msg.edit({embeds: [embed]
                            ,
                            components: [{ type: 1, components: [btn1] }],
                        });
                        return message.reply({embeds: [_embed]});
                    }
                });
            } 
    }

}
