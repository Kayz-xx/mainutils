const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "firstmessage",
  aliases: ["firstmsg"],
  cooldown: "0",
  permissions: [],
  category: "Misc",

  async execute(client, message, cmd, args) {
    const fetch = await message.channel.messages.fetch({
      after: 1,
      limit: 1,
    });

    const msg = fetch.first();

    const embed = new MessageEmbed()
      .setTitle(`First Message`)
      .setURL(msg.url)
      .setDescription(
        `Content: ${msg.content}\nAuthor: ${
          msg.author
        }\nDate: ${msg.createdAt.toLocaleDateString()}\nMessage Id: ${msg.id}`
      )
      .setFooter(msg.author.tag, msg.author.displayAvatarURL())
      .setColor("RANDOM");
    message.channel.send({ embeds: [embed] });
  },
};
