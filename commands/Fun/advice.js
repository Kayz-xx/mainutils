const { Random } = require("something-random-on-discord")

module.exports = {
  name: "meme",
  category: "fun",

  description: "Get Fresh meme :D",
  async execute(client, message, cmd,  args) {
    let data = await Random.getMeme()
    message.channel.send({embeds: [data.embed]})
  }
}
