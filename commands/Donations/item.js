const { Client, Message, MessageEmbed, Collection } = require('discord.js')
const formatter = new Intl.NumberFormat('en')
const {db} = require('../../firebase.js')


module.exports = {
    name: 'price',
    aliases: ['price'],
    cooldown: '0',
    usage: '<item>',
    permissions: [],
    category: 'Donations',
    
    async execute(client, message, cmd,  args) {
        const items = [
          {
            name: "alcohol",
            amount: 7500,
            aliases: "alc",
            type: "shop"
          },
          {
            name: "apple",
            amount: 5000,
            aliases: "app",
            type: "shop"
          },
          {
            name: "cheese" , 
            amount: 35000,
            aliases: "chee",
            type: "shop"
          },
          {
            name: "coinbomb",
            amount: 16000,
            aliases: "coin",
            type: "shop",
          },
            {
              name: "pepecrown",
              amount: 240000000,
              aliases: "crown",
              type: "shop"
            },
            {
              name: "pepetrophy",
              amount: 35000000,
              aliases: "trophy",
              type: "shop"
            },
            {
                name: "rarepepe",
                amount: 50000,
                aliases: "pepe",
                type: "shop"
              },
              {
                name: "fakeid",
                amount: 800,
                aliases: "fake",
                type: "shop"
              },
              {
                name: "fishingpole",
                amount: 14000,
                aliases: "pole",
                type: "shop"
              },
              {
                name: "horseshoe",
                amount: 9000,
                aliases: "shoe",
                type: "shop"
              },
              {
                name: "huntingrifle",
                amount: 14000,
                aliases: "rifle",
                type: "shop"
              },
              {
                name: "landmine",
                amount: 6000,
                aliases: "mine",
                type: "shop"
              },
              {
                name: "laptop",
                amount: 2000,
                aliases: "lap",
                type: "shop"
              },
              {
                name: "lifesaver",
                amount: 10000,
                aliases: "life",
                type: "shop"
              },
              {
                name: "padlock",
                amount: 2000,
                aliases: "pad",
                type: "shop"
              },
              {
                name: "pepecoin",
                amount: 500000,
                aliases: "pepec",
                type: "shop"
              },  
              {
                name: "pepemedal",
                amount: 7000000,
                aliases: "crown",
                type: "shop"
              },  
              {
                name: "cellphone",
                amount: 800,
                aliases: "cell",
                type: "shop"
              },  
              {
                name: "pinkphallic",
                amount: 5,
                aliases: "pink",
                type: "shop"
              },  
              {
                name: "pizzaslice",
                amount: 175000,
                aliases: "pizza",
                type: "shop"
              },  
              {
                name: "boxofsand",
                amount: 2000,
                aliases: "sand",
                type: "shop"
              },  
              {
                name: "shovel",
                amount: 12000,
                aliases: "shovel",
                type: "shop"
              },  
              {
                name: "fidgetspinner",
                amount: 5000,
                aliases: "spin",
                type: "shop"
              },  
              {
                name: "robberswishlist",
                amount: 20000,
                aliases: "wishlist",
                type: "shop"
              },  
              {
                name: "tidepod",
                amount: 10000,
                aliases: "tide",
                type: "shop"
              },  
          ]
          let data = await db
    .ref(`Donations/Info/${message.guild.id}/List`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
    db.ref(`Donations/Info/${message.guild.id}/List`).set(items)
        let item = data.find(item => item.name === args[0]) || data.find(item => item.aliases === args[0])
        if(!item) return message.reply({content: `Could not find that item!`})
        let embed = new MessageEmbed()
        .setTitle(`**Elite's Item List**`)
        .setAuthor(`${item.name}`)
        .setDescription(`**<:dott:878752973587615776>Amount**<a:im5:859288337280925746> \`⏣ ${formatter.format(item.amount)}\`\n**<:dott:878752973587615776>Aliases**<a:im5:859288337280925746> \`${item.aliases}\`\n**<:dott:878752973587615776>Item Type**<a:im5:859288337280925746> \`${item.type}\``)
        .setColor('RANDOM')
        .setFooter(`Elite Empire`, `https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024`)
        message.channel.send({embeds: [embed]})
    }
}