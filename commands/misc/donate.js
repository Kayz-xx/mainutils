
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')



module.exports = {
    name: 'donate',
    aliases: 'donate',
    cooldown: '0',
    permissions: [],
    usage: '<prize> <time> <winners> <requirement> <message>',
    description: 'Donate towards the server!',

  
  async execute(client, message, cmd,  args, Discord) {
    setTimeout(() => message.delete(), 100)
    const prize = args[0]
    if(!prize) return message.channel.send("Please specify a prize")
    const time = args[1]
    if(!time) return message.channel.send("Please specify an amount of time")
    const winners = args[2]
    if(!winners) return message.channel.send("Please specify a winners")
    const requirement = args[3]
    if(!requirement) return message.channel.send("Please specify a requirement")
    const msg = args.slice(4).join(' ');
    if(!msg) return message.channel.send("Please specify a message")

    let embed = new MessageEmbed()
    .setAuthor('Donations', message.author.avatarURL({ dynamic:true }))
    .setTitle(`${message.author.tag} wants to donate ${prize} <a:im4:858370157890371595>`)
    .setThumbnail('https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024')
    .setColor('5C33F6')
    .addField(`<a:im5:859288337280925746> Time`, `${args[1]}`) 
    .addField(`<a:im5:859288337280925746> Winners`, args[2]) 
    .addField(`<a:im5:859288337280925746> Requirement`, args[3]) 
    .addField(`<a:im5:859288337280925746> Message`, args.slice(4).join(' ')) 
    .setFooter(`Thanks for your donation ${message.author.tag}`)
    .setTimestamp()
    message.channel.send(embed)
    message.channel.send('<@&768129052623372348>')
  }
}