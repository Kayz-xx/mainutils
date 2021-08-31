const discord = require('discord.js')
const { MessageButton } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'youtube',
    aliases: ['yt'],
    cooldown: '0',
    permissions: [],
    category: 'Misc',
    
    async execute(client, message, cmd,  args) {
  
try {
  
    let channel = message.member.voice.channel
    console.log(channel)
    if(!channel) return message.channel.send({content: "You have to be in a vc"})

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    })
    
    .then(res => res.json())
    .then(invite => {
        if(!invite.code) return message.channel.send({content: "Sadly i cant start a yt together"})
        const e = new discord.MessageEmbed()
.setTitle('Welcome to YouTube!')
.setColor('RED')
.setThumbnail('https://media.discordapp.net/attachments/796358841038143488/851878274179399751/youtube.png')
        .setDescription(`\nTo watch youtube [Click me](https://discord.com/invite/${invite.code}) or the button below!`)
.setTimestamp()

let button = new MessageButton()
            .setStyle('LINK')
            .setLabel('Open YouTube!')
            .setURL(`https://discord.com/invite/${invite.code}`)
let row = new discord.MessageActionRow().addComponents(button)

        message.channel.send({
            embeds: [e],
            components: [row]
        });
    })
} catch(error) {
    console.log(error)
}
}
}