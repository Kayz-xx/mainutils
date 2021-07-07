const Discord = require('discord.js')
const {db} = require('../../firebase')
const { MessageEmbed } = require ('discord.js')

module.exports = {
  name: 'deny',
  aliases: ['deny'],
  cooldown: '0',
  category: 'Applications',
  permissions: [],
  
  async execute(client, message, cmd,  args) {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return
    const messageID = args[0]
    const denyQuery = args.slice(1).join(" ")
    try{
        const applicationChannel = message.guild.channels.cache.get('855828767846039582')
        const applicationdEmbed = await applicationChannel.messages.fetch(messageID)
        
        const data = applicationdEmbed.embeds[0]
        const acceptEmbed = new MessageEmbed()
        .setTitle(data.title)
        .setAuthor(data.author.name)
        .setDescription(data.description)
        .setColor(data.color)
        .addField("Status **(Denied)**", denyQuery)

        
			applicationdEmbed.edit({ embed: acceptEmbed});

        const user = await client.users.cache.find((u) => u.tag === data.author.name)
        user.send({  embed : {
            description : 'Your application has been denied, thank you for applying!',
            color : "#77ACF1"
        }})
       // user.roles.add(data3.Staffrole)
    } catch (err) {
        console.log(err)
    }
  }
}