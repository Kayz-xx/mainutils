const { getMeme } = require("../../functions/random");
module.exports = {
  name: "meme",
  category: "fun",

  description: "Get Fresh meme :D",
  async execute(client, message, cmd, args) {
    let data = await getMeme();
    message.channel.send({ embeds: [data.embed] });
  },
};
