const {db} = require('../../firebase')
const Discord = require('discord.js')

module.exports = {
    name: 'role',
    aliases: 'role1, role2, role3, role4 , role5, role6, role7, role8, role9',
    cooldown: '0',
    permissions: [],
    usage: '<role>',
    commands: ['role'],
    description: 'Sets up autoroles',
    async execute(client, message, cmd,  args, Discord) {

        if(cmd === 'role1')
      
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            const role = await message.guild.roles.cache.get(args[0].replace(/[^\d.-]/g, ''))

        if (!role)
            return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));


            let data5 = await db
            .ref(`Donations/Info/${message.guild.id}/Settings/Amount1`) 
            .once("value")
            .then(snapshot => snapshot.val())|| []
            db.ref(`Donations/Info/${message.guild.id}/Settings/Amount1`)
            if(data5.length === 0) {
                return message.reply('No Amount has been set')
            }

      db.ref(`Donations/Info/${message.guild.id}/Settings/Donorole1`).set(role.id)
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

      if(cmd === 'role2'){
        try{
            if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        const role = await message.guild.roles.cache.get(args[0].replace(/[^\d.-]/g, ''))

    if (!role)
        return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));

        let data5 = await db
        .ref(`Donations/Info/${message.guild.id}/Settings/Amount2`) 
        .once("value")
        .then(snapshot => snapshot.val())|| []
        db.ref(`Donations/Info/${message.guild.id}/Settings/Amount2`)
        if(data5.length === 0) {
            return message.reply('No Amount has been set')
        }

  db.ref(`Donations/Info/${message.guild.id}/Settings/Donorole2`).set(role.id)
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
      
    
    if(cmd === 'role2'){
        try{
            if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        const role = await message.guild.roles.cache.get(args[0].replace(/[^\d.-]/g, ''))

    if (!role)
        return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));

        let data5 = await db
        .ref(`Donations/Info/${message.guild.id}/Settings/Amount2`) 
        .once("value")
        .then(snapshot => snapshot.val())|| []
        db.ref(`Donations/Info/${message.guild.id}/Settings/Amount2`)
        if(data5.length === 0) {
            return message.reply('No Amount has been set')
        }

  db.ref(`Donations/Info/${message.guild.id}/Settings/Donorole2`).set(role.id)
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
    
    if(cmd === 'role3'){
        try{
            if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        const role = await message.guild.roles.cache.get(args[0].replace(/[^\d.-]/g, ''))

    if (!role)
        return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));

        let data5 = await db
        .ref(`Donations/Info/${message.guild.id}/Settings/Amount3`) 
        .once("value")
        .then(snapshot => snapshot.val())|| []
        db.ref(`Donations/Info/${message.guild.id}/Settings/Amount3`)
        if(data5.length === 0) {
            return message.reply('No Amount has been set')
        }

  db.ref(`Donations/Info/${message.guild.id}/Settings/Donorole3`).set(role.id)
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
    
    if(cmd === 'role4'){
        try{
            if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        const role = await message.guild.roles.cache.get(args[0].replace(/[^\d.-]/g, ''))

    if (!role)
        return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));

        let data5 = await db
        .ref(`Donations/Info/${message.guild.id}/Settings/Amount4`) 
        .once("value")
        .then(snapshot => snapshot.val())|| []
        db.ref(`Donations/Info/${message.guild.id}/Settings/Amount4`)
        if(data5.length === 0) {
            return message.reply('No Amount has been set')
        }

  db.ref(`Donations/Info/${message.guild.id}/Settings/Donorole4`).set(role.id)
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
    
    if(cmd === 'role5'){
        try{
            if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        const role = await message.guild.roles.cache.get(args[0].replace(/[^\d.-]/g, ''))

    if (!role)
        return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));

        let data5 = await db
        .ref(`Donations/Info/${message.guild.id}/Settings/Amount5`) 
        .once("value")
        .then(snapshot => snapshot.val())|| []
        db.ref(`Donations/Info/${message.guild.id}/Settings/Amount5`)
        if(data5.length === 0) {
            return message.reply('No Amount has been set')
        }

  db.ref(`Donations/Info/${message.guild.id}/Settings/Donorole5`).set(role.id)
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
    
    if(cmd === 'role6'){
        try{
            if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        const role = await message.guild.roles.cache.get(args[0].replace(/[^\d.-]/g, ''))

    if (!role)
        return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));

        let data5 = await db
        .ref(`Donations/Info/${message.guild.id}/Settings/Amount6`) 
        .once("value")
        .then(snapshot => snapshot.val())|| []
        db.ref(`Donations/Info/${message.guild.id}/Settings/Amount6`)
        if(data5.length === 0) {
            return message.reply('No Amount has been set')
        }

  db.ref(`Donations/Info/${message.guild.id}/Settings/Donorole6`).set(role.id)
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
    
    if(cmd === 'role7'){
        try{
            if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        const role = await message.guild.roles.cache.get(args[0].replace(/[^\d.-]/g, ''))

    if (!role)
        return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));

        let data5 = await db
        .ref(`Donations/Info/${message.guild.id}/Settings/Amount7`) 
        .once("value")
        .then(snapshot => snapshot.val())|| []
        db.ref(`Donations/Info/${message.guild.id}/Settings/Amount7`)
        if(data5.length === 0) {
            return message.reply('No Amount has been set')
        }

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
    
    if(cmd === 'role8'){
        try{
            if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        const role = await message.guild.roles.cache.get(args[0].replace(/[^\d.-]/g, ''))

    if (!role)
        return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));

        let data5 = await db
        .ref(`Donations/Info/${message.guild.id}/Settings/Amount8`) 
        .once("value")
        .then(snapshot => snapshot.val())|| []
        db.ref(`Donations/Info/${message.guild.id}/Settings/Amount8`)
        if(data5.length === 0) {
            return message.reply('No Amount has been set')
        }

  db.ref(`Donations/Info/${message.guild.id}/Settings/Donorole8`).set(role.id)
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
    
    if(cmd === 'role9'){
        try{
            if (!message.member.hasPermission('MANAGE_GUILD'))
        return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        const role = await message.guild.roles.cache.get(args[0].replace(/[^\d.-]/g, ''))

    if (!role)
        return message.channel.send('I cannot find that role, Please mention a role within this server.').then(m => m.delete({timeout: 5000}));

        let data5 = await db
        .ref(`Donations/Info/${message.guild.id}/Settings/Amount9`) 
        .once("value")
        .then(snapshot => snapshot.val())|| []
        db.ref(`Donations/Info/${message.guild.id}/Settings/Amount9`)
        if(data5.length === 0) {
            return message.reply('No Amount has been set')
        }

  db.ref(`Donations/Info/${message.guild.id}/Settings/Donorole9`).set(role.id)
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
    
            }
};
