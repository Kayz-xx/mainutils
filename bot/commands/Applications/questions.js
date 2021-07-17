const DiscordJS = require('discord.js')
const {db} = require('../../firebase')


module.exports = {
    name: 'questions',
    aliases: ['appsetup'],
    cooldown: '0',
    permissions: [],
    category: 'Applications',
    description: "This command set's questions for the according positions",
    async execute(client, message, cmd,  args) {
      if (message.author.id !== "491933949686448138")
      return message.channel.send('Coming Soon!');
     message.channel.send("You have 120 seconds, to setup the questions for the positions!")
    const questions = [
      'What do you want as the 1st question?',
      'What do you want as the 2nd question?',
      'What do you want as the 3rd question?',
      'What do you want as the 4th question?',
      'What do you want as the 5th question?',
      'What do you want as the 6th question?',
      'What do you want as the 7th question?',
      'What do you want as the 8th question?',
      'What do you want as the 9th question?',
      'What do you want as the 10th question?'
    ]
    let counter = 0

    const filter = (m) => {
      return m.author.id === message.author.id
    }

    const collector = new DiscordJS.MessageCollector(message.channel, filter, {
      max: questions.length,
      time: 120000,
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
        db.ref(`Applications/${message.guild.id}/Question${index++}`).set(value.content)  
      })
      
    })
  },
}
