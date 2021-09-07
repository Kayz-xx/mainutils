const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'info',
    aliases: ['information'],
    cooldown: '0',
    permissions: [],
    description: 'Bot Info!',
    category: 'Misc',

  

    async execute(client, message, cmd,  args) {

      const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
      let txt = '<:txtchannel:872428761478463510>'
      let ch = '<:voice:872428749642170378>'

      const embed = new MessageEmbed()
      .setColor('#FFFFFF')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addFields(
        { name: 'Name', value: `${message.guild.name}`},
        { name: 'Owner', value: `<@${message.guild.ownerId}>` },
        { name: 'Version', value: `<:djss:884719235681648651> Discord.js \`2.0.2\`` },
      )
      .addFields(
        { name: 'Roles', value: `${roles.length}`},
    )
      .addField('Channels', `${txt} Channels : ${message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size} 
           ${ch} Voice Channels :  ${message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}`,
     )
    .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp();

      message.channel.send({embeds: [embed]})
    }
  }
