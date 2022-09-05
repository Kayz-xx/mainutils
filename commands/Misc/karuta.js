const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  Permissions,
} = require("discord.js");

function cardtoTickets(edition, wishlist, print) {
  let tickets = 0;
  let obj = {
    high: {
      ed1: 300,
      ed2: 200,
      ed3: 100,
    },
    lmid: {
      ed1: 90,
      ed2: 65,
      ed3: 30,
    },
    hmid: {
      ed1: 110,
      ed2: 80,
      ed3: 50,
    },
    low: {
      ed1: 25,
      ed2: 15,
      ed3: 10,
    },
  };
  tickets += Math.round(wishlist / obj[print][edition]);

  return tickets;
}
module.exports = {
  name: "karutacalc",
  aliases: ["kcalc"],
  cooldown: "0",
  permissions: [],
  category: "Misc",

  async execute(client, message, cmd, args) {
    const done = new MessageButton()
      .setLabel("Done")
      .setStyle("SUCCESS")
      .setCustomId("setDone");

    const reject = new MessageButton()
      .setLabel("Cancel/Delete")
      .setStyle("DANGER")
      .setCustomId("setDelete");

    const ed1 = new MessageButton()
      .setLabel("Edition 1")
      .setStyle("PRIMARY")
      .setCustomId("ed1");

    const ed2 = new MessageButton()
      .setLabel("Edition 2")
      .setStyle("PRIMARY")
      .setCustomId("ed2");

    const ed3 = new MessageButton()
      .setLabel("Edition 3")
      .setStyle("PRIMARY")
      .setCustomId("ed3");

    const l1 = new MessageButton()
      .setLabel("Low Print")
      .setStyle("SECONDARY")
      .setCustomId("L1");
    const l2 = new MessageButton()
      .setLabel("Low Mid Print")
      .setStyle("SECONDARY")
      .setCustomId("L2");
    const h1 = new MessageButton()
      .setLabel("High Mid Print")
      .setStyle("SECONDARY")
      .setCustomId("H1");
    const h2 = new MessageButton()
      .setLabel("High Print")
      .setStyle("SECONDARY")
      .setCustomId("H2");

    const mint = new MessageButton()
      .setLabel("Mint")
      .setStyle("SUCCESS")
      .setCustomId("M1");

    let name = ["Wishlist", "Factors"];
    let desc = ["Wishlist Number", "Factors"];
    let value = ["setWL", "setFactors"];

    let menuOptions = [];

    for (let i = 0; i < name.length; i++) {
      let dataopt = {
        label: name[i],
        description: desc[i],
        value: value[i],
      };

      menuOptions.push(dataopt);
    }

    let slct = new MessageSelectMenu()
      .setMaxValues(1)
      .setCustomId("karuta")
      .setPlaceholder("Karuta Options")
      .addOptions([menuOptions]);

    const row = new MessageActionRow().addComponents([done, reject]);

    const row3 = new MessageActionRow().addComponents([ed1, ed2, ed3]);

    const row4 = new MessageActionRow().addComponents([l1, l2, h1, h2]);

    const row2 = new MessageActionRow().addComponents([slct]);

    let str = "Select **options** from the menu.";

    const embed = new MessageEmbed()
      .setTitle("Karuta Donation")
      .setDescription(str)
      .setColor("FFFFFF");

    message.channel
      .send({ embeds: [embed], components: [row2, row3, row4, row] })
      .then(async (e) => {
        let lel = await message.channel.messages.fetch(e.id);

        let filter = (m) => m.user.id === message.author.id;
        let collector = e.createMessageComponentCollector({
          filter,
          type: "SELECT_MENU",
          time: 600000,
        });
        let edition;
        let print;
        let tickets = 0;
        collector.on("collect", async (button) => {
          if (button.customId && button.customId === "setDelete") {
            button.deferUpdate();
            e.delete();
          } else if (button.customId && button.customId === "setDone") {
            button.deferUpdate();
            collector.stop();
          } else if (button.customId && button.customId === "ed1") {
            edition = "ed1";
            embed.setDescription((str += `\n**Edition 1**`));
            button.deferUpdate();
            e.edit({ embeds: [embed] });
          } else if (button.customId && button.customId === "ed2") {
            edition = "ed2";
            embed.setDescription((str += `\n**Edition 2**`));
            button.deferUpdate();
            e.edit({ embeds: [embed] });
          } else if (button.customId && button.customId === "ed3") {
            edition = "ed3";
            embed.setDescription((str += `\n**Edition 3**`));
            button.deferUpdate();
            e.edit({ embeds: [embed] });
          } else if (button.customId && button.customId === "L1") {
            print = "low";
            embed.setAuthor(`Low Print`);
            button.deferUpdate();
            e.edit({ embeds: [embed] });
          } else if (button.customId && button.customId === "L2") {
            print = "lmid";
            embed.setAuthor(`Low Mid Print`);
            button.deferUpdate();
            e.edit({ embeds: [embed] });
          } else if (button.customId && button.customId === "H1") {
            print = "hmid";
            embed.setAuthor(`High Mid Print`);
            button.deferUpdate();
            e.edit({ embeds: [embed] });
          } else if (button.customId && button.customId === "H2") {
            print = "high";
            embed.setAuthor(`High Print`);
            button.deferUpdate();
            e.edit({ embeds: [embed] });
          } else if (button.customId && button.customId === "M1") {
            embed.setFooter(`Mint Card`);
            button.deferUpdate();
            e.edit({ embeds: [embed] });
          } else if (button.values[0] === "setWL") {
            button.reply({
              content: "Number of Wishlists",
              ephemeral: true,
            });
            let filter = (m) => message.author.id === m.author.id;
            let titleclr = button.channel.createMessageCollector({
              filter,
              time: 30000,
              max: 1,
            });

            titleclr.on("collect", async (m) => {
              console.log(edition);
              let wishlist = parseInt(m.content);
              if (!wishlist) return;
              if (!edition)
                return button.followUp({
                  content: "Select an edition",
                  ephemeral: true,
                });
              if (!print)
                return button.followUp({
                  content: "Select type of print",
                  ephemeral: true,
                });
              tickets = cardtoTickets(edition, wishlist, print);
              embed.setDescription(
                (str += `\nNumber of wishlists: **${wishlist}**`)
              );
              embed.addField("Current Tickets", `${tickets}`);
              titleclr.stop();
              m.delete();

              e.edit({ embeds: [embed] });
            });
          } else if (button.values[0] === "setFactors") {
            button.reply({
              content: "Ticket value of frames or morphs.",
              ephemeral: true,
            });
            let filter = (m) => message.author.id === m.author.id;
            let titleclr = button.channel.createMessageCollector({
              filter,
              time: 30000,
              max: 1,
            });
            titleclr.on("collect", async (m) => {
              let tix = parseInt(m.content);
              if (!tix) return;
              console.log(tix);
              tickets += tix;
              embed.fields[0] = {
                name: "Current Tickets",
                value: `${tickets}`,
              };
              titleclr.stop();
              m.delete();
            });
            e.edit({ embeds: [embed] });
          }
        });

        collector.on("end", async (collected, reason) => {
          if (reason === "time") {
            const content = new MessageButton()
              .setLabel("Timeout")
              .setStyle("DANGER")
              .setCustomId("timeout|91817623842")
              .setDisabled();

            const row = new MessageActionRow().addComponents([content]);

            e.edit({ embeds: [lel.embeds[0]], components: [row] });
          }
        });
      });
  },
};
