const {Permissions, MessageEmbed} = require("discord.js")
module.exports = {
    name: 'eping',
    aliases: [],
    cooldown: 540,
    category: 'Misc',

    async execute(client, message, cmd,  args) {
          if(message.guild.id === "764885367160700958") {
          if(message.channel.id !== '792795803037990943') return message.channel.send('You can only use this command in event channels.');
          if(!message.member.roles.cache.some(x => x.id === '792799102140022785') && !message.member.roles.cache.some(x => x.id === '764885367400693764') && !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return 
        setTimeout(() => message.delete(), 100)
        const msg = args.slice(0).join(' ');
        message.channel.send({content:`<@&778355810043559976> ${msg} **- ${message.author.tag}**`, allowedMentions: [roles: ['778355810043559976']})
        } 
  }
}	  
