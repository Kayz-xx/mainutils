const { Random } = require("something-random-on-discord")
 
module.exports = {
  name: "advice",
  aliases: ['aid'],
   category: "fun",
   
  
  description: "Get Fresh Advice",
  async execute(client, message, cmd,  args) {
  
    let data = await Random.getAdvice()
    message.channel.send({embeds: [data.embed]})
    }

}
