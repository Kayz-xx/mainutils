const { Random } = require("something-random-on-discord")

module.exports = {
  name: "joke",
  category: "fun",

  description: "Get Fresh Joke :D",
  async execute(client, message, cmd,  args) {


    let data = await Random.getJoke()
    message.channel.send({content: data})

  }
}
