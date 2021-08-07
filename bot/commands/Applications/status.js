const DiscordJS = require('discord.js')
const {db} = require('../../firebase')


module.exports = {
    name: 'status',
    aliases: ['status'],
    cooldown: '0',
    permissions: [],
    category: 'Applications',
  
    async execute(client, message, cmd,  args) {
     if (!message.member.hasPermission('ADMINISTRATOR'))
      return message.channel.send('Coming Soon!');
      let data =
			(await db
				.ref(`Applications/${message.guild.id}`)
				.once('value')
				.then((snapshot) => snapshot.val())) || [];

		db.ref(`Applications/${message.guild.id}`);
    message.channel.send("Status can only be (Open/Closed)")
    const questions = [
      `Please specify status for ${data.Positions0.Name}!`,
      `Please specify status for ${data.Positions1.Name}!`,
      `Please specify status for ${data.Positions2.Name}!`,
      `Please specify status for ${data.Positions3.Name}!`,
    ]
    let counter = 0

    const filter = (m) => {
        m.author.id === message.author.id
    }

    const collector = new DiscordJS.MessageCollector(message.channel, filter, {
      max: questions.length,
      time: 100000,
    })
    message.channel.send({
      embed: {
        description:
          questions[counter++],
        color: '#77ACF1',
      },
    });
    collector.on('collect', (m) => {
      if (counter < questions.length) {
        m.channel.send({
          embed: {
            description:
              questions[counter++],
            color: '#77ACF1',
          },
        });
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
        db.ref(`Applications/${message.guild.id}/Positions${index++}/Status`).set(value.content.toLowerCase())  
      })
      
    })  
  },
}
