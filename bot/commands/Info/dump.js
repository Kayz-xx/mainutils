const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'dump',
    aliases: ['list'],
    cooldown: '0',
    permissions: [],
    category: 'Misc',
    

  
    async execute(client, message, cmd,  args) {
      if (!message.member.hasPermission('MANAGE_GUILD'))
      return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));
      
    let role = message.guild.roles.cache.get(args[0]);
  
    const embed = new MessageEmbed()
    .setTitle(`Users with the ${role.name} role`)
    .setDescription(role.members.map(m => m.user.tag).join('\n'))
    .setColor(role.color)
     message.channel.send(embed);  
    
  }
}