
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "uptime",
  description: "Get the bot's uptime",
  category: "info",
  usage: "",

  async execute(client, message, cmd, args) {
    const uptime = (new Date() / 1000 - client.uptime / 1000).toFixed();
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle("Bot Uptime")
          .setDescription(`Up since: <t:${uptime}:R>`)
          .setFooter(message.author.tag, message.author.displayAvatarURL())
          .setColor("RANDOM"),
      ],
    });
  },
};
