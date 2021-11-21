const Discord = require('discord.js');
const { db } = require('../../firebase');
const {Permissions} = require('discord.js')
module.exports = {
	name: 'setup',
	aliases: [],
	category: 'Applications',
	cooldown: '0',

	async execute(client, message, cmd, args) {	
		    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return;
			async function addApplication({ guildID, questions, name, description, status, responseChannelID }) {
				if (!guildID) throw new Error('guildID not provided');
				if (!questions) throw new Error('questions Array not provided');
				if (!name) throw new Error('name not provided');
				if (!description) throw new Error('description not provided');
				if (typeof guildID !== 'string') throw new Error('guildID must be a string');
				if (!Array.isArray(questions)) throw new Error('questions must be an array');
				if (typeof name !== 'string') throw new Error('name must be a string');
				if (typeof description !== 'string') throw new Error('description must be a string');
				if (typeof responseChannelID !== 'string') throw new Error('responseChannelID must be a string');
				if (typeof status !== 'string') throw new Error('status must be a string');
		
				const object = {
					Name: name,
					Questions: questions,
					Description: description,
					Status: status,
				};
				let data = (await db.ref(`Applications/${guildID}/`).once('value').then((snapshot) => snapshot.val())) || [];  
				Object.size = function (obj) {
					var size = 0,
					  key;
					for (key in obj) {
					  if (obj.hasOwnProperty(key)) size++;
					}
					return size;
				  }; 
				let v = Object.size(data)
				db.ref(`Applications/${guildID}/Positions${v++}`).set(object)  
		
				return data;
			}
		
			async function setup(message) {
				if (!message) throw new Error('message not provided');
				const application = {
					guildID: message.guild.id,
					questions: [],
				};
				message.channel.send('What should be the name of the application?');
				const filter = m => m.author.id === (message.author?.id || message.user?.id);
				const collector = message.channel.createMessageCollector({ filter });
				let step = 0;
				collector.on('collect', async (msg) => {
					if (!msg.content) return msg.reply('That is not valid option!');
					step++;
					if (step == 1) {
						application.name = msg.content;
						message.channel.send('What should be the description of the application?');
					}
					else if (step == 2) {
						application.description = msg.content;
						message.channel.send('Where should be the responses sent in? Provide the ID of the channel');
					}
					else if (step == 3) {
						if (!message.guild.channels.cache.get(msg.content)) return collector.stop('INVALID_CHANNEL');
						application.responseChannelID = msg.content;
						message.channel.send('Please specify the application status(Open or Closed).');
					}
					else if (step == 4) {
						if(msg.content.toLowerCase() !== 'open' && msg.content.toLowerCase() !== 'closed') return;
						application.status = msg.content.toLowerCase()
						message.channel.send('What questions do you want in the application? Say `done` when you have put all the questions');
					}
					else if (step >= 5) {
						if (msg.content.toLowerCase() == 'done') {
							await addApplication(application);
							message.channel.send('Application added!');
							collector.stop('DONE');
							return;
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
