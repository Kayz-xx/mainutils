const { getJoke } = require("../../functions/random");
module.exports = {
  name: "joke",
  category: "fun",

  description: "Get Fresh Joke :D",
  async execute(client, message, cmd, args) {
    let data = await getJoke();
    message.channel.send({ embeds: [data.embed] });
  },
};
