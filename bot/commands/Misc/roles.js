const Discord = require('discord.js');


module.exports = {
	name: 'roles',
	aliases: [],
	cooldown: 0,
	permissions: [],
    category: 'Misc',
	
	async execute(client, message, cmd,  args) {
        try{
        let rolemap = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join("\n");

        if (!rolemap) rolemap = "No roles";
        for (let i = 0; i < rolemap.length; i += 2048) {
        const embed = new Discord.MessageEmbed()
        .addField("Role List" , rolemap)
        message.channel.send({embeds: [embed]});
            }
        } catch (error) {
            console.log(error)
        }
    }
}
