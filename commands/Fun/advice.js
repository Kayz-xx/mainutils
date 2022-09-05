const { getAdvice } = require("../../functions/random");
module.exports = {
  name: "advice",
  aliases: ["aid"],
  category: "fun",

  description: "Get Fresh Advice",
  async execute(client, message, cmd, args) {
    let data = await getAdvice();
    message.channel.send({ embeds: [data.embed] });
  },
};
