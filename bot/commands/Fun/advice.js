const { Random } = require("something-random-on-discord")
 
module.exports = {
  name: "advice",
  aliases: ['aid'],
   category: "fun",
   
  
  description: "Get Fresh Advice :D",
  async execute(client, message, cmd,  args) {

    if(cmd === 'advice'){
  
    let data = await Random.getAdvice()
    message.channel.send(data)
    }
    if(cmd === 'aid'){
    let data2 =  await random.getFact();
      message.channel.send(data2)
      }
  

  
}
}
