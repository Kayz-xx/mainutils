const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js')
const Discord = require('discord.js')
const {db} = require('../../firebase.js')
module.exports = {
    name: 'donate',
    aliases: ['donate', 'eventdono'],
    cooldown: '0',
    permissions: [],
    usage: '<prize> <time> <winners> <requirement> <message>, eventdono- <event> <winners> <prize> <req> <message>',
    description: 'Donate towards the server!',
    category: 'Misc',

  
    async execute(client, message, cmd,  args) {
        if(cmd === 'donate') {
    setTimeout(() => message.delete(), 100)
    const prize = args[0]
    if(!prize) return message.channel.send("Please specify a prize")
    const time = args[1]
    if(!time) return message.channel.send("Please specify an amount of time")
    const winners = args[2]
    if(!winners) return message.channel.send("Please specify a winners")
    const requirement = args[3]
    if(!requirement) return message.channel.send("Please specify a requirement")
    const msge = args.slice(4).join(' ');
    if(!msge) return message.channel.send("Please specify a message")

    let embed = new MessageEmbed()
    .setAuthor('Donations', message.author.avatarURL({ dynamic:true }))
    .setTitle(`${message.author.tag} wants to donate ${prize} <a:im4:858370157890371595>`)
    .setThumbnail('https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024')
    .setColor('5C33F6')
    .addField(`<a:im5:859288337280925746> Time`, `${time}`) 
    .addField(`<a:im5:859288337280925746> Winners`, winners) 
    .addField(`<a:im5:859288337280925746> Requirement`, requirement) 
    .addField(`<a:im5:859288337280925746> Message`, msge) 
    .setFooter(`Thanks for your donation ${message.author.tag}`)
    .setTimestamp()
  
try {
    let del = new MessageButton()
    .setLabel("Claim")
    .setCustomId('del')
    .setStyle('SECONDARY');

  let row = new MessageActionRow().addComponents(del);

  let msg = await message.channel.send({content: '<@&872376861018177547>', embeds: [embed], components: [row]})
               
    
    const filter = (btn) => message.guild.members.cache.find((member) => member.id === btn.user.id).roles.cache.some(x => x.id === '855455543489331241') || message.guild.members.cache.find((member) => member.id === btn.user.id).permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)

    const collector = msg.createMessageComponentCollector({
      filter,
      time: 600000,
    });

    collector.on('collect', async (btn) => {
      let embed2 = new MessageEmbed()
      .setAuthor('Donations')
      .setTitle(`You have claimed a donation for ${prize}!`)
      .setDescription(message.url)
      .setFooter('Make sure to add donations.')
      .setColor('5C33F6')
      .setTimestamp()
      if (btn.customId === 'del') {
        btn.message.components[0].components.forEach((com) => {
          com.setDisabled(true);
          com.setStyle('SECONDARY');
        });
        let rows = new MessageActionRow().addComponents(btn.message.components[0].components)
        btn.user.send({embeds: [embed2]})
        btn.channel.send(`<@${btn.user.id}> has **claimed** your donation! Make sure to send items to them.`)
        btn.deferUpdate()
        msg.edit({
					embeds: [embed],
					components: [rows],
				});
				collector.stop();
      }
    })
    collector.on('end', async (collected, reason) => {
  
      if(reason.toUpperCase() === "TIME") {
        msg.components[0].components.forEach((com) => {
          com.setDisabled(true);
          com.setStyle('SECONDARY');
        });
        let rows2 = new MessageActionRow().addComponents(msg.components[0].components)
        msg.edit({content: `No one **claimed** the donation proceed **manually**.`, components: [rows2]});
        message.channel.send({content: '<@&872376861018177547>'})
      }
    })
  } catch (e) {
    console.log(e)
  }
  
 
}
    if(cmd === 'eventdono') {
        setTimeout(() => message.delete(), 100)
        const event = args[0]
        if(!event) return message.channel.send("Please specify an event")
        const winners = args[1]
        if(!winners) return message.channel.send("Please specify an amount of winners")
        const prize = args[2]
        if(!prize) return message.channel.send("Please specify a prize")
        const requirement = args[3]
        if(!requirement) return message.channel.send("Please specify a requirement")
        const msg = args.slice(4).join(' ');
        if(!msg) return message.channel.send("Please specify a message")
    
        let embed = new MessageEmbed()
        .setAuthor('Donations', message.author.avatarURL({ dynamic:true }))
        .setTitle(`${message.author.tag} wants to donate for : ${event} <a:im4:858370157890371595>`)
        .setThumbnail('https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024')
        .setColor('5C33F6')
        .addField(`<a:im5:859288337280925746> Winners`, winners) 
        .addField(`<a:im5:859288337280925746> Prize`, `${prize}`) 
        .addField(`<a:im5:859288337280925746> Requirement`, requirement) 
        .addField(`<a:im5:859288337280925746> Message`, msg) 
        .setFooter(`Thanks for your donation ${message.author.tag}`)
        .setTimestamp()

        try {
          let del = new MessageButton()
          .setLabel("Claim")
          .setCustomId('del')
          .setStyle('SECONDARY');
      
        let row = new MessageActionRow().addComponents(del);
      
        let msg = await message.channel.send({content: '<@&872376861018177547>', embeds: [embed], components: [row]})
                     
          
          const filter = (btn) => message.guild.members.cache.find((member) => member.id === btn.user.id).roles.cache.some(x => x.id === '855455543489331241') || message.guild.members.cache.find((member) => member.id === btn.user.id).permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
      
          const collector = msg.createMessageComponentCollector({
            filter,
            time: 600000,
          });
      
          collector.on('collect', async (btn) => {
            let embed2 = new MessageEmbed()
            .setAuthor('Donations')
            .setTitle(`You have claimed a ${event} donation for ${prize}!`)
            .setDescription(message.url)
            .setFooter('Make sure to add donations.')
            .setColor('5C33F6')
            .setTimestamp()
            if (btn.customId === 'del') {
              btn.message.components[0].components.forEach((com) => {
                com.setDisabled(true);
                com.setStyle('SECONDARY');
              });
              let rows = new MessageActionRow().addComponents(btn.message.components[0].components)
              btn.user.send({embeds: [embed2]})
              btn.channel.send(`<@${btn.user.id}> has claimed your event donation! Make sure to send items to them.`)
              btn.deferUpdate()
              msg.edit({
                embeds: [embed],
                components: [rows],
              });
              collector.stop();
            }
          })
          collector.on('end', async (collected, reason) => {
            if(reason.toUpperCase() === "TIME") {
              msg.components[0].components.forEach((com) => {
                com.setDisabled(true);
                com.setStyle('SECONDARY');
              });
              let rows2 = new MessageActionRow().addComponents(msg.components[0].components)
              msg.edit({content: `No one **claimed** the event donation proceed **manually**.`, components: [rows2]});
              message.channel.send({content: '<@&872376861018177547>'})
            }
          })
        } catch (e) {
          console.log(e)
        }
    }
  }
}