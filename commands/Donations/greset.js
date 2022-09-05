const Discord = require("discord.js");
const { db } = require("../../firebase.js");
module.exports = {
  name: "greset",
  aliases: ["grinderreset"],
  cooldown: "0",
  usage: "",
  permissions: [],
  category: "Donations",
  description: "Resets Weekly Donation",

  async execute(client, message, cmd, args) {
    if (
      !message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)
    )
      return;
    db.ref(`Grinders/${message.guild.id}`).set({});
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription("Weekly Grinder Donations have been reset!");
    message.channel.send({ embeds: [embed] });
  },
};
