const fetch = require('node-fetch');
const Discord = require('discord.js');
const html = require('entities')
const difficulties = ['hard', 'medium', 'easy'];
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

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
	name: 'trivia',
	aliases: [],
	category: 'fun',

	description: 'A trivia game!',
	async execute(client, message, cmd, args) {


			embed = {};

			embed.title = 'Trivia';
			embed.description =
				'You only have **{{time}}** to guess the answer!';

			embed.color = "RANDOM"

			embed.footer = 'Good Luck';

			embed.timestamp = true;

			difficulty =
				difficulties[Math.floor(Math.random() * difficulties.length)];

			thinkMessage = 'I am thinking';

			winMessage =
				'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.';

			loseMessage =
				'Better luck next time! The correct answer was **{{answer}}**.';

			emojis = {};

			emojis.one = '1️⃣';

			emojis.two = '2️⃣';

			emojis.three = '3️⃣';

			emojis.four = '4️⃣';

			time = 60000;

			returnWinner = false;

			othersMessage = 'Only <@{{author}}> can use the buttons!';

			const id1 = '1';

			const id2 = '2';

			const id3 = '3';

			const id4 = '4';

			const think = await message.reply({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle(`${thinkMessage}.`)
						.setColor(embed.color),
				],
			});

			const question = {};

			await think.edit({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle(`${thinkMessage}..`)
						.setColor(embed.color),
				],
			});

			await think.edit({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle(`${thinkMessage}...`)
						.setColor(embed.color),
				],
			});

			const q = [];
			const res = await fetch(
				`https://opentdb.com/api.php?amount=1&type=multiple&difficulty=${difficulty}`
			).then((response) => response.json());

			q.push(res.results[0]);
			question.question = res.results[0].question;
			question.difficulty = res.results[0].difficulty;
			q[0].incorrect_answers.push(q[0].correct_answer);
			const shuffledArray = shuffleArray(
				q[0].incorrect_answers
			);
			question.correct = shuffledArray.indexOf(
				res.results[0].correct_answer	
			);
			question.options = shuffledArray;

			await think.edit({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle(`${thinkMessage}..`)
						.setColor(embed.color),
				],
			});

			let winningID;

			if (question.correct === 0) {
				winningID = id1;
			} else if (question.correct === 1) {
				winningID = id2;
			} else if (question.correct === 2) {
				winningID = id3;
			} else if (question.correct === 3) {
				winningID = id4;
			}

			let btn1 = new Discord.MessageButton()
				.setStyle('PRIMARY')
				.setEmoji(emojis.one)
				.setCustomId(id1);

			let btn2 = new Discord.MessageButton()
				.setStyle('PRIMARY')
				.setEmoji(emojis.two)
				.setCustomId(id2);

			let btn3 = new Discord.MessageButton()
				.setStyle('PRIMARY')
				.setEmoji(emojis.three)
				.setCustomId(id3);

			let btn4 = new Discord.MessageButton()
				.setStyle('PRIMARY')
				.setEmoji(emojis.four)
				.setCustomId(id4);

			await think.edit({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle(`${thinkMessage}.`)
						.setColor(embed.color),
				],
			});

			let opt = '';
			for (let i = 0; i < question.options.length; i++) {
				opt += `**${i + 1})** ${html.decodeHTML(question.options[i])}\n`;
			}
			const embed1 = new Discord.MessageEmbed()
				.setTitle(embed.title)
				.addField(
					html.decodeHTML(question.question),
					`${embed.description.replace(
						'{{time}}',
						convertTime(time)
					)}\n\n${opt}`
				)
				.setColor(embed.color)
				.setFooter(embed.footer);
			if (embed.timestamp) {
				embed1.setTimestamp();
			}
			await think.edit({
				embeds: [embed1],
				components: [{ type: 1, components: [btn1, btn2, btn3, btn4] }],
			});

			const gameCreatedAt = Date.now();
			const gameCollector = think.createMessageComponentCollector({
				filter: (fn) => fn,
				time: time,
			});

			gameCollector.on('collect', async (trivia) => {
				if (trivia.user.id !== message.author.id) {
					return trivia.reply({
						content: othersMessage.replace(
							'{{author}}',
							message.member.id
						),
						ephemeral: true,
					});
				}
				await trivia.deferUpdate();
				if (trivia.customId === winningID) {
					btn1 = new Discord.MessageButton()
						.setEmoji(emojis.one)
						.setCustomId(id1)
						.setDisabled();
					btn2 = new Discord.MessageButton()
						.setEmoji(emojis.two)
						.setCustomId(id2)
						.setDisabled();
					btn3 = new Discord.MessageButton()
						.setEmoji(emojis.three)
						.setCustomId(id3)
						.setDisabled();
					btn4 = new Discord.MessageButton()
						.setEmoji(emojis.four)
						.setCustomId(id4)
						.setDisabled();
					gameCollector.stop();
					if (returnWinner) {
						if (!gameID) {
							throw new Error(
								'Weky Error: gameID argument was not specified.'
							);
						}
						if (typeof gameID !== 'string') {
							throw new TypeError(
								'Weky Error: gameID must be a string.'
							);
						}
					}
					if (winningID === id1) {
						btn1.setStyle('SUCCESS');
						btn2.setStyle('DANGER');
						btn3.setStyle('DANGER');
						btn4.setStyle('DANGER');
					} else if (winningID === id2) {
						btn1.setStyle('DANGER');
						btn2.setStyle('SUCCESS');
						btn3.setStyle('DANGER');
						btn4.setStyle('DANGER');
					} else if (winningID === id3) {
						btn1.setStyle('DANGER');
						btn2.setStyle('DANGER');
						btn3.setStyle('SUCCESS');
						btn4.setStyle('DANGER');
					} else if (winningID === id4) {
						btn1.setStyle('DANGER');
						btn2.setStyle('DANGER');
						btn3.setStyle('DANGER');
						btn4.setStyle('SUCCESS');
					}
					think.edit({
						embeds: [embed1],
						components: [
							{ type: 1, components: [btn1, btn2, btn3, btn4] },
						],
					});
					const time = convertTime(
						Date.now() - gameCreatedAt
					);
					const winEmbed = new Discord.MessageEmbed()
						.setDescription(
							`${winMessage
								.replace(
									'{{answer}}',
									html.decodeHTML(question.options[question.correct])
								)
								.replace('{{time}}', time)}`
						)
						.setColor(embed.color)
						.setFooter(embed.footer);
					if (embed.timestamp) {
						winEmbed.setTimestamp();
					}
					message.reply({ embeds: [winEmbed] });
				} else {
					btn1 = new Discord.MessageButton()
						.setEmoji(emojis.one)
						.setCustomId(id1)
						.setDisabled();
					btn2 = new Discord.MessageButton()
						.setEmoji(emojis.two)
						.setCustomId(id2)
						.setDisabled();
					btn3 = new Discord.MessageButton()
						.setEmoji(emojis.three)
						.setCustomId(id3)
						.setDisabled();
					btn4 = new Discord.MessageButton()
						.setEmoji(emojis.four)
						.setCustomId(id4)
						.setDisabled();

					gameCollector.stop();
					if (winningID === id1) {
						btn1.setStyle('SUCCESS');
						if (trivia.customId === id2) {
							btn2.setStyle('DANGER');
							btn3.setStyle('SECONDARY');
							btn4.setStyle('SECONDARY');
						} else if (trivia.customId === id3) {
							btn2.setStyle('SECONDARY');
							btn3.setStyle('DANGER');
							btn4.setStyle('SECONDARY');
						} else if (trivia.customId === id4) {
							btn2.setStyle('SECONDARY');
							btn3.setStyle('SECONDARY');
							btn4.setStyle('DANGER');
						}
					} else if (winningID === id2) {
						btn2.setStyle('SUCCESS');
						if (trivia.customId === id1) {
							btn1.setStyle('DANGER');
							btn3.setStyle('SECONDARY');
							btn4.setStyle('SECONDARY');
						} else if (trivia.customId === id3) {
							btn1.setStyle('SECONDARY');
							btn3.setStyle('DANGER');
							btn4.setStyle('SECONDARY');
						} else if (trivia.customId === id4) {
							btn1.setStyle('SECONDARY');
							btn3.setStyle('SECONDARY');
							btn4.setStyle('DANGER');
						}
					} else if (winningID === id3) {
						btn3.setStyle('SUCCESS');
						if (trivia.customId === id1) {
							btn1.setStyle('DANGER');
							btn2.setStyle('SECONDARY');
							btn4.setStyle('SECONDARY');
						} else if (trivia.customId === id2) {
							btn1.setStyle('SECONDARY');
							btn2.setStyle('DANGER');
							btn4.setStyle('SECONDARY');
						} else if (trivia.customId === id4) {
							btn1.setStyle('SECONDARY');
							btn2.setStyle('SECONDARY');
							btn4.setStyle('DANGER');
						}
					} else if (winningID === id4) {
						btn4.setStyle('SUCCESS');
						if (trivia.customId === id1) {
							btn1.setStyle('DANGER');
							btn2.setStyle('SECONDARY');
							btn3.setStyle('SECONDARY');
						} else if (trivia.customId === id2) {
							btn1.setStyle('SECONDARY');
							btn2.setStyle('DANGER');
							btn3.setStyle('SECONDARY');
						} else if (trivia.customId === id3) {
							btn1.setStyle('SECONDARY');
							btn2.setStyle('SECONDARY');
							btn3.setStyle('DANGER');
						}
					}
					think.edit({
						embeds: [embed1],
						components: [
							{ type: 1, components: [btn1, btn2, btn3, btn4] },
						],
					});
					const lostEmbed = new Discord.MessageEmbed()
						.setDescription(
							`${loseMessage.replace(
								'{{answer}}',
								html.decodeHTML(question.options[question.correct])
							)}`
						)
						.setColor(embed.color)
						.setFooter(embed.footer);
					if (embed.timestamp) {
						lostEmbed.setTimestamp();
					}
					message.reply({ embeds: [lostEmbed] });
				}
			});

			gameCollector.on('end', (trivia, reason) => {
				console.log(reason);
				if (reason === 'time') {
					btn1 = new Discord.MessageButton()
						.setEmoji(emojis.one)
						.setCustomId(id1)
						.setDisabled();
					btn2 = new Discord.MessageButton()
						.setEmoji(emojis.two)
						.setCustomId(id2)
						.setDisabled();
					btn3 = new Discord.MessageButton()
						.setEmoji(emojis.three)
						.setCustomId(id3)
						.setDisabled();
					btn4 = new Discord.MessageButton()
						.setEmoji(emojis.four)
						.setCustomId(id4)
						.setDisabled();
					if (winningID === id1) {
						btn1.setStyle('SUCCESS');
						btn2.setStyle('SECONDARY');
						btn3.setStyle('SECONDARY');
						btn4.setStyle('SECONDARY');
					} else if (winningID === id2) {
						btn1.setStyle('SECONDARY');
						btn2.setStyle('SUCCESS');
						btn3.setStyle('SECONDARY');
						btn4.setStyle('SECONDARY');
					} else if (winningID === id3) {
						btn1.setStyle('SECONDARY');
						btn2.setStyle('SECONDARY');
						btn3.setStyle('SUCCESS');
						btn4.setStyle('SECONDARY');
					} else if (winningID === id4) {
						btn1.setStyle('SECONDARY');
						btn2.setStyle('SECONDARY');
						btn3.setStyle('SECONDARY');
						btn4.setStyle('SUCCESS');
					}
					think.edit({
						embeds: [embed1],
						components: [
							{ type: 1, components: [btn1, btn2, btn3, btn4] },
						],
					});
					const lostEmbed = new Discord.MessageEmbed()
						.setDescription(
							`${loseMessage.replace(
								'{{answer}}',
								html.decodeHTML(question.options[question.correct])
							)}`
						)
						.setColor(embed.color)
						.setFooter(embed.footer);
					if (embed.timestamp) {
						lostEmbed.setTimestamp();
					}
					message.reply({ embeds: [lostEmbed] });
				}
			});
	},
};
