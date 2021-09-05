const {Permissions, MessageEmbed} = require("discord.js")
module.exports = {
    name: 'giveaway',
    aliases: ['eping', 'fping', 'mping'],
    cooldown: 0,
    category: 'Misc',

    async execute(client, message, cmd,  args) {
    if(cmd === 'giveaway'){
        if(message.guild.id === "764885367160700958") {
      if(!message.member.roles.cache.some(x => x.id === '768129052623372348') && !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return 
    setTimeout(() => message.delete(), 100)
      const msg = args.slice(0).join(' ');
      message.channel.send({content:`<@&764885367241048064> ${msg} **- ${message.author.tag}**`})
        }
     } if(cmd === 'eping'){
        if(message.guild.id === "764885367160700958") {
          if(!message.member.roles.cache.some(x => x.id === '792799102140022785') && !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return 
        setTimeout(() => message.delete(), 100)
        const msg = args.slice(0).join(' ');
        message.channel.send({content:`<@&778355810043559976> ${msg} **- ${message.author.tag}**`})
        }
     }
     if(cmd === 'fping'){
      if(message.guild.id === "764885367160700958") {
         console.log(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
        if(!message.member.roles.cache.some(x => x.id === '792799102140022785') && !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return 
      setTimeout(() => message.delete(), 100)
      const msg = args.slice(0).join(' ');
      message.channel.send({content:`<@&793676669550329897> ${msg} **- ${message.author.tag}**`})
      }
    }
    if(cmd === 'mping'){
      if(message.guild.id === "764885367160700958") {
        if(!message.member.roles.cache.some(x => x.id === '792799102140022785') && !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return 
      setTimeout(() => message.delete(), 100)
      const msg = args.slice(0).join(' ');
      message.channel.send({content:`<@&794315002449231893> ${msg} **- ${message.author.tag}**`})
      }
    }
  }
}	  
