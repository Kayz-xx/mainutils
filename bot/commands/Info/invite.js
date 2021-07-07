const Discord = require('discord.js');

module.exports = {
    name: 'invite',
  aliases: ['inv'],
  cooldown: '2',
  permissions: [],
  commands: ['invite'],
  category: "info",

  async execute(client, message, cmd,  args) {



        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Support')
        .addField('**Invite Me**', `[Invite](https://discord.com/api/oauth2/authorize?client_id=838050415504261120&permissions=876216049&scope=bot)`)
        .addField('**Support Server**', `[Support Server](https://discord.gg/qyUHDvCBkQ)`)
        message.channel.send(embed)
    }
  }