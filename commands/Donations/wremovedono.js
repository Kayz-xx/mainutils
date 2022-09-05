const economy = require("../../functions/owo");
const { MessageEmbed } = require("discord.js");
const formatter = new Intl.NumberFormat("en");
const { db } = require("../../firebase.js");
const { Permissions } = require("discord.js");
module.exports = {
  name: "wremovedono",
  aliases: [],
  cooldown: "0",
  permissions: [],
  usage: "<user> <amount>",
  category: "Donations",
  description: "Removes owo donation from a user",

  async execute(client, message, cmd, args) {
    const mention = message.mentions.users.first();

    if (
      !message.member.roles.cache.has(`914242310894657536`) &&
      !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    )
      return message.channel.send({
        content: "You cant use this command",
      });

    if (!mention) {
      message.reply({
        content: "Please tag a user to remove a donation from",
      });
      return;
    }

    let coins = args[1];
    if (isNaN(-coins)) {
      message.reply({
        content: "Please provide a valid number of cowoncy.",
      });
      return;
    }

    const guildId = message.guild.id;
    const userId = mention.id;

    const newCoins = await economy.removeCoins(guildId, userId, -coins);

    message.guild.channels.cache.get(`805543230473109534`).send({
      embeds: [
        new MessageEmbed()
          .setTitle("Owo Donation Logging")
          .setColor("RANDOM")
          .addFields(
            { name: "User", value: `<@${userId}>` },
            {
              name: "Cowoncy Removed",
              value: formatter.format(-coins),
            },
            {
              name: "New Total Cowoncy",
              value: formatter.format(newCoins),
            }
          )
          .addField(`\u200B`, `[Link To CMD](${message.url})`)
          .setFooter(`Action taken by ${message.author.tag}`)
          .setTimestamp(),
      ],
    });

    message.react("<a:EE_purplecheck:866351693108215849>");
  },
};
