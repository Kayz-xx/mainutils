const { db } = require("../../firebase");
const Discord = require("discord.js");
const { Permissions } = require("discord.js");
module.exports = {
  name: "setchannel",
  aliases: ["setchannel", "setlogs"],
  cooldown: "0",
  permissions: [],
  usage: "<channel>",
  commands: ["setchannel"],
  description: "Sets up donation logging channel",
  category: "Donations",

  async execute(client, message, cmd, args) {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return message.channel
        .send({ content: "You do not have permission to use this command." })
        .then((m) => m.delete({ timeout: 5000 }));

    const channel = await message.mentions.channels.first();

    if (!channel)
      return message.channel
        .send({
          content:
            "I cannot find that channel. Please mention a channel within this server.",
        })
        .then((m) => m.delete({ timeout: 5000 }));

    db.ref(`Donations/Info/${message.guild.id}/Settings/Channel`).set(
      channel.id
    );

    return message.channel.send({
      embeds: [
        {
          description: `Donation Log Channel Has Been Set To : ${channel}`,
          color: "RANDOM",
        },
      ],
    });
  },
};
