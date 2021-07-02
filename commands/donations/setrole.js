const {db} = require('../../firebase')
const Discord = require('discord.js')

module.exports = {
    name: 'setrole',
    aliases: 'setrole',
    cooldown: '0',
    permissions: [],
    usage: '<role>',
    commands: ['setrole'],
    description: 'Sets up role who can manage donations',

    async execute(client, message, cmd,  args, Discord) {
      
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const role = await message.guild.roles.cache.get(args[0].replace(/[^\d.-]/g, ''))

        if (!role)
            return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));


      db.ref(`Donations/Info/${message.guild.id}/Settings/Role`).set(role.id)
        return message.channel.send({
          embed : {
            description : `Role to add donations has been set to : ${role}`,
            color : "RANDOM"
          }
        })
         

      }catch(e){
        console.log(e.stack)
        return message.channel.send(e.message)
      }

      
            }
};
