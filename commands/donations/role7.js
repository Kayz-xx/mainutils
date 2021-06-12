const {db} = require('../../firebase')
const Discord = require('discord.js')

module.exports = {name: 'role7',
    commands: 'role7',
    description: 'Sets the autorole for donations',
    usage: `role <role id>`,
    callback: async (message, arguments) => {
      
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const role = await message.guild.roles.cache.get(arguments[0].replace(/[^\d.-]/g, ''))

        if (!role)
            return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));

            let data5 = await db
            .ref(`Donations/Info/${message.guild.id}/Settings/Amount1`) 
            .once("value")
            .then(snapshot => snapshot.val())|| []
            db.ref(`Donations/Info/${message.guild.id}/Settings/Amount1`)

      db.ref(`Donations/Info/${message.guild.id}/Settings/Donorole7`).set(role.id)
        return message.channel.send({
          embed : {
            description : `Autorole for amount ${data5} has been set to : ${role}`,
            color : "RANDOM"
          }
        })
         

      }catch(e){
        console.log(e.stack)
        return message.channel.send(e.message)
      }

      
            }
};
