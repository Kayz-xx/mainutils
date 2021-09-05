const { Client, Message, MessageEmbed, Collection } = require('discord.js')
const formatter = new Intl.NumberFormat('en')
const {db} = require('../../firebase.js')


module.exports = {
    name: 'itemedit',
    aliases: [],
    cooldown: '0',
    usage: '<name> <amount>',
    permissions: [],
    category: 'Donations',
    
    async execute(client, message, cmd,  args) {
        let name = args[0]
        if(!name)
        return message.channel.send({content: "Specify an item to edit."})
        let amount = args[1]
        if(!amount)
        return message.channel.send({content: "Specify an amount"})
        let aliases = args[2]
        if(!aliases)
        return message.channel.send({content: "Specify an alias"})
        let data = await db
        .ref(`Donations/Info/${message.guild.id}/List`)
        .once("value")
        .then(snapshot => snapshot.val())|| []
        const found = data.find(item => item.name === name) || data.find(item => item.aliases === name)
        const place = data.indexOf(found)
        if(found) {
            data[place] = {
                "name" : found.name,
                "amount" : parseInt(amount),
                "aliases": aliases,
                "type" : found.type
              }
            db.ref(`Donations/Info/${message.guild.id}/List`).set(data)
            const item = data.find(item => item.name === name) || data.find(item => item.aliases === name)
            let embed6 = new MessageEmbed()
            .setAuthor(`Item ${name} price set to: ${amount}`)
            .setDescription(`Alias set to ${aliases}`)
            .setColor("RANDOM")
            message.channel.send({embeds: [embed6]})
        } else {
            return message.reply({content: 'Could not find that item.'})
        }
    }
}
