const {db} = require('../../firebase')
const Discord = require('discord.js')

module.exports = {name: 'amount5',
    commands: 'amount5',
    description: 'Sets the autorole amount for donations',
    usage: `role <role id>`,
    callback: async (message, arguments) => {
      
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const amount = arguments[0]

        if (!amount)
            return message.channel.send('Please specify a valid amount').then(m => m.delete({timeout: 5000}));


      db.ref(`Donations/Info/${message.guild.id}/Settings/Amount5`).set(amount)
        return message.channel.send({
          embed : {
            description : `Amount set to: ${amount}`,
            color : "RANDOM"
          }
        })
         

      }catch(e){
        console.log(e.stack)
        return message.channel.send(e.message)
      }

      
            }
};
