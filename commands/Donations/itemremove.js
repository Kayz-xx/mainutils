const { Client, Message, MessageEmbed, Collection, Permissions} = require('discord.js')
const formatter = new Intl.NumberFormat('en')
const {db} = require('../../firebase.js')


module.exports = {
    name: 'itemremove',
    aliases: [],
    cooldown: '0',
    usage: '<name>',
    permissions: [],
    category: 'Donations',
    
    async execute(client, message, cmd,  args) {
        if(!message.member.roles.cache.has("789854214288965644") && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
        let data = await db
        .ref(`Donations/Info/${message.guild.id}/List`)
        .once("value")
        .then(snapshot => snapshot.val())|| []
     
        const found = data.find(item => item.name === args[0]) || data.find(item => item.aliases === args[0])
        if(!found) {
            let embed = new MessageEmbed()
            .setTitle(`Item Does Not Exist`)
            .setColor('RANDOM')
            .setFooter(`Elite Empire`, `https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024`)
            return message.channel.send({embeds: [embed]})
        }
        const del = data.indexOf(found)
        data.splice(del, 1);
        db.ref(`Donations/Info/${message.guild.id}/List`).set(data)
        let embed6 = new MessageEmbed()
        .setTitle(`**Deleted Item ${found.name}**`)
        .setColor('RANDOM')
        .setFooter(`Elite Empire`, `https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024`)
        message.channel.send({embeds: [embed6]})
    }
}
