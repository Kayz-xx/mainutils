const { MessageEmbed } = require("discord.js");


    module.exports.run = async (client, giveaway, member, reaction) => {  
        const guild = client.guilds.cache.get(giveaway.guildId)
       let role = []
       let bypass = []
       let names = []
       let b = true
       let nam;

    let d = giveaway.extraData[0]
    d.forEach(d => {
    role.push(d.id) 
    names.push(d.idn)
    })
    let d2 = giveaway.extraData[1]
    d2.forEach(d => {
    bypass.push(d.id)
    })
    let ad = ["813228228671045653", "829083877892948009"]

    names.map((d, i) => {
		nam += `${d},`
	})
    if(role.length == 0) return;
    if(bypass.length == 0) b = false
        if (!role.every(r => member.roles.cache.has(r)) && !bypass.some(r => member.roles.cache.has(r)) && !ad.some(r => member.roles.cache.has(r))) {
            reaction.users.remove(member.user);
            let embed = new MessageEmbed()
            .setTitle("Missing Giveaway Requirement")
            .setColor("FF3F00")
            .setDescription(`You must have this role to participate in the giveaway: \`${nam.replace("undefined", "")}\` \nYour reaction has been removed.`)
            .addField('Giveaway', `[${giveaway.prize}](${giveaway.messageURL})`)
            .setFooter(guild.name, guild.iconURL())
            .setTimestamp()
            member.send({embeds: [embed]});
       } else if (b == false) {
        if (!role.every(r => member.roles.cache.has(r)) && !ad.some(r => member.roles.cache.has(r))) {
            reaction.users.remove(member.user);
            let embed = new MessageEmbed()
            .setTitle("Missing Giveaway Requirement")
            .setColor("FF3F00")
            .setDescription(`You must have this role to participate in the giveaway: \`${nam.replace("undefined", "")}\` \nYour reaction has been removed.`)
            .addField('Giveaway', `[${giveaway.prize}](${giveaway.messageURL})`)
            .setFooter(guild.name, guild.iconURL())
            .setTimestamp()
            member.send({embeds: [embed]});
       }
    }
};
