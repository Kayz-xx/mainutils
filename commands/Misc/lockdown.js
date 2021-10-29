const {MessageEmbed, Permissions, PermissionOverwriteManager, PermissionOverwrites} = require('discord.js')

module.exports = {
    name: 'lockdown',
    aliases: [],
    cooldown: '0',
    permissions: [],
    description: 'Bot Info!',
    category: 'Misc',

  

    async execute(client, message, cmd,  args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply({content: 'You don\'t have enough permissions to use this command.'})

        const query = args[0]
        let arr = []
        if(!["true", "false", "list"].includes(query))
        return message.reply({content: 'You can only specify true of false'})
        let embed = new MessageEmbed()
        .setTitle('Server Lockdown')
        .setDescription('You have not been muted\nThe server has been locked down for a reason, the channels will be unlocked soon.')
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter('Sorry for the incovienience')

        let embed2 = new MessageEmbed()
        .setTitle('Server Has Been Unlocked')
        .setDescription('The channels have been unlocked\nYou can now proceed to use the server normally')
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter('Thank you for cooperating')


        if(query == "true") {
        message.guild.channels.cache.forEach(channel => {
            try {
                channel.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name.toLowerCase().trim() === "@everyone"), {
                    SEND_MESSAGES: false
                })
                if(channel.type == "GUILD_TEXT") channel.send({embeds: [embed]})
            } catch(e) {
                console.log(e)
            }
        })
    } 
      if(query == "false") {
        message.guild.channels.cache.forEach(channel => {
            try {
                channel.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name.toLowerCase().trim() === "@everyone"), {
                    SEND_MESSAGES: null
                })
                if(channel.type == "GUILD_TEXT") channel.send({embeds: [embed2]})
            } catch(e) {
                console.log(e)
            }
        })
      }
      if(query == "list") {
        message.guild.channels.cache.forEach(channel => {
            try {
                arr.push(channel.id)
            } catch(e) {
                console.log(e)
            }
        })
        let str = ''
        arr.map((d, i) => {
            return (str += `**(${d})** <#${d}>\n`);
        });
        let set = new MessageEmbed()
        .setTitle('Lockdown Settings')
        .setDescription(str)
        .setFooter('Settings')
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send({embeds: [set]})
    } 
      /*message.guild.channels.cache.forEach(channel => {
        const x = message.guild.roles.cache.find(x => x.name.toLowerCase().trim() === "@everyone")
        console.log(channel.permissionOverwrites.cache.get(x.id))
      })*/
    }
  }
