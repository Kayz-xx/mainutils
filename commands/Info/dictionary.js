const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "dictionary",
  category: "info",
  aliases: [],
  description: "Get information and sentences about a word!",
  usage: "<word>",

  async execute(client, message, cmd, args) {
    if (!args) {
      message.reply({ content: "You need to specify something to search" });
      return;
    }

    const response = await fetch(
      `https://api.urbandictionary.com/v0/define?term=${args}`
    );
    const { list } = await response.json();

    try {
      const [answer] = list;
      const trim = (str, max) =>
        str.length > max ? `${str.slice(0, max - 3)}...` : str;

      const embed = new MessageEmbed();
      embed
        .setTitle(`Dictionary`)
        .setDescription(`[${answer.word}](${answer.permalink})`)
        .setColor("RANDOM");
      embed.addFields(
        {
          name: "Definition",
          value: trim(answer.definition, 1024),
          inline: false,
        },
        {
          name: "Example",
          value: trim(answer.example, 1024),
          inline: false,
        },
        {
          name: "Ratings",
          value: `${answer.thumbs_up} 👍\n${answer.thumbs_down} 👎`,
          inline: false,
        }
      );
      embed.setFooter(
        `${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: false })
      );
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      message.channel.send({ content: `No results found for ${args}` });
      return;
    }
  },
};
