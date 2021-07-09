const Discord = require('discord.js')
const {db} = require('../../firebase')
const { MessageEmbed } = require ('discord.js')

module.exports = {
  name: 'positions',
  aliases: ['positions'],
  cooldown: '0',
  category: 'Applications',
  permissions: [],
  description: "Shows's the availible positions for the server!",
  
  async execute(client, message, cmd,  args) {

    let index = 0
    let data = await db
    .ref(`Applications/${message.guild.id}`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
    
    db.ref(`Applications/${message.guild.id}`)


    let exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Positions Availible')
	.addFields(
		{ name: data.Positions0.Name, value: `Total Questions: 7 \n Status: ${data.Positions0.Status}`, inline: true },
		{ name: data.Positions1.Name, value: `Total Questions: 7 \n Status: ${data.Positions1.Status}`, inline: true },
    { name: data.Positions2.Name, value: `Total Questions: 10 \n Status: ${data.Positions2.Status}`, inline: true },
	) 
message.channel.send(exampleEmbed)
    }
}
