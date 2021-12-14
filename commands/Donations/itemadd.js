const { Client, MessageEmbed, Collection, Permissions} = require('discord.js')
const formatter = new Intl.NumberFormat('en')
const {db} = require('../../firebase.js')


module.exports = {
    name: 'itemadd',
    aliases: [],
    cooldown: '0',
    usage: '<name> <amount> <aliases> <type>',
    permissions: [],
    category: 'Donations',
    
    async execute(client, message, cmd,  args) {
        if(!message.member.roles.cache.has("764885367400693764") && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
        let embed2 = new MessageEmbed()
        .setDescription(`\`\`\`markdown\nitemadd <name> <amount> <aliases> <type>\n        ^^^^^^\nInvalid Syntax\`\`\``)
        .setColor('RANDOM')
        .setFooter(`Elite Empire`, `https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024`)
        let embed3 = new MessageEmbed()
        .setDescription(`\`\`\`markdown\nitemadd <name> <amount> <aliases> <type>\n               ^^^^^^^^\nInvalid Syntax\`\`\``)
        .setColor('RANDOM')
        .setFooter(`Elite Empire`, `https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024`)
        let embed4 = new MessageEmbed()
        .setDescription(`\`\`\`markdown\nitemadd <name> <amount> <aliases> <type>\n                        ^^^^^^^^^\nInvalid Syntax\`\`\``)
        .setColor('RANDOM')
        .setFooter(`Elite Empire`, `https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024`)
        let embed5 = new MessageEmbed()
        .setDescription(`\`\`\`markdown\nitemadd <name> <amount> <aliases> <type>\n                                  ^^^^^^\nInvalid Syntax\`\`\``)
        .setColor('RANDOM')
        .setFooter(`Elite Empire`, `https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024`)
        let name = args.slice(0).join(' ')
        if(!name.includes('*')) return
        let arr2 = name.split('*')
        let arr = arr2[2].split(' ')
        name = arr2[1]
        if(!name)
        return message.channel.send({embeds: [embed2]})
        let amount = arr[1]
        if(!amount)
        return message.channel.send({embeds: [embed3]})
        let aliases = arr[2]
        if(!aliases)
        return message.channel.send({embeds: [embed4]})
        let type = arr[3]
        if(!type)
        return message.channel.send({embeds: [embed5]})
        let types = ['shop', 'work', 'nonpurchasable']
        if(!types.includes(type)) {
            let embed = new MessageEmbed()
            .setTitle(`**Elite's Item List**`)
            .setDescription(`\`\`\`markdown\nValid Types- <shop, work, collectables>\`\`\``)
            .setColor('RANDOM')
            .setFooter(`Elite Empire`, `https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024`)
            return message.channel.send({embeds: [embed]})
        }
        let data = await db
        .ref(`Donations/Info/${message.guild.id}/List`)
        .once("value")
        .then(snapshot => snapshot.val())|| []
        const found = data.find(item => item.name === name) || data.find(item => item.id === aliases)
        if(found) {
            let embed = new MessageEmbed()
            .setTitle(`Item Already Exists`)
            .setColor('RANDOM')
            .setFooter(`Elite Empire`, `https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024`)
            return message.channel.send({embeds: [embed]})
        }
        data.push({
            "name" : name,
        "amount" : parseInt(amount),
        "id": aliases,
        "type" : type
          })
        db.ref(`Donations/Info/${message.guild.id}/List`).set(data)
        const item = data.find(item => item.name === name) || data.find(item => item.id === aliases)
        let embed6 = new MessageEmbed()
        .setTitle(`**Elite's Item List**`)
        .setAuthor(`${item.name}(New Item)`)
        .setDescription(`**<:dott:878752973587615776>Amount**<a:im5:859288337280925746> \`⏣ ${formatter.format(item.amount)}\`\n**<:dott:878752973587615776>Aliases**<a:im5:859288337280925746> \`${item.id}\`\n**<:dott:878752973587615776>Item Type**<a:im5:859288337280925746> \`${item.type}\``)
        .setColor('RANDOM')
        .setFooter(`Elite Empire`, `https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024`)
        message.channel.send({embeds: [embed6]})
    }
}
