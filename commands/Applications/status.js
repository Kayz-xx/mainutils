const DiscordJS = require('discord.js')
const {db} = require('../../firebase')


module.exports = {
    name: 'status',
    aliases: 'status',
    cooldown: '0',
    permissions: [],
  
    async execute(client, message, cmd,  args, Discord) {
     if (message.author.id !== "491933949686448138")
      return message.channel.send('Coming Soon!');
    const questions = [
      'Please specify status for position number 1!',
      'Please specify status for position number 2!',
      'Please specify status for position number 3!',
    ]
    let counter = 0

    const filter = (m) => {
      return m.author.id === message.author.id
    }

    const collector = new DiscordJS.MessageCollector(message.channel, filter, {
      max: questions.length,
      time: 100000,
    })

    message.channel.send(questions[counter++])
    collector.on('collect', (m) => {
      if (counter < questions.length) {
        m.channel.send(questions[counter++])
      }
    })

    collector.on('end', (collected) => {
      console.log(`Collected ${collected.size} messages`)

      if (collected.size < questions.length) {
        message.reply('You did not answer the questions in time')
        return
      }

      let counter = 0
      collected.forEach((value) => {
        console.log(questions[counter++], value.content)
          
      })
      let index = 0
      collected.forEach((value) => {
        db.ref(`Applications/${message.guild.id}/Positions${index++}/Status`).set(value.content)  
      })
      
    })
  },
}