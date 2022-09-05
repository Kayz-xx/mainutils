const {
  Client,
  Message,
  MessageEmbed,
  Collection,
  MessageActionRow,
  MessageButton,
  ButtonInteraction,
} = require("discord.js");
const formatter = new Intl.NumberFormat("en");
let page = 0;
const { db } = require("../../firebase.js");
module.exports = {
  name: "gleaderboard",
  aliases: ["glb"],
  cooldown: "0",
  usage: "",
  permissions: [],
  category: "Donations",
  description: "Grinder Donation Leaderboard",

  async execute(client, message, cmd, args) {
    const guildId = message.guild.id;

    let data =
      (await db
        .ref(`Grinders/${guildId}/`)
        .once("value")
        .then((snapshot) => snapshot.val())) || [];

    let first = new MessageButton()
      .setEmoji("<:fastb:878937208818630706>")
      .setCustomId("first")
      .setStyle("SECONDARY");

    let back = new MessageButton()
      .setEmoji("<:behind:875319719161397248>")
      .setCustomId("back")
      .setStyle("SECONDARY");

    let next = new MessageButton()
      .setEmoji("<:ahead:875319731220017162>")
      .setCustomId("next")
      .setStyle("SECONDARY");

    let last = new MessageButton()
      .setEmoji("<:fasta:878937199578607626>")
      .setCustomId("last")
      .setStyle("SECONDARY");

    let del = new MessageButton()
      .setEmoji("<:Cancel:875313311640616971>")
      .setCustomId("del")
      .setStyle("DANGER");

    let row = new MessageActionRow().addComponents(
      first,
      back,
      del,
      next,
      last
    );

    let i = 1;
    let text = [];
    data.sort(function (a, b) {
      return b.coins - a.coins;
    });
    for (let i = 0; i < data.length; i++) {
      const { userId, coins } = data[i];

      text.push(
        `${i + 1}) <@!${userId}> - **${formatter.format(coins)} coins**\n`
      );
    }
    let pg = text.length - 1;

    const index = 10;
    const generateEmbed = (start) => {
      const current = text.slice(start, start + index).join(`\n\n`);

      const embed = new MessageEmbed()
        .setTitle(`Grinder Leaderboard in ${message.guild.name}`)
        .setDescription(`${current}`)
        .setFooter(`These are normal donations`)
        .setColor("88FFF7")
        .setFooter(`Page ${start / 10} of ${Math.floor(pg / 10)}`);
      return embed;
    };
    let emb = new MessageEmbed()
      .setDescription("Loading...")
      .setColor("RANDOM");
    let msge = await message.channel.send({ embeds: [emb] });
    const msg = await msge.edit({
      embeds: [generateEmbed(0)],
      components: [row],
    });

    const filter = (btn) => btn.user.id === message.author.id;

    const collector = msg.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on("collect", async (btn) => {
      if (btn.customId === "first") {
        page = 0;
        btn.update({
          embeds: [generateEmbed(page)],
          components: [row],
        });
      }
      if (btn.customId === "back") {
        if (page > Math.floor(pg / 10) * 10 || page <= 0) {
          return btn.deferUpdate();
        } else {
          page -= index;
          btn.update({
            embeds: [generateEmbed(page)],
            components: [row],
          });
        }
      }
      if (btn.customId === "next") {
        if (page >= Math.floor(pg / 10) * 10 || page < 0) {
          return btn.deferUpdate();
        } else {
          page += index;
          btn.update({
            embeds: [generateEmbed(page)],
            components: [row],
          });
        }
      }
      if (btn.customId === "last") {
        page = Math.floor(pg / 10) * 10;
        btn.update({
          embeds: [generateEmbed(page)],
          components: [row],
        });
      }
      if (btn.customId === "del") {
        btn.deferUpdate();
        collector.stop();
        setTimeout(() => msg.delete(), 100);
      }
    });
    collector.on("end", (reason) => {
      msg.components[0].components.forEach((com) => {
        com.setDisabled(true);
        com.setStyle("SECONDARY");
      });
      let rows2 = new MessageActionRow().addComponents(
        msg.components[0].components
      );
      msg.edit({
        components: [rows2],
      });
    });
  },
};
