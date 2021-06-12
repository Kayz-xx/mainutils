const Discord = require('discord.js');

module.exports = {
    commands: ['invite'],
  minArgs: 0,
  maxArgs: 0,

    callback: async (message) => {


        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Support')
        .addField('**Invite Me**', `[Invite](https://discord.com/api/oauth2/authorize?client_id=838050415504261120&permissions=876216049&scope=bot)`)
        .addField('**Support Server**', `[Support Server](https://discord.gg/qyUHDvCBkQ)`)
        message.channel.send(embed)
    }
  }