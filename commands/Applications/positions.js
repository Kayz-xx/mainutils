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

    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  }


    let exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Positions Availible')
	.addFields(
		{ name: data.Positions0.Name, value: `Total Questions: 7 \n Status: ${data.Positions0.Status.capitalize()}`, inline: true },
		{ name: data.Positions1.Name, value: `Total Questions: 7 \n Status: ${data.Positions1.Status.capitalize()}`, inline: true },
    { name: data.Positions2.Name, value: `Total Questions: 11 \n Status: ${data.Positions2.Status.capitalize()}`, inline: true },
    { name: data.Positions3.Name, value: `Total Questions: 5 \n Status: ${data.Positions2.Status.capitalize()}`, inline: true },
	) 
message.channel.send({embeds: [exampleEmbed]})
    }
}