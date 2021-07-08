const {db} = require('../../firebase')
const Discord = require('discord.js')

module.exports = {
    name: 'eventcreate',
    aliases: ['createevent', 'events'],
    cooldown: '0',
    usage: '<event>',
    category: 'Donations',
    permissions: [],
    description: 'Creates an event in the server, these donations are counted seperately.',
    
    async execute(client, message, cmd,  args) {
        
        if(cmd === 'eventcreate') {

                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const event = args[0]

        if (!event)
            return message.channel.send('Please specify a valid event').then(m => m.delete({timeout: 5000}));


      db.ref(`Donations/Info/Events/${message.guild.id}/Event`).set(event)
        return message.channel.send({
          embed : {
            description : `${event} created!`,
            color : "RANDOM"
                }
            })
        }

        if(cmd === 'events'){
            let data5 = await db
        .ref(`Donations/Info/Events/${message.guild.id}/Event`)
        .once("value")
        .then(snapshot => snapshot.val())|| []
        db.ref(`Donations/Info/Events/${message.guild.id}/Event`)   
            return message.channel.send({
                embed : {
                  description : `Event in this server- ${data5}`,
                  color : "RANDOM"
            }
        })
    }
  }
}
