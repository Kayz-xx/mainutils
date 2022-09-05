const DiscordJS = require("discord.js");
const { db } = require("../../firebase");
const { Permissions } = require("discord.js");

module.exports = {
  name: "status",
  aliases: ["status"],
  cooldown: "0",
  permissions: [],
  category: "Applications",

  async execute(client, message, cmd, args) {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return;
    let data =
      (await db
        .ref(`Applications/${message.guild.id}`)
        .once("value")
        .then((snapshot) => snapshot.val())) || [];

    db.ref(`Applications/${message.guild.id}`);
    message.channel.send({ content: "Status can only be (Open/Closed)" });
    let questions = [];
    for (const [key, value] of Object.entries(data)) {
      if (!value.Name) return;
      questions.push(`Please specify the status for ${value.Name}`);
    }
    let counter = 0;

    const filter = (m) => {
      return m.author.id === message.author.id;
    };

    const collector = new DiscordJS.MessageCollector(message.channel, {
      filter,
      time: 100000,
      max: questions.length,
    });
    message.channel.send({
      embeds: [
        {
          description: questions[counter++],
          color: "#77ACF1",
        },
      ],
    });
    collector.on("collect", (m) => {
      if (counter < questions.length) {
        m.channel.send({
          embeds: [
            {
              description: questions[counter++],
              color: "#77ACF1",
            },
          ],
        });
      }
    });

    collector.on("end", (collected) => {
      if (collected.size < questions.length) {
        message.reply({ content: "You did not answer the questions in time" });
        return;
      }

      let index = 0;
      collected.forEach((value) => {
        db.ref(
          `Applications/${message.guild.id}/Positions${index++}/Status`
        ).set(value.content.toLowerCase());
      });
    });
  },
};
