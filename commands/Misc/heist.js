const {MessageEmbed, Permissions} = require('discord.js')

module.exports = {
    name: 'heist',
    aliases: [],
    cooldown: '0',
    permissions: [],
    description: 'Heist ping!',
    category: 'Misc',

    async execute(client, message, cmd,  args) {
      if(!message.member.roles.cache.has("770365283147317248") && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
      const prize = args[0]
      if(!prize) return message.channel.send("Please specify an amount")
      const time = args[1]
      if(!time) return message.channel.send("Please specify an amount of time")
      const donor = client.users.cache.get(args[2]) || message.mentions.members.first()
      if(!donor) return message.channel.send("Please specify a donor")
      const requirement = args[3]
      if(!requirement) return message.channel.send("Please specify a requirement")
      const msge = args.slice(4).join(' ');
      if(!msge) return message.channel.send("Please specify a message")
        
       setTimeout(() => message.delete(), 1000)
  
      const embed = new MessageEmbed()
      .setAuthor('Heist!', message.author.avatarURL({ dynamic:true }))
      .setTitle('Heist Time')
      .addField(`<a:EE_nyaspin:787259537408786442> Amount`, `${prize}`) 
      .addField(`<a:EE_nyaspin:787259537408786442> Time`, `${time}`) 
      .addField(`<a:EE_nyaspin:787259537408786442> Donor`, `${donor}`) 
      .addField(`<a:EE_nyaspin:787259537408786442> Requirement`, `${requirement}`) 
      .addField(`<a:EE_nyaspin:787259537408786442> Message`, `${msge}`) 
      .setThumbnail('https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024')
      .setColor('RANDOM')
      .setImage(`https://cdn.discordapp.com/attachments/855828767846039582/859816740987600906/tnbIcOg.png`)
      message.channel.send({content: `<@&767787322133184542>`, embeds: [embed]})
    }
  }
