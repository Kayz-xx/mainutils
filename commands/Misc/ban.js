  const {Permissions, MessageEmbed} = require('discord.js')
  module.exports = {
      name: 'ban',
      aliases: [],
      cooldown: '0',
      description: 'Used to ban a member',
      category: 'Misc',

    
      async execute(client, message, cmd,  args) {
        if(!message.member.roles.cache.has("764885367400693764") && !message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return;
        let syntax = 'e!ban <user> [reason]'
        let embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle('Invalid Syntax')
        .setDescription(`\`\`\`markdown\n${syntax}\n${" ".repeat(syntax.length - 14)}^^^^\`\`\`\n**Example:** \`e!ban 491933949686448138 banned\``)
        .setColor("DARK_RED")
        let user = args[0]
        let target;
        let reasoning = args.slice(1).join(" ")
        if(reasoning === '') reasoning = 'No reason provided'
        if(!user) return message.reply({embeds: [embed]})
        user = user.replace(/[\\<>@#&!]/g, "");
        target = await message.guild.members.fetch(user).catch(error => {})
        message.delete()
        if(!target) {
          let targeta = await client.users.fetch(user).catch(error => {})
          if(!targeta) return;
          if(targeta.id === message.author.id) return;

            message.channel.send({content: `**Banned ${targeta.tag}**`})
            
            message.guild.members.ban(targeta.id, {reason: reasoning})
            
            let embed = new MessageEmbed()
            .setTitle('Ban')
            .setDescription(`**Offender**: ${targeta.tag}\`(${targeta.id})\`\n**Reason**: ${reasoning}\n**Moderator**: ${message.author.tag}\n**User**: ${targeta.toString()}`)
            .setFooter(`ID: ${targeta.id}`)
            .setTimestamp()
            .setColor("RED")

            message.channel.send({embeds: [embed]})
          } else {
      
              if(target.roles.cache.position >= message.member.roles.cache.position || message.author.id !== message.guild.ownerId) {
                return message.channel.send(`You cannot ban that user due to role hierachy.`)
              }
              
              if(target.id === message.author.id) return;
              
              if(target.bannable) {
                message.channel.send({content: `**Banned ${target.user.tag}**`})
                
                target.ban({reason: reasoning})
                
                let embed = new MessageEmbed()
                .setTitle('Ban')
                .setDescription(`**Offender**: ${target.user.tag}\`(${target.id})\`\n**Reason**: ${reasoning}\n**Moderator**: ${message.author.tag}\n**User**: ${target.toString()}`)
                .setFooter(`ID: ${target.id}`)
                .setTimestamp()
                .setColor("RED")

                message.channel.send({embeds: [embed]})
              } else {
                return message.channel.send(`Unable to ban this user.`)
              }
            }
    }
  }
