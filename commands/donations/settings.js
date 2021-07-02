const {db} = require('../../firebase')
const Discord = require('discord.js')


module.exports = {
    name: 'settings',
    aliases: 'settings',
    cooldown: '0',
    permissions: [],
    commands: ['settings'],
    description: "Shows server's settings",
  async execute(client, message, cmd,  args, Discord) {
   

    let data = await db
    .ref(`Donations/Info/${message.guild.id}/Settings`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
    db.ref(`Donations/Info/${message.guild.id}/Settings`)


    let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name}'s Settings`)
    .setColor("RANDOM")
    .setDescription(`The prefix of the bot is (-) !`)
      .addField('\u200B', '**Donation and Amounts**')
      .addField('Role 1 = Amount 1', `<@&${data.Donorole1}> = ${data.Amount1}`)
      .addField('Role 2 = Amount 2', `<@&${data.Donorole2}> = ${data.Amount2}`)
      .addField('Role 3 = Amount 3', `<@&${data.Donorole3}> = ${data.Amount3}`)
      .addField('Role 4 = Amount 4', `<@&${data.Donorole4}> = ${data.Amount4}`)
      .addField('Role 5 = Amount 5', `<@&${data.Donorole5}> = ${data.Amount5}`)
      .addField('Role 6 = Amount 6', `<@&${data.Donorole6}> = ${data.Amount6}`)
      .addField('Role 7 = Amount 7', `<@&${data.Donorole7}> = ${data.Amount7}`)
      .addField('Role 8 = Amount 8', `<@&${data.Donorole8}> = ${data.Amount8}`)
      .addField('Role 9 = Amount 9', `<@&${data.Donorole9}> = ${data.Amount9}`)
      .addField('\u200B', '**Information**')
      .addField('Logging Channel', `<#${data.Channel}>`)
      .addField('Donation Manager Role', `<@&${data.Role}>`)
    message.channel.send(embed)
  },
}