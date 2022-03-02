const {Permissions, MessageEmbed} = require("discord.js")
module.exports = {
    name: 'giveaway',
    aliases: [],
    cooldown: 540,
    category: 'Misc',

    async execute(client, message, cmd,  args) {
        if(message.guild.id === "764885367160700958") {
          let channels = ['764885369384599563', '764885369384599562', '793597603866214400', '831238263406198784', '764885369384599564']
          if(!channels.some(channel => channel === message.channel.id)) return message.channel.send("You can only use this command in the giveaway channels.")
      if(!message.member.roles.cache.some(x => x.id === '768129052623372348') && !message.member.roles.cache.some(x => x.id === '764885367400693764') && !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return 
    setTimeout(() => message.delete(), 101)
      const msg = args.slice(0).join(' ');
      message.channel.send({content:`<@&764885367241048064> ${msg} **- ${message.author.tag}**`})
        }
  }
}	  
