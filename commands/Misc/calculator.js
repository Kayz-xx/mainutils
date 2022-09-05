const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const math = require("mathjs");

module.exports = {
  name: "calculator",
  aliases: ["calc"],
  category: "Misc",
  description: "A calculator using discord buttons!",
  cooldown: 60,
  permissions: [],

  async execute(client, message, cmd, args) {
    try {
      let button = new Array([], [], [], [], []);
      let row = [];
      let time = 120000;
      let text = [
        "Clear",
        "(",
        ")",
        "/",
        "7",
        "8",
        "9",
        "*",
        "4",
        "5",
        "6",
        "-",
        "1",
        "2",
        "3",
        "+",
        ".",
        "0",
        "00",
        "=",
      ];
      let current = 0;

      for (let i = 0; i < text.length; i++) {
        if (button[current].length === 4) current++;
        button[current].push(createButton(text[i]));
        if (i === text.length - 1) {
          for (let btn of button) row.push(addRow(btn));
        }
      }

      function addRow(btns) {
        let row1 = new MessageActionRow();

        for (let btn of btns) {
          row1.addComponents([btn]);
        }
        return row1;
      }
      let row1 = row[0];
      let row2 = row[1];
      let row3 = row[2];
      let row4 = row[3];
      let row5 = row[4];
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription("```0```");
      message.channel
        .send({
          embeds: [embed],
          components: [row1, row2, row3, row4, row5],
        })
        .then((msg) => {
          let isWrong = false;
          let value = "";
          let embed1 = new MessageEmbed()
            .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setColor("BLUE");

          function createCollector(val, result = false) {
            let filter = (btn) =>
              btn.user.id === message.author.id && btn.customId == "cal" + val;
            const collect = msg.createMessageComponentCollector({
              filter,
              time: time,
            });

            collect.on("collect", async (btn) => {
              if (result === "new") value = " ";
              else if (isWrong) {
                value = val;
                isWrong = false;
              } else if (result === "0") value = val;
              else if (result) {
                isWrong: true;
                value = mathEval(value);
              } else value += val;

              embed1.setDescription("```" + value + "```");
              btn.update({
                embeds: [embed1],
                components: [row1, row2, row3, row4, row5],
              });
            });
            collect.on("end", async (collected, reason) => {
              embed1.setDescription(
                "Your 2 minutes for using calculator is up!"
              );
              embed1.setColor("RED");
              msg.components[0].components.forEach((com) => {
                com.setDisabled(true);
                com.setStyle("SECONDARY");
                com.setLabel(" ");
                com.setEmoji("<:Cancel:875313311640616971>");
              });
              let rows2 = new MessageActionRow().addComponents(
                msg.components[0].components
              );
              msg.edit({ embeds: [embed1], components: [rows2] });
            });
          }

          for (let txt of text) {
            let result;
            if (txt === "Clear") result = "new";
            else if (txt === "=") result = true;
            else result = false;
            createCollector(txt, result);
          }
        });

      function createButton(lable, style = "SECONDARY") {
        if (lable === "Clear") style = "DANGER";
        else if (lable === ".") style = "SECONDARY";
        else if (lable === "=") style = "SUCCESS";
        else if (isNaN(lable)) style = "PRIMARY";

        const btn = new MessageButton()
          .setLabel(lable)
          .setStyle(style)
          .setCustomId("cal" + lable);
        return btn;
      }
      function mathEval(input) {
        try {
          let res = math.evaluate(input);
          return res;
        } catch {
          return "Wrong Input";
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};
