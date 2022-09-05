const economy = require("../../functions/karuta");
const Discord = require("discord.js");
const formatter = new Intl.NumberFormat("en");
const { Permissions } = require("discord.js");
const { db } = require("../../firebase.js");
module.exports = {
  name: "kdonoadd",
  aliases: [],
  cooldown: "0",
  category: "Donations",
  permissions: [],
  usage: "<user> <amount>",
  description: "Adds karuta donation to a user",

  async execute(client, message, cmd, args) {
    const mention = message.mentions.users.first();

    if (
      !message.member.roles.cache.has(`862094191520907275`) &&
      !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    )
      return message.channel.send({
        content: "You cant use this command",
      });

    if (!mention) {
      message.reply({
        content: "Please tag a user to add the donation to",
      });
      return;
    }

    const coins = args[1];
    if (isNaN(coins)) {
      message.reply({
        content: "Please provide a valid number of tickets",
      });
      return;
    }
    const guildId = message.guild.id;
    const userId = mention.id;

    const card = args.slice(2).join(" ");

    if (card) {
      const data =
        (await db
          .ref(`Notes/${message.guild.id}/${userId}`)
          .once("value")
          .then((snapshot) => snapshot.val())) || [];

      let note_id = Object.keys(data);
      if (note_id.length <= 0) {
        note_id = 1;
      } else {
        note_id = parseInt(note_id.unshift() + 1);
      }

      let d = Math.round(Date.now() / 1000);

      data.push({
        note: card,
        note_author: `${message.author.tag}`,
        timestamp: d,
        server_id: guildId,
        note_id: note_id,
      });
      db.ref(`Notes/${message.guild.id}/${userId}`).set(data);
    }

    const newCoins = await economy.addCoins(guildId, userId, coins);
    const embed = new Discord.MessageEmbed()
      .setTitle("Karuta Donation Logging")
      .setColor("RANDOM")
      .addFields(
        { name: "User", value: `<@${userId}>` },
        { name: "Tickets Added", value: formatter.format(coins) },
        {
          name: "New Total Tickets",
          value: formatter.format(newCoins),
        }
      )
      .addField(`\u200B`, `[Link To CMD](${message.url})`)
      .setFooter(`Action taken by ${message.author.tag}`)
      .setTimestamp();

    if (card) {
      embed.addField("Cards", card);
    }

    message.guild.channels.cache
      .get(`805543230473109534`)
      .send({ embeds: [embed] });

    message.react("<a:EE_purplecheck:866351693108215849>");
  },
};
