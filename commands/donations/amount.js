const {db} = require('../../firebase')
const Discord = require('discord.js')


module.exports = {
    name: 'amount',
    aliases: 'amount1, amount2 ,amount3, amount4, amount5, amount6, amount7, amount8, amount9',
    cooldown: '0',
    usage: '<amount>',
    permissions: [],
    commands: ['amount'],
    description: 'Sets up the autorole amount',
    async execute(client, message, cmd,  args, Discord) {
      
        if(cmd === 'amount1')
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const amount = args[0]

        if (!amount)
            return message.channel.send('Please specify a valid amount').then(m => m.delete({timeout: 5000}));


      db.ref(`Donations/Info/${message.guild.id}/Settings/Amount1`).set(amount)
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

      if(cmd === 'amount2')
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const amount = args[0]

        if (!amount)
            return message.channel.send('Please specify a valid amount').then(m => m.delete({timeout: 5000}));


      db.ref(`Donations/Info/${message.guild.id}/Settings/Amount2`).set(amount)
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
      if(cmd === 'amount3')
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const amount = args[0]

        if (!amount)
            return message.channel.send('Please specify a valid amount').then(m => m.delete({timeout: 5000}));


      db.ref(`Donations/Info/${message.guild.id}/Settings/Amount3`).set(amount)
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
      if(cmd === 'amount4')
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const amount = args[0]

        if (!amount)
            return message.channel.send('Please specify a valid amount').then(m => m.delete({timeout: 5000}));


      db.ref(`Donations/Info/${message.guild.id}/Settings/Amount4`).set(amount)
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
      if(cmd === 'amount5')
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const amount = args[0]

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
      if(cmd === 'amount6')
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const amount = args[0]

        if (!amount)
            return message.channel.send('Please specify a valid amount').then(m => m.delete({timeout: 5000}));


      db.ref(`Donations/Info/${message.guild.id}/Settings/Amount6`).set(amount)
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
      if(cmd === 'amount7')
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const amount = args[0]

        if (!amount)
            return message.channel.send('Please specify a valid amount').then(m => m.delete({timeout: 5000}));


      db.ref(`Donations/Info/${message.guild.id}/Settings/Amount7`).set(amount)
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
      if(cmd === 'amount8')
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const amount = args[0]

        if (!amount)
            return message.channel.send('Please specify a valid amount').then(m => m.delete({timeout: 5000}));


      db.ref(`Donations/Info/${message.guild.id}/Settings/Amount8`).set(amount)
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
      if(cmd === 'amount9')
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const amount = args[0]

        if (!amount)
            return message.channel.send('Please specify a valid amount').then(m => m.delete({timeout: 5000}));


      db.ref(`Donations/Info/${message.guild.id}/Settings/Amount9`).set(amount)
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
