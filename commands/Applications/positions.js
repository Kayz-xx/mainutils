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

   
    let data = await db
    .ref(`Applications/${message.guild.id}`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
    
    db.ref(`Applications/${message.guild.id}`)

    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  }
   let newdata = Object.values(data)

    let exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Positions Available');

  for(let i = 0; i < newdata.length; i++) {
    exampleEmbed.addField(newdata[i].Name.capitalize(), `Total Questions: ${newdata[i].Questions.length.toString()}\nStatus: ${newdata[i].Status}`, true)
  }


message.channel.send({embeds: [exampleEmbed]})
    }
}
