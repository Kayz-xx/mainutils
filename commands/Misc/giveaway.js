
module.exports = {
    name: 'giveaway',
    aliases: ['eventping'],
    cooldown: 0,
    category: 'Misc',
    ownerOnly: true, 

    async execute(client, message, cmd,  args) {
    if(cmd === 'giveaway'){
        if(message.guild.id === "764885367160700958") {
      if(message.member.roles.cache.some(x => x.id === '768129052623372348')) return; 
    setTimeout(() => message.delete(), 100)
      const msg = args.slice(0).join(' ');
      message.channel.send({content:`<@&768129052623372348> ${msg} **- ${message.author.tag}**`})
        }
     } if(cmd === 'eventping'){
        if(message.guild.id === "764885367160700958") {
        if(message.member.roles.cache.some(x => x.id === '792799102140022785')) return; 
        setTimeout(() => message.delete(), 100)
        const msg = args.slice(0).join(' ');
        message.channel.send({content:`<@&792799102140022785> ${msg} **- ${message.author.tag}**`})
        }
     }
  }
}	
