const Discord = require('discord.js')
const {Permissions} = require('discord.js')
module.exports = {
    name: 'poll',
    aliases: ['poll'],
    cooldown: '0',
    permissions: [],
    category: 'Misc',
  
    async execute(client, message, cmd,  args) {
        const pll = args.join(" ");
if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
  return message.channel.send({content:"You don't have enough Permissions"});
}
if (!pll) {
  return message.channel.send({content: "Enter some text for the Poll"});
}
let embed = new Discord.MessageEmbed()
  .setTitle("Poll")
  .setDescription(`${pll}`)
  .setFooter(`Started by ${message.author.username}`)
  .setColor("RANDOM");
message.channel
  .send({embeds: [embed]})
  .then(function (message, str) {
    message.react("✅");
    message.react("❌");
  })
  .catch(function () {});
},
};