
const Discord = require('discord.js');

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
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

 function getRandomString(length) {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(
            Math.floor(Math.random() * randomChars.length),
        );
    }
    return result;
}
module.exports = {
	name: 'quickclick',
	aliases: [],
	cooldown: '0',
	permissions: [],
	category: 'Misc',

	async execute(client, message, cmd, args) {
		embed = {};

        embed.footer = 'Goodluck'

		embed.title = 'Quick Click';

		embed.color = 'RANDOM';

		embed.timestamp = true;

		time = 60000;

		waitMessage = 'The buttons may appear anytime now, good luck!';

		startMessage =
			'First person to press the correct button will win!';

		winMessage =
			'GG, <@{{winner}}> pressed the button in **{{time}} seconds**.';

		loseMessage =
			'No one pressed the button in time. So, I dropped the game!';

		emoji = 'Here!';

		ongoingMessage =
			"A game is already runnning in <#{{channel}}>. You can't start a new one!";

			acceptMessage =
			'<@{{challenger}}> has challenged <@{{opponent}}> for a quickclick battle!';

			othersMessage = 'Only {{author}} can use the buttons!';


			const oppenent = message.mentions.members.first()
			if(!oppenent) return;
			const challenger = message.author;
			let acceptbutton = new Discord.MessageButton()
				.setStyle('SUCCESS')
				.setLabel('Accept')
				.setCustomId('accept');
			let denybutton = new Discord.MessageButton()
				.setStyle('DANGER')
				.setLabel('Deny')
				.setCustomId('deny');
			let component = new Discord.MessageActionRow().addComponents([
				acceptbutton,
				denybutton,
			]);
			const embed2 = new Discord.MessageEmbed()
				.setTitle(embed.title)
				.setDescription(
					acceptMessage
						.replace('{{challenger}}', challenger.id)
						.replace('{{opponent}}', oppenent.id),
				)
				.setFooter(embed.footer)
				.setColor(embed.color);
	
			const question = await message.reply({
				embeds: [embed2],
				components: [component],
			});
		
			const Collector2 = await question.createMessageComponentCollector({
				filter: (fn) => fn,
				time: 60000,
			});
		
			Collector2.on('collect', async (_btn) => {
				if (_btn.member.id !== oppenent.id) {
					return _btn.reply({
						content: othersMessage.replace(
							'{{author}}',
							`<@${oppenent.id}>`,
						),
						ephemeral: true,
					});
				}
		
				await _btn.deferUpdate();
		
				if (_btn.customId === 'deny') {
					acceptbutton = new Discord.MessageButton()
						.setDisabled()
						.setStyle('SUCCESS')
						.setLabel('Accept')
						.setCustomId('accept');
					denybutton = new Discord.MessageButton()
						.setDisabled()
						.setStyle('DANGER')
						.setLabel('Deny')
						.setCustomId('deny');
					component = new Discord.MessageActionRow().addComponents([
						acceptbutton,
						denybutton,
					]);
					const emd = new Discord.MessageEmbed()
						.setTitle(embed.title)
						.setDescription(
							`Did not accept the challenge.`
						)
						.setFooter(embed.footer)
						.setColor(embed.color);
					if (embed.timestamp) {
						emd.setTimestamp();
					}
					Collector2.stop();
					return question.edit({
						embeds: [emd],
						components: [component],
					});
				} else if (_btn.customId === 'accept') {
		

		const msg = await message.reply({ content: waitMessage });

		Collector2.stop()

		setTimeout(async function () {
			const rows = [];
			const buttons = [];
		
			for (let i = 0; i < 4; i++) {
				buttons.push(
					new Discord.MessageButton()
						.setDisabled()
						.setLabel('Not here')
						.setStyle('SECONDARY')
						.setCustomId(getRandomString(20))
				);
			}

			buttons.push(
				new Discord.MessageButton()
					.setStyle('SUCCESS')
					.setLabel(emoji)
					.setCustomId('CORRECT')
			);

		    shuffleArray(buttons);

			for (let i = 0; i < 1; i++) {
				rows.push(new Discord.MessageActionRow());
			}

			rows.forEach((row, i) => {
				row.addComponents(buttons.slice(0 + i * 5, 5 + i * 5));
			});

			const _embed = new Discord.MessageEmbed()
				.setTitle(embed.title)
				.setColor(embed.color)
				.setFooter(embed.footer)
				.setDescription(
					startMessage.replace(
						'{{time}}',
                convertTime(time)
					)
				);
			if (embed.timestamp) {
				_embed.setTimestamp();
			}
			await msg.edit({
				content: startMessage,
				components: rows,
			});

            const gameCreatedAt = Date.now();

			const Collector = msg.createMessageComponentCollector({
				filter: (fn) => fn,
				time: time,
			});

			Collector.on('collect', async (button) => {
				if (button.customId === 'CORRECT') {
					await button.deferUpdate();
					Collector.stop();
					buttons.forEach((element) => {
						element.setDisabled();
					});
					rows.length = 0;
					for (let i = 0; i < 1; i++) {
						rows.push(new Discord.MessageActionRow());
					}
                    
                    rows.forEach((row, i) => {
                        row.addComponents(buttons.slice(0 + i * 5, 5 + i * 5));
                    })
					
					const __embed = new Discord.MessageEmbed()
						.setTitle(embed.title)
						.setDescription(
							winMessage
								.replace('{{winner}}', button.user.id)
								.replace(
									'{{time}}',
									(Date.now() - gameCreatedAt) / 1000
								)
						)
						.setColor(embed.color)
						.setFooter(embed.footer);
					if (embed.timestamp) {
						__embed.setTimestamp();
					}
					await msg.edit({
						content: winMessage
                        .replace('{{winner}}', button.user.id)
                        .replace(
                            '{{time}}',
                            (Date.now() - gameCreatedAt) / 1000
                        ),
						components: rows,
					});
				}
				return 
			});

			Collector.on('end', async (_msg, reason) => {
				if (reason === 'time') {
					buttons.forEach((element) => {
						element.setDisabled();
					});
					rows.length = 0;
					for (let i = 0; i < 1; i++) {
						rows.push(new Discord.MessageActionRow());
					}
					rows.forEach((row, i) => {
						row.addComponents(buttons.slice(0 + i * 5, 5 + i * 5));
					});
					const __embed = new Discord.MessageEmbed()
						.setTitle(embed.title)
						.setColor(embed.color)
						.setFooter(embed.footer)
						.setDescription(loseMessage);
					if (embed.timestamp) {
						__embed.setTimestamp();
					}
					await msg.edit({
						content: loseMessage,
						components: rows,
					})
					return 
				}
			});
		}, Math.floor(Math.random() * 700) + 300);
	}
});
Collector2.on('end', async (msg, reason) => {
		acceptbutton = new Discord.MessageButton()
			.setDisabled()
			.setStyle('SUCCESS')
			.setLabel('Accept')
			.setCustomId('accept');
		denybutton = new Discord.MessageButton()
			.setDisabled()
			.setStyle('DANGER')
			.setLabel('Deny')
			.setCustomId('deny');
		component = new Discord.MessageActionRow().addComponents([
			acceptbutton,
			denybutton,
		]);
		return question.edit({
			components: [component],
		});
});
	},
};
