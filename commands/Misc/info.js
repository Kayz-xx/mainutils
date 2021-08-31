const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'info',
    aliases: ['information'],
    cooldown: '0',
    permissions: [],
    description: 'Bot Info!',
    category: 'Misc',

  

    async execute(client, message, cmd,  args) {

      const embed = new MessageEmbed()
      .setTitle('Bot Information')
      .setDescription('A bot with multiple utitlity features! Currently built for elite empire \u200B \n \n  <:dot:859815130437779467> Bot is developed by Kayz#2241')
      .setColor('#FFFFFF')
      .setImage(`https://cdn.discordapp.com/attachments/855828767846039582/859816740987600906/tnbIcOg.png`)
      message.channel.send({embeds: embed})
    }
  }
