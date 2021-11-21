const Discord = require('discord.js');
const { app } = require('firebase-admin');
const { db } = require('../../firebase');
const {Permissions} = require('discord.js')
module.exports = {
	name: 'edit',
	aliases: [],
	category: 'Applications',
	cooldown: '0',

	async execute(client, message, cmd, args) {		
		    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return;
			async function editApplication({ guildID, questions, description, status, number, name}) {
				if (!guildID) throw new Error('guildID not provided');
				if (!questions) throw new Error('questions Array not provided');
				if (!description) throw new Error('description not provided');
				if (typeof guildID !== 'string') throw new Error('guildID must be a string');
				if (!Array.isArray(questions)) throw new Error('questions must be an array');
				if (typeof description !== 'string') throw new Error('description must be a string');
				if (typeof status !== 'string') throw new Error('status must be a string');
				const object = {
                    			Name: name,
					Questions: questions,
					Description: description,
					Status: status,
				};
				let data = (await db.ref(`Applications/${guildID}/`).once('value').then((snapshot) => snapshot.val())) || [];  
				
				db.ref(`Applications/${guildID}/Positions${number.toString()}`).set(object)  
		
				return data;
			}
		
			async function setup(message) {
				if (!message) throw new Error('message not provided');
				const application = {
					guildID: message.guild.id,
					questions: [],
				};
                let data2 =
				(await db
					.ref(`Applications/${message.guild.id}`)
					.once('value')
					.then((snapshot) => snapshot.val())) || [];
                    let newdata = Object.values(data2);
                let exampleEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Positions Availible');
	
			    for (let i = 0; i < newdata.length; i++) {
				exampleEmbed.addField(
					`${i + 1}. ${newdata[i].Name}`,
					`Total Questions: ${newdata[i].Questions.length.toString()}`,
					true
				);
			}
                message.channel.send({embeds: [exampleEmbed]})
                
				const filter = m => m.author.id === (message.author?.id || message.user?.id);
				const collector = message.channel.createMessageCollector({ filter });
				let step = 0;
                let data;
				collector.on('collect', async (msg) => {
                    if(step == 0) {
                        let num = parseInt(msg.content) - 1;
                        application.number = num
                        data =
						(await db
							.ref(
								`Applications/${message.guild.id}/Positions${num.toString()}`
							)
							.once('value')
							.then((snapshot) => snapshot.val())) || [];
                    }
					if (!msg.content) return msg.reply('That is not valid option!');
					step++;
					if (step == 1) {
						application.name = data.Name
						message.channel.send('What should be the new description of the application? If you want to use the existing one specify \`none\`');
					}
					else if (step == 2) {
                        if(msg.content.toLowerCase() == 'none') {
                            application.description = data.Description
                        }
						application.description = msg.content;
						message.channel.send('Please specify the application status(Open or Closed).');
					}
					else if (step == 3) {
						if(msg.content.toLowerCase() !== 'open' && msg.content.toLowerCase() !== 'closed') return;
						application.status = msg.content.toLowerCase()
						message.channel.send('What questions do you want in the application? Say `done` when you have put all the questions. If you want to use existing use \`none\`');
					}
					else if (step >= 4) {
                        if(msg.content.toLowerCase() == 'none') {
                            await editApplication(application);
                            application.questions = data.Questions
                            message.channel.send('Application edited!');
                            collector.stop('DONE');
                        }
						if (msg.content.toLowerCase() == 'done') {
							await editApplication(application);
							message.channel.send('Application edited!');
							collector.stop('DONE');
						}
						application.questions.push(msg.content);
						message.channel.send(`What is question ${application.questions.length + 1}?`);
					}
				});
		
				collector.on('end', async (msg, reason) => {
					if (reason == 'INVALID_CHANNEL') return message.channel.send('The channel your provided is invalid');
					if (reason == 'INVALID_NUMBER') return message.channel.send('The number is invalid');
				});
			}
		setup(message)
	},
};
