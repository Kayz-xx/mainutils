const DiscordJS = require('discord.js');
const { Server } = require('socket.io');
const {db} = require('../../firebase')


module.exports = {
    name: 'availpositions',
    aliases: ['positionset'],
    cooldown: '0',
    permissions: [],
    category: 'Applications',
    description: "This command sets the positions availible for the server",
  
    async execute(client, message, cmd,  args) {
     if (message.author.id !== "491933949686448138")
      return;
    const questions = [
      'Please specify position number 1',
      'Please specify position number 2',
      'Please specify position number 3',
      'Please specify position number 4',
    ]
    let counter = 0

    const filter = (m) => {
      return m.author.id === message.author.id
    }

    const collector = new DiscordJS.MessageCollector(message.channel, {filter, 
      max: questions.length,
      time: 100000,
    })

    message.channel.send({
      embeds: [{
        description:
          questions[counter++],
        color: '#77ACF1',
      }]
    });
    collector.on('collect', (m) => {
      if (counter < questions.length) {
        m.channel.send({
          embeds: [{
            description:
              questions[counter++],
            color: '#77ACF1',
          }]
        });
      }
    })

    collector.on('end', (collected) => {


      if (collected.size < questions.length) {
        message.reply({content:'You did not answer the questions in time'})
        return
      }

      let index = 0
      collected.forEach((value) => {
        db.ref(`Applications/${message.guild.id}/Positions${index++}/Name`).set(value.content)  
      })
      
    })
  },
}

/*const questions = [`What's your discord name? (name with #)`, `What's your discord ID? (if need help contact a staff member to tell you your discord ID.)`, `The daily requirement is hosting at least 3 events per day (these events must be sponsored by you & the minimum amount given away per winner is 1mill) do you think you will be able to manage this?`, ` What's your timezone? (PST, CST, EST...)`, `Have you read the dank memer rules for giveaways?`, ` Do you know how to run Mudae events, Slots Events, Fight Cages or Mafia events? If so, which ones?`, `Do you have any new ideas for events?`]

            let collectCounter = 0
            let endCounter = 0

            const appStart = await message.author.send({  embed : {
                description : questions[collectCounter++],
                color : "#77ACF1"
            }})
            const channel = appStart.channel

            const collector = channel.createMessageCollector(filter);

            collector.on("collect", () => {
                if(collectCounter < questions.length) {
                    channel.send({  embed : {
                        description : questions[collectCounter++],
                        color : "#77ACF1"
                    }})
                } else {
                    channel.send({  embed : {
                        description : 'Application has been sent!',
                        color : "#77ACF1"
                    }})
                    collector.stop("fulfilled")
                }
            })
   
            const appsChannel = client.channels.cache.get('855828767846039582')
            collector.on('end', (collected, reason) => {
                if(reason === 'fulfilled') {
                    let index = 1
                    const mappedResponses = collected.map((msg) => {
                        return `${index++}) ${questions[endCounter++]}\n -> ${msg.content}`
                    }).join('\n\n')

                    const embed = new MessageEmbed()
                    .setTitle('New Application')
                    .setAuthor(message.author.tag)
                    .setDescription (mappedResponses)
                    .addField('Status', '**(Pending)**')
                    .setColor ("#77ACF1")
                    
                    appsChannel.send(embed)
                }  
                    
            })*/
