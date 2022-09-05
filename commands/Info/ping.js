const Discord = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["latency", "pong"],
  cooldown: 2,
  permissions: [],
  commands: ["ping"],
  category: "Misc",

  async execute(client, message, cmd, args) {
    if (cmd === "ping") {
      const ping = new Discord.MessageEmbed().setDescription(
        `🏓\` ${Date.now() - message.createdTimestamp} ms\``
      );

      message.channel.send({ embeds: [ping] });
    }
    if (cmd === "pong") {
      message.reply({ content: "Hello there you ponged me?" });
    }
  },
};
