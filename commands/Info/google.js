const { MessageEmbed, Permissions } = require("discord.js");
const googleIt = require('google-it')

module.exports = {
    name: 'google',
    aliases: [],
    cooldown: '0',
    permissions: [],
    category: 'Misc',
    

  
    async execute(client, message, cmd,  args) {
        const embed = new MessageEmbed()
        .setTitle("Google Search Results")
        .setColor("RANDOM")
        .setThumbnail("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png")
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: false}))
        .setTimestamp()
    
            
        const options = {
            'limit': 5
          };
    googleIt({options, 'query': args.join(' ')}).then(results => {
        results.forEach(function(item, index) { 
            embed.addField(`${index + 1})`, `${item.title} ${item.link}`, )
        });
     
        message.channel.send({embeds: [embed]});
    }).catch(e => {
        console.log(e)
        message.reply({content: "No results were found."})
    });
    }
}